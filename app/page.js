'use client';

import Link from 'next/link';
import airdrops from '../data/airdrops.json';

export default function Home() {
  return (
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

        {/* Airdrop List */}
        <div className="space-y-6">
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
            <p>Airdrop Hunter © 2026 | Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
