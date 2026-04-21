/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, RefreshCw, Trophy, LayoutGrid } from 'lucide-react';
import { motion, Reorder } from 'motion/react';
import { Asset } from '../../types';

interface PuzzleGameProps {
  items: Asset[];
  onBack: () => void;
  onSaveScore: (score: number, formattedScore: string) => void;
}

export default function PuzzleGame({ items, onBack, onSaveScore }: PuzzleGameProps) {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(items[0]);
  const [pieces, setPieces] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    shufflePuzzle();
  }, [selectedAsset]);

  const shufflePuzzle = () => {
    const original = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const shuffled = [...original].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    setIsSolved(false);
    setStartTime(Date.now());
  };

  const handleReorder = (newOrder: number[]) => {
    setPieces(newOrder);
    if (JSON.stringify(newOrder) === JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8])) {
      setIsSolved(true);
      const timeTaken = (Date.now() - startTime) / 1000;
      onSaveScore(timeTaken, `${timeTaken.toFixed(1)}s`);
    }
  };

  return (
    <div className="pt-20 pb-32 min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">
            <ChevronLeft size={20} /> Back
          </button>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar max-w-sm px-4">
            {items.map((item) => (
              <button 
                key={item.id}
                onClick={() => setSelectedAsset(item)}
                className={`flex-shrink-0 w-12 h-16 rounded-lg border-2 transition-all overflow-hidden ${selectedAsset.id === item.id ? 'border-blue-500 scale-110' : 'border-transparent opacity-50'}`}
              >
                <img src={item.image} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-black tracking-tight uppercase mb-2 flex items-center justify-center gap-2">
              <LayoutGrid className="text-blue-500" /> PUZZLE MASTER
            </h2>
            <p className="text-zinc-500 font-medium">Reorganize the shards of <strong>{selectedAsset.name}</strong></p>
          </div>

          <div className="relative p-6 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-100 dark:border-zinc-800">
            <Reorder.Group 
              axis="y" 
              values={pieces} 
              onReorder={handleReorder}
              className="grid grid-cols-3 gap-1 w-80 h-80 overflow-hidden rounded-xl"
            >
              {pieces.map((piece, index) => {
                const row = Math.floor(piece / 3);
                const col = piece % 3;
                return (
                  <Reorder.Item 
                    key={piece} 
                    value={piece}
                    className="relative aspect-square cursor-grab active:cursor-grabbing overflow-hidden group"
                  >
                    <img 
                      src={selectedAsset.image} 
                      className="absolute w-[300%] h-[300%] max-w-none object-cover transition-transform duration-300 group-hover:scale-110"
                      style={{
                        top: `-${row * 100}%`,
                        left: `-${col * 100}%`,
                      }}
                    />
                    <div className="absolute inset-0 border border-white/20" />
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            {isSolved && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center z-50 p-10 text-center"
              >
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-bounce">
                  <Trophy size={40} className="text-zinc-900" />
                </div>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">MASTER PIECE!</h3>
                <p className="text-zinc-400 font-medium mb-8">You've successfully reconstructed this legendary asset.</p>
                <button 
                  onClick={shufflePuzzle}
                  className="bg-white text-zinc-900 px-8 py-3 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all"
                >
                  PLAY AGAIN
                </button>
              </motion.div>
            )}
          </div>

          <button 
            onClick={shufflePuzzle}
            className="mt-10 flex items-center gap-2 px-6 py-3 rounded-full border-2 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 font-bold uppercase tracking-widest text-xs transition-all"
          >
            <RefreshCw size={16} /> RESET GRID
          </button>
        </div>
      </div>
    </div>
  );
}
