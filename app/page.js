'use client';

import Link from 'next/link';
import airdrops from '../data/airdrops.json';
import upcoming from '../data/upcoming-projects.json';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Active Crypto Airdrops",
    "description": "Comprehensive list of active cryptocurrency airdrops with step-by-step guides",
    "numberOfItems": airdrops.length,
    "itemListElement": airdrops.slice(0, 20).map((airdrop, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "name": `${airdrop.name} Airdrop`,
        "url": `https://airdrop-hunter-sooty.vercel.app/airdrop/${airdrop.id}`,
        "description": airdrop.description,
        "datePublished": airdrop.lastUpdated
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      ></script>
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">🎯 Airdrop Hunter</h1>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-yellow-300">首页</Link>
              <Link href="/calendar" className="hover:text-yellow-300">日历</Link>
              <Link href="/blog" className="hover:text-yellow-300">教程</Link>
              <Link href="/tools" className="hover:text-yellow-300">工具</Link>
              <Link href="/exchanges" className="hover:text-yellow-300">交易所</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold mb-4">
            Don't Miss Free Crypto 💰
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Track active airdrops with official links, detailed tutorials, and step-by-step task guides.
            Updated daily by our team.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-yellow-300">{airdrops.length}</div>
            <div className="text-white/70 mt-2">Active Airdrops</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-green-300">$500-2500</div>
            <div className="text-white/70 mt-2">Avg. Estimated Value</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-blue-300">Daily</div>
            <div className="text-white/70 mt-2">Updates</div>
          </div>
        </div>

        {/* Two-Column Layout: Airdrops + Upcoming */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Airdrop List (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold mb-6">🔥 Active Airdrops</h3>
          {airdrops.map((airdrop) => (
            <Link
              key={airdrop.id}
              href={`/airdrop/${airdrop.id}`}
              className="block bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20 hover:border-yellow-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-2xl font-bold">{airdrop.name}</h4>
                    <span className="px-3 py-1 bg-green-500/30 text-green-100 rounded-full text-sm font-semibold">
                      {airdrop.status.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      airdrop.difficulty === 'easy' ? 'bg-blue-500/30 text-blue-100' :
                      airdrop.difficulty === 'medium' ? 'bg-yellow-500/30 text-yellow-100' :
                      'bg-red-500/30 text-red-100'
                    }`}>
                      {airdrop.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white/70 mb-3">{airdrop.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Chain: </span>
                      <span className="font-semibold">{airdrop.chain}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Est. Value: </span>
                      <span className="font-semibold text-yellow-300">{airdrop.estimatedValue}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Ends: </span>
                      <span className="font-semibold">{airdrop.endDate}</span>
                    </div>
                  </div>
                  {airdrop.latestSignal && (
                    <div className="mt-4 rounded-lg bg-yellow-400/10 border border-yellow-300/20 p-3 text-sm">
                      <div className="text-yellow-200 font-semibold mb-1">Latest official signal</div>
                      {airdrop.latestSignal.summaryZh && (
                        <p className="text-white/80 mb-2 leading-6">
                          {airdrop.latestSignal.summaryZh}
                        </p>
                      )}
                      <a
                        href={airdrop.latestSignal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-100 hover:text-yellow-50 underline underline-offset-2"
                      >
                        {airdrop.latestSignal.title}
                      </a>
                    </div>
                  )}
                  <div className="mt-3 flex gap-3">
                    <a
                      href={airdrop.officialSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 text-sm flex items-center gap-1"
                    >
                      🌐 Official Site
                    </a>
                    <a
                      href={airdrop.officialTwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 text-sm flex items-center gap-1"
                    >
                      🐦 Twitter
                    </a>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-300 font-bold text-lg">→</div>
                  <div className="text-white/60 text-sm mt-1">View Guide</div>
                </div>
              </div>
            </Link>
          ))}
          </div>

          {/* RIGHT: Upcoming Projects (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h3 className="text-2xl font-bold mb-6">🚀 即将上线</h3>
              <div className="space-y-4">
                {upcoming.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-xl p-5 border border-purple-300/20 hover:border-purple-300/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold">{project.name}</h4>
                      {project.airdropPotential && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                          project.airdropPotential === '极高' || project.airdropPotential === '高' ? 'bg-green-500/30 text-green-100' :
                          project.airdropPotential === '中' ? 'bg-yellow-500/30 text-yellow-100' :
                          project.airdropPotential === '已空投' ? 'bg-gray-500/30 text-gray-200' :
                          'bg-red-500/30 text-red-100'
                        }`}>
                          空投{project.airdropPotential}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2 text-xs">
                      <span className="px-2 py-0.5 bg-white/10 rounded text-white/80">{project.category}</span>
                      <span className="px-2 py-0.5 bg-blue-500/20 rounded text-blue-100">{project.type}</span>
                    </div>

                    {project.highlight && (
                      <div className="text-yellow-300 text-sm font-semibold mb-2">{project.highlight}</div>
                    )}

                    <p className="text-white/70 text-sm mb-3 leading-relaxed">{project.description}</p>

                    {project.funding && (
                      <div className="text-xs text-white/60 mb-1">
                        💵 融资: <span className="text-green-300 font-semibold">{project.funding}</span>
                      </div>
                    )}
                    {project.exchanges && (
                      <div className="text-xs text-white/60 mb-1">
                        📈 上线: <span className="text-white/90">{project.exchanges.join(', ')}</span>
                      </div>
                    )}
                    {project.launchDate && (
                      <div className="text-xs text-white/60 mb-2">
                        📅 时间: <span className="text-white/90">{project.launchDate}</span>
                      </div>
                    )}

                    {project.preparation && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="text-xs text-white/60 mb-1">提前准备:</div>
                        <ul className="text-xs text-white/80 space-y-1">
                          {project.preparation.slice(0, 3).map((step, i) => (
                            <li key={i} className="flex gap-1">
                              <span className="text-purple-300">·</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-3 flex gap-3 text-xs">
                      <a href={project.officialSite} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200">
                        🌐 官网
                      </a>
                      {project.twitter && (
                        <a href={project.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200">
                          🐦 Twitter
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-white/40 mt-4 leading-relaxed">
                ⚠️ 即将上线项目仅供参考，融资/上所信息需以官方公告为准。空投概率为预测，不构成投资建议。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
            <Link href="/about" className="text-purple-300 hover:text-purple-200 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-purple-300 hover:text-purple-200 transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-purple-300 hover:text-purple-200 transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="text-center text-white/60">
            <p className="mb-2">⚠️ Disclaimer: DYOR (Do Your Own Research). We provide information only, not financial advice.</p>
            <p suppressHydrationWarning>Airdrop Hunter © 2026 | Updated: {new Date().toISOString().slice(0, 10)}</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
