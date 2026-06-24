# AI 协作交接文档
> 这是 Codex 和 Claude 之间的共享工作日志。任何 AI 开始工作前必须先读这个文件，完成工作后必须更新。

---

## 📊 当前项目状态
**项目**: Airdrop Hunter - 加密货币空投聚合网站  
**技术栈**: Next.js 15, React 19, Tailwind CSS  
**部署**: 本地开发中（未部署到 Vercel）  
**运行状态**: 功能完整，可本地预览 `npm run dev`

### 核心功能模块
- ✅ **首页** (app/page.js) - 空投项目列表，状态/难度/价值展示
- ✅ **详情页** (app/airdrop/[id]/page.js) - 分步教程、官方链接、风险提示
- ✅ **数据库** (data/airdrops.json) - 空投项目数据源
- ⚠️ **自动更新脚本** (scripts/update-airdrops.mjs) - 空壳，待实现数据抓取逻辑
- ⚠️ **变现功能** - 未配置（AdSense 和返佣链接占位符存在）

### 当前数据
- 空投数量: 根据 data/airdrops.json 动态显示
- 更新频率: 手动编辑 JSON
- SEO 状态: 基础 meta 标签已设置，未优化

---

## 🔄 最近改动记录
### [2026-06-24] Claude（SEO 优化 + 推广准备）
- **完成**: 增强 `app/layout.js` meta 标签（Open Graph、Twitter Card、robots 指令）
- **完成**: 创建 `app/sitemap.js` 动态生成 sitemap.xml（所有页面 + 空投详情）
- **完成**: 创建 `app/robots.js` 允许 Google 抓取
- **完成**: 创建 `PROMOTION-GUIDE.md` 推广完整指南（Twitter/Reddit 文案模板 + SEO 提交步骤）
- **部署**: `npm run refresh-site` 已上线，现有 13 个路由（含 sitemap + robots）
- **待用户操作**: 
  1. 提交 sitemap 到 Google Search Console
  2. 开始社交媒体推广（文案已就绪）
  3. 等流量达 100+/天后申请 AdSense
- **下一步建议**: 添加博客/工具页增加内容厚度 / 做第2个工具站

### [2026-06-24] Claude（AdSense 申请准备）
- **完成**: 创建 AdSense 必需的合规页面 `app/about/page.js`、`app/contact/page.js`、`app/privacy/page.js`（英文，含联盟披露/免责声明）
- **完成**: `app/layout.js` 的 `<head>` 预留 AdSense 脚本占位（注释状态，审核通过后填发布商ID并取消注释）
- **完成**: 首页+详情页 footer 增加 About/Contact/Privacy 导航链接
- **完成**: 创建 `ADSENSE-GUIDE.md` 完整申请指南
- **部署**: `npm run refresh-site` 已触发上线，现有 11 个静态页面
- **待用户操作**: 推广网站 1-2 周积累流量 → 申请 AdSense → 填入发布商ID
- **下一步建议**: 绑定自定义域名（提高 AdSense 通过率）/ 做第2个工具站

### [2026-06-24] Claude（返佣链接上线确认 + 重新部署）
- **确认**: 详情页返佣区块已正确读取 `config/referral.js`（币安/欧易真实码已生效，Bybit 仍占位）
- **完成**: 重新构建 + `npm run refresh-site` 触发 Vercel 部署，返佣链接已上线
- **下一步**: 教用户日常更新空投内容流程 + 准备 AdSense 申请材料

### [2026-06-24] Claude（配置返佣链接 + 部署上线）
- **完成**: 创建 `config/referral.js` 集中管理返佣链接配置
- **完成**: 详情页返佣区块改为读取 config（币安 + 欧易已填入用户真实返佣码）
- **注意**: 用户的返佣链接是镜像域名（bsmkweb.cc / wjgfczxklby.com），可能失效，建议后续换官方标准返佣链接
- **待补**: Bybit 返佣链接还是占位符，等用户注册后填入
- **部署**: GitHub push 因国内网络卡住，改用 `npm run refresh-site`（Vercel Deploy Hook）成功触发部署
- **结果**: 网站已上线 https://airdrop-hunter-sooty.vercel.app/
- **下一步**: 教用户日常更新空投内容流程 + 准备 AdSense 申请材料


### [2026-06-24] Codex（GitHub + Vercel 自动发布打通）
- **修复**: 本地 Git 仓库安全目录与提交问题，完成初始 commit
- **完成**: 推送仓库到 GitHub `fgfdgfd12343/airdrop-hunter`
- **完成**: Vercel 项目连接正确的 GitHub 仓库
- **完成**: 创建 Vercel Deploy Hook `local-refresh`
- **验证**: 手动触发 Deploy Hook 成功，线上自动发布链路已打通
- **结果**: 本机执行 `npm run refresh-site` 后具备“刷新数据 -> 重建 -> 触发 Vercel 发布”的能力
- **补充**: `scripts/run-update.ps1` 已修复为稳定路径版本，并端到端测试通过
- **完成**: 使用 Windows Scheduled Tasks API 创建 `AirdropHunterRefresh`，每天 09:00 自动执行 `run-update.ps1`
- **验证**: 计划任务动作已确认指向 `C:\Users\成1\Documents\airdrop-hunter\scripts\run-update.ps1`

