/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, Bell } from 'lucide-react';

interface TopAppBarProps {
  title?: string;
}

export default function TopAppBar({ title = 'COLLECTOR' }: TopAppBarProps) {
  return (
    <header className="fixed top-0 z-50 flex justify-between items-center w-full px-6 h-16 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 font-['Be_Vietnam_Pro'] font-medium tracking-tight">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors active:opacity-70">
          <Menu size={20} className="text-zinc-900 dark:text-zinc-50" />
        </button>
      </div>
      <div className="text-xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">
        {title}
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors active:opacity-70">
          <Bell size={20} className="text-zinc-900 dark:text-zinc-50" />
        </button>
      </div>
    </header>
  );
}
