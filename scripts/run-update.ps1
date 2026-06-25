$ErrorActionPreference = "Stop"

$projectRoot = Join-Path $HOME "Documents\airdrop-hunter"
$env:VERCEL_DEPLOY_HOOK_URL = "https://api.vercel.com/v1/integrations/deploy/prj_kQuZhXZ4QlULhcm9PHysxaWP0L7S/2fwFOtBkdR"

Set-Location -LiteralPath $projectRoot

Write-Host "[1/5] Auto-discovering new airdrop projects..."
node scripts/auto-discover.mjs

Write-Host "[2/5] Refreshing airdrop data..."
node scripts/update-airdrops.mjs

Write-Host "[3/5] Validating JSON..."
@'
const fs = require('fs');
JSON.parse(fs.readFileSync('data/airdrops.json', 'utf8'));
console.log('data/airdrops.json is valid JSON');
'@ | node

Write-Host "[4/5] Rebuilding static export..."
npm run build

Write-Host "[5/5] Triggering Vercel deploy hook..."
node scripts/update-airdrops.mjs --deploy-hook
