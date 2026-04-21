export type Screen = 'feed' | 'news' | 'search' | 'games' | 'rewards' | 'profile' | 'scanning' | 'post-detail' | 'product-detail' | 'wishlist' | 'article-detail';

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

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
  xp?: number;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  location: string;
  specialty: string;
}

export interface Post {
  id: string;
  user: User;
  image: string;
  images?: string[]; 
  title: string;
  caption: string;
  timestamp: string;
  likes: number; 
  likedByCurrentUser?: boolean;
  comments: Comment[];
  estimatedValue?: string;
  tags?: string[];
  isPremium?: boolean;
  isWishlisted?: boolean;
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
  content?: string;
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
  category: 'Figure' | 'Card' | 'Car' | 'Book' | 'Other';
  isWishlisted?: boolean;
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

export interface GameLeaderboardEntry {
  id: string;
  user: User;
  score: number;
  formattedScore: string;
  timestamp: string;
}
