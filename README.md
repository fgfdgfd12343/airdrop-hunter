# Airdrop Hunter 🎯

一个自动化的加密货币空投聚合网站，提供详细教程、官方链接和任务说明。

## ✨ 功能特点

- 📋 空投项目列表（含状态、难度、预估价值）
- 🔗 官方网站和社交媒体链接
- 📖 详细的分步教程
- ✅ 任务清单和要求说明
- ⚠️ 风险提示
- 🔄 支持自动更新（需配置）

## 🚀 快速开始

### 1. 安装依赖

在项目目录打开终端，运行：

```powershell
npm install
```

### 2. 本地预览

```powershell
npm run dev
```

然后在浏览器打开 http://localhost:3000

### 3. 构建静态网站

```powershell
npm run build
```

构建完成后，`out` 文件夹就是完整的静态网站。

## 📦 部署到 Vercel（免费托管）

### 方法1：网页拖拽上传（最简单，推荐）

1. 访问 https://vercel.com 注册账号
2. 点击 "Add New" → "Project"
3. 选择 "Import Git Repository" 或直接上传 `out` 文件夹
4. Vercel 会自动识别 Next.js 项目并部署
5. 几分钟后得到一个 `.vercel.app` 域名

### 方法2：使用 Vercel CLI

```powershell
npm install -g vercel
vercel login
vercel
```

按提示操作即可。

## 🔧 如何添加新的空投项目

编辑 `data/airdrops.json`，添加新项目：

```json
{
  "id": "项目唯一ID",
  "name": "项目名称",
  "token": "代币符号",
  "chain": "所在链",
  "status": "active",
  "estimatedValue": "$100-500",
  "difficulty": "easy",
  "endDate": "2026-12-31",
  "officialSite": "https://...",
  "officialTwitter": "https://twitter.com/...",
  "description": "项目简介",
  "requirements": [
    "要求1",
    "要求2"
  ],
  "tutorial": {
    "steps": [
      {
        "title": "步骤标题",
        "description": "详细说明",
        "links": [
          {"text": "链接文字", "url": "https://..."}
        ],
        "estimatedCost": "成本说明",
        "tips": "小贴士"
      }
    ]
  },
  "risks": [
    "风险1",
    "风险2"
  ],
  "lastUpdated": "2026-06-21"
}
```

然后重新构建：`npm run build`

## 🤖 自动更新（可选）

运行更新脚本：

```powershell
npm run update-airdrops
```

你可以在 `scripts/update-airdrops.mjs` 中添加自己的数据抓取逻辑。

### 一键刷新站点

```powershell
npm run refresh-site
```

这个命令会自动完成：

1. 刷新并校验 `data/airdrops.json`
2. 自动更新每条空投的 `lastUpdated`
3. 重新执行 `npm run build`
4. 如果已设置 `VERCEL_DEPLOY_HOOK_URL`，自动通知 Vercel 重新发布

### 配置 Vercel Deploy Hook

如果你想让本地更新后自动同步到线上：

1. 打开 Vercel 项目
2. 进入 `Settings` -> `Deploy Hooks`
3. 新建一个 Hook 并复制 URL
4. 在 PowerShell 中设置：

```powershell
$env:VERCEL_DEPLOY_HOOK_URL = "https://api.vercel.com/v1/integrations/deploy/..."
npm run refresh-site
```

### 设置定时任务（Windows）

使用任务计划程序，让脚本每天自动运行：

1. 打开"任务计划程序"
2. 创建基本任务
3. 触发器：每天
4. 操作：启动程序
   - 程序：`powershell.exe`
   - 参数：`-ExecutionPolicy Bypass -File "C:\Users\成1\Documents\airdrop-hunter\scripts\run-update.ps1"`

## 💰 变现设置

### 1. Google AdSense

- 在 `app/layout.js` 的 `<head>` 中添加 AdSense 代码
- 在想要显示广告的位置插入广告单元

### 2. 交易所返佣链接

在 `app/airdrop/[id]/page.js` 中找到这部分：

```javascript
<a href="https://www.binance.com" ...>
```

替换为你的返佣链接：

```javascript
<a href="https://www.binance.com/register?ref=YOUR_REF_CODE" ...>
```

主流交易所返佣计划：
- Binance: https://www.binance.com/en/activity/referral
- OKX: https://www.okx.com/join
- Bybit: https://www.bybit.com/invite

## 📁 项目结构

```
airdrop-hunter/
├── app/
│   ├── airdrop/
│   │   └── [id]/
│   │       └── page.js      # 空投详情页
│   ├── layout.js            # 全局布局
│   ├── page.js              # 首页
│   └── globals.css          # 样式
├── data/
│   └── airdrops.json        # 空投数据库
├── scripts/
│   └── update-airdrops.mjs  # 更新脚本
└── package.json
```

## 🌐 域名绑定

在 Vercel 项目设置中：

1. 点击 "Domains"
2. 添加你购买的域名（推荐：airdrophunter.pro）
3. 按提示配置 DNS 记录
4. 等待生效（几分钟到几小时）

## ⚠️ 注意事项

1. **定期审核内容**：确保不推荐诈骗项目
2. **添加免责声明**：已经内置在页面中
3. **保持更新**：过期的空投及时移除
4. **优化 SEO**：在 `layout.js` 中调整 meta 标签

## 📧 需要帮助？

如果遇到问题，检查：
- Node.js 版本是否 >= 18
- 是否在正确的目录运行命令
- `package.json` 是否完整

## 📈 下一步优化方向

- 添加筛选和排序功能
- 集成 Twitter API 自动抓取空投信息
- 添加用户评论/反馈系统
- 制作空投计算器工具
- SEO 优化（生成 sitemap, robots.txt）

---

**祝你撸空投顺利！🚀💰**
