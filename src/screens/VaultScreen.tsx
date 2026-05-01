/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Monitor, Verified, Palette, Factory, Landmark, History, TrendingUp } from 'lucide-react';
import { scanningAsset } from '../mockData';
import { motion } from 'motion/react';

export default function VaultScreen() {
  return (
    <div className="pt-16 pb-24 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Viewfinder Section */}
      <section className="relative h-[397px] overflow-hidden bg-black flex items-center justify-center">
        <img 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-lighten" 
          src={scanningAsset.image} 
          alt="Scanning"
          referrerPolicy="no-referrer"
        />
        
        {/* Scanning Overlay UI */}
        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
              <p className="font-headline text-[10px] uppercase tracking-widest text-white/70">Scanning...</p>
              <p className="font-headline font-bold text-white text-lg">{scanningAsset.matchPercentage}% Match</p>
            </div>
            <div className="text-white text-3xl">
              <Monitor size={32} />
            </div>
          </div>
          
          <div className="relative w-full max-w-xs mx-auto aspect-square">
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white/80"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white/80"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-white/80"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-white/40 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="bg-black/60 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10 self-center max-w-[80%]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)] shrink-0"></span>
              <p className="font-headline font-bold text-white tracking-tight uppercase text-[9px] truncate">Target Locked: {scanningAsset.name.toUpperCase()}</p>
            </div>
          </div>
        </div>
        
        {/* Animated Scan Line */}
        <motion.div 
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent z-20"
        />
      </section>

      {/* Result Content */}
      <section className="px-4 -mt-8 relative z-20 max-w-md mx-auto">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-6 border border-zinc-100 dark:border-zinc-800"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Verified size={14} className="text-zinc-900 dark:text-zinc-50" fill="currentColor" fillOpacity={0.2} />
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-900 dark:text-zinc-50">Verified Match</span>
              </div>
              <h2 className="font-headline text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight break-words line-clamp-2">{scanningAsset.name}</h2>
              <p className="text-zinc-500 text-sm font-medium truncate">{scanningAsset.series}</p>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full shrink-0">
              <span className="font-headline font-black text-zinc-900 dark:text-zinc-50 text-[10px]">TIER 1</span>
            </div>
          </div>

          {/* Bento Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl min-w-0 overflow-hidden">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 truncate">Market Value</p>
              <div className="flex items-baseline gap-1 overflow-hidden">
                <span className="text-xl md:text-2xl font-black font-headline text-zinc-900 dark:text-zinc-50 truncate">{scanningAsset.price}</span>
                <TrendingUp size={14} className="text-green-600 shrink-0" />
              </div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl min-w-0 overflow-hidden">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 truncate">Scarcity</p>
              <div className="flex items-baseline gap-1 overflow-hidden">
                <span className="text-xl md:text-2xl font-black font-headline text-zinc-900 dark:text-zinc-50 truncate">{scanningAsset.scarcity}</span>
                <span className="text-[10px] font-bold text-zinc-400 ml-1 shrink-0">9.4/10</span>
              </div>
            </div>
          </div>

          {/* Details List */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between py-3 border-b border-zinc-50 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <Palette size={18} className="text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Authentic Holofoil Finish</span>
              </div>
              <Verified size={14} className="text-zinc-400" />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-50 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <Factory size={18} className="text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Mint 10 PSA Rating</span>
              </div>
              <Verified size={14} className="text-zinc-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 py-4 rounded-2xl font-headline font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 duration-150">
              <Landmark size={20} />
              Add to Museum
            </button>
            <button className="w-full bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 py-4 rounded-2xl font-headline font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all active:scale-95 duration-150">
              <History size={20} />
              View History
            </button>
          </div>
        </motion.div>

        {/* Mini Stats */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {['Sold Recently', 'Collectors', 'Growth'].map((label, idx) => (
            <div key={label} className="min-w-[140px] bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/20 p-4 rounded-2xl">
              <p className="text-[9px] uppercase tracking-tighter text-zinc-500 font-black">{label}</p>
              <p className="font-headline font-bold text-zinc-900 dark:text-zinc-50">
                {idx === 0 ? '12 Units' : idx === 1 ? '242 Pending' : '+14.2%'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
