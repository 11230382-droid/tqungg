/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Post, Comment, User } from '../types';
import { ChevronLeft, Heart, MessageCircle, Send, MoreHorizontal, Share2, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PostDetailScreenProps {
  post: Post;
  currentUser: User;
  onBack: () => void;
  onLikeToggle: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onWishlistToggle?: (postId: string) => void;
}

export default function PostDetailScreen({ post, currentUser, onBack, onLikeToggle, onAddComment, onWishlistToggle }: PostDetailScreenProps) {
  const [commentText, setCommentText] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      setCommentText('');
    }
  };

  const displayImages = post.images && post.images.length > 0 ? post.images : [post.image];

  return (
    <div className="pt-16 pb-32 min-h-screen bg-white dark:bg-zinc-950">
      {/* Custom Header for Detail View */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-4 border-b border-zinc-100 dark:border-zinc-800">
        <button onClick={onBack} className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
           <img src={post.user.avatar} alt={post.user.username} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
           <span className="font-headline font-bold text-sm tracking-tight">{post.user.username}</span>
        </div>
        <button className="p-2">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Image Carousel / Display */}
        <section className="relative aspect-square md:aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900">
           <AnimatePresence mode="wait">
             <motion.img 
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={displayImages[activeImageIndex]} 
                alt={post.title} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
             />
           </AnimatePresence>
           
           {displayImages.length > 1 && (
             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
               {displayImages.map((_, i) => (
                 <button 
                    key={i} 
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeImageIndex ? 'bg-zinc-900 dark:bg-zinc-50 w-4' : 'bg-zinc-300 dark:bg-zinc-700'}`} 
                 />
               ))}
             </div>
           )}
        </section>

        {/* Post Actions & Content */}
        <section className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => onLikeToggle(post.id)}
                className={`flex items-center gap-2 group transition-all ${post.likedByCurrentUser ? 'text-red-500 font-bold scale-110' : 'text-zinc-600 dark:text-zinc-400'}`}
              >
                <Heart size={24} fill={post.likedByCurrentUser ? 'currentColor' : 'none'} className="group-active:scale-125 transition-transform" />
                <span className="text-sm">{post.likes.toLocaleString()}</span>
              </button>
              <button className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <MessageCircle size={24} />
                <span className="text-sm">{post.comments.length}</span>
              </button>
              <button className="text-zinc-600 dark:text-zinc-400">
                <Share2 size={24} />
              </button>
              <button 
                onClick={() => onWishlistToggle?.(post.id)}
                className={`transition-all ${post.isWishlisted ? 'text-zinc-900 dark:text-zinc-50 scale-110' : 'text-zinc-400'}`}
              >
                <Bookmark size={24} fill={post.isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
            {post.estimatedValue && (
              <div className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-center">
                <p className="text-[10px] font-black uppercase tracking-widest leading-none">Est. Value</p>
                <p className="font-headline font-black text-lg leading-tight mt-0.5">{post.estimatedValue}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-black font-headline tracking-tighter uppercase leading-tight">{post.title}</h1>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              {post.caption}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags?.map(tag => (
                <span key={tag} className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-50 dark:bg-zinc-900 px-2 py-1 rounded">#{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="px-6 py-10 border-t border-zinc-100 dark:border-zinc-800">
          <h3 className="font-headline font-black text-xl mb-8 uppercase tracking-widest">Discussions ({post.comments.length})</h3>
          
          <div className="space-y-8 mb-12">
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <img src={comment.user.avatar || 'https://picsum.photos/seed/user/100/100'} alt={comment.user.username} className="w-10 h-10 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-headline font-bold text-sm tracking-tight">{comment.user.username}</span>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-400 py-10 font-medium italic">No comments yet. Start the conversation!</p>
            )}
          </div>

          {/* Comment Input */}
          <form onSubmit={handleSendComment} className="relative">
            <input 
              type="text" 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add an insight..." 
              className="w-full h-14 pl-6 pr-14 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 font-medium"
            />
            <button 
              type="submit"
              disabled={!commentText.trim()}
              className="absolute right-3 top-3 w-8 h-8 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full flex items-center justify-center disabled:opacity-30 transition-all font-bold"
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
