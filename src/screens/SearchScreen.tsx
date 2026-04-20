/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Camera, Heart } from 'lucide-react';
import { categories } from '../mockData';
import { motion } from 'motion/react';

export default function SearchScreen({ onScanTrigger }: { onScanTrigger: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-12 pb-32">
      {/* Search Input Section */}
      <section className="w-full">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
            <Search size={20} />
          </div>
          <input 
            className="w-full h-14 pl-12 pr-12 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all font-body text-sm shadow-sm"
            placeholder="Search for rare finds, idols, or sets..." 
            type="text"
          />
          <div 
            onClick={onScanTrigger}
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-zinc-400 hover:text-zinc-900"
          >
            <Camera size={20} />
          </div>
        </div>
      </section>

      {/* Category Grid Tiles */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="font-headline font-bold text-lg text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">Categories</h2>
          <button className="text-[10px] font-bold text-zinc-500 uppercase hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 transition-all hover:shadow-lg cursor-pointer"
            >
              <img 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src={cat.image} 
                alt={cat.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-headline text-white text-sm font-bold tracking-tight">{cat.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* For You Section */}
      <section className="space-y-6">
        <h2 className="font-headline font-bold text-2xl text-zinc-900 dark:text-zinc-100 tracking-tight">For You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Main Featured Recommendation */}
          <div className="md:col-span-4 group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://picsum.photos/seed/display/800/450" 
                alt="Featured"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-headline font-bold tracking-widest uppercase">
                New Release
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden">
                  <img src="https://picsum.photos/seed/avatar2/100/100" alt="Avatar" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-sm font-headline font-bold leading-none">CollectorElite_88</h4>
                  <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">2 hours ago • Rare Finds</p>
                </div>
              </div>
              <h3 className="font-headline font-extrabold text-xl mb-2 text-zinc-900 dark:text-zinc-100">Unboxing the 25th Anniversary Platinum Set</h3>
              <p className="text-zinc-500 font-body text-sm leading-relaxed line-clamp-2">
                Just secured the complete set. The holographic detailing on these cards is absolutely insane compared to previous editions...
              </p>
            </div>
          </div>

          {/* Product Spotlight */}
          <div className="md:col-span-2 group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="flex-1 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 p-6 flex items-center justify-center">
              <img 
                className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500" 
                src="https://picsum.photos/seed/toy/400/400" 
                alt="Product"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur rounded-full shadow-sm hover:scale-110 transition-transform">
                <Heart size={16} />
              </button>
            </div>
            <div className="p-5 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] font-headline font-bold text-zinc-400 uppercase tracking-widest mb-1">Recommended Product</p>
              <h3 className="font-headline font-bold text-sm mb-1 truncate">Neo-Kyoto Vinyl Figurine</h3>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-headline font-black">$124.00</span>
                <button className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-[10px] font-headline font-bold uppercase tracking-widest">Add</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
