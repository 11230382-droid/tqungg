/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Verified, Grid, List, ArrowRight, Box, Plus } from 'lucide-react';
import { currentUser } from '../mockData';
import { motion } from 'motion/react';

export default function ProfileScreen() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-32 space-y-10">
      {/* Profile Header */}
      <section className="flex flex-col items-center">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full border-2 border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {currentUser.isVerified && (
            <div className="absolute bottom-0 right-0 bg-zinc-900 dark:bg-zinc-50 w-8 h-8 rounded-full border-4 border-white dark:border-zinc-950 flex items-center justify-center text-white dark:text-zinc-900">
              <Verified size={14} fill="currentColor" fillOpacity={0.2} />
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">{currentUser.name}</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">{currentUser.role} • {currentUser.location}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 w-full mt-8 py-6 border-y border-zinc-100 dark:border-zinc-800">
          {[
            { label: 'Followers', value: currentUser.followers },
            { label: 'Following', value: currentUser.following },
            { label: 'Items', value: currentUser.itemCount },
            { label: 'Value', value: currentUser.totalValue }
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-black leading-none mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <button className="mt-8 w-full py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold rounded-xl active:scale-[0.98] transition-all text-sm uppercase tracking-widest">
          Edit Profile
        </button>
      </section>

      {/* Recent Scans */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Recent Scans</h2>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest cursor-pointer hover:text-zinc-900">View History</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[
             { time: '2m ago', img: 'https://picsum.photos/seed/scan1/200/200' },
             { time: '1h ago', img: 'https://picsum.photos/seed/scan2/200/200' },
             { time: '4h ago', img: 'https://picsum.photos/seed/scan3/200/200' }
          ].map((scan, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-zinc-50 dark:ring-zinc-800 ring-offset-2">
                <img src={scan.img} className="w-full h-full object-cover" alt="Scan" referrerPolicy="no-referrer" />
              </div>
              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter">{scan.time}</span>
            </div>
          ))}
          <div className="flex-shrink-0 flex flex-col items-center gap-2 opacity-50">
            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400">
               <Plus size={20} />
            </div>
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter">New Scan</span>
          </div>
        </div>
      </section>

      {/* Digital Cabinet CTA */}
      <section>
        <div className="relative group cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm active:scale-[0.98] transition-all overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-zinc-50 dark:bg-zinc-950 rounded-full blur-3xl opacity-50"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Digital Cabinet</h3>
              <p className="text-xs text-zinc-500 mt-1 font-medium">Explore your high-fidelity 3D archive</p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-widest rounded-lg">
                Enter Archive
                <ArrowRight size={12} />
              </div>
            </div>
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse"></div>
              <Box size={48} className="text-zinc-900 dark:text-zinc-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Gallery */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Collection Museum</h2>
          <div className="flex gap-4 text-zinc-400">
            <Grid size={18} className="text-zinc-900 dark:text-zinc-50" />
            <List size={18} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {[
            { name: 'Shadow Specter First Edition', series: 'Series 01 • 1998', image: 'https://picsum.photos/seed/item1/600/450', rarity: 'Authenticated' },
            { name: 'MC Astray Gold Frame', series: 'Legacy Digital Assets', image: 'https://picsum.photos/seed/item2/600/450', rarity: 'Rare' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-3 group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative shadow-sm">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-[9px] font-black tracking-widest text-zinc-900 dark:text-zinc-50 uppercase">{item.rarity}</span>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight text-lg leading-tight">{item.name}</h4>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">{item.series}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
