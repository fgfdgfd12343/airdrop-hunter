$ErrorActionPreference = "Stop"

$projectRoot = "C:\Users\成1\Documents\airdrop-hunter"
Set-Location -LiteralPath $projectRoot

Write-Host "[1/4] Refreshing airdrop data..."
node scripts/update-airdrops.mjs

Write-Host "[2/4] Validating JSON..."
@'
const fs = require('fs');
JSON.parse(fs.readFileSync('data/airdrops.json', 'utf8'));
console.log('data/airdrops.json is valid JSON');
'@ | node

Write-Host "[3/4] Rebuilding static export..."
npm run build

if ($env:VERCEL_DEPLOY_HOOK_URL) {
  Write-Host "[4/4] Triggering Vercel deploy hook..."
  node scripts/update-airdrops.mjs --deploy-hook
} else {
  Write-Host "[4/4] Skipping deploy hook. Set VERCEL_DEPLOY_HOOK_URL to publish automatically."
}
