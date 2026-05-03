/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageSquare, List } from 'lucide-react';

export default function LiveDiscussion({ onModeSelect }: { onModeSelect?: (mode: 'chat' | 'forum') => void }) {
  return (
    <section className="px-6 py-8 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 font-label mb-1">Live Discussion Hub</h2>
          <h3 className="text-lg font-black tracking-tighter uppercase font-headline">Join the conversation</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onModeSelect?.('chat')}
          className="group flex items-center gap-3 p-3.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-50 border border-zinc-100 dark:border-zinc-700 group-hover:scale-105 transition-transform shrink-0">
            <MessageSquare size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50 leading-tight">Live Chat</span>
        </button>

        <button 
          onClick={() => onModeSelect?.('forum')}
          className="group flex items-center gap-3 p-3.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-50 border border-zinc-100 dark:border-zinc-700 group-hover:scale-105 transition-transform shrink-0">
            <List size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50 leading-tight">Forum</span>
        </button>
      </div>
    </section>
  );
}
