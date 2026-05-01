/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewsArticle } from '../types';
import { articles, auctions } from '../mockData';
import { motion } from 'motion/react';

interface NewsScreenProps {
  onArticleClick?: (article: NewsArticle) => void;
}

export default function NewsScreen({ onArticleClick }: NewsScreenProps) {
  const heroArticle = articles.find(a => a.isHero);
  const otherArticles = articles.filter(a => !a.isHero);

  return (
    <div className="pt-20 pb-32 px-4 max-w-7xl mx-auto space-y-16">
      {/* Hero Editorial */}
      {heroArticle && (
        <section onClick={() => onArticleClick?.(heroArticle)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group cursor-pointer overflow-hidden rounded-xl bg-black"
          >
            <img 
              className="w-full h-[500px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
              src={heroArticle.image} 
              alt={heroArticle.title}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <span className="inline-block px-3 py-1 bg-white text-black text-[10px] font-black tracking-widest uppercase mb-4 font-label">
                {heroArticle.timestamp}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4 font-headline uppercase">
                {heroArticle.title.split(' ').slice(0, 3).join(' ')} <br/> {heroArticle.title.split(' ').slice(3).join(' ')}
              </h2>
              <p className="text-zinc-300 text-lg max-w-xl font-light mb-6">{heroArticle.description}</p>
              <button className="bg-white text-black px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-zinc-200 transition-colors">
                Read Article
              </button>
            </div>
          </motion.div>
        </section>
      )}

      {/* Manufacturer Updates */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-3xl font-black tracking-tighter font-headline uppercase">Manufacturer Updates</h3>
            <p className="text-zinc-500 text-sm">Direct dispatches from the design floor.</p>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-zinc-900 pb-1">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherArticles.map((article, index) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onArticleClick?.(article)}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-zinc-100 dark:bg-zinc-800">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src={article.image} 
                  alt={article.title}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">{article.publisher}</span>
              <h4 className="text-xl font-bold font-headline leading-tight group-hover:underline underline-offset-4 decoration-2">
                {article.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Auctions */}
      <section>
        <h3 className="text-3xl font-black tracking-tighter font-headline uppercase mb-8">Live Auctions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto">
          {auctions.map((auction) => (
            <div key={auction.id} className="md:col-span-2 relative group overflow-hidden rounded-lg bg-zinc-900 aspect-video md:aspect-auto">
              <img 
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" 
                src={auction.image} 
                alt={auction.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Ending Soon</span>
                </div>
                <h4 className="text-2xl font-black font-headline uppercase leading-none mb-2">{auction.title}</h4>
                <p className="text-zinc-400 text-sm mb-4">Current Bid: {auction.currentBid}</p>
                <div className="flex space-x-4">
                  <button className="bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                    Bid Now
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
             <div className="relative group overflow-hidden rounded-lg bg-zinc-100 aspect-square">
               <img src="https://picsum.photos/seed/m2/400/400" className="w-full h-full object-cover" alt="Museum" referrerPolicy="no-referrer" />
               <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h5 className="text-white text-[10px] font-black uppercase tracking-widest">M2 Machines Museum</h5>
               </div>
             </div>
             <div className="relative group overflow-hidden rounded-lg bg-zinc-100 aspect-square">
               <img src="https://picsum.photos/seed/exotics/400/400" className="w-full h-full object-cover" alt="Exotics" referrerPolicy="no-referrer" />
               <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h5 className="text-white text-[10px] font-black uppercase tracking-widest">European Exotics Lot</h5>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
