/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Verified, Grid, List, ArrowRight, Box, Plus, Bookmark, Image } from 'lucide-react';
import { currentUser } from '../mockData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Asset, Post, User } from '../types';

interface ProfileScreenProps {
  user?: User;
  onProductClick: (product: Asset) => void;
  onPostClick: (post: Post) => void;
  wishlist: { posts: string[], products: string[] };
  allPosts: Post[];
  allAssets: Asset[];
}

export default function ProfileScreen({ user = currentUser, onProductClick, onPostClick, wishlist, allPosts, allAssets }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'collection' | 'wishlist'>('collection');
  
  // Custom collection logic: users other than current might have different items, 
  // but for the mock we'll just show all assets or a subset.
  const isMe = user.id === currentUser.id;
  const collectionItems = isMe 
    ? allAssets.filter(asset => asset.id !== 'a2')
    : allAssets.slice(0, 2); // Mock some items for others
  
  const wishlistedPosts = allPosts.filter(p => wishlist.posts.includes(p.id));
  const wishlistedProducts = allAssets.filter(p => wishlist.products.includes(p.id));

  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-32 space-y-10">
      {/* Profile Header */}
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
             { time: '2m ago', img: 'https://picsum.photos/seed/scan_gundam_parts/200/200' },
             { time: '1h ago', img: 'https://picsum.photos/seed/scan_diecast_chassis/200/200' },
             { time: '4h ago', img: 'https://picsum.photos/seed/scan_card_hologram/200/200' }
          ].map((scan, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-zinc-50 dark:ring-zinc-800 ring-offset-2">
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
            Wishlist ({wishlistedPosts.length + wishlistedProducts.length})
          </button>
        </div>
      </section>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'collection' ? (
          <motion.section 
            key="collection"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Collection Museum</h2>
              <div className="flex gap-4 text-zinc-400">
                <Grid size={18} className="text-zinc-900 dark:text-zinc-50" />
                <List size={18} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {collectionItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => onProductClick(item)}
                  className="flex flex-col gap-3 group cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative shadow-sm">
                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4">
                      {wishlist.products.includes(item.id) && (
                        <div className="p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full border border-white/20 text-zinc-900 dark:text-zinc-50 shadow-lg">
                          <Bookmark size={14} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full border border-white/20">
                      <span className="text-[9px] font-black tracking-widest text-zinc-900 dark:text-zinc-50 uppercase">{item.scarcity || 'Authenticated'}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight text-lg leading-tight truncate">{item.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1 truncate">{item.series}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ) : (
          <motion.section 
            key="wishlist"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-12"
          >
            {/* Wishlist Products */}
            {wishlistedProducts.length > 0 && (
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                  <Box size={14} />
                  Saved Assets
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {wishlistedProducts.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => onProductClick(item)}
                      className="flex flex-col gap-2 group cursor-pointer active:scale-[0.98] transition-transform"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" />
                        <div className="absolute top-2 right-2">
                           <div className="p-1.5 bg-zinc-900 text-white rounded-lg">
                              <Bookmark size={10} fill="currentColor" />
                           </div>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 truncate">{item.name}</h4>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Posts */}
            {wishlistedPosts.length > 0 && (
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                  <Image size={14} />
                  Saved Posts
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {wishlistedPosts.map((post) => (
                    <div 
                      key={post.id} 
                      onClick={() => onPostClick(post)}
                      className="flex flex-col gap-2 group cursor-pointer active:scale-[0.98] transition-transform"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
                        <img src={post.image} className="w-full h-full object-cover" alt={post.title} referrerPolicy="no-referrer" />
                        <div className="absolute top-2 right-2">
                           <div className="p-1.5 bg-zinc-900 text-white rounded-lg">
                              <Bookmark size={10} fill="currentColor" />
                           </div>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 truncate">{post.title}</h4>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Est. {post.estimatedValue}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {wishlistedPosts.length === 0 && wishlistedProducts.length === 0 && (
              <div className="py-20 text-center">
                <Bookmark size={32} className="mx-auto text-zinc-300 mb-4" />
                <p className="text-zinc-500 font-medium text-sm italic">Your vault is currently empty.</p>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
