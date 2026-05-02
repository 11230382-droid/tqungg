/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Play, Timer, Trophy, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Asset } from '../../types';
import SafeImage from '../ui/SafeImage';

interface RacingGameProps {
  items: Asset[];
  onBack: () => void;
  onSaveScore: (score: number, formattedScore: string) => void;
}

export default function RacingGame({ items, onBack, onSaveScore }: RacingGameProps) {
  const [selectedCar, setSelectedCar] = useState<Asset>(items[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState(0);

  const gameLoopRef = useRef<number>(0);

  const startRace = () => {
    setIsPlaying(true);
    setDistance(0);
    setSpeed(0);
    setTime(0);
  };

  useEffect(() => {
    if (isPlaying) {
      const step = () => {
        setDistance(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (!bestTime || time < bestTime) setBestTime(time);
            onSaveScore(time, `${time.toFixed(1)}s`);
            return 100;
          }
          return prev + (speed / 100);
        });
        setTime(prev => prev + 0.016);
        gameLoopRef.current = requestAnimationFrame(step);
      };
      gameLoopRef.current = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(gameLoopRef.current);
    }
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [isPlaying, speed]);

  const handleGas = () => {
    if (isPlaying) {
      setSpeed(prev => Math.min(prev + 5, 200));
    }
  };

  useEffect(() => {
    if (isPlaying && speed > 0) {
      const brake = setInterval(() => {
        setSpeed(prev => Math.max(prev - 2, 0));
      }, 50);
      return () => clearInterval(brake);
    }
  }, [isPlaying, speed]);

  return (
    <div className="pt-20 pb-32 min-h-screen bg-zinc-900 px-4 md:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-10 w-fit">
          <ChevronLeft size={20} /> PITS
        </button>

        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-stretch">
          {/* Track Area */}
          <div className="flex-1 w-full bg-zinc-800 rounded-[3rem] p-10 relative border-4 border-zinc-700 shadow-inner overflow-hidden">
             {/* Road markings */}
             <div className="absolute inset-0 flex flex-col justify-around py-20 pointer-events-none">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-2 w-full flex justify-around">
                    {[1,2,3,4,5,6,7,8].map(j => (
                      <div key={j} className="w-12 h-full bg-zinc-700/50 rounded-full" />
                    ))}
                  </div>
                ))}
             </div>

             {/* The Finish Line */}
             <div className="absolute right-20 top-0 bottom-0 w-10 flex flex-col justify-between py-2 pointer-events-none">
                {[1,2,3,4,5,6,7,8,9,10].map(i => (
                   <div key={i} className="flex justify-between w-full h-8">
                      <div className={`w-1/2 h-full ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`} />
                      <div className={`w-1/2 h-full ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`} />
                   </div>
                ))}
             </div>

             {/* The Car */}
             <motion.div 
               style={{ left: `${distance}%` }}
               className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 group"
             >
                <div className="relative">
                  <SafeImage 
                    src={selectedCar.image} 
                    alt={selectedCar.name}
                    className="w-48 h-48 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transform rotate-0" 
                    style={{ objectFit: 'contain' }}
                    aspectRatio="aspect-square"
                  />
                  {speed > 100 && (
                     <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                        <Zap size={24} className="text-blue-400 animate-pulse" />
                        <Zap size={24} className="text-cyan-400 animate-pulse delay-75" />
                     </div>
                  )}
                </div>
             </motion.div>

             <AnimatePresence>
               {!isPlaying && distance >= 100 && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-20 bg-white p-8 rounded-3xl text-center shadow-2xl z-40"
                 >
                   <Trophy size={48} className="text-yellow-500 mx-auto mb-4" />
                   <h2 className="text-4xl font-black italic uppercase italic mb-2 tracking-tighter">RACE FINISHED!</h2>
                   <div className="flex justify-around mt-6 mb-8 bg-zinc-50 p-4 rounded-2xl">
                      <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Time</p>
                        <p className="text-2xl font-black">{time.toFixed(2)}s</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Best</p>
                        <p className="text-2xl font-black text-emerald-500">{bestTime.toFixed(2)}s</p>
                      </div>
                   </div>
                   <button 
                    onClick={startRace}
                    className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm active:scale-95 transition-all"
                   >
                     REMATCH
                   </button>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-72 space-y-6">
            <div className="bg-zinc-800 rounded-3xl p-6 border border-zinc-700 shadow-xl">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                    <Timer size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Time Elapsed</p>
                    <p className="text-2xl font-mono font-black text-white">{time.toFixed(2)}s</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
                       <span>Velocity</span>
                       <span>{Math.floor(speed)} KM/H</span>
                    </div>
                    <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(speed / 200) * 100}%` }}
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500" 
                       />
                    </div>
                  </div>
               </div>
            </div>

            <button 
              onMouseDown={handleGas}
              onTouchStart={handleGas}
              className={`w-full h-32 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all active:scale-90 ${
                isPlaying 
                ? 'bg-gradient-to-br from-red-500 to-orange-600 shadow-[0_0_40px_rgba(239,68,68,0.3)]' 
                : 'bg-zinc-800 border-2 border-zinc-700 opacity-50'
              }`}
            >
              <Zap size={32} className="text-white" />
              <span className="text-xs font-black text-white uppercase tracking-widest">THROTTLE</span>
            </button>

            {!isPlaying && distance < 100 && (
              <button 
                onClick={startRace}
                className="w-full bg-white text-zinc-900 py-6 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] transition-all"
              >
                <Play size={24} fill="currentColor" /> INITIATE RACE
              </button>
            )}

            <div className="grid grid-cols-4 gap-2">
               {items.map(car => (
                 <button 
                  key={car.id}
                  onClick={() => !isPlaying && setSelectedCar(car)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedCar.id === car.id ? 'border-orange-500 scale-105 shadow-lg shadow-orange-500/20' : 'border-zinc-700 opacity-40 hover:opacity-100'}`}
                 >
                   <SafeImage src={car.image} alt={car.name} className="w-full h-full" aspectRatio="aspect-square" />
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
