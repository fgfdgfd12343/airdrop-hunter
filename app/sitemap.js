import airdrops from '../data/airdrops.json';
import { blogPosts } from '../data/blog-posts';

export default function sitemap() {
  const baseUrl = 'https://airdrop-hunter-sooty.vercel.app';
  const now = new Date().toISOString();

  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' },
    { route: '/calendar', priority: 0.9, changeFrequency: 'daily' },
    { route: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/tools', priority: 0.7, changeFrequency: 'weekly' },
    { route: '/exchanges', priority: 0.7, changeFrequency: 'weekly' },
    { route: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { route: '/contact', priority: 0.5, changeFrequency: 'monthly' },
    { route: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const airdropRoutes = airdrops.map((airdrop) => ({
    url: `${baseUrl}/airdrop/${airdrop.id}`,
    lastModified: airdrop.lastUpdated || now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...airdropRoutes, ...blogRoutes];
}
