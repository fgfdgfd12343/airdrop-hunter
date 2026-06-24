// 交易所返佣链接配置
// 用户通过这些链接注册，你可以获得返佣

export const REFERRAL_LINKS = {
  binance: {
    url: 'https://www.bsmkweb.cc/register?ref=W63WJOI7',
    name: 'Binance',
    bonus: 'Up to 20% commission rebate'
  },
  okx: {
    url: 'https://www.wjgfczxklby.com/join/3402034',
    name: 'OKX',
    bonus: 'Get trading fee discount'
  },
  bybit: {
    url: 'https://www.bybit.com/invite?ref=YOUR_CODE', // 等你注册后填入
    name: 'Bybit',
    bonus: 'Up to $4000 bonus'
  }
};

// 默认返佣文案
export const REFERRAL_TEXT = {
  title: '🎁 Need an Exchange Account?',
  description: 'Get started with these trusted exchanges (some offer sign-up bonuses):',
  disclaimer: 'These are affiliate links. We may earn a commission at no extra cost to you.'
};
