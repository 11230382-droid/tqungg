/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Post, Asset } from '../types';
import { Bookmark, ChevronLeft, ArrowRight, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistScreenProps {
  wishlistedPosts: Post[];
  wishlistedProducts: Asset[];
  onPostClick: (post: Post) => void;
  onProductClick: (product: Asset) => void;
  onPostSaveToggle?: (postId: string) => void;
  onProductWishlistToggle?: (productId: string) => void;
  onBack: () => void;
}

export default function WishlistScreen({ 
  wishlistedPosts, 
  wishlistedProducts, 
  onPostClick, 
  onProductClick, 
  onPostSaveToggle,
  onProductWishlistToggle,
  onBack 
}: WishlistScreenProps) {
  const isEmpty = wishlistedPosts.length === 0 && wishlistedProducts.length === 0;

  return (
    <div className="pt-20 pb-32 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <section className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="font-headline font-black text-4xl tracking-tighter uppercase leading-none mb-2">My Wishlist</h1>
            <p className="text-zinc-500 font-medium">Curating your future collection.</p>
          </div>
          <div className="bg-zinc-900/10 dark:bg-zinc-100/10 text-zinc-900 dark:text-zinc-100 p-4 rounded-full">
            <Bookmark size={32} fill="currentColor" />
          </div>
        </section>

        {isEmpty ? (
          <div className="py-20 text-center">
             <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-400">
               <Bookmark size={40} />
             </div>
             <h3 className="font-headline font-black text-xl uppercase mb-2">No Saved Items</h3>
             <p className="text-zinc-500 max-w-xs mx-auto mb-8">Start exploring the community feed and news to build your wishlist.</p>
             <button onClick={onBack} className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all">
                Start Exploring
             </button>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Products Section */}
            {wishlistedProducts.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <Grid size={20} className="text-zinc-900 dark:text-zinc-100" />
                  <h2 className="font-headline font-black text-xl uppercase tracking-widest">Saved Assets ({wishlistedProducts.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlistedProducts.map((product) => (
                    <motion.div 
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => onProductClick(product)}
                      className="group relative bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex gap-6 cursor-pointer hover:shadow-xl transition-all active:scale-[0.98]"
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onProductWishlistToggle?.(product.id);
                        }}
                        className="absolute top-4 right-4 p-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
                      >
                        <Bookmark size={12} fill="currentColor" />
                      </button>
                      <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-2 shrink-0">
                         <img src={product.image} alt={product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col justify-center overflow-hidden min-w-0">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1 truncate">{product.series}</span>
                        <h4 className="font-headline font-black text-lg uppercase leading-tight truncate">{product.name}</h4>
                        <div className="mt-2 flex items-center gap-4">
                           <span className="font-black text-zinc-900 dark:text-zinc-50">{product.price}</span>
                           <span className="text-[10px] bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-2 py-0.5 rounded uppercase font-black">{product.scarcity}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Posts Section */}
            {wishlistedPosts.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <Bookmark size={20} className="text-zinc-900 dark:text-zinc-100" />
                  <h2 className="font-headline font-black text-xl uppercase tracking-widest">Saved Posts ({wishlistedPosts.length})</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistedPosts.map((post) => (
                    <motion.div 
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => onPostClick(post)}
                      className="group aspect-square relative rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onPostSaveToggle?.(post.id);
                        }}
                        className="absolute top-4 right-4 p-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
                      >
                        <Bookmark size={12} fill="currentColor" />
                      </button>
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                        <h4 className="text-white font-headline font-black text-xs uppercase tracking-tight truncate">{post.title}</h4>
                        <p className="text-white/60 text-[9px] font-medium uppercase tracking-widest mt-1 truncate">@{post.user.username}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
