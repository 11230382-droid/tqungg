/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SafeImage from './ui/SafeImage';

export default function LiveDiscussion() {
  const participants = [
    { name: 'Marcus', img: 'https://picsum.photos/seed/u1/100/100', topic: 'Grail Hunt' },
    { name: 'Sarah', img: 'https://picsum.photos/seed/u2/100/100', topic: 'Mint Check' },
    { name: 'Vex', img: 'https://picsum.photos/seed/u3/100/100', topic: 'Market Dip' },
    { name: 'Kira', img: 'https://picsum.photos/seed/u4/100/100', topic: 'Release' },
    { name: 'Jace', img: 'https://picsum.photos/seed/u5/100/100', topic: 'Auction' }
  ];

  return (
    <section className="mb-10 w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
         <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-50 font-label">Live Discussion Hub</h2>
         <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase text-red-500">1.2k Active</span>
         </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
         {participants.map((live, i) => (
           <div key={i} className="flex-shrink-0 group cursor-pointer active:scale-95 transition-transform">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-red-500 to-orange-500">
                  <div className="w-full h-full rounded-[14px] border-2 border-white dark:border-zinc-950 overflow-hidden">
                    <SafeImage src={live.img} className="w-full h-full" alt={live.name} aspectRatio="aspect-square" />
                  </div>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-lg">Live</div>
              </div>
              <p className="text-center text-[9px] font-bold mt-2 text-zinc-900 dark:text-zinc-50 truncate w-16 uppercase tracking-tight">{live.name}</p>
           </div>
         ))}
      </div>
    </section>
  );
}
