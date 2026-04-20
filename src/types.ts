export type Screen = 'feed' | 'news' | 'search' | 'rewards' | 'profile' | 'scanning' | 'asset-detail';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role?: string;
  location?: string;
  followers: string;
  following: string;
  itemCount: string;
  totalValue: string;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  user: User;
  image: string;
  caption: string;
  timestamp: string;
  likes: string;
  comments: number;
  tags?: string[];
  isPremium?: boolean;
  type?: 'large' | 'square' | 'wide' | 'vertical';
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  publisher: string;
  timestamp: string;
  isHero?: boolean;
  category?: string;
}

export interface Auction {
  id: string;
  title: string;
  currentBid: string;
  image: string;
  endTime: string;
  isEndingSoon?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Asset {
  id: string;
  name: string;
  series: string;
  price: string;
  change: string;
  image: string;
  description: string;
  specs: {
    releaseDate: string;
    colorway: string;
    retailPrice: string;
    stockNumber: string;
  };
  scarcity: string;
  matchPercentage?: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xp: string;
  progress: number;
  icon: string;
}
