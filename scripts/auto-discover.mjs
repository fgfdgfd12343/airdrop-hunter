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

// 从DeFiLlama抓取空投列表
async function fetchFromDeFiLlama() {
  const url = 'https://defillama.com/airdrops';
  const response = await fetch(url);
  const html = await response.text();

  // 简单提取：找所有看起来像项目官网的链接
  const urlRegex = /https?:\/\/[a-zA-Z0-9\-\.]+\.(io|com|org|network|finance|app|xyz|build)/g;
  const matches = html.match(urlRegex) || [];

  const unique = [...new Set(matches)].filter(isSafeUrl);
  return unique.slice(0, 20); // 限制数量
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
        'user-agent': 'AirdropHunterBot/1.0',
      },
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
    const defiLlamaUrls = await fetchFromDeFiLlama();
    console.log(`Found ${defiLlamaUrls.length} potential projects from DeFiLlama`);

    for (const url of defiLlamaUrls) {
      if (existingUrls.has(url)) {
        continue; // 已存在
      }

      console.log(`Checking ${url}...`);
      const features = await checkProjectFeatures(url);

      // 至少要有blog或docs才值得监控
      if (!features.hasBlog && !features.hasDocs) {
        console.log(`  ❌ ${url} has no blog/docs, skipping`);
        continue;
      }

      // 提取项目名（从域名）
      const hostname = new URL(url).hostname.replace(/^www\./, '');
      const name = hostname.split('.')[0]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const newProject = {
        id: hostname.replace(/\./g, '-'),
        name: name,
        chain: 'Unknown', // 需要人工确认
        token: name.toUpperCase().replace(/\s+/g, ''),
        officialSite: url,
        officialTwitter: '', // 需要人工填写
        estimatedValue: '$200-1000',
        difficulty: 'medium',
        discoveryUrls: [
          url,
          features.hasBlog ? `${url}/blog` : `${url}/docs`,
        ].filter(Boolean),
        autoDiscovered: true,
        discoveredAt: new Date().toISOString().split('T')[0],
      };

      newProjects.push(newProject);
      console.log(`  ✅ Added ${name}`);

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
