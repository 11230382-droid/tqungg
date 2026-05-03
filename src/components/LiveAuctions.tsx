/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Auction } from '../types';

interface LiveAuctionsProps {
  auctions: Auction[];
  showTitle?: boolean;
}

export default function LiveAuctions({ auctions, showTitle = true }: LiveAuctionsProps) {
  return (
    <section className="w-full overflow-hidden">
      {showTitle && <h3 className="text-3xl font-black tracking-tighter font-headline uppercase mb-8">Live Auctions</h3>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {auctions.map((auction) => (
          <div key={auction.id} className="relative group overflow-hidden rounded-xl bg-zinc-900 aspect-[3/4]">
            <img 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
              src={auction.image || null} 
              alt={auction.title}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
              <div className="flex items-center space-x-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                <span className="text-[8px] font-black uppercase tracking-widest">Live</span>
              </div>
              <h4 className="text-sm font-black font-headline uppercase leading-tight mb-1 line-clamp-2">{auction.title}</h4>
              <p className="text-zinc-400 text-[10px] font-bold mb-3">{auction.currentBid}</p>
              <button className="w-full bg-white text-black py-2 text-[9px] font-black uppercase tracking-widest active:scale-95 transition-transform rounded-lg">
                Bid Now
              </button>
            </div>
          </div>
        ))}
        
        {/* Placeholder/Featured Lots for consistent grid */}
        <div className="relative group overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 aspect-[3/4] cursor-pointer">
          <img src="https://picsum.photos/seed/m2/400/600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt="Museum" referrerPolicy="no-referrer" />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
             <h5 className="text-white text-[10px] font-black uppercase tracking-widest leading-tight">M2 Machines Museum Lot</h5>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 aspect-[3/4] cursor-pointer">
          <img src="https://picsum.photos/seed/exotics/400/600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt="Exotics" referrerPolicy="no-referrer" />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
             <h5 className="text-white text-[10px] font-black uppercase tracking-widest leading-tight">European Exotics Special</h5>
          </div>
        </div>
      </div>
    </section>
  );
}