### [2026-06-24] Codex（自动抓新内容）
- **新增**: `data/airdrop-sources.json`，维护官方发现源列表
- **实现**: `scripts/update-airdrops.mjs` 增加官方站点信号抓取、关键词打分、候选项目自动新增/更新
- **新增**: 首页和详情页展示 `latestSignal`
- **验证**: 构建通过，站点新增 `linea` 页面；在可联网环境下脚本能把官方信号写入 `data/airdrops.json`
- **注意**: 当前普通沙箱执行会被网络限制拦住，因此真正抓取新信号要靠计划任务或脱离沙箱运行
- **补充**: `latestSignal` 已增加中文摘要 `summaryZh`，首页和详情页会优先显示可读摘要而不是只显示原始标题

### [2026-06-24] Codex（自动更新链路）
- **实现**: `scripts/update-airdrops.mjs` 增加数据校验、状态归一化、排序、`lastUpdated` 刷新
- **创建**: `scripts/run-update.ps1` 一键执行更新、JSON 校验、构建、可选 Deploy Hook 触发
- **更新**: `package.json` 新增 `npm run refresh-site`
- **更新**: `README.md` 增加本地自动刷新和 Vercel Deploy Hook 说明
- **原因**: 用户网站已上线，下一步需要把内容更新流程固化，减少手动维护
- **状态**: 本地自动更新链路已具备；还需用户在 Vercel 配置 Deploy Hook 才能自动推送上线

### [2026-06-23] Claude（初始化）
- **创建**: AI-HANDOFF.md, CLAUDE.md, AGENTS.md（协作基础设施）
- **原因**: 用户要求建立 Codex-Claude 自动化协作机制
- **状态**: 协作框架就绪，等待后续功能开发

### [之前] Codex（推测）
- **创建**: 完整 Next.js 项目框架
- **功能**: 空投列表、详情页、响应式设计、Tailwind 样式
- **状态**: MVP 完成，可本地运行

---

## 📋 下一步 / 待办事项
### 建议 Codex 处理
- [ ] UI/UX 迭代（筛选器、排序功能、搜索框）
- [ ] 快速批量添加空投项目到 data/airdrops.json
- [ ] 生成 SEO 相关文件（sitemap.xml, robots.txt）

### 建议 Claude 处理
- [ ] 实现自动更新脚本（scripts/update-airdrops.mjs）- 需要爬虫逻辑/API 集成
- [ ] 数据验证和去重逻辑
- [ ] 返佣链接管理系统（如果需要复杂逻辑）
- [ ] 空投计算器工具（如需数学逻辑）

### 通用任务
- [ ] 部署到 Vercel（需用户提供账号或授权）
- [ ] 配置自定义域名
- [ ] 集成 Google AdSense（需用户的 AdSense 账号）
- [ ] 添加交易所返佣链接（需用户的返佣码）

---

## ⚠️ 注意事项 / 别碰区
### 绝对不能动的
- `C:\Users\成1\.codex` - Codex 配置目录
- `node_modules/` - 自动生成，不手动编辑
- `.next/` - Next.js 构建缓存，自动生成

### 修改需谨慎的
- `data/airdrops.json` - 唯一的数据源，改错会导致页面崩溃
  - 必须保持 JSON 格式正确
  - id 必须唯一
  - 必填字段: id, name, status, chain, estimatedValue, difficulty, description, endDate
- `app/layout.js` - 全局布局，改动影响所有页面
- `package.json` - 依赖管理，随意改动可能导致构建失败

### 风格约定
- 组件使用 Tailwind CSS，不写单独的 CSS 文件
- 响应式设计优先（mobile-first）
- 外部链接必须加 `target="_blank" rel="noopener noreferrer"`
- 保持免责声明可见（法律保护）

---

## 💬 协作建议
**Codex 擅长**: UI 快速迭代、批量生成数据、前端组件  
**Claude 擅长**: 爬虫逻辑、数据处理、复杂业务逻辑、API 集成

**分工原则**:
- UI/样式改动 → Codex
- 数据抓取/处理逻辑 → Claude
- 新页面/组件 → 谁先接手谁做，另一方审查
- 改动同一文件前，先读本文档确认是否有冲突
- 完成工作后，在"最近改动记录"添加条目，格式：`[日期] [谁] 做了什么 + 原因`

---

## 📝 变现配置备忘
### Google AdSense（待配置）
- 需要在 `app/layout.js` 的 `<head>` 添加 AdSense 脚本
- 需要用户的 AdSense 发布商 ID

### 返佣链接（待配置）
- Binance: 需要用户的返佣码（格式: `?ref=YOUR_REF_CODE`）
- OKX: 需要用户的邀请链接
- Bybit: 需要用户的邀请链接
- 替换位置: `app/airdrop/[id]/page.js` 中的交易所链接占位符

---

**最后更新**: 2026-06-23 by Claude  
**下次需读取**: 任何 AI 开始新任务时
