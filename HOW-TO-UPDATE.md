# 空投内容更新教程

## 方法1：手动添加空投（推荐新手）

### 步骤1：编辑数据文件
用记事本或 VS Code 打开：
```
C:\Users\成1\Documents\airdrop-hunter\data\airdrops.json
```

### 步骤2：复制现有项目，改成新内容
找到任意一个现有空投（比如 LayerZero），复制整个 `{}` 块，粘贴到数组末尾。

### 步骤3：修改关键字段
- `id`: 改成唯一的英文 ID（比如 `scroll-2024`）
- `name`: 项目名称
- `chain`: 所在链
- `description`: 一句话介绍
- `officialSite`: 官网地址
- `officialTwitter`: 官方推特
- `tutorial.steps`: 详细教程步骤
- `requirements`: 参与要求
- `risks`: 风险提示
- `lastUpdated`: 今天的日期（YYYY-MM-DD）

### 步骤4：保存并部署
在 PowerShell 执行：
```powershell
cd "C:\Users\成1\Documents\airdrop-hunter"
npm run refresh-site
```

等 1-2 分钟，网站自动更新。

---

## 方法2：自动更新（高级）

### 每天定时自动更新
Codex 已经设置了 Windows 计划任务，每天早上 9 点自动运行：
- 刷新数据
- 重新构建
- 自动部署到 Vercel

**查看/修改计划任务：**
1. 按 Win+R，输入 `taskschd.msc`
2. 找到 `AirdropHunterRefresh`
3. 可以改时间或手动运行

---

## 方法3：从 Twitter/网站抓取（需开发）

目前 `scripts/update-airdrops.mjs` 是半自动的：
- 它会读取 `data/airdrop-sources.json` 中的信号源
- 尝试抓取官网最新动态
- 自动刷新 `lastUpdated` 字段

**限制：** 目前不会自动添加全新项目，只能更新现有项目的状态。

如果你想完全自动化（AI 每天扫 Twitter 找新空投），需要：
1. Twitter API 账号（付费）
2. 更复杂的爬虫逻辑（Claude 可以帮你写）

---

## 推荐工作流（现阶段）

**每周投入 1-2 小时：**
1. 去 Twitter 搜 "crypto airdrop"、"testnet airdrop"
2. 找到靠谱项目后，手动添加到 `airdrops.json`
3. 运行 `npm run refresh-site` 部署上线
4. 自动更新脚本会每天刷新状态和信号

**目标：** 保持 5-10 个活跃空投，过期的删掉，新的加进来。

---

## 常见问题

### JSON 格式错了怎么办？
运行 `npm run refresh-site` 时会自动检查，有错误会提示。

### 如何删除过期空投？
在 `airdrops.json` 中删除对应的 `{}` 块，记得删完后上一个项目末尾的逗号要留着（最后一个项目不要逗号）。

### 想改网站样式怎么办？
- 简单改动（颜色、文字）：让 Codex 帮你改
- 复杂改动（新页面、新功能）：说明需求，我和 Codex 协作完成

---

**下一步你想做什么？**
1. 我教你添加第一个新空投试试？
2. 直接进入 Google AdSense 申请准备？
3. 先做第2个、第3个网站（工具站/数据站）？
