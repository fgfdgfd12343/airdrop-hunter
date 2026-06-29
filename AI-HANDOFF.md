# AI 协作交接文档
> 这是 Codex 和 Claude 之间的共享工作日志。任何 AI 开始工作前必须先读这个文件，完成工作后必须更新。

---

## 📊 当前项目状态
**项目**: Airdrop Hunter - 加密货币空投聚合网站
**技术栈**: Next.js 14, React 18, Tailwind CSS
**部署**: 已上线 https://airdrop-hunter-sooty.vercel.app/
**运行状态**: 功能完整，22 个路由，每日自动更新

### 核心功能模块
- ✅ **首页** (app/page.js) - 空投列表 + 导航（首页/日历/教程/工具/交易所）
- ✅ **详情页** (app/airdrop/[id]/page.js) - 分步教程、官方链接、风险提示、返佣区块
- ✅ **日历** (app/calendar/page.js) - 按截止日期排序
- ✅ **工具** (app/tools/page.js) - Gas 费计算器（ROI 计算器占位）
- ✅ **交易所测评** (app/exchanges/page.js) - 对比 + 返佣
- ✅ **博客** (app/blog/) - 5 篇 SEO 教程
- ✅ **合规页** - about/contact/privacy（AdSense 必需）
- ✅ **SEO** - sitemap.js + robots.js + OG/Twitter meta
- ✅ **数据库** (data/airdrops.json) - 空投数据源
- ✅ **变现** - 返佣链接已配置（config/referral.js），AdSense 代码占位（layout.js）

---

## 🔄 最近改动记录
### [2026-06-28~29] Claude（网站2 NFT空投站创建完成）
- **完成**: 复制网站1结构创建 `C:\Users\成1\Documents\nft-airdrop-hunter`（独立项目，独立仓库）
- **完成**: 改为NFT主题 — package.json改名、首页标题"🖼️ NFT Airdrop Hunter"、SEO meta全换NFT关键词、sitemap/robots域名改nft-airdrop-hunter.vercel.app、移除网站1的Search Console验证码
- **完成**: 3个NFT空投示例数据（Pudgy Penguins / Blur / Magic Eden）
- **完成**: 本地构建测试通过；创建 DEPLOY-NFT-GUIDE.md 部署指南
- **待用户**: 创建GitHub仓库nft-airdrop-hunter → SSH推送 → Vercel导入部署
- **注意**: 本会话也修复了 auto-discover 抓取（DeFiLlama API + 代理env + 分类过滤），run-update.ps1 已加 HTTP_PROXY env
- **下一步**: 推广两个站（footer互相导流）

### [2026-06-28] Claude（根治 git push 超时 + 恢复经典项目 + SEO完善 + 30项目上线）
- **✅ 彻底解决 git push 超时**: 切换到 SSH（通过443端口绕过防火墙）
  - 问题根因: HTTPS 代理 socks5 上传不稳定，多次尝试 `--no-thin`、http proxy、增大buffer 均失败
  - 最终方案: 生成 SSH 密钥 + 配置 `~/.ssh/config` 走 `ssh.github.com:443`
  - 固化配置: `git config core.sshCommand "ssh -i ~/.ssh/id_ed25519 -p 443 -o HostName=ssh.github.com -o StrictHostKeyChecking=no"`
  - 结果: 推送秒通，永久解决（无需代理、无需环境变量）
- **✅ 恢复丢失的经典项目**: LayerZero、zkSync、Starknet 三个高价值项目
  - 问题根因: GitHub Actions 每日自动刷新（UTC 1:00）时，仓库里只有26个项目，脚本保留现有但不会主动恢复缺失的老项目
  - 解决: 从 git history (commit ecba0cb) 提取原始4个项目数据，去除乱码 latestSignal 字段，合并回当前29个
  - 验证: 本地运行 update-airdrops.mjs 确认经典项目在自动刷新中存活
  - 当前稳定: **30个项目**（26新 + 3经典 + 1自动发现的 liquidcollective-io）
- **✅ SEO 结构化数据完善**:
  - 详情页: 已有 JSON-LD HowTo schema（45→29→30个页面全覆盖）
  - 首页: 已有 ItemList schema（上个会话完成）
  - sitemap.js: 从硬编码4个ID改为动态读取 airdrops.json + blog-posts
    - 当前覆盖: 30 airdrop + 5 blog + 8 static = **43个 URL**
- **✅ 自动更新系统验证**: scripts/update-airdrops.mjs 经测试安全
  - 逻辑: 保留所有现有项目 + 增量添加新发现，**不会删除**
  - 自动发现功能正常（新增1个 liquidcollective-io）
