const fs = require('fs');

// Remove BOM if present
function removeBOM(str) {
  if (str.charCodeAt(0) === 0xFEFF) {
    return str.slice(1);
  }
  return str;
}

const existingRaw = fs.readFileSync('data/airdrops.json', 'utf8');
const batch1Raw = fs.readFileSync('data/airdrops-new-batch.json', 'utf8');
const batch2Raw = fs.readFileSync('data/airdrops-batch2.json', 'utf8');

const existing = JSON.parse(removeBOM(existingRaw));
const batch1 = JSON.parse(removeBOM(batch1Raw));
const batch2 = JSON.parse(removeBOM(batch2Raw));

const combined = [...existing, ...batch1, ...batch2];

fs.writeFileSync('data/airdrops.json', JSON.stringify(combined, null, 2), 'utf8');

console.log(`Successfully merged! Total projects: ${combined.length}`);
