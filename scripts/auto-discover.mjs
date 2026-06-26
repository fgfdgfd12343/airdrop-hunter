import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRUSTED_AGGREGATORS, SAFETY_CHECKS } from '../config/discovery-sources.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, '..');
const sourcePath = path.join(repoRoot, 'data', 'airdrop-sources.json');

// 验证URL是否安全
function isSafeUrl(url) {
  try {
    const parsed = new URL(url);

    // 必须HTTPS
    if (SAFETY_CHECKS.requireHttps && parsed.protocol !== 'https:') {
      return false;
    }

    // 检查黑名单域名
    if (SAFETY_CHECKS.blockedDomains.some(blocked => parsed.hostname.includes(blocked))) {
      return false;
    }

    // 检查TLD白名单
    const hasTrustedTLD = SAFETY_CHECKS.trustedTLDs.some(tld => parsed.hostname.endsWith(tld));
    if (!hasTrustedTLD) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// 有空投可能的协议类型
const AIRDROP_CATEGORIES = new Set([
  'Dexes', 'Lending', 'Bridge', 'Yield', 'Yield Aggregator',
  'Liquid Staking', 'Derivatives', 'Cross Chain', 'Chain',
  'DEX Aggregator', 'Algo-Stables', 'CDP', 'Options', 'Perps',
  'RWA', 'NFT Marketplace', 'Gaming', 'SocialFi',
]);

// 排除：中心化交易所、托管商、包装资产等
const EXCLUDED_CATEGORIES = new Set([
  'CEX', 'Custodian', 'Wrapped', 'Reserve Currency',
]);

// 排除：已知大公司官网（不会空投）
const EXCLUDED_DOMAINS = [
  'binance.com', 'coinbase.com', 'robinhood.com', 'gemini.com',
  'kraken.com', 'kucoin.com', 'mexc.com', 'htx.com',
  'bitfinex.com', 'circle.com', 'crypto.com',
];

// 从DeFiLlama官方API抓取协议列表
async function fetchFromDeFiLlama() {
  const url = 'https://api.llama.fi/protocols';

  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    signal: AbortSignal.timeout(60000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const protocols = await response.json();

  return protocols.filter((p) => {
    const noToken = !p.symbol || p.symbol === '-' || p.symbol === null;
    const hasSite = p.url && typeof p.url === 'string';
    const hasTvl = (p.tvl || 0) > 5_000_000; // TVL > $5M
    const goodCategory = AIRDROP_CATEGORIES.has(p.category);
    const notExcluded = !EXCLUDED_CATEGORIES.has(p.category);
    const notExcludedDomain = !EXCLUDED_DOMAINS.some(d => (p.url || '').includes(d));
    return noToken && hasSite && hasTvl && goodCategory && notExcluded && notExcludedDomain;
  })
    .sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
    .slice(0, 30)
    .map((p) => ({
      url: p.url,
      name: p.name,
      twitter: p.twitter ? `https://twitter.com/${p.twitter}` : '',
      chain: p.chain || (p.chains && p.chains[0]) || 'Multi-chain',
      category: p.category,
      tvl: p.tvl || 0,
    }))
    .filter((p) => isSafeUrl(p.url));
}

// 检查项目网站是否有博客/文档
async function checkProjectFeatures(siteUrl) {
  const features = {
    hasBlog: false,
    hasDocs: false,
    hasTwitter: false,
  };

  try {
    const response = await fetch(siteUrl, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: AbortSignal.timeout(15000), // 15秒超时
    });

    if (!response.ok) {
      return features;
    }

    const html = await response.text().catch(() => '');
    const lowerHtml = html.toLowerCase();

    features.hasBlog = lowerHtml.includes('/blog') || lowerHtml.includes('blog.');
    features.hasDocs = lowerHtml.includes('/docs') || lowerHtml.includes('documentation');
    features.hasTwitter = lowerHtml.includes('twitter.com') || lowerHtml.includes('x.com');

    return features;
  } catch {
    return features;
  }
}

// 自动发现新项目并添加到监控列表
export async function discoverNewProjects() {
  console.log('🔍 Starting auto-discovery of new airdrop projects...');

  const existingSources = fs.existsSync(sourcePath)
    ? JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
    : [];

  const existingUrls = new Set(existingSources.map(s => s.officialSite));

  // 从DeFiLlama抓取
  let newProjects = [];
  try {
    const candidates = await fetchFromDeFiLlama();
    console.log(`Found ${candidates.length} potential projects from DeFiLlama (no token yet, TVL > $1M)`);

    for (const candidate of candidates) {
      const url = candidate.url;
      if (existingUrls.has(url)) {
        continue; // 已存在
      }

      console.log(`Checking ${candidate.name} (${url})...`);
      const features = await checkProjectFeatures(url);

      // 至少要有blog或docs才值得监控
      if (!features.hasBlog && !features.hasDocs) {
        console.log(`  ❌ ${candidate.name} has no blog/docs, skipping`);
        continue;
      }

      const hostname = new URL(url).hostname.replace(/^www\./, '');

      const newProject = {
        id: hostname.replace(/\./g, '-'),
        name: candidate.name,
        chain: candidate.chain,
        token: candidate.name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10),
        officialSite: url,
        officialTwitter: candidate.twitter,
        estimatedValue: '$200-1500',
        difficulty: 'medium',
        discoveryUrls: [
          url,
          features.hasBlog ? `${url.replace(/\/$/, '')}/blog` : `${url.replace(/\/$/, '')}/docs`,
        ].filter(Boolean),
        autoDiscovered: true,
        discoveredAt: new Date().toISOString().split('T')[0],
        tvlAtDiscovery: candidate.tvl,
      };

      newProjects.push(newProject);
      console.log(`  ✅ Added ${candidate.name} (TVL: $${(candidate.tvl / 1e6).toFixed(1)}M)`);

      // 限制每次新增数量，避免太多
      if (newProjects.length >= 5) {
        break;
      }
    }
  } catch (error) {
    console.error('Error discovering from DeFiLlama:', error.message);
  }

  if (newProjects.length === 0) {
    console.log('No new projects discovered this time.');
    return { added: 0 };
  }

  // 合并到现有列表
  const updated = [...existingSources, ...newProjects];
  fs.writeFileSync(sourcePath, JSON.stringify(updated, null, 2) + '\n');

  console.log(`✅ Auto-discovered and added ${newProjects.length} new projects to monitoring list.`);
  return { added: newProjects.length, projects: newProjects };
}

// CLI运行
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  discoverNewProjects().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
