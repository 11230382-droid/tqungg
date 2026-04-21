/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, Wind, Hand, Sparkles } from 'lucide-react';
import { motion, Reorder } from 'motion/react';
import { Asset } from '../../types';

interface BookshelfGameProps {
  items: Asset[];
  onBack: () => void;
  onSaveScore: (score: number, formattedScore: string) => void;
}

export default function BookshelfGame({ items, onBack, onSaveScore }: BookshelfGameProps) {
  const [books, setBooks] = useState(items);
  const [dustCount, setDustCount] = useState(items.map(() => Math.floor(Math.random() * 5)));
  const [activeTool, setActiveTool] = useState<'sort' | 'clean'>('sort');

  const cleanBook = (index: number) => {
    if (activeTool === 'clean' && dustCount[index] > 0) {
      const newDust = [...dustCount];
      newDust[index] -= 1;
      setDustCount(newDust);
      
      const pristines = newDust.filter(d => d === 0).length;
      onSaveScore(pristines, `${pristines} Items`);
    }
  };

  return (
    <div className="pt-20 pb-32 min-h-screen bg-[#faf9f6] dark:bg-[#121212] px-4 md:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-10">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#8b7e74] hover:text-[#5c524b] transition-colors">
            <ChevronLeft size={20} /> Library Hub
          </button>
          
          <div className="flex bg-[#edeae5] dark:bg-zinc-800 p-1.5 rounded-2xl gap-2 shadow-inner">
             <button 
              onClick={() => setActiveTool('sort')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTool === 'sort' ? 'bg-[#8b7e74] text-white shadow-lg' : 'text-[#8b7e74]'}`}
             >
               <Hand size={14} /> Sort
             </button>
             <button 
              onClick={() => setActiveTool('clean')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTool === 'clean' ? 'bg-[#8b7e74] text-white shadow-lg' : 'text-[#8b7e74]'}`}
             >
               <Wind size={14} /> Clean
             </button>
          </div>
        </div>

        <div className="text-center mb-12">
           <h2 className="text-3xl font-black tracking-tight text-[#5c524b] dark:text-zinc-50 uppercase mb-2">ZEN BOOKSHELF</h2>
           <p className="text-[#8b7e74] font-medium serif italic">Care for your rare First Edition collection.</p>
        </div>

        <div className="w-full relative">
           {/* Wooden shelf visual */}
           <div className="absolute -inset-x-10 bottom-0 h-8 bg-[#5c4a3a] border-y-4 border-[#4a3b2e] shadow-2xl rounded-sm z-0" />
           <div className="absolute -inset-x-4 bottom-0 h-40 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

           <Reorder.Group 
            axis="x" 
            values={books} 
            onReorder={setBooks}
            className="flex items-end justify-center px-10 gap-2 min-h-[400px] pb-8 relative z-10"
           >
             {books.map((book, idx) => (
                <Reorder.Item 
                  key={book.id} 
                  value={book}
                  className={`relative cursor-grab active:cursor-grabbing group ${activeTool === 'clean' ? 'cursor-none' : ''}`}
                  onClick={() => cleanBook(idx)}
                >
                   <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                   >
                      <div 
                        className="w-12 md:w-16 h-48 md:h-64 rounded-l-md rounded-r-sm shadow-xl transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-105"
                        style={{ 
                          backgroundColor: book.specs.colorway.includes('Red') ? '#7c2d12' : '#1e293b',
                          background: `linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.4) 100%), ${book.specs.colorway.includes('Red') ? '#7c2d12' : '#1e293b'}`
                        }}
                      >
                         <div className="h-full w-full border-r-4 border-black/10 flex flex-col justify-between py-6 px-1 overflow-hidden">
                            <span className="text-[10px] md:text-xs font-black text-white/80 uppercase tracking-tighter vertical-text opacity-50">COLLECSEUM ARCHIVE</span>
                            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-tighter vertical-text whitespace-nowrap">{book.name}</span>
                            <div className="flex flex-col items-center gap-1">
                               <div className="w-2 h-2 rounded-full bg-yellow-400" />
                               <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                            </div>
                         </div>

                         {/* Dust Particles */}
                         {dustCount[idx] > 0 && Array.from({ length: dustCount[idx] }).map((_, d) => (
                           <div 
                             key={d}
                             className="absolute inset-0 bg-white/20 backdrop-blur-[1px] pointer-events-none rounded-sm"
                           />
                         ))}

                         {activeTool === 'clean' && dustCount[idx] > 0 && (
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900 text-white text-[8px] px-2 py-1 rounded font-black uppercase animate-bounce">
                             CLEANING...
                           </div>
                         )}
                         
                         {dustCount[idx] === 0 && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400"
                            >
                              <Sparkles size={16} fill="currentColor" />
                            </motion.div>
                         )}
                      </div>
                      
                      {/* Book projection shadow */}
                      <div className="absolute -bottom-2 inset-x-2 h-4 bg-black/40 blur-md rounded-full -z-10 group-hover:bg-black/60 transition-all" />
                   </motion.div>
                </Reorder.Item>
             ))}
           </Reorder.Group>
        </div>

        <div className="mt-20 max-w-md bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-[#edeae5] dark:border-zinc-800 text-center">
           <p className="text-sm text-[#8b7e74] uppercase tracking-widest font-black mb-4">Librarian Stats</p>
           <div className="flex justify-between items-center text-[#5c524b] dark:text-zinc-50">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Pristine Books</p>
                <p className="text-2xl font-black">{dustCount.filter(d => d === 0).length} / {items.length}</p>
              </div>
              <div className="w-px h-10 bg-[#edeae5] dark:bg-zinc-800" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Order State</p>
                <p className="text-2xl font-black">STABLE</p>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}
