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
