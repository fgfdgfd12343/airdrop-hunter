# Claude 工作指引

## 🔴 最高优先级：自动化协作规则
**在此项目中开始任何工作前，必须先读 [AI-HANDOFF.md](AI-HANDOFF.md)。**  
**完成任何工作后，必须在 [AI-HANDOFF.md](AI-HANDOFF.md) 的"最近改动记录"追加一条记录。**

这是你和 Codex 之间的共享日志，确保两个 AI 不冲突、不重复工作、上下文不丢失。

---

## 项目背景
这是一个加密货币空投聚合网站：
- 用户：有 7 年交易经验，想通过空投信息网站变现（AdSense + 返佣）
- 技术栈：Next.js 15, React 19, Tailwind CSS
- 数据源：data/airdrops.json（手动维护，计划实现自动更新）
- 部署计划：Vercel 免费托管

## 你的角色
- **擅长**: 数据抓取逻辑、API 集成、复杂业务逻辑、数据验证
- **避免**: 不要过度重构 Codex 搭建的 UI 框架（除非明确要求）
- **必须**: 改动 data/airdrops.json 前务必验证 JSON 格式正确

## 关键文件说明
- `app/page.js` - 首页（空投列表）
- `app/airdrop/[id]/page.js` - 空投详情页
- `data/airdrops.json` - **核心数据源**（唯一的真相来源）
- `scripts/update-airdrops.mjs` - 自动更新脚本（空壳，待你实现）
- `app/layout.js` - 全局布局（慎动，影响所有页面）

## 工作流程
1. **开工**: 读 AI-HANDOFF.md，确认没有冲突任务
2. **执行**: 按用户要求完成任务
3. **测试**: 运行 `npm run dev` 验证页面正常显示
4. **收工**: 在 AI-HANDOFF.md 追加一条"[日期] Claude 做了什么 + 原因"

## 技术约定
- 样式: 只用 Tailwind CSS，不写单独 CSS 文件
- 响应式: mobile-first 设计
- 外链: 必须加 `target="_blank" rel="noopener noreferrer"`
- 数据格式: 严格遵守 airdrops.json 的 schema（参考现有条目）
- 命令: Windows PowerShell 环境

## 数据 Schema（data/airdrops.json）
每个空投项目必须包含：
```json
{
  "id": "唯一标识符（kebab-case）",
  "name": "项目名称",
  "token": "代币符号（可选）",
  "chain": "所在区块链",
  "status": "active | ended",
  "estimatedValue": "$100-500（范围）",
  "difficulty": "easy | medium | hard",
  "endDate": "YYYY-MM-DD 或 TBA",
  "officialSite": "https://...",
  "officialTwitter": "https://twitter.com/...",
  "description": "一句话简介",
  "requirements": ["要求数组"],
  "tutorial": {
    "steps": [
      {
        "title": "步骤标题",
        "description": "详细说明",
        "links": [{"text": "链接文字", "url": "https://..."}],
        "estimatedCost": "成本说明（可选）",
        "tips": "小贴士（可选）"
      }
    ]
  },
  "risks": ["风险数组"],
  "lastUpdated": "YYYY-MM-DD"
}
```

## 用户偏好（从项目需求推测）
- 变现优先（需要流量 → SEO 重要）
- 内容准确性（不推荐诈骗项目 → 数据验证重要）
- 自述"电脑小白"（命令行操作需要详细说明）

## 待实现功能优先级
1. **高优先级**: 自动更新脚本（scripts/update-airdrops.mjs）- 用户不想手动维护
2. **中优先级**: SEO 优化（sitemap, robots.txt, meta 标签）
3. **低优先级**: 筛选/排序 UI（Codex 更擅长，除非用户指定你做）

---

**记住**: 每次开工读 AI-HANDOFF.md，每次收工更新它。这是自动化的关键。
