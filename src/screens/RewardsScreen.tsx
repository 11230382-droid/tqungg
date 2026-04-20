/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, TrendingUp, Verified, Lock, Scan, History } from 'lucide-react';
import { badges, challenges } from '../mockData';
import { motion } from 'motion/react';

export default function RewardsScreen() {
  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto space-y-10">
      {/* Hero Streak Section */}
      <section className="relative bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl p-8 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="font-headline text-zinc-400 dark:text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-2">Current Momentum</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-black font-headline tracking-tighter">12</span>
              <span className="text-2xl font-bold font-headline text-zinc-400 dark:text-zinc-500">DAY STREAK</span>
            </div>
            <p className="text-zinc-400 dark:text-zinc-500 mt-4 max-w-xs font-medium text-sm">
              You're in the top 5% of collectors this month. Keep the momentum to unlock the Platinum Archive badge.
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-md bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-white">
                  <CheckCircle2 size={16} fill="currentColor" fillOpacity={0.2} />
                </div>
              ))}
              <div className="w-8 h-8 rounded-md bg-zinc-700 dark:bg-zinc-300 flex items-center justify-center text-white dark:text-zinc-900">
                <span className="text-[10px] font-bold">FRI</span>
              </div>
              <div className="w-8 h-8 rounded-md bg-zinc-800 dark:bg-zinc-200 flex items-center justify-center text-zinc-500">
                <span className="text-[10px] font-bold">SAT</span>
              </div>
              <div className="w-8 h-8 rounded-md bg-zinc-800 dark:bg-zinc-200 flex items-center justify-center text-zinc-500">
                <span className="text-[10px] font-bold">SUN</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-zinc-800/50 dark:bg-zinc-200/50 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline font-bold text-zinc-900 dark:text-zinc-50">XP Milestone</h3>
                <p className="text-zinc-500 text-sm">Level 24 Archivist</p>
              </div>
              <div className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-3 py-1 rounded-full text-[10px] font-bold">8,450 XP</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <span>Progress to Level 25</span>
                <span>82%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '82%' }}
                  className="bg-zinc-900 dark:bg-zinc-50 h-full" 
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <TrendingUp size={18} className="text-zinc-900 dark:text-zinc-50" />
            <span>+450 XP earned today from 3 validations</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <h3 className="font-headline font-bold text-zinc-900 dark:text-zinc-50 mb-1">Growth</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-6">Last 30 Days</p>
          <div className="flex items-end justify-between h-24 gap-1">
            {[0.4, 0.6, 0.3, 0.9, 0.5, 0.7, 1.0].map((h, i) => (
              <div 
                key={i} 
                className={`w-full rounded-t-sm ${i === 3 || i === 6 ? 'bg-zinc-900 dark:bg-zinc-50' : 'bg-zinc-100 dark:bg-zinc-800'}`}
                style={{ height: `${h * 100}%` }}
              ></div>
            ))}
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black font-headline text-zinc-900 dark:text-zinc-50">+142</div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">New Assets Added</div>
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-50">Unlocked Badges</h2>
          <button className="text-[10px] font-bold text-zinc-400 uppercase hover:text-zinc-900 transition-colors">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`flex-shrink-0 w-32 h-40 rounded-xl flex flex-col items-center justify-center p-4 text-center group transition-all border ${
                badge.isUnlocked 
                  ? 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-zinc-900' 
                  : 'bg-zinc-50 dark:bg-zinc-950 border-dashed border-zinc-200 dark:border-zinc-800 opacity-40'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                badge.isUnlocked ? `bg-${badge.color}-50 dark:bg-${badge.color}-900/20` : 'bg-zinc-200 dark:bg-zinc-800'
              }`}>
                {badge.isUnlocked ? (
                   <Verified size={32} className={`text-${badge.color}-500`} fill="currentColor" fillOpacity={0.2} />
                ) : (
                   <Lock size={32} className="text-zinc-400" />
                )}
              </div>
              <span className={`text-[11px] font-bold font-headline leading-tight ${
                badge.isUnlocked ? 'text-zinc-900 dark:text-zinc-50' : 'text-zinc-400'
              }`}>{badge.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Challenges Section */}
      <section className="space-y-4">
        <h2 className="font-headline font-black text-xl tracking-tight text-zinc-900 dark:text-zinc-50">Active Challenges</h2>
        <div className="space-y-3">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4 group">
              <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-950 rounded-lg flex items-center justify-center group-hover:bg-zinc-900 dark:group-hover:bg-zinc-50 group-hover:text-white dark:group-hover:text-zinc-900 transition-colors">
                {challenge.icon === 'image_search' ? <Scan size={22} /> : <History size={22} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">{challenge.title}</h4>
                  <span className="text-[10px] font-black bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded uppercase tracking-widest">{challenge.xp}</span>
                </div>
                <p className="text-xs text-zinc-500 mb-2 truncate max-w-[200px]">{challenge.description}</p>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-zinc-900 dark:bg-zinc-50 h-full" style={{ width: `${challenge.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
