$ErrorActionPreference = "Stop"

$projectRoot = Join-Path $HOME "Documents\\airdrop-hunter"
$env:VERCEL_DEPLOY_HOOK_URL = "https://api.vercel.com/v1/integrations/deploy/prj_kQuZhXZ4QlULhcm9PHysxaWP0L7S/2fwFOtBkdR"

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

Write-Host "[4/4] Triggering Vercel deploy hook..."
node scripts/update-airdrops.mjs --deploy-hook
