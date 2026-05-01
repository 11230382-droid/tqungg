/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewsArticle } from '../types';
import { ChevronLeft, Share2, MoreHorizontal, Clock, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

interface ArticleDetailScreenProps {
  article: NewsArticle;
  onBack: () => void;
}

export default function ArticleDetailScreen({ article, onBack }: ArticleDetailScreenProps) {
  return (
    <div className="pt-16 pb-32 min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-4 border-b border-zinc-100 dark:border-zinc-800">
        <button onClick={onBack} className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="font-headline font-black text-[10px] uppercase tracking-widest text-zinc-400 truncate max-w-[200px]">
          {article.publisher}
        </span>
        <div className="flex items-center gap-2">
          <button className="p-2">
            <Bookmark size={20} />
          </button>
          <button className="p-2">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <article className="max-w-3xl mx-auto">
        {/* Hero Image */}
        <div className="aspect-video w-full overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="px-6 py-10">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
              {article.category || 'Feature'}
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
              <Clock size={12} />
              {article.timestamp}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-headline tracking-tighter uppercase leading-[0.9] mb-8">
            {article.title}
          </h1>

          {/* Content */}
          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-headline prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:font-medium prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-zinc-900 dark:prose-a:text-zinc-50">
            <ReactMarkdown>
              {article.content || '# Content currently unavailable'}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer actions */}
        <section className="px-6 py-12 border-t border-zinc-100 dark:border-zinc-800 mt-12 mb-20 text-center">
           <h3 className="font-headline font-black text-xl uppercase tracking-widest mb-6">Found this insightful?</h3>
           <div className="flex justify-center gap-4">
              <button className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 active:scale-95 transition-all">
                <Share2 size={16} />
                Share Analysis
              </button>
              <button className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 active:scale-95 transition-all">
                <Bookmark size={16} />
                Save to Museum
              </button>
           </div>
        </section>
      </article>
    </div>
  );
}
