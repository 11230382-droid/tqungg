/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Screen, Post, Asset, NewsArticle, User, Seller } from './types';
import TopAppBar from './components/TopAppBar';
import BottomNavBar from './components/BottomNavBar';
import FeedScreen from './screens/FeedScreen';
import NewsScreen from './screens/NewsScreen';
import SearchScreen from './screens/SearchScreen';
import RewardsScreen from './screens/RewardsScreen';
import ProfileScreen from './screens/ProfileScreen';
import MuseumScreen from './screens/MuseumScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ArticleDetailScreen from './screens/ArticleDetailScreen';
import WishlistScreen from './screens/WishlistScreen';
import GamesScreen from './screens/GamesScreen';
import { AnimatePresence, motion } from 'motion/react';
import { posts as mockPosts, currentUser, articles as mockArticles, allAssets, scanningAsset, sellers as mockSellers, topCollectors as mockCollectors } from './mockData';
import { Bookmark, Share2, MoreHorizontal } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('feed');
  const [posts, setPosts] = useState<Post[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [collectors, setCollectors] = useState<User[]>([]);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Asset | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [previousScreen, setPreviousScreen] = useState<Screen>('feed');
  const [wishlist, setWishlist] = useState<{ posts: string[], products: string[] }>({ posts: [], products: [] });
  const [museumItemIds, setMuseumItemIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // View position memory
  const scrollPositions = useRef<Record<string, number>>({});
  const lastViewKey = useRef<string>('');

  const currentViewKey = (() => {
    switch (activeScreen) {
      case 'feed': return `feed:${activeCategory || 'all'}`;
      case 'post-detail': return `post:${selectedPost?.id || 'none'}`;
      case 'product-detail': return `product:${selectedProduct?.id || 'none'}`;
      case 'article-detail': return `article:${selectedArticle?.id || 'none'}`;
      case 'profile': return `profile:${selectedUser?.id || 'me'}`;
      case 'search': return 'search';
      case 'news': return 'news';
      case 'rewards': return 'rewards';
      case 'games': return 'games';
      case 'scanning': return 'scanning';
      case 'wishlist': return 'wishlist';
      default: return activeScreen;
    }
  })();

  useEffect(() => {
    const handleScrollReset = () => {
      // Save current scroll for the view we are leaving
      if (lastViewKey.current) {
        scrollPositions.current[lastViewKey.current] = window.scrollY;
      }
      
      // Determine target scroll position
      const targetScroll = scrollPositions.current[currentViewKey] || 0;
      
      // Execute scroll
      window.scrollTo({
        top: targetScroll,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
      
      lastViewKey.current = currentViewKey;
    };

    handleScrollReset();
  }, [currentViewKey]);

  // Initialize data
  useEffect(() => {
    setPosts(mockPosts);
    setArticles(mockArticles);
    setSellers(mockSellers);
    setCollectors(mockCollectors);

    // Initial museum items: all assets except a2 (scanningAsset)
    setMuseumItemIds(allAssets.filter(a => a.id !== 'a2').map(a => a.id));
    
    // Load wishlist from local storage if available
    const savedWishlist = localStorage.getItem('collector_wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('collector_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // XP logic: each product in wishlist increases current user XP in collectors list
  useEffect(() => {
    setCollectors(prev => prev.map(c => {
      if (c.id === currentUser.id) {
        const baseXP = 8000;
        const wishlistXP = wishlist.products.length * 500;
        return { ...c, xp: baseXP + wishlistXP };
      }
      return c;
    }));
  }, [wishlist.products.length]);

  const [isScanningResultInView, setIsScanningResultInView] = useState(false);

  useEffect(() => {
    if (activeScreen !== 'scanning') {
      setIsScanningResultInView(false);
    }
  }, [activeScreen]);

  const handlePostClick = (post: Post) => {
    setPreviousScreen(activeScreen);
    setSelectedPost(post);
    setActiveScreen('post-detail');
  };

  const handleProductClick = (product: Asset) => {
    setPreviousScreen(activeScreen);
    setSelectedProduct(product);
    setActiveScreen('product-detail');
  };

  const handleCollectorClick = (user: User) => {
    setPreviousScreen(activeScreen);
    setSelectedUser(user);
    setActiveScreen('profile');
  };

  const handleSellerClick = (seller: Seller) => {
    setPreviousScreen(activeScreen);
    setSelectedUser({
      id: seller.id,
      name: seller.name,
      username: seller.name.toLowerCase().replace(/\s/g, '_'),
      avatar: seller.avatar,
      role: seller.specialty,
      location: seller.location,
      followers: '5k',
      following: '120',
      itemCount: '450',
      totalValue: '$84k',
      xp: seller.rating * 1000
    });
    setActiveScreen('profile');
  };

  const handleArticleClick = (article: NewsArticle) => {
    setPreviousScreen(activeScreen);
    setSelectedArticle(article);
    setActiveScreen('article-detail');
  };

  const togglePostWishlist = (postId: string) => {
    setWishlist(prev => {
      const isIncluded = prev.posts.includes(postId);
      return {
        ...prev,
        posts: isIncluded ? prev.posts.filter(id => id !== postId) : [...prev.posts, postId]
      };
    });
  };

  const toggleProductWishlist = (productId: string) => {
    setWishlist(prev => {
      const isIncluded = prev.products.includes(productId);
      return {
        ...prev,
        products: isIncluded ? prev.products.filter(id => id !== productId) : [...prev.products, productId]
      };
    });
  };

  const handleLikeToggle = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.likedByCurrentUser;
        return {
          ...p,
          likedByCurrentUser: isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
    
    if (selectedPost?.id === postId) {
      setSelectedPost(prev => {
        if (!prev) return null;
        const isLiked = !prev.likedByCurrentUser;
        return {
          ...prev,
          likedByCurrentUser: isLiked,
          likes: isLiked ? prev.likes + 1 : prev.likes - 1
        };
      });
    }
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      user: currentUser,
      text,
      timestamp: 'Just now'
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [newComment, ...p.comments]
        };
      }
      return p;
    }));

    if (selectedPost?.id === postId) {
      setSelectedPost(prev => prev ? {
        ...prev,
        comments: [newComment, ...prev.comments]
      } : null);
    }
  };

  const handleBack = () => {
    setActiveScreen(previousScreen);
  };

  const handleAddToMuseum = (productId: string) => {
    setMuseumItemIds(prev => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const wishlistedPosts = posts.filter(p => wishlist.posts.includes(p.id));
  const wishlistedProducts = allAssets.filter(p => wishlist.products.includes(p.id));

  const renderScreen = () => {
    switch (activeScreen) {
      case 'feed':
        return (
          <FeedScreen 
            posts={posts} 
            collectors={collectors}
            sellers={sellers}
            onPostClick={handlePostClick} 
            onCollectorClick={handleCollectorClick}
            onSellerClick={handleSellerClick}
            onWishlistToggle={togglePostWishlist}
            wishlist={wishlist.posts}
            activeCategory={activeCategory || undefined}
            isCategoryMenuOpen={isCategoryMenuOpen}
            onCategorySelect={(cat) => setActiveCategory(cat)}
            onCloseCategoryMenu={() => setIsCategoryMenuOpen(false)}
          />
        );
      case 'news':
        return <NewsScreen onArticleClick={handleArticleClick} />;
      case 'games':
        return <GamesScreen collectedItems={wishlistedProducts} />;
      case 'search':
        return <SearchScreen onScanTrigger={() => setActiveScreen('scanning')} />;
      case 'rewards':
        return (
          <RewardsScreen 
            collectors={collectors}
            sellers={sellers}
            onCollectorClick={handleCollectorClick}
            onSellerClick={handleSellerClick}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            user={selectedUser || currentUser}
            onProductClick={handleProductClick} 
            onPostClick={handlePostClick}
            wishlist={wishlist} 
            allPosts={posts}
            allAssets={allAssets}
            museumItemIds={museumItemIds}
          />
        );
      case 'scanning':
        return (
          <MuseumScreen 
            onBack={() => {
              if (previousScreen) {
                setActiveScreen(previousScreen);
              } else {
                setActiveScreen('search');
              }
            }}
            onMuseumClick={() => {
              handleAddToMuseum(scanningAsset.id);
              setSelectedProduct(scanningAsset);
              setActiveScreen('product-detail');
            }}
            isInMuseum={museumItemIds.includes(scanningAsset.id)}
            onResultInView={setIsScanningResultInView}
          />
        );
      case 'wishlist':
        return (
          <WishlistScreen 
            wishlistedPosts={wishlistedPosts}
            wishlistedProducts={wishlistedProducts}
            onPostClick={handlePostClick}
            onProductClick={handleProductClick}
            onPostWishlistToggle={togglePostWishlist}
            onProductWishlistToggle={toggleProductWishlist}
            onBack={handleBack}
          />
        );
      case 'post-detail':
        return selectedPost ? (
          <PostDetailScreen 
            post={{...selectedPost, isWishlisted: wishlist.posts.includes(selectedPost.id)}} 
            currentUser={currentUser}
            onBack={handleBack}
            onLikeToggle={handleLikeToggle}
            onAddComment={handleAddComment}
            onWishlistToggle={togglePostWishlist}
          />
        ) : (
          <FeedScreen 
            posts={posts} 
            collectors={collectors}
            sellers={sellers}
            onPostClick={handlePostClick} 
            onCollectorClick={handleCollectorClick}
            onSellerClick={handleSellerClick}
            onWishlistToggle={togglePostWishlist}
            wishlist={wishlist.posts}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailScreen 
            product={{...selectedProduct, isWishlisted: wishlist.products.includes(selectedProduct.id)}} 
            onBack={handleBack}
            onWishlistToggle={toggleProductWishlist}
            onMuseumClick={() => handleAddToMuseum(selectedProduct.id)}
            isInMuseum={museumItemIds.includes(selectedProduct.id)}
          />
        ) : (
          <ProfileScreen 
            user={currentUser}
            onProductClick={handleProductClick} 
            onPostClick={handlePostClick}
            wishlist={wishlist} 
            allPosts={posts}
            allAssets={allAssets}
            museumItemIds={museumItemIds}
          />
        );
      case 'article-detail':
        return selectedArticle ? (
          <ArticleDetailScreen 
            article={selectedArticle} 
            onBack={handleBack}
          />
        ) : <NewsScreen onArticleClick={handleArticleClick} />;
      default:
        return <FeedScreen 
          posts={posts} 
          collectors={collectors}
          sellers={sellers}
          onPostClick={handlePostClick} 
          onCollectorClick={handleCollectorClick}
          onSellerClick={handleSellerClick}
        />;
    }
  };

  const getTitle = () => {
    if (activeScreen === 'scanning' && !isScanningResultInView) {
      return "LIVE RECOGNITION";
    }
    return "COLLECSEUM";
  };

  const getHeaderActions = () => {
    if (activeScreen === 'post-detail' && selectedPost) {
      return (
        <div className="flex items-center gap-2">
          <button 
             onClick={() => togglePostWishlist(selectedPost.id)}
             className={`p-2 transition-all ${wishlist.posts.includes(selectedPost.id) ? 'text-zinc-900 dark:text-zinc-50 scale-110' : 'text-zinc-400'}`}
          >
            <Bookmark size={20} fill={wishlist.posts.includes(selectedPost.id) ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 text-zinc-900 dark:text-zinc-50">
            <MoreHorizontal size={20} />
          </button>
        </div>
      );
    }
    if (activeScreen === 'product-detail' && selectedProduct) {
      return (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleProductWishlist(selectedProduct.id)}
            className={`p-2 transition-all ${wishlist.products.includes(selectedProduct.id) ? 'text-zinc-900 dark:text-zinc-50 scale-110' : 'text-zinc-400'}`}
          >
            <Bookmark size={20} fill={wishlist.products.includes(selectedProduct.id) ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 text-zinc-900 dark:text-zinc-50">
            <Share2 size={20} />
          </button>
          <button className="p-2 text-zinc-900 dark:text-zinc-50">
            <MoreHorizontal size={20} />
          </button>
        </div>
      );
    }
    if (activeScreen === 'article-detail') {
      return (
        <div className="flex items-center gap-2">
          <button className="p-2 text-zinc-900 dark:text-zinc-50">
            <Bookmark size={20} />
          </button>
          <button className="p-2 text-zinc-900 dark:text-zinc-50">
            <Share2 size={20} />
          </button>
        </div>
      );
    }
    return undefined;
  };

  const showBottomNav = activeScreen !== 'post-detail' && activeScreen !== 'product-detail' && activeScreen !== 'scanning' && activeScreen !== 'wishlist';

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-body selection:bg-zinc-200">
      <TopAppBar 
        title={getTitle()} 
        onSearchClick={() => {
          setPreviousScreen(activeScreen);
          setActiveScreen('search');
        }}
        onBackClick={activeScreen !== 'feed' ? handleBack : (activeCategory ? () => setActiveCategory(null) : undefined)}
        onMenuClick={activeScreen === 'feed' && !activeCategory ? () => setIsCategoryMenuOpen(prev => !prev) : undefined}
        rightContent={getHeaderActions()}
        notificationCount={2}
      />
      
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {showBottomNav && (
        <BottomNavBar 
          activeScreen={activeScreen} 
          onScreenChange={(screen) => {
            if (activeScreen === screen) {
              // Tapping active tab scrolls to top
              window.scrollTo({ top: 0, behavior: 'smooth' });
              scrollPositions.current[currentViewKey] = 0;
              
              // If on feed with category, or profile with another user, tapping again resets to main view
              if (screen === 'feed' && activeCategory) {
                setActiveCategory(null);
              } else if (screen === 'profile' && selectedUser) {
                setSelectedUser(null);
              }
              return;
            }
            setSelectedUser(null);
            setPreviousScreen(activeScreen);
            setActiveScreen(screen);
          }} 
        />
      )}
    </div>
  );
}
