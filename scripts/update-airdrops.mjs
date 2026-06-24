import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import htmlParser from '../node_modules/next/dist/compiled/node-html-parser/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, '..');
const dataPath = path.join(repoRoot, 'data', 'airdrops.json');
const sourcePath = path.join(repoRoot, 'data', 'airdrop-sources.json');
const SIGNAL_KEYWORDS = [
  'airdrop',
  'points',
  'campaign',
  'reward',
  'rewards',
  'incentive',
  'incentivized',
  'testnet',
  'mainnet',
  'quests',
  'season',
  'snapshot',
  'bridge',
  'liquidity',
  'ecosystem',
];

const REQUIRED_FIELDS = [
  'id',
  'name',
  'status',
  'chain',
  'estimatedValue',
  'difficulty',
  'description',
  'endDate',
];

const ALLOWED_STATUS = new Set(['active', 'upcoming', 'ended', 'watch']);
const ALLOWED_DIFFICULTY = new Set(['easy', 'medium', 'hard']);
const { parse } = htmlParser;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

function todayIsoDate() {
  return new Date().toISOString().split('T')[0];
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : value;
}

function slugify(value) {
  return normalizeText(value)
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function inferStatus(airdrop, now) {
  const explicit = normalizeText(airdrop.status)?.toLowerCase();
  const endDate = parseDate(airdrop.endDate);

  if (explicit === 'watch') {
    return 'watch';
  }

  if (endDate && endDate < now) {
    return 'ended';
  }

  if (explicit && ALLOWED_STATUS.has(explicit)) {
    return explicit === 'ended' && (!endDate || endDate >= now) ? 'active' : explicit;
  }

  return 'active';
}

function validateLink(link, context) {
  if (!link || typeof link !== 'object') {
    throw new Error(`${context}: link must be an object`);
  }

  if (!normalizeText(link.text) || !normalizeText(link.url)) {
    throw new Error(`${context}: link must include text and url`);
  }
}

function validateTutorial(tutorial, context) {
  if (!tutorial || typeof tutorial !== 'object' || !Array.isArray(tutorial.steps)) {
    throw new Error(`${context}: tutorial.steps must be an array`);
  }

  tutorial.steps.forEach((step, index) => {
    const stepContext = `${context}.steps[${index}]`;
    if (!normalizeText(step.title) || !normalizeText(step.description)) {
      throw new Error(`${stepContext}: title and description are required`);
    }

    if (step.links) {
      if (!Array.isArray(step.links)) {
        throw new Error(`${stepContext}: links must be an array`);
      }
      step.links.forEach((link, linkIndex) => validateLink(link, `${stepContext}.links[${linkIndex}]`));
    }
  });
}

function keywordScore(text) {
  const haystack = normalizeText(text)?.toLowerCase() ?? '';
  return SIGNAL_KEYWORDS.reduce((score, keyword) => score + (haystack.includes(keyword) ? 1 : 0), 0);
}

function cleanSignalTitle(text) {
  const normalized = normalizeText(text)?.replace(/\s+/g, ' ') ?? '';
  if (!normalized) {
    return '';
  }

  return normalized.length > 140 ? `${normalized.slice(0, 137)}...` : normalized;
}

function buildSignalSummary(source, signal) {
  const haystack = `${signal.title} ${signal.url}`.toLowerCase();
  const tags = [];

  if (haystack.includes('points')) tags.push('积分');
  if (haystack.includes('airdrop')) tags.push('空投');
  if (haystack.includes('campaign') || haystack.includes('quest')) tags.push('活动');
  if (haystack.includes('testnet')) tags.push('测试网');
  if (haystack.includes('mainnet')) tags.push('主网');
  if (haystack.includes('bridge')) tags.push('跨链');
  if (haystack.includes('liquidity')) tags.push('流动性');
  if (haystack.includes('reward') || haystack.includes('incentive')) tags.push('奖励');

  const uniqueTags = [...new Set(tags)];
  const focus = uniqueTags.length > 0 ? uniqueTags.join(' / ') : '官方动态';

  return `自动检测到 ${source.name} 官方站点出现新的${focus}相关信号，建议优先查看原文并人工确认是否涉及空投、积分、任务或奖励规则更新。`;
}

function absolutizeUrl(baseUrl, url) {
  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return null;
  }
}

