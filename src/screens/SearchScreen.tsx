/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { Search, Camera, Heart, X, ChevronRight, ShoppingCart, ArrowRightLeft } from 'lucide-react';
import { categories, auctions, posts, allAssets, articles, marketListings } from '../mockData';
import { motion, AnimatePresence } from 'motion/react';
import { Post, Asset, NewsArticle, Listing } from '../types';

export default function SearchScreen({ 
  onScanTrigger, 
  onProductClick, 
  onMarketListingsClick,
  onPostClick,
  onArticleClick
}: { 
  onScanTrigger: () => void, 
  onProductClick?: (asset: Asset) => void,
  onMarketListingsClick?: () => void,
  onPostClick?: (post: Post) => void,
  onArticleClick?: (article: NewsArticle) => void
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredPosts = React.useMemo(() => {
    let results = posts;
    const query = searchQuery.toLowerCase();
    if (selectedCategory) {
      results = results.filter(post => post.category === selectedCategory);
    } else if (searchQuery) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.caption.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query)
      );
    }
    return results;
  }, [searchQuery, selectedCategory]);

  const filteredNews = React.useMemo(() => {
    let results = articles;
    const query = searchQuery.toLowerCase();
    if (selectedCategory) {
      results = results.filter(article => article.category === selectedCategory || (selectedCategory === 'New Releases' && article.category === 'New Releases'));
      // Note: mapping selectedCategory to article category if needed
      // Some categories might not perfectly match, let's keep it simple
    } else if (searchQuery) {
      results = results.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.description.toLowerCase().includes(query) ||
        article.category?.toLowerCase().includes(query)
      );
    }
    return results;
  }, [searchQuery, selectedCategory]);

  const filteredListings = React.useMemo(() => {
    let results = marketListings;
    const query = searchQuery.toLowerCase();
    
    if (selectedCategory) {
      results = results.filter(listing => {
        const asset = allAssets.find(a => a.id === listing.assetId);
        return asset?.category === selectedCategory;
      });
    } else if (searchQuery) {
      results = results.filter(listing => {
        const asset = allAssets.find(a => a.id === listing.assetId);
        return asset?.name.toLowerCase().includes(query) || 
               asset?.category.toLowerCase().includes(query) ||
               listing.type.toLowerCase().includes(query);
      });
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
          {categories.map((cat, index) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <motion.div 
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group flex flex-col items-center gap-2 cursor-pointer transition-opacity ${isSelected ? 'ring-2 ring-zinc-900 dark:ring-white rounded-xl p-1 bg-zinc-50 dark:bg-zinc-800/50' : ''}`}
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={cat.image || null} 
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-transparent' : 'bg-black/10 group-hover:bg-transparent'}`}></div>
                </div>
                <span className={`text-[9px] font-bold text-center truncate w-full uppercase tracking-tight ${isSelected ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900'}`}>{cat.name}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trending / Selling Section - Marketplace context */}
      {!isSearching && (
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="font-headline font-bold text-2xl text-zinc-900 dark:text-zinc-100 tracking-tight">Market Listings</h2>
            <button 
              onClick={onMarketListingsClick}
              className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-4 py-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              View All Listings
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allAssets.filter(asset => ['a10', 'a11', 'a12'].includes(asset.id)).map((item) => (
              <div 
                key={item.id} 
                onClick={() => onProductClick?.(item)}
                className="group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 mb-4 relative flex items-center justify-center p-6">
                  <img src={item.image || null} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-2 left-2 bg-indigo-500 text-white px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg">
                    Selling
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">
                    {item.scarcity}
                  </div>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">{item.category}</p>
                <h3 className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate mb-2">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-headline font-black text-zinc-900 dark:text-zinc-50">{item.price}</span>
                  <span className="text-[10px] font-black text-green-500">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {isSearching ? (
        <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* MARKETPLACE SECTION */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <h2 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">
                Market Listings ({filteredListings.length})
              </h2>
            </div>
            
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredListings.map((listing) => {
                  const asset = allAssets.find(a => a.id === listing.assetId);
                  if (!asset) return null;
                  return (
                    <motion.div 
                      layout
                      key={listing.id}
                      onClick={() => onProductClick?.(asset)}
                      className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-3 flex gap-4 cursor-pointer shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="w-20 h-20 rounded-xl bg-zinc-50 dark:bg-zinc-950 flex-shrink-0 flex items-center justify-center p-2 relative overflow-hidden">
                        <img src={asset.image || null} alt={asset.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className={`absolute bottom-0 left-0 right-0 py-0.5 text-[7px] font-black uppercase tracking-widest text-center text-white ${listing.type === 'Selling' ? 'bg-indigo-500' : 'bg-emerald-500'}`}>
                          {listing.type}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400 truncate flex-1">{asset.category}</p>
                          {listing.type === 'Selling' && (
                            <span className="text-xs font-headline font-black text-zinc-900 dark:text-zinc-50">{listing.price}</span>
                          )}
                        </div>
                        <h3 className="font-headline font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate mb-1">{asset.name}</h3>
                        <div className="flex items-center gap-1.5 mt-2 overflow-hidden">
                          <img src={listing.seller.avatar || null} className="w-4 h-4 rounded-full" alt="" referrerPolicy="no-referrer" />
                          <span className="text-[8px] font-bold text-zinc-500 truncate">Listed by {listing.seller.username}</span>
                        </div>
                        {listing.note && (
                          <p className="text-[8px] text-zinc-400 mt-1 line-clamp-1 italic">"{listing.note}"</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <p className="text-zinc-400 text-xs italic py-4">No active listings found for this category.</p>
            )}
          </div>

          {/* NEWS SECTION */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <h2 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">
                News ({filteredNews.length})
              </h2>
            </div>
            
            {filteredNews.length > 0 ? (
              <div className="space-y-4">
                {filteredNews.map((article) => (
                  <motion.div 
                    layout
                    key={article.id}
                    onClick={() => onArticleClick?.(article)}
                    className="flex gap-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3 rounded-xl shadow-sm cursor-pointer group"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100">
                      <img 
                        src={article.image || null} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] font-black bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded uppercase text-zinc-500">{article.publisher}</span>
                        <span className="text-[8px] font-bold text-zinc-400 uppercase">{article.timestamp}</span>
                      </div>
                      <h3 className="text-sm font-headline font-black text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-2">{article.title}</h3>
                      <p className="text-[10px] text-zinc-500 line-clamp-2 leading-tight">{article.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-xs italic py-4">No news or updates found for this category.</p>
            )}
          </div>

          {/* POSTS SECTION */}
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <h2 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">
                Posts ({filteredPosts.length})
              </h2>
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredPosts.map((post) => (
                  <motion.div 
                    layout
                    key={post.id}
                    onClick={() => onPostClick?.(post)}
                    className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col cursor-pointer group"
                  >
                    <div className="aspect-square overflow-hidden bg-zinc-100">
                      <img 
                        src={post.image || null} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <img src={post.user.avatar || null} className="w-4 h-4 rounded-full" alt="" referrerPolicy="no-referrer" />
                        <span className="text-[8px] font-black uppercase text-zinc-400 truncate">{post.user.username}</span>
                      </div>
                      <h3 className="text-[11px] font-headline font-bold truncate text-zinc-900 dark:text-zinc-100 mb-0.5">{post.title}</h3>
                      <p className="text-[9px] text-zinc-500 line-clamp-1">{post.caption.substring(0, 40)}...</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-xs italic py-4">No community posts found for this category.</p>
            )}
          </div>
          
          {filteredPosts.length === 0 && filteredNews.length === 0 && filteredListings.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-zinc-500 font-headline uppercase tracking-widest text-sm">No collectibles found for your search.</p>
            </div>
          )}
        </section>
      ) : (
        <section className="space-y-6 pt-4">
          <h2 className="font-headline font-bold text-2xl text-zinc-900 dark:text-zinc-100 tracking-tight">For You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Main Featured Recommendation */}
            <div className="md:col-span-4 group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="https://picsum.photos/seed/display/800/450" 
                  alt="Featured"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-headline font-bold tracking-widest uppercase">
                  New Release
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden">
                    <img src="https://picsum.photos/seed/avatar2/100/100" alt="Avatar" referrerPolicy="no-referrer" />
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

            {/* Product Spotlight */}
            <div className="md:col-span-2 group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
              <div className="flex-1 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 p-6 flex items-center justify-center">
                <img 
                  className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500" 
                  src="https://picsum.photos/seed/toy/400/400" 
                  alt="Product"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur rounded-full shadow-sm hover:scale-110 transition-transform">
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
          </div>
        </section>
      )}
    </div>
  );
}
