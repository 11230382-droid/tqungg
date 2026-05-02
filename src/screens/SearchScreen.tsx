/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { Search, Camera, Heart, X } from 'lucide-react';
import { categories, auctions, posts } from '../mockData';
import { motion, AnimatePresence } from 'motion/react';
import LiveAuctions from '../components/LiveAuctions';
import LiveDiscussion from '../components/LiveDiscussion';
import SafeImage from '../components/ui/SafeImage';
import { Post } from '../types';

export default function SearchScreen({ onScanTrigger }: { onScanTrigger: () => void }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredPosts = React.useMemo(() => {
    let results = posts;
    if (selectedCategory) {
      results = results.filter(post => post.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.caption.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query)
      );
    }
    return results;
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setSearchQuery('');
    } else {
      setSelectedCategory(categoryName);
      setSearchQuery(categoryName);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const isSearching = searchQuery.length > 0 || selectedCategory !== null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-12 pb-32">
      {/* Search Input Section */}
      <section className="w-full">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
            <Search size={20} />
          </div>
          <input 
            className="w-full h-14 pl-12 pr-12 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all font-body text-sm shadow-sm"
            placeholder="Search for rare finds, idols, or sets..." 
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // If user manually clears, also clear selected category
              if (e.target.value === '') setSelectedCategory(null);
            }}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
            {isSearching && (
              <button 
                onClick={clearSearch}
                className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X size={20} />
              </button>
            )}
            <div 
              onClick={onScanTrigger}
              className="p-2 flex items-center cursor-pointer text-zinc-400 hover:text-zinc-900"
            >
              <Camera size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Tiles - COMPACT */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="font-headline font-bold text-xs text-zinc-400 uppercase tracking-widest">Categories</h2>
          <button className="text-[10px] font-bold text-zinc-500 uppercase hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-9 gap-3">
          {categories.map((cat, index) => (
            <CategoryTile 
              key={cat.id} 
              cat={cat} 
              index={index} 
              isSelected={selectedCategory === cat.name}
              onClick={() => handleCategoryClick(cat.name)}
            />
          ))}
        </div>
      </section>

      {isSearching ? (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <h2 className="font-headline font-black text-2xl text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">
              {filteredPosts.length} Results Found
            </h2>
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPosts.map((post) => (
                <ResultCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-zinc-500 font-headline uppercase tracking-widest text-sm">No collectibles found for your search.</p>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Live Discussion Hub */}
          <LiveDiscussion />

          {/* Live Auctions Area */}
          <section className="space-y-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex justify-between items-end">
              <h2 className="font-headline font-black text-2xl text-zinc-900 dark:text-zinc-50 uppercase tracking-tighter">Live Auctions</h2>
              <button className="text-[10px] font-bold text-zinc-500 uppercase hover:underline">View All</button>
            </div>
            <LiveAuctions auctions={auctions} showTitle={false} />
          </section>

          {/* For You Section */}
          <section className="space-y-6 pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="font-headline font-bold text-2xl text-zinc-900 dark:text-zinc-100 tracking-tight">For You</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              <FeaturedCard />
              <ProductSpotlight />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function CategoryTile({ cat, index, isSelected, onClick }: { cat: any, index: number, isSelected: boolean, onClick: () => void }) {
  const [hasError, setHasError] = React.useState(false);
  if (hasError) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`group flex flex-col items-center gap-2 cursor-pointer transition-opacity ${isSelected ? 'ring-2 ring-zinc-900 dark:ring-white rounded-xl p-1 bg-zinc-50 dark:bg-zinc-800/50' : ''}`}
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
        <SafeImage 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          src={cat.image} 
          alt={cat.name}
          aspectRatio="aspect-square"
          onLoadError={() => setHasError(true)}
        />
        <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-transparent' : 'bg-black/10 group-hover:bg-transparent'} z-10 pointer-events-none`}></div>
      </div>
      <span className={`text-[9px] font-bold text-center truncate w-full uppercase tracking-tight ${isSelected ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900'}`}>{cat.name}</span>
    </motion.div>
  );
}

function ResultCard({ post }: { post: Post }) {
  const [hasError, setHasError] = React.useState(false);
  if (hasError) return null;
  return (
    <motion.div 
      layout
      className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm"
    >
      <div className="aspect-square overflow-hidden">
        <SafeImage 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
          aspectRatio="aspect-square"
          onLoadError={() => setHasError(true)}
        />
      </div>
      <div className="p-3">
        <h4 className="text-[10px] font-headline font-black uppercase text-zinc-400 mb-1">{post.category}</h4>
        <h3 className="text-xs font-headline font-bold truncate text-zinc-900 dark:text-zinc-100">{post.title}</h3>
      </div>
    </motion.div>
  );
}

function FeaturedCard() {
  const [hasError, setHasError] = React.useState(false);
  if (hasError) return null;
  return (
    <div className="md:col-span-4 group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <SafeImage 
          className="group-hover:scale-105 transition-transform duration-500" 
          src="https://picsum.photos/seed/display/800/450" 
          alt="Featured"
          aspectRatio="aspect-video"
          onLoadError={() => setHasError(true)}
        />
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-headline font-bold tracking-widest uppercase z-20">
          New Release
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-zinc-100">
            <SafeImage src="https://picsum.photos/seed/avatar2/100/100" alt="Avatar" className="rounded-full" aspectRatio="aspect-square" />
          </div>
          <div>
            <h4 className="text-sm font-headline font-bold leading-none truncate">CollectorElite_88</h4>
            <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider truncate">2 hours ago • Rare Finds</p>
          </div>
        </div>
        <h3 className="font-headline font-extrabold text-xl mb-2 text-zinc-900 dark:text-zinc-100">Unboxing the 25th Anniversary Platinum Set</h3>
        <p className="text-zinc-500 font-body text-sm leading-relaxed line-clamp-2">
          Just secured the complete set. The holographic detailing on these cards is absolutely insane compared to previous editions...
        </p>
      </div>
    </div>
  );
}

function ProductSpotlight() {
  const [hasError, setHasError] = React.useState(false);
  if (hasError) return null;
  return (
    <div className="md:col-span-2 group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      <div className="flex-1 relative bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <SafeImage 
          className="group-hover:scale-110 transition-transform duration-500" 
          src="https://picsum.photos/seed/toy/400/400" 
          alt="Product"
          aspectRatio="aspect-square"
          onLoadError={() => setHasError(true)}
        />
        <button className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur rounded-full shadow-sm hover:scale-110 transition-transform z-20">
          <Heart size={16} />
        </button>
      </div>
      <div className="p-5 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-[10px] font-headline font-bold text-zinc-400 uppercase tracking-widest mb-1">Recommended Product</p>
        <h3 className="font-headline font-bold text-sm mb-1 truncate">Neo-Kyoto Vinyl Figurine</h3>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-headline font-black">$124.00</span>
          <button className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-[10px] font-headline font-bold uppercase tracking-widest">Add</button>
        </div>
      </div>
    </div>
  );
}
