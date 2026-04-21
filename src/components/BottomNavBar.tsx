/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Grid, Newspaper, Search, Gift, User, Gamepad2 } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavBarProps {
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function BottomNavBar({ activeScreen, onScreenChange }: BottomNavBarProps) {
  const navItems = [
    { id: 'feed', icon: Grid, label: 'Feed' },
    { id: 'news', icon: Newspaper, label: 'News' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'games', icon: Gamepad2, label: 'Games' },
    { id: 'rewards', icon: Gift, label: 'Rewards' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-6 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-t border-zinc-100 dark:border-zinc-800 shadow-[0_-1px_10px_rgba(0,0,0,0.05)] rounded-t-xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id as Screen)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
              isActive 
                ? 'text-zinc-900 dark:text-zinc-50 scale-110' 
                : 'text-zinc-400 dark:text-zinc-600 opacity-60 hover:text-zinc-900 dark:hover:text-zinc-50'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? 'currentColor' : 'none'} fillOpacity={isActive ? 0.2 : 0} />
            <span className="font-['Be_Vietnam_Pro'] text-[11px] font-semibold uppercase tracking-wider mt-1">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
