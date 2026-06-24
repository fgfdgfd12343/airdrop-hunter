import Link from 'next/link';
import { REFERRAL_LINKS } from '../../config/referral';

const exchanges = [
  {
    key: 'binance',
    name: 'Binance',
    logo: '🟡',
    rating: 4.8,
    founded: 2017,
    tradingFee: '0.1%',
    coins: '350+',
    pros: ['Largest exchange by volume', 'Most trading pairs', 'High liquidity', 'Advanced trading tools'],
    cons: ['Complex for beginners', 'Restricted in some regions'],
    bestFor: 'Active traders & altcoin variety',
    bonus: 'Up to 20% commission rebate',
    color: 'yellow',
  },
  {
    key: 'okx',
    name: 'OKX',
    logo: '⚫',
    rating: 4.6,
    founded: 2017,
    tradingFee: '0.08%',
    coins: '300+',
    pros: ['Low trading fees', 'Strong Web3 wallet', 'Good for derivatives', 'DeFi integration'],
    cons: ['Smaller than Binance', 'Customer support delays'],
    bestFor: 'Web3 & DeFi users',
    bonus: 'Trading fee discount',
    color: 'gray',
  },
  {
    key: 'bybit',
    name: 'Bybit',
    logo: '🟠',
    rating: 4.5,
    founded: 2018,
    tradingFee: '0.1%',
    coins: '300+',
    pros: ['Great for derivatives', 'User-friendly interface', 'Fast execution', 'Generous bonuses'],
    cons: ['Spot market smaller', 'Newer than competitors'],
    bestFor: 'Derivatives & beginners',
    bonus: 'Up to $4000 bonus',
    color: 'orange',
  },
];

export const metadata = {
  title: 'Best Crypto Exchanges 2026 - Compare & Reviews | Airdrop Hunter',
  description: 'Compare top cryptocurrency exchanges: Binance, OKX, Bybit. Trading fees, features, pros & cons. Find the best exchange for crypto airdrops.',
};

export default function Exchanges() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            💰 Best Crypto Exchanges 2026
          </h1>
          <p className="text-gray-300 mt-2">Compare top exchanges for trading and airdrops</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {exchanges.map((ex) => (
            <div key={ex.key} className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-500 transition-all">
              {/* Header */}
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{ex.logo}</span>
                    <h2 className="text-2xl font-bold text-white">{ex.name}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">★ {ex.rating}</div>
                  </div>
                </div>
                <div className="bg-green-500/20 border border-green-400/40 rounded-lg p-2 text-center">
                  <span className="text-green-300 text-sm font-semibold">🎁 {ex.bonus}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-gray-400 text-xs">Trading Fee</div>
                    <div className="text-white font-bold">{ex.tradingFee}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Coins</div>
                    <div className="text-white font-bold">{ex.coins}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Founded</div>
                    <div className="text-white font-bold">{ex.founded}</div>
                  </div>
                </div>

                {/* Best For */}
                <div className="bg-purple-500/20 rounded-lg p-3 text-center">
                  <div className="text-gray-400 text-xs">Best For</div>
                  <div className="text-purple-300 font-semibold">{ex.bestFor}</div>
                </div>

                {/* Pros */}
                <div>
                  <div className="text-green-400 font-semibold mb-2">✓ Pros</div>
                  <ul className="space-y-1">
                    {ex.pros.map((pro, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-green-400">+</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <div className="text-red-400 font-semibold mb-2">✗ Cons</div>
                  <ul className="space-y-1">
                    {ex.cons.map((con, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-red-400">-</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <a
                  href={REFERRAL_LINKS[ex.key].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center font-bold py-3 rounded-lg hover:opacity-90 transition-all"
                >
                  Sign Up & Get Bonus
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 overflow-x-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Comparison</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-purple-500/30">
                <th className="py-3 text-gray-400">Feature</th>
                {exchanges.map(ex => (
                  <th key={ex.key} className="py-3 text-white text-center">{ex.logo} {ex.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-purple-500/10">
                <td className="py-3 font-semibold">Rating</td>
                {exchanges.map(ex => <td key={ex.key} className="py-3 text-center text-yellow-400">★ {ex.rating}</td>)}
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="py-3 font-semibold">Trading Fee</td>
                {exchanges.map(ex => <td key={ex.key} className="py-3 text-center">{ex.tradingFee}</td>)}
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="py-3 font-semibold">Coins Listed</td>
                {exchanges.map(ex => <td key={ex.key} className="py-3 text-center">{ex.coins}</td>)}
              </tr>
              <tr>
                <td className="py-3 font-semibold">Best For</td>
                {exchanges.map(ex => <td key={ex.key} className="py-3 text-center text-sm">{ex.bestFor}</td>)}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 text-center text-sm text-gray-300">
          <p>⚠️ Affiliate Disclosure: We may earn a commission when you sign up through our links, at no extra cost to you. Ratings are based on our research and may not reflect your experience. DYOR.</p>
        </div>
      </main>
    </div>
  );
}
