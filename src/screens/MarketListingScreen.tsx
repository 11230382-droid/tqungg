
import React from 'react';
import { ChevronLeft, MessageSquare, ArrowRightLeft, ShoppingCart, User } from 'lucide-react';
import { Listing, Asset } from '../types';
import { allAssets, marketListings } from '../mockData';
import { motion } from 'motion/react';

interface MarketListingScreenProps {
  asset?: Asset;
  onBack: () => void;
  onSellerClick: (listing: Listing) => void;
}

export default function MarketListingScreen({ asset, onBack, onSellerClick }: MarketListingScreenProps) {
  const listings = React.useMemo(() => {
    if (!asset) return marketListings;
    return marketListings.filter(l => l.assetId === asset.id);
  }, [asset]);

  const displayedAsset = asset || (listings.length > 0 ? allAssets.find(a => a.id === listings[0].assetId) : null);

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-black overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl px-4 py-4 flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="font-headline font-black text-xl uppercase tracking-tight text-zinc-900 dark:text-zinc-50">
            Market Listings
          </h1>
          {displayedAsset && (
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 truncate">
               {displayedAsset.name}
             </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        {/* Asset Preview Header (if specific asset) */}
        {displayedAsset && asset && (
          <div className="bg-white dark:bg-zinc-900 px-4 py-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-6">
            <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-2 flex items-center justify-center">
              <img src={displayedAsset.image || null} alt={displayedAsset.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 min-w-0">
               <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 mb-1 block">Active Listings</span>
               <h2 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-100 leading-tight mb-1">{displayedAsset.name}</h2>
               <div className="flex items-center gap-3">
                  <span className="text-xl font-headline font-black text-zinc-900 dark:text-zinc-50">{displayedAsset.price}</span>
                  <span className="text-[11px] font-bold text-green-500 uppercase tracking-widest">{displayedAsset.change} (Est.)</span>
               </div>
            </div>
          </div>
        )}

        <div className="px-4 py-8 space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="font-headline font-black text-xs uppercase tracking-[0.2em] text-zinc-400">Available Offers</h3>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{listings.length} Results</span>
          </div>

          {listings.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-100 dark:border-zinc-800">
               <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-100 dark:border-zinc-800">
                  <ArrowRightLeft size={24} className="text-zinc-400" />
               </div>
               <h4 className="font-headline font-bold text-zinc-900 dark:text-zinc-100 mb-1">No Listings Found</h4>
               <p className="text-sm text-zinc-400 leading-relaxed">Try checking back later or browse other items in the marketplace.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-6 active:scale-[0.98] transition-transform cursor-pointer shadow-sm hover:shadow-md"
                  onClick={() => onSellerClick(item)}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 relative">
                       {item.seller.avatar ? (
                         <img src={item.seller.avatar || null} alt={item.seller.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                            <User size={20} className="text-zinc-400" />
                         </div>
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline font-black text-sm text-zinc-900 dark:text-zinc-100 truncate">{item.seller.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest truncate">{item.seller.username}</span>
                        <div className="w-1 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{item.seller.followers} followers</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                      item.type === 'Selling' ? 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
                    }`}>
                      {item.type === 'Selling' ? <ShoppingCart size={10} /> : <ArrowRightLeft size={10} />}
                      {item.type}
                    </div>
                  </div>

                  <div className="flex gap-4 items-center bg-zinc-50 dark:bg-zinc-950 rounded-[1.5rem] p-4 mb-6">
                    <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-xl p-2 flex items-center justify-center shadow-sm">
                       <img src={displayedAsset?.image || null} alt={displayedAsset?.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">{displayedAsset?.category}</p>
                       <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 leading-tight italic truncate">
                          "{item.note || 'Contact for details'}"
                       </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">Offer Value</p>
                      <p className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">{item.price || 'Market Price'}</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
                      <MessageSquare size={14} />
                      Inquire
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