function buildDefaultTutorial(source, signal) {
  return {
    steps: [
      {
        title: `Review the latest ${source.name} update`,
        description: `Start from the latest official signal we detected and verify whether the team is running points, quests, incentives, testnet, or ecosystem activity.`,
        links: [
          {
            text: 'Latest official signal',
            url: signal.url,
          },
          {
            text: `${source.name} official site`,
            url: source.officialSite,
          },
        ],
      },
      {
        title: 'Complete the currently promoted actions',
        description: `Prioritize the official activities linked by ${source.name}: quests, bridging, swaps, staking, points, or ecosystem tasks mentioned in the official update.`,
        tips: 'Record every wallet action and only use the official links from the project announcement.',
      },
      {
        title: 'Return weekly and monitor new official announcements',
        description: 'This auto-generated entry should be reviewed manually. Keep monitoring the project for snapshot, season, reward, and eligibility signals.',
      },
    ],
  };
}

function buildDefaultRequirements(signal) {
  return [
    'Read the latest official announcement carefully',
    'Complete only the tasks explicitly promoted on the official site',
    'Track wallet activity over multiple weeks if the campaign is ongoing',
    `Monitor the source article: ${signal.title}`,
  ];
}

function buildDefaultRisks() {
  return [
    'Eligibility is never guaranteed',
    'Campaign rules may change without notice',
    'Always verify the domain and avoid unofficial links',
  ];
}

async function extractSignalsFromUrl(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'AirdropHunterBot/1.0 (+https://github.com/fgfdgfd12343/airdrop-hunter)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const root = parse(html);
  const links = root.querySelectorAll('a');
  const results = [];

  for (const link of links) {
    const text = normalizeText(link.text);
    const href = normalizeText(link.getAttribute('href'));
    if (!text || !href) {
      continue;
    }

    const resolved = absolutizeUrl(url, href);
    if (!resolved) {
      continue;
    }

    const cleanedTitle = cleanSignalTitle(text);
    const combined = `${cleanedTitle} ${resolved}`;
    const score = keywordScore(combined);
    if (score < 2) {
      continue;
    }

    results.push({
      title: cleanedTitle,
      url: resolved,
      score,
      sourcePage: url,
    });
  }

  const unique = new Map();
  for (const item of results) {
    const existing = unique.get(item.url);
    if (!existing || item.score > existing.score) {
      unique.set(item.url, item);
    }
  }

  return [...unique.values()].sort((a, b) => b.score - a.score).slice(0, 5);
}

async function discoverSignals(source) {
  const collected = [];
  for (const url of source.discoveryUrls ?? []) {
    try {
      const items = await extractSignalsFromUrl(url);
      collected.push(...items);
    } catch (error) {
      console.warn(`Signal fetch skipped for ${source.name} at ${url}: ${error.message}`);
    }
  }

  const unique = new Map();
  for (const item of collected) {
    const existing = unique.get(item.url);
    if (!existing || item.score > existing.score) {
      unique.set(item.url, item);
    }
  }

  return [...unique.values()].sort((a, b) => b.score - a.score);
}

function upsertDiscoveredAirdrop(existingMap, source, signal, now) {
  const existing = existingMap.get(source.id);
  const latestSignal = {
    title: signal.title,
    summaryZh: buildSignalSummary(source, signal),
    url: signal.url,
    sourcePage: signal.sourcePage,
    score: signal.score,
    detectedAt: todayIsoDate(),
  };

  if (existing) {
    existing.latestSignal = latestSignal;
    existing.lastUpdated = todayIsoDate();
    if (signal.score >= 4 && existing.status === 'watch') {
      existing.status = 'active';
    }
    return existing;
  }

  const created = {
    id: source.id || slugify(source.name),
    name: source.name,
    token: source.token || source.name.toUpperCase(),
    chain: source.chain || 'Multi-chain',
    status: signal.score >= 4 ? 'active' : 'watch',
    estimatedValue: source.estimatedValue || '$200-1200',
    difficulty: source.difficulty || 'medium',
    endDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 90).toISOString().split('T')[0],
    officialSite: source.officialSite,
    officialTwitter: source.officialTwitter,
    description: `${source.name} has recent official activity that may indicate points, incentives, quests, or ecosystem participation worth monitoring for future rewards.`,
    requirements: buildDefaultRequirements(signal),
    tutorial: buildDefaultTutorial(source, signal),
    risks: buildDefaultRisks(),
    latestSignal,
    lastUpdated: todayIsoDate(),
  };

  existingMap.set(created.id, created);
  return created;
}

