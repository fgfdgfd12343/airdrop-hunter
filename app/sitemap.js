export default function sitemap() {
  const baseUrl = 'https://airdrop-hunter-sooty.vercel.app';

  // 静态页面
  const routes = ['', '/about', '/contact', '/privacy'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 动态空投详情页
  const airdrops = ['layerzero-zro', 'zksync-era', 'starknet-strk', 'linea'];
  const airdropRoutes = airdrops.map((id) => ({
    url: `${baseUrl}/airdrop/${id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...routes, ...airdropRoutes];
}