- **推送记录**: 
  - commit dba1a90: 恢复经典+sitemap修复（rebase 后）
  - commit 490793f: 30项目最终状态
- **待验证**: 线上 sitemap 和 LayerZero 页面（浏览器已打开）
- **下一步**: 
  1. 确认 Vercel 部署完成（sitemap 30个、经典项目可访问）
  2. 详情页独立 meta 描述（需重构为 server component，大改动，暂缓）
  3. 内部链接优化（相关空投推荐）
  4. 监控每日自动刷新（确保经典项目不再丢失）

### [2026-06-26] Claude（修复 git push 超时 + 线上更新到26项目）
- **根因**: 5个commit堆积未推送，线上一直停留4个项目。代理 ls-remote(下行)秒通但 push(上行)反复超时
- **✅ 解决方案（重要，下次push卡住照用）**: 
  `git -c http.proxy="socks5h://127.0.0.1:7897" -c http.version=HTTP/1.1 -c pack.threads=1 push --no-thin origin main`
  关键是 `--no-thin`（禁用薄包协商，代理下薄包会卡死）+ `socks5h`（h=DNS走代理）
- **确认**: 5个commit成功推送 c8afc12..d26e6a2，触发Deploy Hook，线上更新到26项目
- **注意**: 直连GitHub 443完全不通，必须走代理 127.0.0.1:7897
- **下一步**: 修复auto-discover抓取 + 网站2 NFT站 + 推广

### [2026-06-26] Claude（内容扩充45项目 + SEO结构化数据 + Search Console完成）
- **完成内容扩充**: 手工创建 25 个高质量空投项目，总数 20 → 45
  - Layer2: Scroll, Base, Arbitrum Odyssey, Optimism Quests, Polygon zkEVM, Manta Pacific, Blast
  - DeFi: EigenLayer, Pendle, Ambient Finance
  - 新公链: Sui, Aptos, Celestia, Fuel, Shardeum, Berachain, Monad, ZetaChain
  - 跨链: MetaMask Snaps, Hyperlane, Wormhole
  - SocialFi/GameFi: Friend.tech, Aethir, Particle Network
  - 交易: dYdX v4
  - 难度分布: easy 40%, medium 45%, hard 15%；价值范围 $100-3000
- **SEO优化**: 
  - 详情页添加 JSON-LD HowTo schema（45个页面全覆盖）
  - Google 可展示 rich snippets: 步骤列表、预估成本、时间
  - 提升搜索结果 CTR 和展现质量
- **Search Console**: 
  - 修复 Google 验证文件 404（vercel.json rewrite 规则）
  - Sitemap 成功提交，Google 开始索引
- **工具**: scripts/merge-airdrops.js 批量合并 JSON + 处理 BOM
- **⚠️ Git Push 问题**: 本地 2 commits 完成但推送超时
  - Commit 47e957b: 新增 25 项目
  - Commit ffe4c2f: SEO结构化数据
  - 可能原因: 网络不稳定或需要增大 http.postBuffer
  - 临时方案: 稍后手动推送或使用 Vercel Deploy Hook
- **下一步建议**: 
  1. 解决 git push（增大buffer或换SSH）
  2. 首页添加 ItemList structured data
  3. Meta描述优化（每个详情页独立描述）
  4. 内部链接优化（相关空投推荐）

### [2026-06-26] Claude（自动发现新空投项目系统）
- **完成**: scripts/auto-discover.mjs 自动发现脚本（从 DeFiLlama 等聚合站抓取新项目列表）
- **完成**: config/discovery-sources.js 安全验证规则（HTTPS、TLD白名单、域名黑名单）
- **更新**: scripts/run-update.ps1 加入自动发现步骤（每天运行时自动找新项目）
- **工作原理**: 
  1. 从DeFiLlama等聚合站抓项目列表
  2. 验证URL安全性（HTTPS、可信TLD、非短链）
  3. 检查项目是否有blog/docs（值得监控的标准）
  4. 自动添加到 airdrop-sources.json
  5. 限制每次新增5个（避免过载）
- **下一步**: 测试运行 + 继续网站2 NFT站

