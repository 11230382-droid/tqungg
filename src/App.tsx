/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Screen, Post, Asset, NewsArticle } from './types';
import TopAppBar from './components/TopAppBar';
import BottomNavBar from './components/BottomNavBar';
import FeedScreen from './screens/FeedScreen';
import NewsScreen from './screens/NewsScreen';
import SearchScreen from './screens/SearchScreen';
import RewardsScreen from './screens/RewardsScreen';
import ProfileScreen from './screens/ProfileScreen';
import VaultScreen from './screens/VaultScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ArticleDetailScreen from './screens/ArticleDetailScreen';
import WishlistScreen from './screens/WishlistScreen';
import { AnimatePresence, motion } from 'motion/react';
import { posts as mockPosts, currentUser, articles as mockArticles, allAssets } from './mockData';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('feed');
  const [posts, setPosts] = useState<Post[]>([]);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Asset | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [previousScreen, setPreviousScreen] = useState<Screen>('feed');
  const [wishlist, setWishlist] = useState<{ posts: string[], products: string[] }>({ posts: [], products: [] });

  // Initialize data
  useEffect(() => {
    setPosts(mockPosts);
    setArticles(mockArticles);
    
    // Load wishlist from local storage if available (mocking persistence)
    const savedWishlist = localStorage.getItem('collector_wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('collector_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

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
    
    // Update selected post if it matches
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

  // Derived data for Wishlist Screen
  const wishlistedPosts = posts.filter(p => wishlist.posts.includes(p.id));
  const wishlistedProducts = allAssets.filter(p => wishlist.products.includes(p.id));

  // Simple screen router
  const renderScreen = () => {
    switch (activeScreen) {
      case 'feed':
        return (
          <FeedScreen 
            posts={posts} 
            onPostClick={handlePostClick} 
            onWishlistToggle={togglePostWishlist}
            wishlist={wishlist.posts}
          />
        );
      case 'news':
        return <NewsScreen onArticleClick={handleArticleClick} />;
      case 'search':
        return <SearchScreen onScanTrigger={() => setActiveScreen('scanning')} />;
      case 'rewards':
        return <RewardsScreen />;
      case 'profile':
        return (
          <ProfileScreen 
            onProductClick={handleProductClick} 
            onPostClick={handlePostClick}
            wishlist={wishlist} 
            allPosts={posts}
            allAssets={allAssets}
          />
        );
      case 'scanning':
        return <VaultScreen />;
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
            onPostClick={handlePostClick} 
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
          />
        ) : (
          <ProfileScreen 
            onProductClick={handleProductClick} 
            onPostClick={handlePostClick}
            wishlist={wishlist} 
            allPosts={posts}
            allAssets={allAssets}
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
        return <FeedScreen posts={posts} onPostClick={handlePostClick} />;
    }
  };

  const isDetailView = activeScreen === 'post-detail' || activeScreen === 'product-detail' || activeScreen === 'article-detail';

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-body selection:bg-zinc-200">
      {!isDetailView && (
        <TopAppBar 
          title={activeScreen === 'scanning' ? 'THE VAULT' : activeScreen === 'wishlist' ? 'MY VAULT' : 'COLLECTOR'} 
          onSearchClick={() => {
            setPreviousScreen(activeScreen);
            setActiveScreen('search');
          }}
          notificationCount={2}
        />
      )}
      
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

      {!isDetailView && (
        <BottomNavBar 
          activeScreen={activeScreen} 
          onScreenChange={(screen) => setActiveScreen(screen)} 
        />
      )}
    </div>
  );
}
