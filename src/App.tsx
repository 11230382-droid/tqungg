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
import MarketListingScreen from './screens/MarketListingScreen';
import GamesScreen from './screens/GamesScreen';
import LiveDiscussionScreen from './screens/LiveDiscussionScreen';
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
  const [marketListingAsset, setMarketListingAsset] = useState<Asset | null>(null);
  const [navigationStack, setNavigationStack] = useState<Screen[]>([]);
  const [discussionMode, setDiscussionMode] = useState<'chat' | 'forum'>('chat');
  const [wishlist, setWishlist] = useState<{ posts: string[], products: string[] }>({ 
    posts: [], 
    products: ['a10', 'a11', 'a12'] 
  });
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [museumItemIds, setMuseumItemIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [focusCommentInput, setFocusCommentInput] = useState(false);

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
      case 'market-listing': return `market:${marketListingAsset?.id || 'all'}`;
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

    // Initial museum items: all assets except a2 (scanningAsset) and new wishlist items
    const excludedIds = ['a2', 'a10', 'a11', 'a12'];
    setMuseumItemIds(allAssets.filter(a => !excludedIds.includes(a.id)).map(a => a.id));
    
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

  const navigateTo = (screen: Screen) => {
    setNavigationStack(prev => [...prev, activeScreen]);
    setActiveScreen(screen);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setFocusCommentInput(false);
    navigateTo('post-detail');
  };

  const handleCommentClick = (post: Post) => {
    setSelectedPost(post);
    setFocusCommentInput(true);
    navigateTo('post-detail');
  };

  const handleProductClick = (product: Asset) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  const handleCollectorClick = (user: User) => {
    setSelectedUser(user);
    navigateTo('profile');
  };

  const handleSellerClick = (seller: Seller) => {
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
    navigateTo('profile');
  };

  const handleSearchMarketListingClick = () => {
    setMarketListingAsset(null);
    navigateTo('market-listing');
  };

  const handleProductMarketListingClick = (product: Asset) => {
    setMarketListingAsset(product);
    navigateTo('market-listing');
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    navigateTo('article-detail');
  };

  const handleLiveDiscussionClick = (mode: 'chat' | 'forum' = 'chat') => {
    setDiscussionMode(mode);
    navigateTo('live-discussion');
  };

  const handleSaveToggle = (postId: string) => {
    setSavedPosts(prev => {
      const isSaved = prev.includes(postId);
      return isSaved ? prev.filter(id => id !== postId) : [...prev, postId];
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
    if (navigationStack.length > 0) {
      const newStack = [...navigationStack];
      const prev = newStack.pop()!;
      setNavigationStack(newStack);
      setActiveScreen(prev);
    } else {
      setActiveScreen('feed');
    }
  };

  const handleAddToMuseum = (productId: string) => {
    setMuseumItemIds(prev => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const wishlistedPosts = posts.filter(p => savedPosts.includes(p.id));
  const wishlistedProducts = allAssets.filter(p => wishlist.products.includes(p.id));

  const renderScreen = () => {
    switch (activeScreen) {
      case 'feed':
        return (
          <FeedScreen 
            posts={posts} 
            collectors={collectors}
            sellers={sellers}
            allAssets={allAssets}
            onPostClick={handlePostClick}
            onProductClick={handleProductClick}
            onCollectorClick={handleCollectorClick}
            onSellerClick={handleSellerClick}
            onSaveToggle={handleSaveToggle}
            onLikeToggle={handleLikeToggle}
            onCommentClick={handleCommentClick}
            savedPostIds={savedPosts}
            activeCategory={activeCategory || undefined}
            isCategoryMenuOpen={isCategoryMenuOpen}
            onCategorySelect={(cat) => setActiveCategory(cat)}
            onCloseCategoryMenu={() => setIsCategoryMenuOpen(false)}
            onLiveDiscussionClick={handleLiveDiscussionClick}
          />
        );
      case 'news':
        return <NewsScreen onArticleClick={handleArticleClick} />;
      case 'games':
        return <GamesScreen collectedItems={wishlistedProducts} />;
      case 'search':
        return (
          <SearchScreen 
            onScanTrigger={() => setActiveScreen('scanning')} 
            onProductClick={handleProductClick} 
            onMarketListingsClick={handleSearchMarketListingClick}
            onPostClick={handlePostClick}
            onArticleClick={handleArticleClick}
          />
        );
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
            onWishlistClick={() => navigateTo('wishlist')}
            wishlist={wishlist} 
            savedPostIds={savedPosts}
            allPosts={posts}
            allAssets={allAssets}
            museumItemIds={museumItemIds}
          />
        );
      case 'scanning':
        return (
          <MuseumScreen 
            onBack={() => {
              handleBack();
            }}
            onMuseumClick={() => {
              handleAddToMuseum(scanningAsset.id);
              setSelectedProduct(scanningAsset);
              navigateTo('product-detail');
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
            onPostSaveToggle={handleSaveToggle}
            onProductWishlistToggle={toggleProductWishlist}
            onBack={handleBack}
          />
        );
      case 'post-detail':
        return selectedPost ? (
          <PostDetailScreen 
            post={selectedPost} 
            currentUser={currentUser}
            isSaved={savedPosts.includes(selectedPost.id)}
            focusCommentInput={focusCommentInput}
            onBack={handleBack}
            onLikeToggle={handleLikeToggle}
            onAddComment={handleAddComment}
            onSaveToggle={handleSaveToggle}
          />
        ) : (
          <FeedScreen 
            posts={posts} 
            collectors={collectors}
            sellers={sellers}
            allAssets={allAssets}
            onPostClick={handlePostClick}
            onProductClick={handleProductClick}
            onCollectorClick={handleCollectorClick}
            onSellerClick={handleSellerClick}
            onSaveToggle={handleSaveToggle}
            onLikeToggle={handleLikeToggle}
            onCommentClick={handleCommentClick}
            savedPostIds={savedPosts}
            onLiveDiscussionClick={handleLiveDiscussionClick}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailScreen 
            product={{...selectedProduct, isWishlisted: wishlist.products.includes(selectedProduct.id)}} 
            onBack={handleBack}
            onWishlistToggle={toggleProductWishlist}
            onMuseumClick={() => handleAddToMuseum(selectedProduct.id)}
            onMarketListingClick={handleProductMarketListingClick}
            isInMuseum={museumItemIds.includes(selectedProduct.id)}
          />
        ) : (
          <ProfileScreen 
            user={currentUser}
            onProductClick={handleProductClick} 
            onPostClick={handlePostClick}
            onWishlistClick={() => navigateTo('wishlist')}
            wishlist={wishlist} 
            savedPostIds={savedPosts}
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
      case 'live-discussion':
        return <LiveDiscussionScreen onBack={handleBack} initialMode={discussionMode} />;
      case 'market-listing':
        return (
          <MarketListingScreen 
            asset={marketListingAsset || undefined}
            onBack={handleBack}
            onSellerClick={(listing) => handleCollectorClick(listing.seller)}
          />
        );
      default:
        return <FeedScreen 
          posts={posts} 
          collectors={collectors}
          sellers={sellers}
          allAssets={allAssets}
          onPostClick={handlePostClick} 
          onProductClick={handleProductClick}
          onCollectorClick={handleCollectorClick}
          onSellerClick={handleSellerClick}
          onSaveToggle={handleSaveToggle}
          onLikeToggle={handleLikeToggle}
          onCommentClick={handleCommentClick}
          savedPostIds={savedPosts}
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
    if (activeScreen === 'post-detail' || activeScreen === 'product-detail' || activeScreen === 'article-detail') {
      return <div className="w-10" />;
    }
    return undefined;
  };

  const showBottomNav = activeScreen !== 'post-detail' && activeScreen !== 'product-detail' && activeScreen !== 'scanning' && activeScreen !== 'wishlist' && activeScreen !== 'live-discussion';

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-body selection:bg-zinc-200">
      <TopAppBar 
        title={getTitle()} 
        onSearchClick={() => {
          navigateTo('search');
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
            // When switching tabs, we clear the stack to prevent messy back navigation across tabs
            setNavigationStack([]);
            setActiveScreen(screen);
          }} 
        />
      )}
    </div>
  );
}
