/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Gamepad2, Lock, Sparkles, LayoutGrid, Trophy, ArrowRight, Timer, HardDrive, Swords, BookOpen, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Asset, GameLeaderboardEntry } from '../types';
import KitbashGame from '../components/games/KitbashGame';
import PuzzleGame from '../components/games/PuzzleGame';
import RacingGame from '../components/games/RacingGame';
import BookshelfGame from '../components/games/BookshelfGame';
import SafeImage from '../components/ui/SafeImage';
import { gameLeaderboards as initialLeaderboards } from '../mockData';

interface GamesScreenProps {
  collectedItems: Asset[];
}

type GameType = 'hub' | 'kitbash' | 'puzzle' | 'racing' | 'bookshelf';

export default function GamesScreen({ collectedItems }: GamesScreenProps) {
  const [activeGame, setActiveGame] = useState<GameType>('hub');
  const [leaderboards, setLeaderboards] = useState<Record<string, GameLeaderboardEntry[]>>(initialLeaderboards);
  const [leaderboardTab, setLeaderboardTab] = useState<string>('kitbash');

  const figures = collectedItems.filter(item => item.category === 'Figure');
  const cards = collectedItems.filter(item => item.category === 'Card');
  const cars = collectedItems.filter(item => item.category === 'Car');
  const books = collectedItems.filter(item => item.category === 'Book');

  const handleSaveScore = (gameId: string, score: number, formattedScore: string) => {
    const newEntry: GameLeaderboardEntry = {
      id: `lb-${Date.now()}`,
      user: initialLeaderboards.kitbash[2].user, // Current User
      score,
      formattedScore,
      timestamp: 'Just now'
    };

    setLeaderboards(prev => {
      const current = prev[gameId] || [];
      // Replace if higher (or lower for time games)
      const isTimeGame = gameId === 'puzzle' || gameId === 'racing';
      const existingMeIndex = current.findIndex(e => e.user.id === newEntry.user.id);
      
      let next = [...current];
      if (existingMeIndex > -1) {
        const existing = current[existingMeIndex];
        const shouldUpdate = isTimeGame ? score < existing.score : score > existing.score;
        if (shouldUpdate) {
          next[existingMeIndex] = newEntry;
        }
      } else {
        next.push(newEntry);
      }

      // Sort
      next.sort((a, b) => isTimeGame ? a.score - b.score : b.score - a.score);
      return { ...prev, [gameId]: next.slice(0, 5) };
    });
  };

  const games = [
    {
      id: 'kitbash',
      name: 'Kitbash Studio',
      description: 'Assemble custom figures from your action figure collection.',
      icon: Swords,
      unlocked: figures.length > 0,
      count: figures.length,
      category: 'Figure',
      color: 'from-purple-600 to-indigo-900',
      theme: 'MECHA',
      img: 'https://picsum.photos/seed/cybernetic_mecha_pilot/800/400'
    },
    {
      id: 'puzzle',
      name: 'Puzzle Master',
      description: 'Turn your legendary cards into challenging puzzles.',
      icon: LayoutGrid,
      unlocked: cards.length > 0,
      count: cards.length,
      category: 'Card',
      color: 'from-blue-600 to-cyan-900',
      theme: 'HOLOGRAM',
      img: 'https://picsum.photos/seed/trading_card_hologram/800/400'
    },
    {
      id: 'racing',
      name: 'Car Racing',
      description: 'Take your collectible cars to the track.',
      icon: Trophy,
      unlocked: cars.length > 0,
      count: cars.length,
      category: 'Car',
      color: 'from-red-600 to-orange-900',
      theme: 'NEON',
      img: 'https://picsum.photos/seed/nissan_gtr_night_raceway/800/400'
    },
    {
      id: 'bookshelf',
      name: 'Zen Bookshelf',
      description: 'Organize and maintain your library in ASMR style.',
      icon: BookOpen,
      unlocked: books.length > 0,
      count: books.length,
      category: 'Book',
      color: 'from-emerald-600 to-teal-900',
      theme: 'ORGANIC',
      img: 'https://picsum.photos/seed/minimalist_luxury_bookshelf/800/400'
    }
  ];

  if (activeGame === 'kitbash') return <KitbashGame items={figures} onBack={() => setActiveGame('hub')} onSaveScore={(s, f) => handleSaveScore('kitbash', s, f)} />;
  if (activeGame === 'puzzle') return <PuzzleGame items={cards} onBack={() => setActiveGame('hub')} onSaveScore={(s, f) => handleSaveScore('puzzle', s, f)} />;
  if (activeGame === 'racing') return <RacingGame items={cars} onBack={() => setActiveGame('hub')} onSaveScore={(s, f) => handleSaveScore('racing', s, f)} />;
  if (activeGame === 'bookshelf') return <BookshelfGame items={books} onBack={() => setActiveGame('hub')} onSaveScore={(s, f) => handleSaveScore('bookshelf', s, f)} />;

  return (
    <div className="pt-24 pb-32 min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 md:px-6">
      <header className="mb-12 max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black font-headline tracking-tighter mb-2">PLAY ZONE</h1>
          <p className="text-zinc-500 font-medium italic">Competitive gamification for your digital museum.</p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-2xl">
          <div className="bg-white dark:bg-zinc-900 px-4 py-2 rounded-xl shadow-sm">
             <span className="text-[10px] font-black uppercase text-purple-500">Master Level</span>
             <p className="text-lg font-black leading-none mt-1">LVL 42</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 px-4 py-2 rounded-xl shadow-sm">
             <span className="text-[10px] font-black uppercase text-emerald-500">Items Unlocked</span>
             <p className="text-lg font-black leading-none mt-1">{collectedItems.length}</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Game Selection */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => game.unlocked && setActiveGame(game.id as GameType)}
              className={`group relative overflow-hidden rounded-[2.5rem] cursor-pointer transition-all ${
                game.unlocked 
                  ? 'bg-white dark:bg-zinc-900 shadow-2xl shadow-zinc-200/50 dark:shadow-none hover:-translate-y-2 active:scale-95' 
                  : 'bg-zinc-100 dark:bg-zinc-800/50 opacity-60 grayscale'
              }`}
            >
              {/* Game Thumbnail */}
              <div className="h-56 relative overflow-hidden">
                <SafeImage src={game.img} className="group-hover:scale-110 transition-transform duration-700" alt={game.name} aspectRatio="aspect-video" />
                <div className={`absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 via-zinc-900/40 to-transparent z-10`} />
                
                {/* Logo Style Overlay */}
                <div className="absolute inset-x-0 bottom-6 flex flex-col items-center justify-center text-center px-4">
                   <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center"
                   >
                     <span className={`text-[8px] font-black uppercase tracking-[0.4em] mb-1 drop-shadow-md text-white/70 italic`}>
                       {game.theme} ARCHIVE
                     </span>
                     <h4 className="text-4xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl flex items-center gap-2">
                       {game.name.split(' ')[0]} <span className="text-white/50">{game.name.split(' ')[1]}</span>
                     </h4>
                   </motion.div>
                </div>

                <div className={`absolute top-6 left-6 p-2 rounded-xl bg-gradient-to-br ${game.color} text-white shadow-xl ring-2 ring-white/20 z-20`}>
                  <game.icon size={18} />
                </div>
                {!game.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                     <div className="bg-white text-zinc-900 px-6 py-3 rounded-full flex items-center gap-2 font-black uppercase tracking-widest text-xs">
                        <Lock size={16} /> Locked
                     </div>
                  </div>
                )}
              </div>

              <div className="p-8 pt-4">
                <div className="flex items-center gap-3 mb-3">
                   <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-2 py-0.5 rounded ${game.unlocked ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'bg-zinc-200 text-zinc-500'}`}>
                    {game.theme}
                   </span>
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-3 uppercase">{game.name}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8">{game.description}</p>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    {game.unlocked ? (
                      <div className="flex -space-x-2">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200" />
                         ))}
                         <span className="ml-3 text-[10px] font-black uppercase text-zinc-400">+{game.count} Unlocked</span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Own a {game.category} item</span>
                    )}
                  </div>
                  {game.unlocked && (
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="p-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl shadow-lg"
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Global Games Leaderboard */}
        <section className="bg-white dark:bg-zinc-900 rounded-[3rem] p-10 border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <Crown size={12} /> COMPETITIVE HALL
              </div>
              <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Hall of Fame</h2>
            </div>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {['kitbash', 'puzzle', 'racing', 'bookshelf'].map((id) => (
                <button
                  key={id}
                  onClick={() => setLeaderboardTab(id)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    leaderboardTab === id 
                      ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-xl' 
                      : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 relative">
             {leaderboards[leaderboardTab]?.map((entry, idx) => (
               <motion.div 
                 key={entry.id}
                 initial={{ x: -20, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: idx * 0.05 }}
                 className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                   entry.user.id === initialLeaderboards.kitbash[2].user.id 
                    ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' 
                    : 'bg-zinc-50/50 dark:bg-zinc-800/30 border-transparent'
                 }`}
               >
                 <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                      idx === 0 ? 'bg-yellow-400 text-zinc-900' : 
                      idx === 1 ? 'bg-zinc-300 text-zinc-900' :
                      idx === 2 ? 'bg-orange-400 text-zinc-900' : 'text-zinc-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-200">
                       <SafeImage src={entry.user.avatar} className="w-full h-full rounded-full" alt={entry.user.name} aspectRatio="aspect-square" />
                    </div>
                    <div className="min-w-0">
                       <p className="font-bold text-sm truncate">{entry.user.name}</p>
                       <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest truncate">{entry.timestamp}</p>
                    </div>
                 </div>

                 <div className="text-right">
                    <p className="text-lg font-black italic tracking-tighter leading-none">{entry.formattedScore}</p>
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1">
                      {leaderboardTab === 'racing' || leaderboardTab === 'puzzle' ? 'Completion' : 'Score'}
                    </p>
                 </div>
               </motion.div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
}
