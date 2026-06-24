import Link from 'next/link';
import { blogPosts } from '../../../data/blog-posts';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  return {
    title: `${post.title} | Airdrop Hunter`,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/blog" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Guides
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Meta */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>📅 {post.date}</span>
            <span>⏱️ {post.readTime} read</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 space-y-8">
          {post.content.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
              <p className="text-gray-300 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-8 border border-purple-400/50 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Ready to Start?</h3>
          <p className="text-gray-300 mb-6">Check out our active airdrop opportunities with step-by-step guides</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-all"
          >
            View Active Airdrops
          </Link>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Related Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogPosts.filter(p => p.slug !== params.slug).slice(0, 2).map(relatedPost => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-500 transition-all"
              >
                <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold mb-3">
                  {relatedPost.category}
                </span>
                <h4 className="text-lg font-bold text-white mb-2">{relatedPost.title}</h4>
                <p className="text-gray-400 text-sm">{relatedPost.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
