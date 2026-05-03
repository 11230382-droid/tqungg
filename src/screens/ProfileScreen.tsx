/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Verified, Grid, List, ArrowRight, Box, Plus, Bookmark, Image, LayoutGrid, LayoutList, Trophy, TrendingUp, DollarSign, Heart } from 'lucide-react';
import { currentUser } from '../mockData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Asset, Post, User } from '../types';

interface ProfileScreenProps {
  user?: User;
  onProductClick: (product: Asset) => void;
  onPostClick: (post: Post) => void;
  onWishlistClick?: () => void;
  wishlist: { posts: string[], products: string[] };
  savedPostIds: string[];
  allPosts: Post[];
  allAssets: Asset[];
  museumItemIds: string[];
}

export default function ProfileScreen({ user = currentUser, onProductClick, onPostClick, onWishlistClick, wishlist, savedPostIds, allPosts, allAssets, museumItemIds }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'collection' | 'wishlist' | 'saved'>('collection');
  const [collectionView, setCollectionView] = useState<'grid' | 'showcase' | 'ranked'>('grid');
  
  // Custom collection logic
  const isMe = user.id === currentUser.id;
  const ownedItems = isMe 
    ? allAssets.filter(asset => museumItemIds.includes(asset.id))
    : allAssets.slice(0, 3);
  
  const savedPosts = allPosts.filter(p => savedPostIds.includes(p.id));
  const wishlistedProducts = allAssets.filter(p => wishlist.products.includes(p.id));

  // Sorting logic for ranked view
  const rankedItems = [...ownedItems].sort((a, b) => {
    const valA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
    const valB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
    return valB - valA;
  });

  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-32 space-y-10">
      {/* ... prev header code ... */}
      <section className="flex flex-col items-center">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full border-2 border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {user.isVerified && (
            <div className="absolute bottom-0 right-0 bg-zinc-900 dark:bg-zinc-50 w-8 h-8 rounded-full border-4 border-white dark:border-zinc-950 flex items-center justify-center text-white dark:text-zinc-900 shadow-lg">
              <Verified size={14} fill="currentColor" fillOpacity={0.2} />
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 truncate w-full px-4">{user.name}</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1 uppercase tracking-widest leading-none truncate w-full px-4">{user.role || 'Collector'} • {user.location || 'Unknown'}</p>
          {user.xp && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">{user.xp.toLocaleString()} XP</span>
            </div>
          )}
          <p className="text-zinc-400 text-xs mt-4 max-w-xs font-medium leading-relaxed">
            {isMe 
              ? "Curating rare die-cast and high-fidelity figurines since 2012. Always looking for the next grail piece."
              : `Passionate ${user.role || 'collector'} specializing in unique finds.`}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 w-full mt-8 py-6 border-y border-zinc-100 dark:border-zinc-800">
          {[
            { label: 'Followers', value: user.followers },
            { label: 'Following', value: user.following },
            { label: 'Items', value: user.itemCount },
            { label: 'Value', value: user.totalValue }
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-black leading-none mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {isMe ? (
          <button className="mt-8 w-full py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold rounded-xl active:scale-[0.98] transition-all text-sm uppercase tracking-widest">
            Edit Profile
          </button>
        ) : (
          <button className="mt-8 w-full py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold rounded-xl active:scale-[0.98] transition-all text-sm uppercase tracking-widest">
            Follow
          </button>
        )}
      </section>

      {/* Recent Scans */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Recent Scans</h2>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest cursor-pointer hover:text-zinc-900">View History</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[
             { time: '2m ago', img: allAssets[0]?.image },
             { time: '1h ago', img: allAssets[2]?.image },
             { time: '4h ago', img: allAssets[3]?.image }
          ].map((scan, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 relative bg-zinc-50 dark:bg-zinc-900">
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

      {/* Tabs */}
      <section className="sticky top-16 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md pt-2 pb-4">
        <div className="flex border-b border-zinc-100 dark:border-zinc-800">
          <button 
            onClick={() => setActiveTab('collection')}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'collection' ? 'text-zinc-900 dark:text-zinc-50 border-b-2 border-zinc-900 dark:border-zinc-50' : 'text-zinc-400'}`}
          >
            Collection
          </button>
          <button 
            onClick={() => setActiveTab('wishlist')}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'wishlist' ? 'text-zinc-900 dark:text-zinc-50 border-b-2 border-zinc-900 dark:border-zinc-50' : 'text-zinc-400'}`}
          >
            Wishlist ({wishlistedProducts.length})
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'saved' ? 'text-zinc-900 dark:text-zinc-50 border-b-2 border-zinc-900 dark:border-zinc-50' : 'text-zinc-400'}`}
          >
            Saved ({savedPosts.length})
          </button>
        </div>
      </section>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'collection' && (
          <motion.section 
            key="collection"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Collection Museum</h2>
              <div className="flex gap-4 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
                <button 
                  onClick={() => setCollectionView('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${collectionView === 'grid' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm' : 'text-zinc-400'}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setCollectionView('showcase')}
                  className={`p-1.5 rounded-lg transition-colors ${collectionView === 'showcase' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm' : 'text-zinc-400'}`}
                >
                  <LayoutList size={16} />
                </button>
                <button 
                  onClick={() => setCollectionView('ranked')}
                  className={`p-1.5 rounded-lg transition-colors ${collectionView === 'ranked' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm' : 'text-zinc-400'}`}
                >
                  <Trophy size={16} />
                </button>
              </div>
            </div>

            {collectionView === 'grid' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ownedItems.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => onProductClick(item)}
                    className="aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative group cursor-pointer active:scale-[0.98] transition-transform shadow-sm"
                  >
                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} referrerPolicy="no-referrer" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[9px] font-black text-white uppercase tracking-tight truncate leading-none">{item.name}</p>
                      <p className="text-[8px] font-bold text-white/70 uppercase mt-1">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {collectionView === 'showcase' && (
              <div className="flex flex-col gap-8">
                {ownedItems.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => onProductClick(item)}
                    className="flex flex-col gap-4 group cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative shadow-md">
                      <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.name} referrerPolicy="no-referrer" />
                      <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg flex items-center gap-2">
                        <TrendingUp size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black tracking-widest text-zinc-900 dark:text-zinc-50 uppercase">Market Value: {item.price}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-headline font-black text-zinc-900 dark:text-zinc-50 tracking-tight text-xl leading-tight">{item.name}</h4>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{item.series} • {item.scarcity || 'Legendary'}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                          <DollarSign size={12} className="text-emerald-500" />
                          <span className="text-xs font-black text-zinc-900 dark:text-zinc-50">{item.price.replace('$', '')}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((bar) => (
                          <div 
                            key={bar} 
                            className={`h-1.5 flex-1 rounded-full ${bar <= 4 ? 'bg-emerald-500' : 'bg-zinc-100 dark:bg-zinc-800'}`}
                          ></div>
                        ))}
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-tight ml-2">Market Strength</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {collectionView === 'ranked' && (
              <div className="space-y-4">
                {rankedItems.map((item, i) => (
                  <div 
                    key={item.id}
                    onClick={() => onProductClick(item)}
                    className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 group cursor-pointer active:scale-[0.98] transition-transform shadow-sm"
                  >
                    <div className="text-2xl font-black text-zinc-200 dark:text-zinc-800 w-8 italic">
                      #{i + 1}
                    </div>
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight truncate">{item.name}</h4>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest truncate">{item.series}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-emerald-500">{item.price}</p>
                      <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mt-1">Value</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        )}
        {activeTab === 'wishlist' && (
          <motion.section 
            key="wishlist"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <Box size={14} className="text-indigo-500" />
                Asset Wishlist ({wishlistedProducts.length})
              </h2>
              <button 
                onClick={onWishlistClick}
                className="text-[10px] font-black uppercase bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-zinc-900 dark:text-zinc-100 active:scale-95 transition-all"
              >
                Manage
              </button>
            </div>
            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {wishlistedProducts.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => onProductClick(item)}
                    className="flex flex-col gap-2 group cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative shadow-sm">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" />
                      <div className="absolute top-2 right-2">
                         <div className="p-1.5 bg-indigo-500 text-white rounded-lg shadow-lg">
                            <Bookmark size={10} fill="currentColor" />
                         </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 truncate">{item.name}</h4>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{item.price}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <Box size={32} className="mx-auto text-zinc-300 mb-4" />
                <p className="text-zinc-500 font-medium text-sm italic">Nothing in your wishlist yet.</p>
              </div>
            )}
          </motion.section>
        )}
        {activeTab === 'saved' && (
          <motion.section 
            key="saved"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <Bookmark size={14} className="text-indigo-500" fill="currentColor" />
                Saved Posts ({savedPosts.length})
              </h2>
            </div>
            {savedPosts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {savedPosts.map((post) => (
                  <div 
                    key={post.id} 
                    onClick={() => onPostClick(post)}
                    className="aspect-square relative rounded-xl overflow-hidden cursor-pointer group active:scale-[0.98] transition-transform shadow-sm"
                  >
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                       <p className="text-white text-[10px] font-black uppercase tracking-tight truncate leading-none">{post.title}</p>
                       <div className="flex items-center gap-1 mt-1 text-white/80 text-[8px] font-bold uppercase tracking-widest">
                          <Heart size={8} className="text-red-500" fill="currentColor" />
                          <span>{post.likes}</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <Bookmark size={32} className="mx-auto text-zinc-300 mb-4" />
                <p className="text-zinc-500 font-medium text-sm italic">No saved posts yet.</p>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
