/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, Bell, Search, ChevronLeft } from 'lucide-react';

interface TopAppBarProps {
  title?: string;
  onSearchClick?: () => void;
  onMenuClick?: () => void;
  onBackClick?: () => void;
  rightContent?: React.ReactNode;
  notificationCount?: number;
  showMenu?: boolean;
}

export default function TopAppBar({ 
  title = 'COLLECSEUM', 
  onSearchClick, 
  onMenuClick,
  onBackClick,
  rightContent,
  notificationCount = 0,
}: TopAppBarProps) {
  return (
    <header className="fixed top-0 z-50 flex justify-between items-center w-full px-6 h-16 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 font-['Be_Vietnam_Pro'] font-medium tracking-tight">
      <div className="flex items-center gap-4 flex-1">
        {onBackClick ? (
          <button 
            onClick={onBackClick}
            className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors active:opacity-70"
          >
            <ChevronLeft size={20} className="text-zinc-900 dark:text-zinc-50" />
          </button>
        ) : (
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors active:opacity-70"
          >
            <Menu size={20} className={`text-zinc-900 dark:text-zinc-50 ${!onMenuClick ? 'opacity-20' : ''}`} />
          </button>
        )}
      </div>
      <div className="text-xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase truncate max-w-[200px] text-center">
        {title}
      </div>
      <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
        {rightContent ? rightContent : (
          <>
            <button 
              onClick={onSearchClick}
              className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors active:opacity-70"
            >
              <Search size={20} className="text-zinc-900 dark:text-zinc-50" />
            </button>
            <button className="relative p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors active:opacity-70">
              <Bell size={20} className="text-zinc-900 dark:text-zinc-50" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-zinc-950">
                  {notificationCount}
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </header>
  );
}
