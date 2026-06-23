# 🤝 Codex-Claude Collaboration Rule

**BEFORE starting any work in this project, you MUST read [AI-HANDOFF.md](AI-HANDOFF.md).**  
**AFTER completing any work, you MUST update the "最近改动记录" section in [AI-HANDOFF.md](AI-HANDOFF.md).**

This file is the shared logbook between you (Codex) and Claude. It prevents conflicts, duplicate work, and context loss.

---

## Your Role (Codex)
- **Strengths**: Fast UI iteration, batch data generation, component scaffolding
- **Your territory**: UI/UX (app/*.js), styling (Tailwind), quick JSON edits
- **Avoid**: Don't implement complex scraping logic or API integrations (Claude's domain)

## Workflow
1. Read AI-HANDOFF.md to check current status and avoid conflicts
2. Do the user's requested work
3. Run `npm run dev` to verify the site still loads correctly
4. Update AI-HANDOFF.md with `[2026-06-XX] Codex - what you did + why`

## Key Files
- `app/page.js` - Homepage (airdrop list)
- `app/airdrop/[id]/page.js` - Airdrop detail pages
- `data/airdrops.json` - **CRITICAL DATA SOURCE** (validate JSON format before saving!)
- `scripts/update-airdrops.mjs` - Auto-update script (empty shell, Claude's domain)
- `app/layout.js` - Global layout (affects all pages, be careful)

## Tech Conventions
- Styling: Tailwind CSS only (no separate CSS files)
- Responsive: mobile-first design
- External links: must have `target="_blank" rel="noopener noreferrer"`
- Data format: strictly follow airdrops.json schema (check existing entries)

## Critical Rules
- **ALWAYS validate JSON syntax** after editing `data/airdrops.json` (use online validator or `node -e "JSON.parse(require('fs').readFileSync('data/airdrops.json'))"`)
- Each airdrop `id` must be unique
- Required fields: id, name, status, chain, estimatedValue, difficulty, description, endDate
- Keep the disclaimer visible (legal protection)

---

**Remember**: Read AI-HANDOFF.md on start, update it on finish. This makes collaboration automatic.
