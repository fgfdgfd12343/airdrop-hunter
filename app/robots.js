export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://airdrop-hunter-sooty.vercel.app/sitemap.xml',
  };
}
