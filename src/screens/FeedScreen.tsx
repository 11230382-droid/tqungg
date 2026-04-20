/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MoreHorizontal, Heart, MessageCircle, Share2, Plus, Bookmark } from 'lucide-react';
import { Post, User, Seller } from '../types';
import { motion } from 'motion/react';
import RankingSection from '../components/RankingSection';

interface FeedScreenProps {
  posts: Post[];
  collectors: User[];
  sellers: Seller[];
  onPostClick: (post: Post) => void;
  onCollectorClick: (user: User) => void;
  onSellerClick: (seller: Seller) => void;
  onWishlistToggle?: (postId: string) => void;
  wishlist?: string[];
}

export default function FeedScreen({ 
  posts, 
  collectors, 
  sellers, 
  onPostClick, 
  onCollectorClick, 
  onSellerClick,
  onWishlistToggle, 
  wishlist = [] 
}: FeedScreenProps) {
  return (
    <div className="pt-20 px-4 md:px-6 max-w-5xl mx-auto pb-32">
      <section className="mb-8">
        <h1 className="font-headline font-black text-4xl tracking-tighter mb-2">Community Feed</h1>
        <p className="text-zinc-500 font-medium">Trending collections from the community today.</p>
      </section>

      {/* Live Discussion Hub */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-50">Live Discussion Hub</h2>
           <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase text-red-500">1.2k Active</span>
           </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
           {[
             { name: 'Marcus', img: 'https://picsum.photos/seed/u1/100/100', topic: 'Grail Hunt' },
             { name: 'Sarah', img: 'https://picsum.photos/seed/u2/100/100', topic: 'Mint Check' },
             { name: 'Vex', img: 'https://picsum.photos/seed/u3/100/100', topic: 'Market Dip' },
             { name: 'Kira', img: 'https://picsum.photos/seed/u4/100/100', topic: 'Release' },
             { name: 'Jace', img: 'https://picsum.photos/seed/u5/100/100', topic: 'Auction' }
           ].map((live, i) => (
             <div key={i} className="flex-shrink-0 group cursor-pointer">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-red-500 to-orange-500">
                    <div className="w-full h-full rounded-[14px] overflow-hidden border-2 border-white dark:border-zinc-950">
                      <img src={live.img} className="w-full h-full object-cover" alt="User" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-lg">Live</div>
                </div>
                <p className="text-center text-[9px] font-bold mt-2 text-zinc-900 dark:text-zinc-50 truncate w-16">{live.name}</p>
             </div>
           ))}
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {posts.map((post, index) => (
          <PostCard 
            key={post.id} 
            post={post} 
            index={index} 
            isWishlisted={wishlist.includes(post.id)}
            onClick={() => onPostClick(post)} 
            onWishlistToggle={onWishlistToggle}
          />
        ))}
      </div>

      {/* Ranking Section */}
      <RankingSection 
        collectors={collectors} 
        sellers={sellers} 
        onCollectorClick={onCollectorClick}
        onSellerClick={onSellerClick}
      />

      <button className="fixed right-6 bottom-28 w-14 h-14 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40">
        <Plus size={28} />
      </button>
    </div>
  );
}

interface PostCardProps {
  post: Post;
  index: number;
  isWishlisted: boolean;
  onClick: () => void;
  onWishlistToggle?: (postId: string) => void;
  key?: React.Key;
}

function PostCard({ post, index, isWishlisted, onClick, onWishlistToggle }: PostCardProps) {
  const isLarge = post.type === 'large';
  const isWide = post.type === 'wide';
  const isVertical = post.type === 'vertical';

  const colSpan = isLarge || isWide ? 'col-span-2' : 'col-span-1';
  const rowSpan = isLarge || isVertical ? 'row-span-2' : 'row-span-1';

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWishlistToggle?.(post.id);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`${colSpan} ${rowSpan} bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col cursor-pointer active:scale-[0.98] transition-transform`}
    >
      <div className={`relative overflow-hidden ${isWide ? 'flex h-40' : 'flex-1'}`}>
        <div className={`${isWide ? 'w-1/2' : 'h-full w-full'}`}>
          <img
            src={post.image}
            alt={post.caption}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          {post.isPremium && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
              PREMIUM FIG
            </div>
          )}
          <button 
            onClick={handleWishlistClick}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all ${isWishlisted ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900' : 'bg-white/50 backdrop-blur shadow-sm text-zinc-600'}`}
          >
            <Bookmark size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {isWide ? (
          <div className="w-1/2 p-4 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[8px] text-white font-bold">
                DR
              </div>
              <p className="text-[11px] font-bold font-headline">{post.user.username}</p>
            </div>
            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 line-clamp-2">{post.caption}</p>
            <div className="mt-3 flex items-center gap-3 text-zinc-400">
               <div className="flex items-center gap-1">
                 <Heart size={16} className={post.likedByCurrentUser ? 'text-red-500' : ''} fill={post.likedByCurrentUser ? 'currentColor' : 'none'} />
                 <span className="text-[10px] font-bold">{post.likes}</span>
               </div>
               <div className="flex items-center gap-1">
                 <MessageCircle size={16} />
                 <span className="text-[10px] font-bold">{post.comments.length}</span>
               </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.user.avatar || 'https://picsum.photos/seed/avatar/100/100'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full bg-zinc-100 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-sm font-bold font-headline leading-none">{post.user.username}</p>
                  <p className="text-[10px] text-zinc-500 mt-1">{post.timestamp}</p>
                </div>
              </div>
              <button className="text-zinc-400 hover:text-zinc-900">
                <MoreHorizontal size={18} />
              </button>
            </div>
            
            {!isVertical && !isLarge && <div className="h-0" />}
            
            <p className={`text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed mb-4 ${isLarge ? 'line-clamp-3' : 'hidden'}`}>
              {post.caption}
            </p>

            <div className="flex items-center gap-6 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
              <button className="flex items-center gap-2 text-xs font-semibold hover:text-zinc-900 transition-colors">
                <Heart size={18} className={post.likedByCurrentUser ? 'text-red-500' : 'text-zinc-400'} fill={post.likedByCurrentUser ? 'currentColor' : 'none'} /> {post.likes.toLocaleString()}
              </button>
              <button className="flex items-center gap-2 text-xs font-semibold hover:text-zinc-900 transition-colors">
                <MessageCircle size={18} className="text-zinc-400" /> {post.comments.length}
              </button>
              <button className="flex items-center gap-2 text-xs font-semibold ml-auto text-zinc-400">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
