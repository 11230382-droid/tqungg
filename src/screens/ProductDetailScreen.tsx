/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Asset } from '../types';
import { ChevronLeft, Share2, MoreHorizontal, ArrowRight, ShieldCheck, Factory, Landmark, History, TrendingUp, Palette, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductDetailScreenProps {
  product: Asset;
  onBack: () => void;
  onWishlistToggle?: (productId: string) => void;
  onMuseumClick?: () => void;
  onMarketListingClick?: (product: Asset) => void;
  isInMuseum?: boolean;
}

export default function ProductDetailScreen({ product, onBack, onWishlistToggle, onMuseumClick, onMarketListingClick, isInMuseum }: ProductDetailScreenProps) {
  return (
    <div className="pt-24 pb-32 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Product Display Card */}
        <section className="mt-8 mb-10 overflow-hidden rounded-[2.5rem] bg-white dark:bg-zinc-900 shadow-2xl shadow-zinc-200 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
          <div className="aspect-square relative p-8 md:p-12 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950/50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute top-8 left-8">
              <div className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-2 rounded-xl">
                 <p className="text-[10px] font-black uppercase tracking-widest leading-none">Est. Value</p>
                 <p className="font-headline font-black text-xl leading-tight mt-1">{product.price}</p>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 flex flex-col gap-2">
               <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-zinc-100 dark:border-zinc-700 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-zinc-900 dark:text-zinc-100" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">Authenticated</span>
               </div>
               <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-zinc-100 dark:border-zinc-700 flex items-center gap-2">
                  <TrendingUp size={14} className="text-green-600" />
                  <span className="text-[10px] font-bold uppercase tracking-tight text-green-600">{product.change} Growth</span>
               </div>
            </div>
          </div>

          <div className="p-8 md:p-10 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 text-center md:text-left overflow-hidden">
              <div className="flex-1 min-w-0 px-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 block truncate">{product.series}</span>
                <h1 className="text-3xl md:text-5xl font-black font-headline tracking-tighter uppercase leading-tight break-words lg:line-clamp-2">{product.name}</h1>
              </div>
              <div className="flex justify-center md:justify-start gap-4 shrink-0 overflow-hidden">
                 <div className="text-center min-w-0">
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1 truncate">Scarcity</p>
                    <p className="font-headline font-black text-xl truncate px-1">{product.scarcity}</p>
                 </div>
                 <div className="w-[1px] h-10 bg-zinc-100 dark:bg-zinc-800 self-center"></div>
                 <div className="text-center min-w-0">
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1 truncate">Condition</p>
                    <p className="font-headline font-black text-xl truncate px-1">{product.condition || 'MINT 10'}</p>
                 </div>
              </div>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg mb-10 text-center md:text-left font-medium">
              {product.description}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
               {Object.entries(product.specs).map(([key, value]) => (
                 <div key={key} className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="font-headline font-bold text-[13px] text-zinc-900 dark:text-zinc-100 truncate">{value}</p>
                 </div>
               ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
               {isInMuseum ? (
                 <div className="flex-1 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                    <ShieldCheck size={20} />
                    In Museum
                 </div>
               ) : (
                 <button 
                  onClick={onMuseumClick}
                  className="flex-1 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:opacity-90 active:scale-[0.98]">
                    <Landmark size={20} />
                    Add to Museum
                 </button>
               )}
               <button 
                  onClick={() => onMarketListingClick?.(product)}
                  className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:bg-zinc-50 active:scale-[0.98]"
               >
                  <ArrowRight size={20} />
                  Market Listing
               </button>
            </div>
          </div>
        </section>

        {/* Origin & Ownership Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm mb-20">
          <h2 className="font-headline font-black text-xl tracking-tight uppercase mb-8 flex items-center gap-3">
             <ShieldCheck size={24} />
             Ownership & Authentication
          </h2>
          <div className="space-y-6">
             <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center">
                      <Palette size={24} className="text-zinc-400" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Surface Scan</p>
                      <p className="font-headline font-bold text-sm">Authentic Spectraflame Finish</p>
                   </div>
                </div>
                <div className="text-green-500 font-black text-xs uppercase">Verified</div>
             </div>
             
             <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center">
                      <Factory size={24} className="text-zinc-400" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Mold Integrity</p>
                      <p className="font-headline font-bold text-sm">Casting #42-B-99 Match</p>
                   </div>
                </div>
                <div className="text-green-500 font-black text-xs uppercase">Verified</div>
             </div>

             <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden border border-zinc-200">
                      <img src="https://picsum.photos/seed/curator/100/100" alt="Curator" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Current Custodian</p>
                      <p className="font-headline font-bold text-sm">Julian Vane (@julianvane)</p>
                   </div>
                </div>
                <div className="text-[10px] font-black uppercase text-zinc-400">SINCE 2022</div>
             </div>

             <button className="w-full mt-4 flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-900 font-bold uppercase tracking-widest text-[10px] transition-colors py-4">
                <History size={16} />
                View Full Chain of Custody
             </button>
          </div>
        </section>
      </div>
    </div>
  );
}
