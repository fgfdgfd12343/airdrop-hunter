// 可信的空投信息聚合源
// 这些网站本身会追踪新项目，我们从它们抓取项目列表，然后去官网验证

export const TRUSTED_AGGREGATORS = [
  {
    name: 'DeFiLlama Airdrops',
    url: 'https://defillama.com/airdrops',
    enabled: true,
    // 抓取逻辑会提取链接并验证
  },
  {
    name: 'Airdrops.io',
    url: 'https://airdrops.io',
    enabled: true,
  },
  {
    name: 'CoinMarketCap Airdrops',
    url: 'https://coinmarketcap.com/airdrop/',
    enabled: true,
  },
];

// 用于验证项目官网是否安全可靠的规则
export const SAFETY_CHECKS = {
  // 必须是 HTTPS
  requireHttps: true,

  // 域名黑名单（已知诈骗域名）
  blockedDomains: [
    'bit.ly',
    't.co',
    'tinyurl.com',
    // 短链容易被滥用，直接过滤
  ],

  // 可信TLD（顶级域名）白名单
  trustedTLDs: [
    '.io',
    '.com',
    '.org',
    '.network',
    '.finance',
    '.app',
    '.xyz',
    '.build',
  ],

  // 必须有的页面（至少有一个）
  requiredPages: [
    '/blog',
    '/docs',
    '/about',
    '/team',
  ],

  // 社交媒体验证
  requireTwitter: true,
};

// 项目评分权重
export const SCORING_WEIGHTS = {
  hasVerifiedTwitter: 20,
  hasGithub: 15,
  hasDocumentation: 10,
  hasBlog: 10,
  websiteAge: 15, // 新站减分
  communitySize: 20, // Twitter粉丝数
  officialAnnouncement: 10,
};
