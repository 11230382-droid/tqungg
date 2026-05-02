/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { NewsArticle } from '../types';
import { articles } from '../mockData';
import { motion, AnimatePresence } from 'motion/react';

interface NewsScreenProps {
  onArticleClick?: (article: NewsArticle) => void;
}

const NEWS_CATEGORIES = [
  'All',
  'Market Trends',
  'New Releases',
  'Auctions',
  'Collector Stories',
  'Events'
];

export default function NewsScreen({ onArticleClick }: NewsScreenProps) {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [displayCount, setDisplayCount] = React.useState(6);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const heroArticle = articles.find(a => a.isHero);
  
  const filteredArticles = React.useMemo(() => {
    let list = articles;
    if (selectedCategory !== 'All') {
      list = articles.filter(a => a.category === selectedCategory);
    }
    // Filter out hero article from the feed lists to avoid duplication if it's in the category
    return list.filter(a => a.id !== heroArticle?.id);
  }, [selectedCategory, heroArticle]);

  const displayedArticles = filteredArticles.slice(0, displayCount);

  // Infinite scroll logic
  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && 
        !isLoadingMore && 
        displayCount < filteredArticles.length
      ) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setDisplayCount(prev => Math.min(prev + 4, filteredArticles.length));
          setIsLoadingMore(false);
        }, 800);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayCount, filteredArticles.length, isLoadingMore]);

  // Reset pagination when category changes
  React.useEffect(() => {
    setDisplayCount(6);
  }, [selectedCategory]);

  return (
    <div className="pt-20 pb-32 px-4 max-w-7xl mx-auto space-y-12">
      {/* Category Filter */}
      <section className="sticky top-16 z-30 -mx-4 px-4 py-4 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                ${selectedCategory === cat 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-lg' 
                  : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800'
                } border`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Hero Editorial (Only shown in 'All' or if it matches category) */}
      {(selectedCategory === 'All' || heroArticle?.category === selectedCategory) && heroArticle && (
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

      {/* Articles Feed */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-3xl font-black tracking-tighter font-headline uppercase">
              {selectedCategory === 'All' ? 'Latest Stories' : `${selectedCategory}`}
            </h3>
            <p className="text-zinc-500 text-sm">Dispatches from the global collector community.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedArticles.map((article, index) => (
              <motion.div 
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
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
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{article.publisher}</span>
                  <span className="text-[9px] font-black px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 rounded uppercase tracking-tighter">{article.category}</span>
                </div>
                <h4 className="text-xl font-bold font-headline leading-tight group-hover:underline underline-offset-4 decoration-2">
                  {article.title}
                </h4>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Loading Indicator */}
        {isLoadingMore && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-zinc-900 dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && !isLoadingMore && (
          <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-400 font-medium tracking-tight">No articles found in this category.</p>
            <button 
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-xs font-black uppercase tracking-widest underline underline-offset-4"
            >
              Back to all stories
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
