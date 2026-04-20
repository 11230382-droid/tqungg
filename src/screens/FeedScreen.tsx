/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MoreHorizontal, Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import { Post } from '../types';
import { posts } from '../mockData';
import { motion } from 'motion/react';

export default function FeedScreen() {
  return (
    <div className="pt-20 px-4 md:px-6 max-w-5xl mx-auto pb-32">
      <section className="mb-8">
        <h1 className="font-headline font-black text-4xl tracking-tighter mb-2">Community Feed</h1>
        <p className="text-zinc-500 font-medium">Trending collections from the community today.</p>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>

      <button className="fixed right-6 bottom-28 w-14 h-14 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40">
        <Plus size={28} />
      </button>
    </div>
  );
}

interface PostCardProps {
  post: Post;
  index: number;
  key?: React.Key;
}

function PostCard({ post, index }: PostCardProps) {
  const isLarge = post.type === 'large';
  const isWide = post.type === 'wide';
  const isVertical = post.type === 'vertical';

  const colSpan = isLarge || isWide ? 'col-span-2' : 'col-span-1';
  const rowSpan = isLarge || isVertical ? 'row-span-2' : 'row-span-1';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${colSpan} ${rowSpan} bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col`}
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
            <div className="mt-3 flex gap-3 text-zinc-400">
               <Heart size={16} />
               <MessageCircle size={16} />
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
                <Heart size={18} className="text-zinc-400" /> {post.likes}
              </button>
              <button className="flex items-center gap-2 text-xs font-semibold hover:text-zinc-900 transition-colors">
                <MessageCircle size={18} className="text-zinc-400" /> {post.comments}
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
