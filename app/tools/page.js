'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Tools() {
  const [gasPrice, setGasPrice] = useState(30);
  const [gasLimit, setGasLimit] = useState(21000);
  const [ethPrice, setEthPrice] = useState(3000);

  const calculateCost = () => {
    const gasCostEth = (gasPrice * gasLimit) / 1e9;
    const gasCostUsd = gasCostEth * ethPrice;
    return { eth: gasCostEth.toFixed(6), usd: gasCostUsd.toFixed(2) };
  };

  const cost = calculateCost();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            🔧 Crypto Tools
          </h1>
          <p className="text-gray-300 mt-2">Free calculators and utilities</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gas Fee Calculator */}
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              ⛽ Gas Fee Calculator
            </h2>

            <div className="space-y-6">
              {/* Gas Price */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Gas Price (Gwei)
                </label>
                <input
                  type="number"
                  value={gasPrice}
                  onChange={(e) => setGasPrice(Number(e.target.value))}
                  className="w-full bg-white/10 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  min="1"
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={() => setGasPrice(10)} className="px-3 py-1 bg-green-500/20 text-green-300 rounded text-sm hover:bg-green-500/30">Low (10)</button>
                  <button onClick={() => setGasPrice(30)} className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded text-sm hover:bg-yellow-500/30">Average (30)</button>
                  <button onClick={() => setGasPrice(60)} className="px-3 py-1 bg-red-500/20 text-red-300 rounded text-sm hover:bg-red-500/30">High (60)</button>
                </div>
              </div>

              {/* Gas Limit */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Gas Limit
                </label>
                <input
                  type="number"
                  value={gasLimit}
                  onChange={(e) => setGasLimit(Number(e.target.value))}
                  className="w-full bg-white/10 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  min="21000"
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={() => setGasLimit(21000)} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm hover:bg-purple-500/30">Transfer (21k)</button>
                  <button onClick={() => setGasLimit(65000)} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm hover:bg-purple-500/30">Token (65k)</button>
                  <button onClick={() => setGasLimit(150000)} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm hover:bg-purple-500/30">Swap (150k)</button>
                </div>
              </div>

              {/* ETH Price */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  ETH Price (USD)
                </label>
                <input
                  type="number"
                  value={ethPrice}
                  onChange={(e) => setEthPrice(Number(e.target.value))}
                  className="w-full bg-white/10 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  min="1"
                />
              </div>

              {/* Result */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/50">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">Transaction Cost</div>
                  <div className="text-4xl font-bold text-white mb-2">
                    ${cost.usd}
                  </div>
                  <div className="text-lg text-purple-300">
                    {cost.eth} ETH
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Airdrop Value Calculator */}
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              💰 Airdrop ROI Calculator
            </h2>

            <div className="space-y-6">
              {/* Investment */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Total Investment (USD)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 500"
                  className="w-full bg-white/10 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Expected Airdrop */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Expected Airdrop Value (USD)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2000"
                  className="w-full bg-white/10 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Time */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Time Investment (months)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 3"
                  className="w-full bg-white/10 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all">
                Calculate ROI
              </button>

              <div className="text-center text-gray-400 text-sm mt-4">
                💡 Coming soon: Full ROI calculator with risk assessment
              </div>
            </div>
          </div>
        </div>

        {/* More Tools Coming Soon */}
        <div className="mt-12 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">More Tools Coming Soon</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-sm">APY Calculator</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-3xl mb-2">💸</div>
              <div className="text-sm">Impermanent Loss</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-3xl mb-2">⚖️</div>
              <div className="text-sm">Portfolio Tracker</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm">Risk Analyzer</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
