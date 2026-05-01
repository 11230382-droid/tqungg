/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Monitor, Verified, Palette, Factory, Landmark, History, TrendingUp, ChevronLeft, ShieldCheck, ArrowRight } from 'lucide-react';
import { scanningAsset } from '../mockData';
import { motion } from 'motion/react';

interface MuseumScreenProps {
  onBack?: () => void;
  onMuseumClick?: () => void;
}

export default function MuseumScreen({ onBack, onMuseumClick }: MuseumScreenProps) {
  return (
    <div className="pt-0 pb-32 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Detail Header for Scanning */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-4 border-b border-zinc-100 dark:border-zinc-800">
        <button onClick={onBack} className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="font-headline font-black text-xs uppercase tracking-widest truncate max-w-[200px]">Live Recognition</span>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      <div className="pt-16">
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
                <span className="text-[10px] font-bold text-zinc-400 ml-1 shrink-0">PSA 10</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm mb-8 font-medium">
            {scanningAsset.description}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {Object.entries(scanningAsset.specs).map(([key, value]) => (
              <div key={key} className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="font-headline font-bold text-[11px] text-zinc-900 dark:text-zinc-100 truncate">{value}</p>
              </div>
            ))}
          </div>

          {/* Details List */}
          <div className="space-y-4 mb-10">
            <h3 className="font-headline font-black text-xs uppercase tracking-widest text-zinc-400 mb-2">Authenticity Breakdown</h3>
            <div className="flex items-center justify-between py-3 border-b border-zinc-50 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <Palette size={18} className="text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Authentic Holofoil Finish</span>
              </div>
              <Verified size={14} className="text-green-500" />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-50 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <Factory size={18} className="text-zinc-400" />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Mint 10 PSA Rating</span>
              </div>
              <Verified size={14} className="text-green-500" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={onMuseumClick}
              className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 py-5 rounded-2xl font-headline font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 duration-150"
            >
              <Landmark size={20} />
              Add to Museum
            </button>
            <button className="w-full bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 py-5 rounded-2xl font-headline font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all active:scale-95 duration-150">
              <ArrowRight size={20} />
              Market Listing
            </button>
          </div>
        </motion.div>

        {/* Origin & Ownership Section (Matching Product Detail) */}
        <section className="mt-8 bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <h2 className="font-headline font-black text-lg tracking-tight uppercase mb-8 flex items-center gap-3">
             <ShieldCheck size={24} />
             Ownership Archive
          </h2>
          <div className="space-y-6">
             <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden border border-zinc-200">
                      <img src="https://picsum.photos/seed/curator/100/100" alt="Curator" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Current Custodian</p>
                      <p className="font-headline font-bold text-sm">Julian Vane (@julianvane)</p>
                   </div>
                </div>
                <div className="text-[10px] font-black uppercase text-zinc-400">EST. 2022</div>
             </div>

             <button className="w-full mt-4 flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-900 font-bold uppercase tracking-widest text-[10px] transition-colors py-2">
                <History size={16} />
                View Full Chain of Custody
             </button>
          </div>
        </section>
      </section>
      </div>
    </div>
  );
}
