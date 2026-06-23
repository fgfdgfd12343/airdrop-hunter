import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, '..');
const dataPath = path.join(repoRoot, 'data', 'airdrops.json');

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
  if (!Array.isArray(currentData)) {
    throw new Error('data/airdrops.json must contain an array');
  }

  const seenIds = new Set();
  const normalized = currentData.map((airdrop) => normalizeAirdrop(airdrop, now, seenIds));
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
