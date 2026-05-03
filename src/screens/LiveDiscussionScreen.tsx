/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Send, Users, MessageSquare, List, MessageCircle, Plus, Hash } from 'lucide-react';
import { ChatMessage, ForumThread } from '../types';
import { currentUser, collectibleCategories } from '../mockData';

interface LiveDiscussionScreenProps {
  onBack: () => void;
  initialMode?: Mode;
}

type Mode = 'chat' | 'forum';

interface Channel {
  id: string;
  name: string;
  category?: string;
  activeUsers: number;
}

export default function LiveDiscussionScreen({ onBack, initialMode = 'chat' }: LiveDiscussionScreenProps) {
  const [activeMode, setActiveMode] = useState<Mode>(initialMode);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<string>('c1');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});
  const [forumThreads, setForumThreads] = useState<ForumThread[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelCategory, setNewChannelCategory] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initial Data
  useEffect(() => {
    const initialChannels: Channel[] = [
      { id: 'c1', name: 'General Collectors', activeUsers: 428 },
      { id: 'c2', name: 'Pokémon Cards', category: 'Trading Cards', activeUsers: 156 },
      { id: 'c3', name: 'Price Check', activeUsers: 84 },
      { id: 'c4', name: 'Hot Wheels', category: 'Diecast', activeUsers: 215 },
      { id: 'c5', name: 'Showcase', activeUsers: 92 },
    ];

    const initialMessages: Record<string, ChatMessage[]> = {
      'c1': [
        { id: 'm1', user: { id: 'u2', name: 'Marcus', username: 'marcus_v', avatar: 'https://picsum.photos/seed/u1/100/100', followers: '1k', following: '500', itemCount: '100', totalValue: '$5k' }, text: "Just saw a mint condition '67 Camaro pop up in Tokyo!", timestamp: '2m ago' },
        { id: 'm2', user: { id: 'u3', name: 'Sarah', username: 'sarah_k', avatar: 'https://picsum.photos/seed/u2/100/100', followers: '2k', following: '800', itemCount: '240', totalValue: '$12k' }, text: "The market dip for Gen 1 Gundams is real. Great time to buy.", timestamp: '1m ago' },
      ],
      'c2': [
        { id: 'm4', user: { id: 'u4', name: 'Vex', username: 'vex_toys', avatar: 'https://picsum.photos/seed/u3/100/100', followers: '500', following: '200', itemCount: '50', totalValue: '$1k' }, text: "Anyone interested in a trade for a holograhpic Charizard?", timestamp: 'Now' },
      ],
    };

    const initialThreads: ForumThread[] = [
      { id: 't1', title: "Is this limited edition release worth it?", author: { id: 'u2', name: 'Marcus', username: 'marcus_v', avatar: 'https://picsum.photos/seed/u1/100/100', followers: '1k', following: '500', itemCount: '100', totalValue: '$5k' }, preview: "Thinking about the new Porsche 911 1:18 scale drop next week.", replies: 24, timestamp: '1h ago' },
      { id: 't2', title: "Price Check on 1995 Sport Card Set", author: { id: 'u5', name: 'Jace', username: 'jace_cards', avatar: 'https://picsum.photos/seed/u5/100/100', followers: '3k', following: '1k', itemCount: '500', totalValue: '$30k' }, preview: "Found a complete set in my attic. Mint condition.", replies: 12, timestamp: '3h ago' },
      { id: 't3', title: "Collection Organization Tips", author: { id: 'u4', name: 'Kira', username: 'kira_c', avatar: 'https://picsum.photos/seed/u4/100/100', followers: '800', following: '400', itemCount: '120', totalValue: '$2k' }, preview: "How do you guys display your 1/6 scale pieces?", replies: 42, timestamp: '5h ago' },
    ];

    setChannels(initialChannels);
    setChatMessages(initialMessages);
    setForumThreads(initialThreads);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    if (activeMode === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, selectedChannelId, activeMode]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const msg: ChatMessage = {
      id: Date.now().toString(),
      user: currentUser,
      text: newMessage,
      timestamp: 'Now'
    };
    
    setChatMessages(prev => ({
      ...prev,
      [selectedChannelId]: [...(prev[selectedChannelId] || []), msg]
    }));
    setNewMessage('');
  };

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return;
    
    const newChannel: Channel = {
      id: `c${Date.now()}`,
      name: newChannelName,
      category: newChannelCategory || undefined,
      activeUsers: 1
    };
    
    setChannels(prev => [...prev, newChannel]);
    setSelectedChannelId(newChannel.id);
    setNewChannelName('');
    setNewChannelCategory('');
    setIsCreatingChannel(false);
  };

  const currentChannel = channels.find(c => c.id === selectedChannelId);
  const currentMessages = chatMessages[selectedChannelId] || [];

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 flex flex-col pt-safe">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <button 
          onClick={selectedThread ? () => setSelectedThread(null) : onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex-1 text-center">
          <h1 className="text-sm font-black font-headline uppercase tracking-widest text-zinc-900 dark:text-zinc-50">
            {selectedThread ? 'Discussion Thread' : 'Discussion Hub'}
          </h1>
          {!selectedThread && (
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black uppercase text-zinc-400 tracking-tighter">
                {currentChannel ? `${currentChannel.activeUsers} Online in #${currentChannel.name}` : '1,248 Online'}
              </span>
            </div>
          )}
        </div>
        
        <div className="w-10" />
      </header>

      {!selectedThread && (
        <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 p-1.5 mx-6 mt-4 rounded-2xl">
          <button 
            onClick={() => setActiveMode('chat')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${activeMode === 'chat' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm shadow-zinc-200 dark:shadow-black' : 'text-zinc-500'}`}
          >
            <MessageSquare size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Live Chat</span>
          </button>
          <button 
            onClick={() => setActiveMode('forum')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${activeMode === 'forum' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm shadow-zinc-200 dark:shadow-black' : 'text-zinc-500'}`}
          >
            <List size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Forum</span>
          </button>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        <AnimatePresence mode="wait">
          {selectedThread ? (
            <motion.div 
              key="thread-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 overflow-y-auto px-6 py-6"
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <img src={selectedThread.author.avatar} alt="" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-xs font-black">{selectedThread.author.username}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{selectedThread.timestamp}</p>
                  </div>
                </div>
                <h2 className="text-xl font-black font-headline tracking-tight uppercase leading-tight mb-4">
                  {selectedThread.title}
                </h2>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl whitespace-pre-wrap">
                  {selectedThread.preview}
                  {"\n\n"}
                  Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.
                </div>
              </div>
              
              <div className="space-y-6 pb-20">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Replies ({selectedThread.replies})</h3>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-3">
                    <img src={`https://picsum.photos/seed/rep${i}/100/100`} alt="" className="w-8 h-8 rounded-full" />
                    <div className="flex-1 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-2xl rounded-tl-none">
                       <p className="text-[10px] font-black mb-1">User_{i}42</p>
                       <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                         That's a good question. I think the market is quite stable for these items right now.
                       </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : activeMode === 'chat' ? (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="absolute inset-0 flex flex-col"
            >
              {/* Channel List */}
              <div className="flex items-center gap-2 px-6 py-4 overflow-x-auto no-scrollbar shrink-0 border-b border-zinc-50 dark:border-zinc-900">
                <button 
                  onClick={() => setIsCreatingChannel(true)}
                  className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  <Plus size={20} />
                </button>
                {channels.map(channel => (
                  <button 
                    key={channel.id}
                    onClick={() => setSelectedChannelId(channel.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedChannelId === channel.id ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-50' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border-transparent'}`}
                  >
                    #{channel.name}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
                {currentMessages.length > 0 ? (
                  currentMessages.map(msg => (
                    <div 
                      key={msg.id} 
                      className={`flex items-end gap-3 ${msg.user.id === currentUser.id ? 'flex-row-reverse' : ''}`}
                    >
                      <img src={msg.user.avatar} className="w-8 h-8 rounded-full flex-shrink-0" alt="" />
                      <div className="max-w-[75%] space-y-1">
                        <p className={`text-[9px] font-black uppercase tracking-widest text-zinc-400 ${msg.user.id === currentUser.id ? 'text-right' : ''}`}>
                          {msg.user.username}
                        </p>
                        <div className={`p-4 rounded-2xl text-xs leading-relaxed ${msg.user.id === currentUser.id ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-br-none' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 rounded-bl-none border border-zinc-200 dark:border-zinc-800'}`}>
                          {msg.text}
                        </div>
                        <p className={`text-[8px] text-zinc-400 font-bold ${msg.user.id === currentUser.id ? 'text-right' : ''}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-200 dark:text-zinc-700">
                      <Hash size={32} />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Welcome to #{currentChannel?.name}</p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">Be the first to start the conversation!</p>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 shrink-0">
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 rounded-2xl px-4 py-2 border border-zinc-200 dark:border-zinc-800">
                   <input 
                     type="text" 
                     placeholder={`Message #${currentChannel?.name || 'collectors'}...`}
                     className="flex-1 bg-transparent border-none text-xs focus:ring-0 placeholder:text-zinc-400 font-bold"
                     value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                   />
                   <button 
                     onClick={handleSendMessage}
                     disabled={!newMessage.trim()}
                     className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
                   >
                     <Send size={18} />
                   </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="forum"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="absolute inset-0 overflow-y-auto px-6 py-6 space-y-4 no-scrollbar"
            >
               {forumThreads.map(thread => (
                 <div 
                   key={thread.id} 
                   onClick={() => setSelectedThread(thread)}
                   className="group p-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl active:scale-[0.98] transition-transform cursor-pointer shadow-sm hover:shadow-lg shadow-zinc-100 dark:shadow-black"
                 >
                   <div className="flex items-center gap-3 mb-4">
                     <img src={thread.author.avatar} alt="" className="w-8 h-8 rounded-full" />
                     <div>
                       <p className="text-[10px] font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-50">{thread.author.username}</p>
                       <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">{thread.timestamp}</p>
                     </div>
                   </div>
                   <h3 className="text-sm font-black font-headline tracking-tight uppercase leading-tight mb-2 group-hover:text-zinc-500 transition-colors">
                     {thread.title}
                   </h3>
                   <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                     {thread.preview}
                   </p>
                   <div className="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800">
                     <div className="flex items-center gap-4">
                       <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                         <MessageCircle size={14} />
                         <span className="text-[10px] font-black uppercase tracking-tighter">{thread.replies} Replies</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-zinc-400">
                         <Users size={14} />
                         <span className="text-[10px] font-black uppercase tracking-tighter">8 Viewers</span>
                       </div>
                     </div>
                     <ChevronLeft size={16} className="rotate-180 text-zinc-300" />
                   </div>
                 </div>
               ))}
               
               {/* Add Thread Button */}
               <button className="w-full py-5 rounded-3xl border-2 border-dashed border-zinc-100 dark:border-zinc-900 flex flex-col items-center justify-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <List size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Start a Discussion</span>
               </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Channel Modal Overlay */}
        <AnimatePresence>
          {isCreatingChannel && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-6 flex flex-col justify-center"
            >
              <div className="max-w-md mx-auto w-full space-y-8">
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-black font-headline uppercase tracking-tighter">Create Channel</h2>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Start a new topic room</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Channel Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Vintage Watches"
                      autoFocus
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border-none rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition-all"
                      value={newChannelName}
                      onChange={(e) => setNewChannelName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Suggested Category</label>
                    <div className="flex flex-wrap gap-2">
                      {collectibleCategories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setNewChannelCategory(cat.name)}
                          className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${newChannelCategory === cat.name ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-50' : 'bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => setIsCreatingChannel(false)}
                      className="flex-1 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 text-xs font-black uppercase tracking-widest active:scale-95 transition-transform"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleCreateChannel}
                      disabled={!newChannelName.trim()}
                      className="flex-1 py-4 rounded-2xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-xs font-black uppercase tracking-widest active:scale-95 transition-transform disabled:opacity-50"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
