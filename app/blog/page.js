import Link from 'next/link';
import { blogPosts } from '../../data/blog-posts';

export const metadata = {
  title: 'Crypto Airdrop Guides & Tutorials | Airdrop Hunter',
  description: 'Learn how to safely participate in crypto airdrops, avoid scams, and maximize your rewards with our expert guides.',
};

export default function Blog() {
  const categories = [...new Set(blogPosts.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            📚 Airdrop Guides
          </h1>
          <p className="text-gray-300 mt-2">Learn how to safely earn from crypto airdrops</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-4 py-2 bg-purple-500/30 text-purple-200 rounded-full text-sm font-semibold">
            All Articles
          </span>
          {categories.map(cat => (
            <span key={cat} className="px-4 py-2 bg-white/10 text-gray-300 rounded-full text-sm hover:bg-white/20 transition-all cursor-pointer">
              {cat}
            </span>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-500 transition-all group"
            >
              {/* Category Badge */}
              <div className="p-4 pb-0">
                <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-8 border border-purple-400/50 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Stay Updated</h3>
          <p className="text-gray-300 mb-6">Get the latest airdrop opportunities and guides delivered to your inbox</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-all">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">Coming soon - No spam, unsubscribe anytime</p>
        </div>
      </main>
    </div>
  );
}