function normalizeAirdrop(airdrop, now, seenIds) {
  const normalized = {
    ...airdrop,
    id: normalizeText(airdrop.id),
    name: normalizeText(airdrop.name),
    token: normalizeText(airdrop.token),
    chain: normalizeText(airdrop.chain),
    status: inferStatus(airdrop, now),
    estimatedValue: normalizeText(airdrop.estimatedValue),
    difficulty: normalizeText(airdrop.difficulty)?.toLowerCase(),
    endDate: normalizeText(airdrop.endDate),
    officialSite: normalizeText(airdrop.officialSite),
    officialTwitter: normalizeText(airdrop.officialTwitter),
    description: normalizeText(airdrop.description),
    requirements: Array.isArray(airdrop.requirements)
      ? airdrop.requirements.map(normalizeText).filter(Boolean)
      : [],
    risks: Array.isArray(airdrop.risks)
      ? airdrop.risks.map(normalizeText).filter(Boolean)
      : [],
    lastUpdated: todayIsoDate(),
  };

  REQUIRED_FIELDS.forEach((field) => {
    if (!normalizeText(normalized[field])) {
      throw new Error(`Airdrop "${normalized.id || normalized.name || 'unknown'}" is missing required field "${field}"`);
    }
  });

  if (seenIds.has(normalized.id)) {
    throw new Error(`Duplicate airdrop id found: ${normalized.id}`);
  }
  seenIds.add(normalized.id);

  if (!ALLOWED_DIFFICULTY.has(normalized.difficulty)) {
    throw new Error(`Airdrop "${normalized.id}" has invalid difficulty "${normalized.difficulty}"`);
  }

  if (!ALLOWED_STATUS.has(normalized.status)) {
    throw new Error(`Airdrop "${normalized.id}" has invalid status "${normalized.status}"`);
  }

  if (!Array.isArray(airdrop.requirements) || normalized.requirements.length === 0) {
    throw new Error(`Airdrop "${normalized.id}" must have at least one requirement`);
  }

  if (!Array.isArray(airdrop.risks) || normalized.risks.length === 0) {
    throw new Error(`Airdrop "${normalized.id}" must have at least one risk`);
  }

  validateTutorial(airdrop.tutorial, `Airdrop "${normalized.id}".tutorial`);

  return normalized;
}

function sortAirdrops(airdrops) {
  const statusOrder = {
    active: 0,
    upcoming: 1,
    watch: 2,
    ended: 3,
  };

  return [...airdrops].sort((a, b) => {
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) {
      return statusDiff;
    }

    const dateA = parseDate(a.endDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const dateB = parseDate(b.endDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    if (dateA !== dateB) {
      return dateA - dateB;
    }

    return a.name.localeCompare(b.name);
  });
}

async function triggerDeployHook() {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hookUrl) {
    console.log('Skipping deploy hook: VERCEL_DEPLOY_HOOK_URL is not set.');
    return { triggered: false };
  }

  const response = await fetch(hookUrl, { method: 'POST' });
  if (!response.ok) {
    throw new Error(`Deploy hook failed with ${response.status} ${response.statusText}`);
  }

  console.log('Deploy hook triggered successfully.');
  return { triggered: true };
}

export async function updateAirdrops(options = {}) {
  const now = options.now ?? new Date();
  console.log('Starting airdrop data update...');

  const currentData = readJson(dataPath);
  const sources = fs.existsSync(sourcePath) ? readJson(sourcePath) : [];
  if (!Array.isArray(currentData)) {
    throw new Error('data/airdrops.json must contain an array');
  }
  if (!Array.isArray(sources)) {
    throw new Error('data/airdrop-sources.json must contain an array');
  }

  const existingMap = new Map(currentData.map((item) => [item.id, item]));

  for (const source of sources) {
    const signals = await discoverSignals(source);
    if (signals.length === 0) {
      continue;
    }
    upsertDiscoveredAirdrop(existingMap, source, signals[0], now);
  }

  const seenIds = new Set();
  const normalized = [...existingMap.values()].map((airdrop) => normalizeAirdrop(airdrop, now, seenIds));
  const sorted = sortAirdrops(normalized);

  writeJson(dataPath, sorted);

  console.log(`Validated and refreshed ${sorted.length} airdrops.`);

  if (options.triggerDeployHook) {
    await triggerDeployHook();
  }

  return {
    updatedCount: sorted.length,
    triggerDeployHook: Boolean(options.triggerDeployHook),
  };
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const triggerDeploy = process.argv.includes('--deploy-hook');
  updateAirdrops({ triggerDeployHook: triggerDeploy }).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
