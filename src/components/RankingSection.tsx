/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trophy, Star, Users, Store, ArrowRight, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Seller } from '../types';

interface RankingSectionProps {
  collectors: User[];
  sellers: Seller[];
  onCollectorClick: (user: User) => void;
  onSellerClick: (seller: Seller) => void;
}

export default function RankingSection({ collectors, sellers, onCollectorClick, onSellerClick }: RankingSectionProps) {
  const [activeTab, setActiveTab] = useState<'collectors' | 'sellers'>('collectors');

  const sortedCollectors = [...collectors].sort((a, b) => (b.xp || 0) - (a.xp || 0));
  const sortedSellers = [...sellers].sort((a, b) => b.rating - a.rating);

  return (
    <section className="mb-10 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-lg">
            <Trophy size={16} />
          </div>
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Global Rankings</h2>
        </div>
        <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <button 
            onClick={() => setActiveTab('collectors')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'collectors' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm' : 'text-zinc-400'}`}
          >
            Collectors
          </button>
          <button 
            onClick={() => setActiveTab('sellers')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'sellers' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm' : 'text-zinc-400'}`}
          >
            Sellers
          </button>
        </div>
      </div>

      <div className="p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            {activeTab === 'collectors' ? (
              sortedCollectors.slice(0, 3).map((user, index) => (
                <div 
                  key={user.id}
                  onClick={() => onCollectorClick(user)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors group"
                >
                  <div className="w-6 text-center font-black text-zinc-300 dark:text-zinc-700 italic text-xl">
                    #{index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-100 dark:border-zinc-800">
                    <img 
                      src={user.avatar || null} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 font-headline truncate">@{user.username}</p>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider truncate">{user.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-zinc-900 dark:text-zinc-50 font-black">
                      <TrendingUp size={12} className="text-emerald-500" />
                      <span>{user.xp?.toLocaleString()}</span>
                    </div>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">TOTAL XP</p>
                  </div>
                </div>
              ))
            ) : (
              sortedSellers.slice(0, 3).map((seller, index) => (
                <div 
                  key={seller.id}
                  onClick={() => onSellerClick(seller)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors group"
                >
                  <div className="w-6 text-center font-black text-zinc-300 dark:text-zinc-700 italic text-xl">
                    #{index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img 
                      src={seller.avatar || null} 
                      alt={seller.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 font-headline truncate">{seller.name}</p>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider truncate">{seller.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-amber-500 font-black">
                      <Star size={12} fill="currentColor" />
                      <span>{seller.rating}</span>
                    </div>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">{seller.reviewCount} REVIEWS</p>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-5 py-3 bg-zinc-50/50 dark:bg-zinc-800/20 flex justify-center border-t border-zinc-100 dark:border-zinc-800">
        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
          View Full Leaderboards
          <ArrowRight size={12} />
        </button>
      </div>
    </section>
  );
}
