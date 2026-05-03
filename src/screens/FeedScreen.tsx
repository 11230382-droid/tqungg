/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MoreHorizontal, Heart, MessageCircle, Share2, Plus, Bookmark, ChevronRight } from 'lucide-react';
import { Post, User, Seller, Asset } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { collectibleCategories, allAssets as mockAllAssets } from '../mockData';
import LiveDiscussion from '../components/LiveDiscussion';

interface FeedScreenProps {
  posts: Post[];
  collectors: User[];
  sellers: Seller[];
  allAssets: Asset[];
  onPostClick: (post: Post) => void;
  onProductClick: (product: Asset) => void;
  onCollectorClick: (user: User) => void;
  onSellerClick: (seller: Seller) => void;
  onWishlistToggle?: (postId: string) => void;
  onLiveDiscussionClick?: (mode: 'chat' | 'forum') => void;
  wishlist?: string[];
  activeCategory?: string;
  isCategoryMenuOpen?: boolean;
  onCategorySelect?: (category: string | null) => void;
  onCloseCategoryMenu?: () => void;
}

interface SuggestionModule {
  id: string;
  type: 'suggestion';
  title: string;
  items: Post[];
}

interface AssetModule {
  id: string;
  type: 'asset-suggestion';
  title: string;
  items: Asset[];
}

