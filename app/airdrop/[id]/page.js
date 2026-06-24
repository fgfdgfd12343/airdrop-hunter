import Link from 'next/link';
import airdrops from '../../../data/airdrops.json';
import { REFERRAL_LINKS, REFERRAL_TEXT } from '../../../config/referral';

export function generateStaticParams() {
  return airdrops.map((airdrop) => ({
    id: airdrop.id,
  }));
}

export default function AirdropDetail({ params }) {
  const airdrop = airdrops.find((a) => a.id === params.id);

  if (!airdrop) {
    return <div>Airdrop not found</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-yellow-300 hover:text-yellow-200 flex items-center gap-2">
            ← Back to all airdrops
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-5xl font-extrabold">{airdrop.name}</h1>
            <span className="px-4 py-2 bg-green-500/30 text-green-100 rounded-full text-sm font-bold">
              {airdrop.status.toUpperCase()}
            </span>
          </div>
          <p className="text-xl text-white/80 mb-6">{airdrop.description}</p>

          {/* Key Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/60 text-sm">Chain</div>
              <div className="text-lg font-bold">{airdrop.chain}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/60 text-sm">Est. Value</div>
              <div className="text-lg font-bold text-yellow-300">{airdrop.estimatedValue}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/60 text-sm">Difficulty</div>
              <div className="text-lg font-bold capitalize">{airdrop.difficulty}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/60 text-sm">End Date</div>
              <div className="text-lg font-bold">{airdrop.endDate}</div>
            </div>
          </div>

          {/* Official Links */}
          <div className="bg-blue-500/20 border border-blue-400/50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              🔗 Official Links
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href={airdrop.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                🌐 Official Website
              </a>
              <a
                href={airdrop.officialTwitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                🐦 Official Twitter
              </a>
            </div>
            <p className="text-sm text-white/70 mt-3">
              ⚠️ Always verify you're on the official site. Never share your private keys.
            </p>
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            ✅ Requirements Checklist
          </h2>
          <ul className="space-y-3">
            {airdrop.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-lg">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step-by-Step Tutorial */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            📖 Step-by-Step Tutorial
          </h2>
          <div className="space-y-8">
            {airdrop.tutorial.steps.map((step, index) => (
              <div key={index} className="border-l-4 border-yellow-400 pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-bold text-yellow-300">
                    {index + 1}
                  </span>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                </div>
                <p className="text-white/80 mb-4 text-lg">{step.description}</p>

                {step.links && step.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {step.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-lg text-sm font-semibold transition-all"
                      >
                        🔗 {link.text}
                      </a>
                    ))}
                  </div>
                )}

                {step.estimatedCost && (
                  <div className="text-yellow-200 text-sm mb-2">
                    💰 Cost: {step.estimatedCost}
                  </div>
                )}

                {step.tips && (
                  <div className="bg-green-500/20 rounded-lg p-3 text-sm">
                    💡 <strong>Tip:</strong> {step.tips}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            ⚠️ Risks & Warnings
          </h2>
          <ul className="space-y-3">
            {airdrop.risks.map((risk, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-400 text-xl">⚠</span>
                <span className="text-lg">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Affiliate/Referral Box */}
        <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl p-8 border border-purple-400/50 text-center">
          <h3 className="text-2xl font-bold mb-3">{REFERRAL_TEXT.title}</h3>
          <p className="text-white/80 mb-4">
            {REFERRAL_TEXT.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={REFERRAL_LINKS.binance.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all"
            >
              {REFERRAL_LINKS.binance.name}
            </a>
            <a
              href={REFERRAL_LINKS.okx.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-bold rounded-lg transition-all"
            >
              {REFERRAL_LINKS.okx.name}
            </a>
            <a
              href={REFERRAL_LINKS.bybit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-lg transition-all"
            >
              {REFERRAL_LINKS.bybit.name}
            </a>
          </div>
          <p className="text-xs text-white/60 mt-4">
            {REFERRAL_TEXT.disclaimer}
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8 text-white/60 text-sm">
          Last updated: {airdrop.lastUpdated}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-white/60">
          <p className="mb-2">⚠️ Disclaimer: DYOR (Do Your Own Research). Crypto investments carry risk.</p>
          <p>Airdrop Hunter © 2026</p>
        </div>
      </footer>
    </div>
  );
}
