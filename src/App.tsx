/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Screen } from './types';
import TopAppBar from './components/TopAppBar';
import BottomNavBar from './components/BottomNavBar';
import FeedScreen from './screens/FeedScreen';
import NewsScreen from './screens/NewsScreen';
import SearchScreen from './screens/SearchScreen';
import RewardsScreen from './screens/RewardsScreen';
import ProfileScreen from './screens/ProfileScreen';
import VaultScreen from './screens/VaultScreen';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('feed');

  // Simple screen router
  const renderScreen = () => {
    switch (activeScreen) {
      case 'feed':
        return <FeedScreen />;
      case 'news':
        return <NewsScreen />;
      case 'search':
        return <SearchScreen onScanTrigger={() => setActiveScreen('scanning')} />;
      case 'rewards':
        return <RewardsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'scanning':
        return <VaultScreen />;
      default:
        return <FeedScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-body selection:bg-zinc-200">
      <TopAppBar 
        title={activeScreen === 'scanning' ? 'THE VAULT' : 'COLLECTOR'} 
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

      <BottomNavBar 
        activeScreen={activeScreen} 
        onScreenChange={(screen) => setActiveScreen(screen)} 
      />

      {/* Special Trigger for Vault from Search or elsewhere if needed */}
      {activeScreen === 'search' && (
        <div className="hidden">
           {/* Logic to trigger scanning could go here */}
        </div>
      )}
    </div>
  );
}