export default function FeedScreen({ 
  posts, 
  collectors, 
  sellers, 
  allAssets,
  onPostClick, 
  onProductClick,
  onCollectorClick, 
  onSellerClick,
  onWishlistToggle, 
  wishlist = [],
  activeCategory,
  isCategoryMenuOpen,
  onCategorySelect,
  onCloseCategoryMenu,
  onLiveDiscussionClick
}: FeedScreenProps) {
  const [displayCount, setDisplayCount] = React.useState(activeCategory ? 20 : 6);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const filteredPosts = React.useMemo(() => {
    return activeCategory 
      ? posts.filter(p => p.category === activeCategory)
      : posts;
  }, [posts, activeCategory]);

  const displayedPosts = filteredPosts.slice(0, displayCount);

  // Generate interleaved feed items (Posts + Suggestions)
  const feedItems = React.useMemo(() => {
    if (activeCategory) return displayedPosts.map(p => ({ ...p, feedType: 'post' as const }));

    const items: ((Post & { feedType: 'post' }) | SuggestionModule | AssetModule)[] = [];
    const suggestionInterval = 3; // Every 3 posts

    displayedPosts.forEach((post, index) => {
      items.push({ ...post, feedType: 'post' });

      // Insert suggestion module at interval
      if ((index + 1) % suggestionInterval === 0 && index < displayedPosts.length - 1) {
        const moduleIndex = Math.floor(index / suggestionInterval);
        
        if (moduleIndex === 0) {
          // First module: Assets / Market Picks
          const sellingItems = allAssets.filter(a => ['a10', 'a11', 'a12'].includes(a.id));
          items.push({
            id: 'market-picks',
            type: 'asset-suggestion',
            title: 'Market Picks',
            items: sellingItems
          });
        } else {
          const suggestionId = `suggestion-${moduleIndex}`;
          const suggestionTitles = [
            'For You',
            'Trending in Action Figures',
            'Suggested Collectors',
            'Community Rare Finds'
          ];
          const title = suggestionTitles[moduleIndex % suggestionTitles.length];
          
          const suggestedItems = posts
            .filter(p => p.id !== post.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

          items.push({
            id: suggestionId,
            type: 'suggestion',
            title,
            items: suggestedItems
          });
        }
      }
    });

    return items;
  }, [displayedPosts, activeCategory, posts, allAssets]);

  // Simple infinite scroll logic
  React.useEffect(() => {
    const handleScroll = () => {
      const threshold = activeCategory ? 800 : 500;
      
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold && !isLoadingMore && displayCount < filteredPosts.length) {
        setIsLoadingMore(true);
        setTimeout(() => {
          const increment = activeCategory ? 10 : 4;
          setDisplayCount(prev => Math.min(prev + increment, filteredPosts.length));
          setIsLoadingMore(false);
        }, 600);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayCount, filteredPosts.length, isLoadingMore, activeCategory]);

  // Reset display count when category changes
  React.useEffect(() => {
    setDisplayCount(activeCategory ? 20 : 6);
  }, [activeCategory]);

  return (
    <div className="pt-20 px-4 md:px-6 max-w-2xl mx-auto pb-32">
      <section className="mb-8 flex justify-between items-end">
        <div>
           <h1 className="font-headline font-black text-4xl tracking-tighter mb-2 text-zinc-900 dark:text-zinc-50">
             {activeCategory ? activeCategory.toUpperCase() : 'COMMUNITY'}
           </h1>
           <p className="text-zinc-500 font-medium text-sm">
             {activeCategory ? `Exploring the best of ${activeCategory}.` : 'Trending collections from the community.'}
           </p>
        </div>
        {activeCategory && (
          <button 
            onClick={() => onCategorySelect?.(null)}
            className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            Clear
          </button>
        )}
      </section>

      {/* Live Discussion Hub */}
      {!activeCategory && <LiveDiscussion onModeSelect={onLiveDiscussionClick} />}

      <div className="flex flex-col gap-10 mb-20">
        <AnimatePresence mode="popLayout">
          {feedItems.map((item, index) => {
            if ('feedType' in item && item.feedType === 'post') {
              return (
                <PostCard 
                  key={item.id} 
                  post={item} 
                  index={index} 
                  isWishlisted={wishlist.includes(item.id)}
                  onClick={() => onPostClick(item)} 
                  onWishlistToggle={onWishlistToggle}
                />
              );
            } else if ('type' in item && item.type === 'suggestion') {
              return (
                <SuggestionCarousel 
                  key={item.id}
                  title={item.title}
                  items={item.items}
                  onItemClick={onPostClick}
                />
              );
            } else if ('type' in item && item.type === 'asset-suggestion') {
              return (
                <AssetCarousel 
                  key={item.id}
                  title={item.title}
                  items={item.items}
                  onItemClick={onProductClick}
                />
              );
            }
            return null;
          })}
        </AnimatePresence>
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-zinc-400 font-medium italic">No posts found for this category yet.</p>
          </div>
        )}
      </div>

      {isLoadingMore && (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
        </div>
      )}

      <button className="fixed right-6 bottom-28 w-14 h-14 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40">
        <Plus size={28} />
      </button>

      {/* Category Selection Overlay */}
      <AnimatePresence>
        {isCategoryMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseCategoryMenu}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-zinc-950 z-[70] shadow-2xl flex flex-col pt-20"
            >
              <div className="px-8 mb-8">
                <h2 className="font-headline font-black text-2xl tracking-tight uppercase">Categories</h2>
                <p className="text-zinc-500 text-sm font-medium">Vietnamese Collector Interest</p>
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-10">
                <div className="grid grid-cols-1 gap-2">
                  {collectibleCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onCategorySelect?.(cat.name);
                        onCloseCategoryMenu?.();
                      }}
                      className={`flex items-center gap-4 p-3 rounded-2xl transition-all active:scale-[0.98] ${activeCategory === cat.name ? 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-zinc-200 border border-zinc-100 dark:border-zinc-800">
                        <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="font-headline font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-50">{cat.name}</span>
                    </button>
                  ))}
                  <button
                      onClick={() => {
                        onCategorySelect?.(null);
                        onCloseCategoryMenu?.();
                      }}
                      className={`flex items-center gap-4 p-3 rounded-2xl transition-all active:scale-[0.98] ${!activeCategory ? 'bg-zinc-100 dark:bg-zinc-900' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-zinc-200 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
                        <Plus size={20} className="text-zinc-500" />
                      </div>
                      <span className="font-headline font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-50">All Collections</span>
                    </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function AssetCarousel({ title, items, onItemClick }: { title: string, items: Asset[], onItemClick: (product: Asset) => void }) {
  return (
    <motion.section 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="py-4 -mx-4 md:-mx-6"
    >
      <div className="flex justify-between items-center px-4 md:px-6 mb-4">
        <h3 className="text-xs font-black font-headline uppercase tracking-[0.2em] text-zinc-400">{title}</h3>
        <button className="flex items-center gap-1 text-zinc-400 hover:text-zinc-900 transition-colors">
          <span className="text-[10px] font-black uppercase tracking-widest">Marketplace</span>
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 md:px-6 no-scrollbar pb-4 scroll-smooth snap-x snap-mandatory">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => onItemClick(item)}
            className="flex-shrink-0 w-48 snap-start active:scale-95 transition-transform cursor-pointer group"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 mb-3 relative flex items-center justify-center p-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-indigo-500 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest shadow-md">
                Selling
              </div>
            </div>
            <h4 className="text-[10px] font-black font-headline uppercase truncate text-zinc-900 dark:text-zinc-50">{item.name}</h4>
            <div className="flex justify-between items-center mt-1">
              <p className="text-[10px] font-bold text-zinc-900 dark:text-zinc-50">{item.price}</p>
              <p className="text-[9px] text-green-500 font-bold">{item.change}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function SuggestionCarousel({ title, items, onItemClick }: { title: string, items: Post[], onItemClick: (post: Post) => void }) {
  return (
    <motion.section 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="py-4 -mx-4 md:-mx-6"
    >
      <div className="flex justify-between items-center px-4 md:px-6 mb-4">
        <h3 className="text-xs font-black font-headline uppercase tracking-[0.2em] text-zinc-400">{title}</h3>
        <button className="flex items-center gap-1 text-zinc-400 hover:text-zinc-900 transition-colors">
          <span className="text-[10px] font-black uppercase tracking-widest">More</span>
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 md:px-6 no-scrollbar pb-4 scroll-smooth snap-x snap-mandatory">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => onItemClick(item)}
            className="flex-shrink-0 w-40 snap-start active:scale-95 transition-transform cursor-pointer"
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 mb-2">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h4 className="text-[10px] font-black font-headline uppercase truncate text-zinc-900 dark:text-zinc-50">{item.title}</h4>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">{item.category}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

interface PostCardProps {
  post: Post;
  index: number;
  isWishlisted: boolean;
  onClick: () => void;
  onWishlistToggle?: (postId: string) => void;
}

function PostCard({ post, index, isWishlisted, onClick, onWishlistToggle }: PostCardProps) {
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWishlistToggle?.(post.id);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-900 group"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.user.avatar || 'https://picsum.photos/seed/avatar/100/100'}
              alt="Avatar"
              className="w-10 h-10 rounded-full bg-zinc-100 object-cover border border-zinc-200 dark:border-zinc-800"
              referrerPolicy="no-referrer"
            />
            {post.isQuestion && (
              <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950">
                ?
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-black font-headline tracking-tight text-zinc-900 dark:text-zinc-50">{post.user.username}</p>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">{post.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.isQuestion && (
             <span className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-zinc-200 dark:border-zinc-800">
               Question
             </span>
          )}
          <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div 
        onClick={onClick}
        className="relative aspect-square md:aspect-[4/5] overflow-hidden cursor-pointer"
      >
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {post.isPremium && (
          <div className="absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest border border-zinc-700 shadow-xl">
            Premium Find
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 pt-5 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 hover:scale-110 transition-transform">
            <Heart 
              size={24} 
              className={post.likedByCurrentUser ? 'text-red-500' : 'text-zinc-900 dark:text-zinc-100'} 
              fill={post.likedByCurrentUser ? 'currentColor' : 'none'} 
            />
          </button>
          <button className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 hover:scale-110 transition-transform">
            <MessageCircle size={24} />
          </button>
          <button className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 hover:scale-110 transition-transform">
            <Share2 size={24} />
          </button>
        </div>
        <button 
          onClick={handleWishlistClick}
          className={`hover:scale-110 transition-transform ${isWishlisted ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-300 dark:text-zinc-700'}`}
        >
          <Bookmark size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Caption Area */}
      <div 
        onClick={onClick}
        className="px-4 pb-6 pt-2 cursor-pointer"
      >
        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          {post.likes.toLocaleString()} likes
        </p>
        <div className="text-sm text-zinc-800 dark:text-zinc-200">
          <span className="font-headline font-black mr-2">{post.user.username}</span>
          <span className="font-medium leading-relaxed opacity-90 line-clamp-2">
            {post.caption}
          </span>
        </div>
        {post.comments.length > 0 && (
          <button 
            className="mt-2 text-xs font-bold text-zinc-400 hover:text-zinc-500 transition-colors uppercase tracking-widest"
          >
            View all {post.comments.length} comments
          </button>
        )}
      </div>
    </motion.article>
  );
}
