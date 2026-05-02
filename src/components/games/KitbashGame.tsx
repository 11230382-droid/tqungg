/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, RotateCcw, Save, Share2, Crown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Asset } from '../../types';
import SafeImage from '../ui/SafeImage';

interface KitbashGameProps {
  items: Asset[];
  onBack: () => void;
  onSaveScore: (score: number, formattedScore: string) => void;
}

export default function KitbashGame({ items, onBack, onSaveScore }: KitbashGameProps) {
  const [selectedHead, setSelectedHead] = useState(0);
  const [selectedTorso, setSelectedTorso] = useState(0);
  const [selectedLegs, setSelectedLegs] = useState(0);
  const [score, setScore] = useState(0);

  const handleRank = () => {
    // Mock ranking system
    const randomScore = Math.floor(Math.random() * 40) + 60;
    setScore(randomScore);
    onSaveScore(randomScore, `${randomScore}/100`);
  };

  const currentHeadImg = items[selectedHead]?.image;
  const currentTorsoImg = items[selectedTorso]?.image;
  const currentLegsImg = items[selectedLegs]?.image;

  return (
    <div className="pt-20 pb-32 min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
          <ChevronLeft size={20} /> Back to Hub
        </button>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Customizer Preview */}
          <div className="flex-1">
            <div className="relative aspect-[3/4] bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 flex flex-col items-center p-8">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
              
              {/* The "Kitbash" Figure */}
              <div className="relative w-full h-full flex flex-col items-center justify-center -space-y-12">
                <motion.img 
                  key={currentHeadImg}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={currentHeadImg || null} 
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-800 object-cover z-30 shadow-xl" 
                />
                <motion.img 
                  key={currentTorsoImg}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={currentTorsoImg || null} 
                  className="w-48 h-48 rounded-3xl border-4 border-white dark:border-zinc-800 object-cover z-20 shadow-lg" 
                />
                <motion.img 
                  key={currentLegsImg}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={currentLegsImg || null} 
                  className="w-56 h-56 rounded-full border-4 border-white dark:border-zinc-800 object-cover z-10 shadow-md" 
                />
              </div>

              {score > 0 && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute bottom-10 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl"
                >
                  <Crown size={20} className="text-yellow-400" />
                  <span className="font-headline font-black text-xl italic uppercase">Rank: {score}/100</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-80">
            <h2 className="text-2xl font-black tracking-tight uppercase mb-6 flex items-center gap-2">
              <Sparkles className="text-purple-500" /> KITBASH STUDIO
            </h2>

            <div className="space-y-8">
              <section>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block text-center">Select Head Component</label>
                <div className="grid grid-cols-3 gap-2">
                  {items.map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedHead(i)}
                      className={`aspect-square rounded-xl border-2 transition-all overflow-hidden ${selectedHead === i ? 'border-purple-500 scale-105' : 'border-zinc-200 dark:border-zinc-800 opacity-60'}`}
                    >
                      <SafeImage src={item.image} alt={item.name} className="w-full h-full" aspectRatio="aspect-square" />
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block text-center">Select Torso Component</label>
                <div className="grid grid-cols-3 gap-2">
                  {items.map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedTorso(i)}
                      className={`aspect-square rounded-xl border-2 transition-all overflow-hidden ${selectedTorso === i ? 'border-purple-500 scale-105' : 'border-zinc-200 dark:border-zinc-800 opacity-60'}`}
                    >
                      <SafeImage src={item.image} alt={item.name} className="w-full h-full" aspectRatio="aspect-square" />
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block text-center">Select Legs Component</label>
                <div className="grid grid-cols-3 gap-2">
                  {items.map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedLegs(i)}
                      className={`aspect-square rounded-xl border-2 transition-all overflow-hidden ${selectedLegs === i ? 'border-purple-500 scale-105' : 'border-zinc-200 dark:border-zinc-800 opacity-60'}`}
                    >
                      <SafeImage src={item.image} alt={item.name} className="w-full h-full" aspectRatio="aspect-square" />
                    </button>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-2 gap-4 mt-10">
                <button 
                  onClick={handleRank}
                  className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                >
                  <Trophy size={18} /> RANK
                </button>
                <button className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-50 active:scale-95 transition-all">
                  <Save size={18} /> SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Trophy({ size }: { size: number }) {
  return <Crown size={size} />;
}