### [2026-06-25] Claude（站点修复 + 浏览器自动化配置）
- **发现**: 线上站点 404（blog 模块未推送）
- **完成**: 提交 blog 模块 + 推送到 GitHub，Vercel 自动部署恢复正常
- **修复**: app/page.js footer 的 `new Date().toLocaleDateString()` 导致 React hydration mismatch (#418/#423)，改用 `suppressHydrationWarning` + `toISOString().slice(0,10)`
- **配置**: 
  - 安装 Playwright MCP (浏览器自动化)，控制 Edge 浏览器
  - git 配置 socks5://127.0.0.1:7897 代理（git push 需走代理）
- **⚠️ 待推送**: 本地有 3 个 commit 未推送（包含 hydration 修复），git push 超时，需手动推送或用 Deploy Hook
- **下一步**: 用 Playwright 自动化抓取空投源站数据

### [2026-06-24] Claude（内容扩展：日历/工具/交易所/博客）
- **完成**: app/calendar、app/tools、app/exchanges、app/blog（列表+详情）、data/blog-posts.js
- **完成**: 首页导航更新为 首页/日历/教程/工具/交易所
- **部署**: refresh-site 已触发，22 个路由上线
- **注意**: tools 的 ROI 计算器、blog 订阅框是占位 UI，逻辑待实现
- **⚠️ 异常**: 本次发现 AI-HANDOFF.md 一度丢失，由 Claude 用历史内容重建。请 Codex 留意是否有脚本误删此文件
- **下一步**: 创建网站2 NFT 空投站

### [2026-06-24] Claude（SEO 优化 + 推广准备）
- **完成**: layout.js meta 增强（OG/Twitter/robots）、sitemap.js、robots.js、PROMOTION-GUIDE.md
- **待用户**: 提交 sitemap 到 Search Console + 社交推广 + 流量够了申请 AdSense

### [2026-06-24] Claude（AdSense 申请准备）
- **完成**: about/contact/privacy 合规页、layout.js 预留 AdSense 占位、footer 导航、ADSENSE-GUIDE.md

### [2026-06-24] Claude（返佣链接上线）
- **确认**: 详情页读 config/referral.js，币安/欧易真实码生效，Bybit 占位

### [2026-06-24] Codex（GitHub + Vercel 自动发布打通）
- 推送到 GitHub fgfdgfd12343/airdrop-hunter，配置 Vercel Deploy Hook
- 创建 Windows 计划任务 AirdropHunterRefresh 每天 09:00 跑 run-update.ps1

### [2026-06-24] Codex（自动抓新内容 + 自动更新链路）
- scripts/update-airdrops.mjs 增加官方信号抓取、打分、自动新增/更新
- data/airdrop-sources.json 维护发现源；首页/详情页展示 latestSignal（含中文摘要 summaryZh）
- scripts/run-update.ps1 一键 更新→校验→构建→触发部署；npm run refresh-site

### [2026-06-23] Claude（初始化）
- 创建 AI-HANDOFF.md, CLAUDE.md, AGENTS.md 协作基础设施

### [之前] Codex
- 创建完整 Next.js 项目框架、空投列表/详情页、Tailwind 样式

---

## 📋 下一步 / 待办事项
### 建议 Codex 处理
- [ ] UI/UX 迭代（筛选器、搜索框）
- [ ] 批量添加空投项目到 data/airdrops.json
- [ ] tools 页 ROI 计算器逻辑、blog 邮件订阅后端

### 建议 Claude 处理
- [ ] 网站2 NFT 空投站（复用本站结构）
- [ ] 数据验证和去重逻辑

### 通用任务
- [ ] 提交 sitemap 到 Google Search Console（待用户）
- [ ] 配置自定义域名
- [ ] 申请 Google AdSense（待流量，待用户）
- [ ] Bybit 返佣链接（待用户注册后填入 config/referral.js）

---

## ⚠️ 注意事项 / 别碰区
### 绝对不能动的
- `C:\Users\成1\.codex` - Codex 配置目录
- `node_modules/`、`.next/`、`out/` - 自动生成

### 修改需谨慎的
- `data/airdrops.json` - 唯一数据源，必须保持 JSON 正确，id 唯一
- `app/layout.js` - 全局布局，影响所有页面
- `package.json` - 依赖管理

### 风格约定
- 只用 Tailwind CSS；mobile-first
- 外链必须加 `target="_blank" rel="noopener noreferrer"`
- 保持免责声明可见

---

## 💬 协作建议
- UI/样式改动 → Codex；爬虫/数据处理逻辑 → Claude
- 改动同一文件前先读本文档；完成后在"最近改动记录"加条目：`[日期] [谁] 做了什么 + 原因`

---

**最后更新**: 2026-06-24 by Claude（含 AI-HANDOFF.md 重建）
**下次需读取**: 任何 AI 开始新任务时
