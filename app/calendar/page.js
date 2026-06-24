'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import airdrops from '../../data/airdrops.json';

export default function Calendar() {
  const [filter, setFilter] = useState('all');

  // 按截止日期排序
  const sortedAirdrops = useMemo(() => {
    const active = airdrops.filter(a => a.status === 'active');

    return active.sort((a, b) => {
      if (a.endDate === 'TBA') return 1;
      if (b.endDate === 'TBA') return -1;
      return new Date(a.endDate) - new Date(b.endDate);
    });
  }, []);

  // 计算剩余天数
  const getDaysLeft = (endDate) => {
    if (endDate === 'TBA') return 'TBA';
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Ended';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day';
    return `${diffDays} days`;
  };

  // 获取紧急程度颜色
  const getUrgencyColor = (endDate) => {
    const days = getDaysLeft(endDate);
    if (days === 'TBA') return 'text-gray-400';
    if (days === 'Ended') return 'text-gray-500';

    const daysNum = parseInt(days);
    if (daysNum <= 7) return 'text-red-400';
    if (daysNum <= 30) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            📅 Airdrop Calendar
          </h1>
          <p className="text-gray-300 mt-2">Active airdrops sorted by deadline</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
            <div className="text-3xl font-bold text-red-400">
              {sortedAirdrops.filter(a => {
                const days = getDaysLeft(a.endDate);
                return days !== 'TBA' && parseInt(days) <= 7;
              }).length}
            </div>
            <div className="text-gray-400 mt-1">Ending in 7 days</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400">
              {sortedAirdrops.filter(a => {
                const days = getDaysLeft(a.endDate);
                return days !== 'TBA' && parseInt(days) > 7 && parseInt(days) <= 30;
              }).length}
            </div>
            <div className="text-gray-400 mt-1">Ending in 30 days</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400">
              {sortedAirdrops.filter(a => a.endDate === 'TBA').length}
            </div>
            <div className="text-gray-400 mt-1">No deadline yet</div>
          </div>
        </div>

        {/* Calendar List */}
        <div className="space-y-4">
          {sortedAirdrops.map(airdrop => {
            const daysLeft = getDaysLeft(airdrop.endDate);
            const urgencyColor = getUrgencyColor(airdrop.endDate);

            return (
              <Link
                key={airdrop.id}
                href={`/airdrop/${airdrop.id}`}
                className="block bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-500 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-2xl font-bold text-white">{airdrop.name}</h3>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        airdrop.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                        airdrop.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {airdrop.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{airdrop.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-400">Chain: <span className="text-white">{airdrop.chain}</span></span>
                      <span className="text-gray-400">Value: <span className="text-green-400">{airdrop.estimatedValue}</span></span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-4xl font-bold ${urgencyColor}`}>
                      {daysLeft}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {airdrop.endDate === 'TBA' ? 'No deadline' : `Until ${airdrop.endDate}`}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-purple-500/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">
          <p>⚠️ Deadlines are estimates. Always check official sources.</p>
          <p className="mt-2 text-sm">Updated daily</p>
        </div>
      </footer>
    </div>
  );
}
