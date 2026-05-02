import { Post, NewsArticle, Auction, Category, Asset, User, Badge, Challenge, Seller, GameLeaderboardEntry } from './types.ts';

export const currentUser: User = {
  id: 'u1',
  name: 'Julian Vane',
  username: 'julianvane',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG4uitfuqu3cF2sSBdWC5ZUfVRByGsGpDbpXTOfRzZKeoV6QzvC1wLc8RhmXAW6CXfceQKGpfp_YRfukbie-QtXfviUMVprb3u8_2xkOFiQUVzxjMGZk_eWd15Mkl8DcZlMAgYf0nX4dUID5JmCfTdLcAs3jp_x44yGxr2hVL6v1jprtoTcEaPsI-ka0KawZdm0W3odB6y0uFmqyCY0QMfUPrp7Gj7nQec_oCo592DQy9wjcMjRR6S_YKeeaUEc7MdWxaq22piZO8',
  role: 'Prime Collector',
  location: 'Hanoi, HN',
  followers: '1.2k',
  following: '842',
  itemCount: '1,248',
  totalValue: '$342.5k',
  isVerified: true,
  xp: 8450
};

export const sellers: Seller[] = [
  {
    id: 's1',
    name: 'Neo Toy Shop',
    avatar: 'https://images.unsplash.com/photo-1531323380760-70085d470f7b?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    reviewCount: 1240,
    location: 'Tokyo, JP',
    specialty: 'Rare Figures'
  },
  {
    id: 's2',
    name: 'Diecast Haven',
    avatar: 'https://images.unsplash.com/photo-1551373884-8a0350fbd0be?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    reviewCount: 850,
    location: 'Los Angeles, US',
    specialty: 'Vintage Cars'
  },
  {
    id: 's3',
    name: 'Card Kingdom',
    avatar: 'https://images.unsplash.com/photo-1540759786422-c60d5ecd57ad?auto=format&fit=crop&q=80&w=200',
    rating: 4.7,
    reviewCount: 3100,
    location: 'Seattle, US',
    specialty: 'Trading Cards'
  },
  {
    id: 's4',
    name: 'Mecha Central',
    avatar: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=200',
    rating: 4.6,
    reviewCount: 520,
    location: 'Seoul, KR',
    specialty: 'Gunpla'
  }
];

export const topCollectors: User[] = [
  { ...currentUser },
  {
    id: 'u2',
    name: 'Neo_Collector',
    username: 'Neo_Collector',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRccu69zn53Ggc_sLFKTYnF3ZpYvxmPwLIHhfmOLPxLOCZsJ1Kp8araLPTuy6DoAeIqOrIjVxdJRVINz4HbNnOYgBR8ogyRyYpeF0fEWYfBzJZn8FRKtH4ty2v8GJtiRl-_DmQTlzrEnTbVn_s6v6iLG-qpIQ-oLoeb3jtepSZRq4NptHD4psMHItZeP8N5K0LJoAsgWL3E_xoq0KjyXi0IRd01bhypEBiqkfJ9DNQAXq5daQNZmaMDF_77vNGLr1qxwFtBf4tvy0',
    followers: '2.5k', following: '150', itemCount: '42', totalValue: '$12k', xp: 9200
  },
  {
    id: 'u4',
    name: 'PokeMaster_99',
    username: 'PokeMaster_99',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSe7FtMVg71eyBu6tiuSh_XZ3qLXfSpRY0hqYV_YQJygR6AZEF932KxTSdH1TX9xe1hOsRI1c6FAL8DL09ErR6snmsS_m9wy_JUeiWO5GlPOjr9BNGJybeHsTrQANcNAJDhGeqBoc8fmIcmpOKI1-SBebuFp0NWYKI2Cn3bh84iMuq2bHfMZ2wC8EkOo4hwaSX3gGzhmpvEY2dgkUIRXD2hyJna_tvHQEwcZKvURvGHhWoWI56cIeOycVcquOviKld4JptJW4wg5o',
    followers: '5k', following: '200', itemCount: '3000', totalValue: '$50k', xp: 7800
  },
  {
    id: 'u5',
    name: 'Luna_Vibe',
    username: 'Luna_Vibe',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTTitKG60xEj1vn3OCTSYU4g0sVeGLArS7-Iw9Sw9aU8SJV-WKFSZqpIedOpLsPPyM3bhTtXbwQ9pxLv5OIJYthkVLxl-egtDesVaHBmTn06l-9PqgfQPD33sff6j9Cn-8wvB72BVW8hrsNGP4ZOfEctGcf0GB_KNq4wNFi-kOI8aFgLFzcxh5DxO48R0IsNS8QwTeqI5FfgDuwNMrKGYIY6zDUq6oSs4JAbjDWcW8h37msGyeGH_Duqexr0G1T4kWcnEccNVgpV8',
    followers: '10k', following: '500', itemCount: '500', totalValue: '$25k', xp: 6500
  }
];

export const posts: Post[] = [
  {
    id: 'p1',
    user: {
      id: 'u2',
      name: 'Neo_Collector',
      username: 'Neo_Collector',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRccu69zn53Ggc_sLFKTYnF3ZpYvxmPwLIHhfmOLPxLOCZsJ1Kp8araLPTuy6DoAeIqOrIjVxdJRVINz4HbNnOYgBR8ogyRyYpeF0fEWYfBzJZn8FRKtH4ty2v8GJtiRl-_DmQTlzrEnTbVn_s6v6iLG-qpIQ-oLoeb3jtepSZRq4NptHD4psMHItZeP8N5K0LJoAsgWL3E_xoq0KjyXi0IRd01bhypEBiqkfJ9DNQAXq5daQNZmaMDF_77vNGLr1qxwFtBf4tvy0',
      followers: '2.5k', following: '150', itemCount: '42', totalValue: '$12k'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkZMccRsY21qoXb_g3LG0idR5NgXG-Lqjtrc9ED00w1KEQ9gpyA-AhJiX45uDvaHtzgU0Bn0__Js5Lk1fCfKZS83_duDLn8S74weHQZusxQ5xgp6Fu0wAaylcT5ahspKGUjE1kSKVKTBemqAaVR99drgbYJlz6E9aG1fqnx4EKakRHRu55hF-GNGLtlOugxwoRNyOhUJZBEMsi5EBNyfhQn2c4MEFHmWXIYrDa8p7G1r2wcfGrct8gCKD9dKvsLWxQ_hkmAWlY_e4',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkZMccRsY21qoXb_g3LG0idR5NgXG-Lqjtrc9ED00w1KEQ9gpyA-AhJiX45uDvaHtzgU0Bn0__Js5Lk1fCfKZS83_duDLn8S74weHQZusxQ5xgp6Fu0wAaylcT5ahspKGUjE1kSKVKTBemqAaVR99drgbYJlz6E9aG1fqnx4EKakRHRu55hF-GNGLtlOugxwoRNyOhUJZBEMsi5EBNyfhQn2c4MEFHmWXIYrDa8p7G1r2wcfGrct8gCKD9dKvsLWxQ_hkmAWlY_e4',
      'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=800'
    ],
    title: '1/6 Scale Vanguard Unit',
    caption: 'Finally secured the 1/6 scale Vanguard Unit. The articulation on this piece is absolutely insane. Worth the 8-month wait! The detail on the weathered armor plating and the LED integration in the visor is simply industry-leading.',
    timestamp: '2 hours ago',
    likes: 1200,
    likedByCurrentUser: false,
    comments: [
      { id: 'c1', user: currentUser, text: 'This looks incredible! The lighting is perfect.', timestamp: '1 hour ago' },
      { id: 'c2', user: { id: 'u3', name: 'Speedy_B', username: 'Speedy_B', avatar: '', followers: '0', following: '0', itemCount: '0', totalValue: '0' }, text: 'How much did this set you back?', timestamp: '30 mins ago' }
    ],
    estimatedValue: '$850.00',
    isPremium: true,
    category: 'Action Figures',
    type: 'large'
  },
  {
    id: 'p2',
    user: {
      id: 'u3',
      name: 'Speedy_B',
      username: 'Speedy_B',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIdUS_0B_aFStCKL4xCpYMRyWlAiZNZk-ldXwLuTNcYiy1m28uQQXAjQlPrd-0SXl4FrEBhBc9eUOo6EnitxQbU7brzGyxu-S9JQhc1C3IdIZhYLgDHZEZnE7WPt-rLbA9dWmN47vI3j8VRv6MFGs6pFRDtupK98S9qo69geZm2js75bI8dWUJZGC9BqnpIpqEr13kD37nrtwojftNaF9VZBqiCcayCW9PCfbIgXNKjeqtoTof-vW3DUR0gOupEgPRWDuLaONw-40',
      followers: '1.2k', following: '50', itemCount: '120', totalValue: '$5k'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOE8Is3atjF_Y6Eku5Lq0xcGAncc2kmY12JX92u1e4gEG4463cxp1vQbsVD6-eQ0Qz5cyQhS2H9U7PeH3kIchxwSwBawp7Vqon7JOTLyidncU2CXSOP8faKkVYKlVR0ZVgy1xiLEv1tKU7iBJP4YlN-4UnMHZt2OIBfZp4YrMyBdfbqKbFjuwiEuyK7EfcjP9mnu1GIcaHEpi65Lbg6IioOlAPMGyKSViP27nwM2bRKubeHCWkLglM4DIkgPBG3YP0LayRIixe_rI',
    title: 'M2 Machines Custom',
    caption: 'Anyone know if this is a rare variant? Found it in a local shop. The wheel color seems different from the standard release.',
    timestamp: '4 hours ago',
    likes: 450,
    comments: [],
    estimatedValue: '$35.00',
    category: 'Hot Wheels',
    isQuestion: true,
    type: 'square'
  },
  {
    id: 'p3',
    user: {
      id: 'u4',
      name: 'PokeMaster_99',
      username: 'PokeMaster_99',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSe7FtMVg71eyBu6tiuSh_XZ3qLXfSpRY0hqYV_YQJygR6AZEF932KxTSdH1TX9xe1hOsRI1c6FAL8DL09ErR6snmsS_m9wy_JUeiWO5GlPOjr9BNGJybeHsTrQANcNAJDhGeqBoc8fmIcmpOKI1-SBebuFp0NWYKI2Cn3bh84iMuq2bHfMZ2wC8EkOo4hwaSX3gGzhmpvEY2dgkUIRXD2hyJna_tvHQEwcZKvURvGHhWoWI56cIeOycVcquOviKld4JptJW4wg5o',
      followers: '5k', following: '200', itemCount: '3000', totalValue: '$50k'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4lF7R29Bfel0sTAEcDReESdKk6RAKsDvyGiladgmHEurUoeRLgbtd0C6qRQCPaoO9IlNPz6Ft4s3N0nWCKZkDtqbzBgzM4yICf1drR5lI7uQ_jt_oCY3SEy_vs-VDag1BtTfBaImq2PunG-7jeHF8X_HdvL1G3JfpcmXvC2YYMeDbrNbSt4UhdfKtG-tUCO9GaUOuiN1BRThGDAYi-nMEZqAvdWgucSkcYo-0gVDjWIeimWeceO2v9KK49YLhXvBulRVCdAcS_f4',
    title: 'Holographic Charizard',
    caption: 'Mint condition pull! Centering is 10/10.',
    timestamp: '5 hours ago',
    likes: 2100,
    comments: [],
    estimatedValue: '$1,200.00',
    category: 'Pokémon Cards',
    type: 'square'
  },
  {
    id: 'p4',
    user: {
      id: 'u5',
      name: 'Luna_Vibe',
      username: 'Luna_Vibe',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTTitKG60xEj1vn3OCTSYU4g0sVeGLArS7-Iw9Sw9aU8SJV-WKFSZqpIedOpLsPPyM3bhTtXbwQ9pxLv5OIJYthkVLxl-egtDesVaHBmTn06l-9PqgfQPD33sff6j9Cn-8wvB72BVW8hrsNGP4ZOfEctGcf0GB_KNq4wNFi-kOI8aFgLFzcxh5DxO48R0IsNS8QwTeqI5FfgDuwNMrKGYIY6zDUq6oSs4JAbjDWcW8h37msGyeGH_Duqexr0G1T4kWcnEccNVgpV8',
      followers: '10k', following: '500', itemCount: '500', totalValue: '$25k'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQfyr-TM3XnV9m_80ktuEpTEzT7qusV3vbsoPu-cfcZOhgZJ5jyefWhLCvVqrkDag3fHOvVLpUsWEUKgZL3rT3vLbKjSO5-pISu5n5YTCCNCC7tS9NxuAlaGC3UjSekrSfcySJiCIEeGZILzul3eVh1V-0jreEh2i7UX-YdijqORGAexfNnodt5RlIZylH5aATbtKucGb_j48NQX3A-MMwP9ooLZ2JGkPNDJIK5Ta_-0xvHDtXYwSzXZgbD-OH0k7hGyve1iSTdUc',
    title: 'Bearbrick Session',
    caption: 'New Haul! These 400% figures are growing on me.',
    timestamp: 'yesterday',
    likes: 890,
    comments: [],
    estimatedValue: '$450.00',
    category: 'Toys',
    type: 'vertical'
  },
  {
    id: 'p5',
    user: {
      id: 'u6',
      name: 'Diecast_Racer',
      username: 'Diecast_Racer',
      avatar: '',
      followers: '300', following: '100', itemCount: '1000', totalValue: '$15k'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPH5qSIHumI_zhcg7Kd6k2fDbdBh7zxnjkSKxRXOsw82-U6N_Kc2wkB3n-JdrrEmwfQCzTK4s1q2U_DIJf6vY--rUJ_AfIVWsuX9tUOiVOidWz4fo0xa2aAHnFF1tHj_XgE5zu5CsJLuO3DaRVYkt86IHlw-nVNsKcLA52wAajgPh5jY3wnCN1nLO8L75dWTbeSAlHpQCUTBuoRZbLHr2O76YIWpsjxo1xBSsxlGaGT-s8D-BwUWA3hbZaQMBWemp3V_LVy0w2sI8',
    title: 'Vintage Finds',
    caption: 'How much is this worth? Just hit the local flea market and found these gems from \'85. Original packaging too!',
    timestamp: '3 days ago',
    likes: 560,
    comments: [],
    estimatedValue: '$200.00',
    category: 'Antique',
    isQuestion: true,
    type: 'wide'
  },
  {
    id: 'p6',
    user: { ...currentUser },
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    title: 'First Edition Collection',
    caption: 'Started collecting first edition classics. This 1920s print is my current favorite.',
    timestamp: '5 days ago',
    likes: 320,
    comments: [],
    category: 'Books',
    type: 'square'
  },
  {
    id: 'p7',
    user: topCollectors[2],
    image: 'https://images.unsplash.com/photo-1540759786422-c60d5ecd57ad?auto=format&fit=crop&q=80&w=800',
    title: 'Rare Sport Cards Set',
    caption: 'The complete set of 1995 Sport Cards. The gold embossing is still perfect.',
    timestamp: '1 week ago',
    likes: 1500,
    comments: [],
    category: 'Sport Cards',
    type: 'vertical'
  },
  {
    id: 'p8',
    user: topCollectors[3],
    image: 'https://images.unsplash.com/photo-1621533033504-44edade665d3?auto=format&fit=crop&q=80&w=800',
    title: 'Vintage Badge Collection',
    caption: 'A compilation of badges and patches from around the world.',
    timestamp: '2 weeks ago',
    likes: 740,
    comments: [],
    category: 'Antique',
    type: 'wide'
  },
  {
    id: 'p9',
    user: topCollectors[1],
    image: 'https://images.unsplash.com/photo-1612033448550-9d6f9c17f07d?auto=format&fit=crop&q=80&w=800',
    title: '90s Manga Originals',
    caption: 'Found some original 90s manga prints in pristine condition.',
    timestamp: '3 weeks ago',
    likes: 1100,
    comments: [],
    category: 'Comics & Manga',
    type: 'square'
  },
  {
    id: 'p10',
    user: currentUser,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    title: 'Deadstock Archive',
    caption: 'Just cataloged my archive from 2012. Some legends in here.',
    timestamp: '1 month ago',
    likes: 2400,
    comments: [],
    category: 'Action Figures',
    type: 'large'
  },
  {
    id: 'p11',
    user: topCollectors[1],
    image: 'https://vader-prod.s3.amazonaws.com/1643639144-spiderman-1643639136.jpg',
    title: 'Classic Spidey',
    caption: 'The web-head in all his glory. This figure started it all for me.',
    timestamp: '2 days ago',
    likes: 1800,
    comments: [],
    category: 'Action Figures',
    type: 'square'
  },
  {
    id: 'p12',
    user: topCollectors[2],
    image: 'https://www.dexerto.com/cdn-image/wp-content/uploads/2024/05/13/Pokemon-TCG-Twilight-Masquerade-Most-expensive-cards.jpg?width=1200&quality=60&format=auto',
    title: 'Twilight Expansion Pulls',
    caption: 'Crazy luck today! These full art cards are stunning.',
    timestamp: '3 hours ago',
    likes: 3200,
    comments: [],
    category: 'Pokémon Cards',
    type: 'wide'
  },
  {
    id: 'p13',
    user: topCollectors[3],
    image: 'https://dochoitreem.com/wp-content/uploads/2015/03/xe-hot-wheels-co-ban-C4982-1-500x480.png',
    title: 'Found a Treasure Hunt!',
    caption: 'Scored this at the local supermarket. Always check the back of the pegs!',
    timestamp: '12 hours ago',
    likes: 950,
    comments: [],
    category: 'Hot Wheels',
    type: 'square'
  },
  {
    id: 'p14',
    user: currentUser,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    title: 'Archive Restoration',
    caption: 'Restoring some vintage 1st editions. The paper quality is still amazing.',
    timestamp: '1 day ago',
    likes: 420,
    comments: [],
    category: 'Books',
    type: 'vertical'
  },
  {
    id: 'p15',
    user: topCollectors[1],
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    title: 'Grail Item Pickups',
    caption: 'Finally added these to the rotation. The material quality is 10/10.',
    timestamp: '4 days ago',
    likes: 5100,
    comments: [],
    category: 'Toys',
    type: 'large'
  },
  {
    id: 'p16',
    user: topCollectors[2],
    image: 'https://images.unsplash.com/photo-1502472545331-db9b015e768e?auto=format&fit=crop&q=80&w=800',
    title: 'Victorian Era Relics',
    caption: 'Found these at an estate sale. The craftsmanship of the 1800s is unmatched.',
    timestamp: '1 week ago',
    likes: 830,
    comments: [],
    category: 'Antique',
    type: 'wide'
  },
  {
    id: 'p17',
    user: topCollectors[3],
    image: 'https://images.unsplash.com/photo-1531323380760-70085d470f7b?auto=format&fit=crop&q=80&w=800',
    title: 'Retro Playroom Vibes',
    caption: 'Adding some 80s nostalgia to the shelves today.',
    timestamp: '2 weeks ago',
    likes: 1250,
    comments: [],
    category: 'Toys',
    type: 'square'
  },
  {
    id: 'p18',
    user: topCollectors[1],
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800',
    title: 'Gundam Perfect Grade',
    caption: 'Finally finished this 1/60 scale beast. The internal frame detail is unmatched.',
    timestamp: '3 days ago',
    likes: 2800,
    comments: [],
    category: 'Action Figures',
    type: 'large'
  },
  {
    id: 'p19',
    user: topCollectors[2],
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=800',
    title: 'Base Set Holo Haul',
    caption: 'Old school collection coming together. These shadows are so nostalgic.',
    timestamp: '4 days ago',
    likes: 1900,
    comments: [],
    category: 'Pokémon Cards',
    type: 'square'
  },
  {
    id: 'p20',
    user: topCollectors[3],
    image: 'https://images.unsplash.com/photo-1591438676302-13340050843c?auto=format&fit=crop&q=80&w=800',
    title: 'Classic Ford Collection',
    caption: 'The detail in these 1:64 models is getting better every year.',
    timestamp: '5 days ago',
    likes: 760,
    comments: [],
    category: 'Hot Wheels',
    type: 'wide'
  },
  {
    id: 'p21',
    user: currentUser,
    image: 'https://www.heritagestatic.com/c/i/articles/pr/kaws.jpg',
    title: 'Companion Archive',
    caption: 'My latest KAWS pickup. The silhouette is just iconic.',
    timestamp: '1 week ago',
    likes: 3400,
    comments: [],
    category: 'Toys',
    type: 'square'
  },
  {
    id: 'p22',
    user: topCollectors[1],
    image: 'https://images.unsplash.com/photo-1531685250051-730ca78ca742?auto=format&fit=crop&q=80&w=800',
    title: 'Renaissance Artifact',
    caption: 'Studying the intricate details of this 16th century design.',
    timestamp: '1 week ago',
    likes: 620,
    comments: [],
    category: 'Antique',
    type: 'vertical'
  },
  {
    id: 'p23',
    user: topCollectors[2],
    image: 'https://cms.cdn4vest.com/images/investing-in-sports-cards.width-1028.jpg',
    title: 'Rookie Card Portfolio',
    caption: 'Major additions to the investment vault this month.',
    timestamp: '2 weeks ago',
    likes: 4500,
    comments: [],
    category: 'Sport Cards',
    type: 'large'
  },
  {
    id: 'p24',
    user: topCollectors[3],
    image: 'https://galvestonislandguide.com/wp-content/uploads/2017/01/Lone-Star-Heroes-galveston-tx-comic-books.jpg',
    title: 'Golden Age Gems',
    caption: 'Found these in an old attic. The ink is still so vibrant.',
    timestamp: '2 weeks ago',
    likes: 2100,
    comments: [],
    category: 'Comics & Manga',
    type: 'wide'
  },
  {
    id: 'p25',
    user: currentUser,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    title: 'Custom Sneaker Lab',
    caption: 'Working on some new textures for this custom project.',
    timestamp: '3 weeks ago',
    likes: 1800,
    comments: [],
    category: 'Action Figures',
    type: 'square'
  },
  {
    id: 'p26',
    user: topCollectors[1],
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
    title: 'Philosopher Collection',
    caption: 'Adding some leather-bound classics to the library.',
    timestamp: '3 weeks ago',
    likes: 540,
    comments: [],
    category: 'Books',
    type: 'vertical'
  },
  {
    id: 'p27',
    user: currentUser,
    image: 'https://bandwagon-gig-finder.s3.amazonaws.com/system/tinymce/image/file/1519/content_mceu_2875599941607564718033.jpg',
    title: 'Album Archive Complete',
    caption: 'Finally finished my collection of rare photocard sets from the 2020 era.',
    timestamp: '1 day ago',
    likes: 4200,
    comments: [],
    category: 'K-Pop Merchandise',
    type: 'square'
  },
  {
    id: 'p28',
    user: topCollectors[2],
    image: 'https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&q=80&w=800',
    title: 'Lightstick Wall',
    caption: 'The atmosphere in my room at night is different now. Love the glow from these.',
    timestamp: '3 days ago',
    likes: 1560,
    comments: [],
    category: 'K-Pop Merchandise',
    type: 'wide'
  },
  {
    id: 'p29',
    user: topCollectors[1],
    image: 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=800',
    title: 'Model Kit Monday',
    caption: 'Work in progress on this master grade. The detail on the leg thrusters is insane.',
    timestamp: '5 hours ago',
    likes: 1200,
    comments: [],
    category: 'Action Figures',
    type: 'square'
  },
  {
    id: 'p30',
    user: topCollectors[2],
    image: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&q=80&w=800',
    title: 'Japanese Promo Set',
    caption: 'Recent import from Osaka. These promo cards have the best holofoil patterns.',
    timestamp: '8 hours ago',
    likes: 2100,
    comments: [],
    category: 'Pokémon Cards',
    type: 'vertical'
  },
  {
    id: 'p31',
    user: topCollectors[3],
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800',
    title: 'Datsun 510 Wagon',
    caption: 'One of my favorite castings. The BRE livery is a classic for a reason.',
    timestamp: '10 hours ago',
    likes: 850,
    comments: [],
    category: 'Hot Wheels',
    type: 'wide'
  },
  {
    id: 'p32',
    user: currentUser,
    image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&q=80&w=800',
    title: 'Vinyl Art Collection',
    caption: 'Adding some monochromatic pieces to the shelf. The contrast is sharp.',
    timestamp: '12 hours ago',
    likes: 1450,
    comments: [],
    category: 'Toys',
    type: 'square'
  },
  {
    id: 'p33',
    user: topCollectors[1],
    image: 'https://images.unsplash.com/photo-1563811771046-ba984ff30900?auto=format&fit=crop&q=80&w=800',
    title: 'Typewriter Restoration',
    caption: 'Got this 1950s Underwood working again. The tactile click is so satisfying.',
    timestamp: '1 day ago',
    likes: 720,
    comments: [],
    category: 'Antique',
    type: 'large'
  },
  {
    id: 'p34',
    user: topCollectors[2],
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800',
    title: 'Library Expansion',
    caption: 'Finally organized the rare manuscript section. It took all weekend.',
    timestamp: '1 day ago',
    likes: 310,
    comments: [],
    category: 'Books',
    type: 'wide'
  },
  {
    id: 'p35',
    user: topCollectors[3],
    image: 'https://images.unsplash.com/photo-1562077772-3bd0ce6881c1?auto=format&fit=crop&q=80&w=800',
    title: 'Vintage Baseball Archive',
    caption: 'Sorting through these 1950s cards is like a history lesson.',
    timestamp: '2 days ago',
    likes: 1800,
    comments: [],
    category: 'Sport Cards',
    type: 'vertical'
  },
  {
    id: 'p36',
    user: currentUser,
    image: 'https://images.unsplash.com/photo-1590305108846-953e5e48dd27?auto=format&fit=crop&q=80&w=800',
    title: 'Rare Variant Cover',
    caption: 'Found this 1-in-50 incentive cover in the dollar bin. Absolute steal.',
    timestamp: '2 days ago',
    likes: 2400,
    comments: [],
    category: 'Comics & Manga',
    type: 'square'
  },
  {
    id: 'p37',
    user: topCollectors[1],
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=800',
    title: 'Air Jordan 1 Chicago',
    caption: 'The 2015 pair is still the standard. Material aging beautifully.',
    timestamp: '3 days ago',
    likes: 5600,
    comments: [],
    category: 'Action Figures',
    type: 'large'
  },
  {
    id: 'p38',
    user: topCollectors[2],
    image: 'https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&q=80&w=800',
    title: 'Limited Photocard Haul',
    caption: 'These pre-order bonuses were definitely worth the overnight wait.',
    timestamp: '3 days ago',
    likes: 1900,
    comments: [],
    category: 'K-Pop Merchandise',
    type: 'square'
  },
  {
    id: 'p39',
    user: topCollectors[3],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    title: 'Cyberpunk Figure Setup',
    caption: 'Adjusting the lighting for my new display cabinet. The neon vibes are real.',
    timestamp: '4 days ago',
    likes: 1300,
    comments: [],
    category: 'Action Figures',
    type: 'wide'
  },
  {
    id: 'p40',
    user: currentUser,
    image: 'https://images.unsplash.com/photo-1512626120412-fab41fc844a1?auto=format&fit=crop&q=80&w=800',
    title: 'Retro Gaming Treasures',
    caption: 'Is this vintage set worth anything today? Just found these mint condition classics from the early 90s in my attic.',
    timestamp: '4 days ago',
    likes: 2500,
    comments: [],
    category: 'Toys',
    isQuestion: true,
    type: 'large'
  },
  {
    id: 'p41',
    user: topCollectors[1],
    image: 'https://images.unsplash.com/photo-1621533033504-44edade665d3?auto=format&fit=crop&q=80&w=800',
    title: 'Badge Wall Grows',
    caption: 'Added 5 new unique patches to the main display board today.',
    timestamp: '5 days ago',
    likes: 420,
    comments: [],
    category: 'Antique',
    type: 'square'
  },
  {
    id: 'p42',
    user: topCollectors[2],
    image: 'https://images.unsplash.com/photo-1588833946439-df4d22cbca1e?auto=format&fit=crop&q=80&w=800',
    title: 'Manga First Prints',
    caption: 'Completing the 90s run. This series defined my childhood.',
    timestamp: '5 days ago',
    likes: 1800,
    comments: [],
    category: 'Comics & Manga',
    type: 'vertical'
  },
  {
    id: 'p43',
    user: topCollectors[3],
    image: 'https://images.unsplash.com/photo-1614850523296-d3c1daF3afc0?auto=format&fit=crop&q=80&w=800',
    title: 'Newest Graded Pulls',
    caption: 'Got these back from grading today. Very happy with the 10s!',
    timestamp: '1 week ago',
    likes: 3100,
    comments: [],
    category: 'Sport Cards',
    type: 'wide'
  }
];

export const collectibleCategories = [
  { id: 'cat1', name: 'Action Figures', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEjpZWHkgxQG12-KyD49y79-Mtc9lhLsgxaigYEMJHAlZAMPoj8lELsLQRJyJMVS1HvKrLoqlZGoFL6JSjMgAXE6aCmfOnMJhPn9QVpTtGdx2eJeptblf7l96TEBKIq5f2H_w8siVKFkeTgqPOOKY2nnebHseNGyGChFhmOS7sIbX7XpXbNASbKyn7amF4eG9fhOeB8UgC_iSK0fbUffaCefBM4Etx0UgN5q9-pbpMJzvjYH4nPanL4-i4kE6qNI0F3M5DJQii8tI' },
  { id: 'cat2', name: 'Pokémon Cards', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWEN0qx-IafOmA2G3LdvFCO5FbC7tWU3fs4t_jYUSNhLkfkc4rJvM-jC-D-zxIrlDYhRqTPSvWsVdgcOt-XHJN10ZI-4zr8bO49XIUJx1bfB1urDFjOivrroRXZk6bQJyy-Yh-J1Ky6_GwOz_XkBx8RFY8Wb82tInJvh4NejDYHct90iQjE51ODOS32SbMmANDTwjyfS0Bz3swFq4e_pzPMZ-5pQMGs-VNSwTVTpX3F8GJeSkfHgZMafm4nDN6KmKYEumH3Xs-cvk' },
  { id: 'cat3', name: 'Hot Wheels', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSRMd0ezZhrFWCi6Ty7SW_ofEIhMAvGeumIK40lOYHgMgZ51JrSyXk4YYiFnnGcrD8eBfz-RP-weISuKvhWudnMPai_xNH-DDA1ORwPvrzxJH5UYhsT3JMIWhwYib97VnyBQ3GjysRlTXVR-aqV-V09YwcCDtqECaUshyrvIwNt712nfQBGhGhBcUozUO9Z74nmUjmAYU1000EF01dWV-gkDifE_jhBuS_38243IPwENawF2iOzm0t6FjsOg6WQ57asLb5RpR2uDc' },
  { id: 'cat4', name: 'Toys', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2_yShY4jADbMFqOP8C7YDGSFoa4cr18qejYzjCU-EpPC-8Rc6sFdm2Q7sWnqj9LKyOoILRKPVORRUV0J8pHrnR4r7mHl_RbECZmo8cjJhnnc9PIwkrHyOvdQlQlsKeSEEwpHwsW6Ysu4oHFseYzgQoHvOLMR_SaW9gUUPMIKn5Id40MlSasukL2muCPcKUiGEb33VsIObdKUwxhEgNo8kf2mr72jpw6OigFl5HvSY33CPPIXjHIgrIuQbszIW7NjKT4ZxsTlnjZg' },
  { id: 'cat5', name: 'Antique', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXl1nKOuT2XnF7_nX4lSHf3Q-hqaLxyzSEdA&s' },
  { id: 'cat6', name: 'Books', icon: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400' },
  { id: 'cat7', name: 'Sport Cards', icon: 'https://cms.cdn4vest.com/images/investing-in-sports-cards.width-1028.jpg' },
  { id: 'cat8', name: 'Comics & Manga', icon: 'https://galvestonislandguide.com/wp-content/uploads/2017/01/Lone-Star-Heroes-galveston-tx-comic-books.jpg' },
  { id: 'cat9', name: 'K-Pop Merchandise', icon: 'https://bandwagon-gig-finder.s3.amazonaws.com/system/tinymce/image/file/1519/content_mceu_2875599941607564718033.jpg' },
];

export const articles: NewsArticle[] = [
  {
    id: 'a1',
    title: 'The 2024 F1 Championship Box Set',
    description: 'Mattel announces the most detailed Formula 1 collection in 1:64 scale yet. Featuring all 10 constructor liveries with authentic tyre compounds.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFkrZeAGIitb8oGWdwY4M49m6JUz2erMLSjdyF1ScaS4h2WBMC5R3YwojxCdYPFuAvxdiXEfQiuZkDN-YXHuO4FkXvL9SmKxooN1K6Lh9XLf00dop8n3YNJFx7ealML1jN168fV0B8Z3pfC2fQy-_pti4F4EVNIeGyAvPJ2DZpr3N5pSTIQv_83VsjJDlrL-V0wyPyg9sNaFh8HyvPT5bs6zFd7fp-kvMEn-1YohG_E8ly1p-k0DVD7fxwx0j6RfFwQ7pa7bU1RLI',
    publisher: 'Mattel Creations',
    timestamp: 'Official Drop',
    isHero: true,
    category: 'New Releases',
    content: `
      # The 2024 F1 Championship Box Set: A Masterpiece in 1:64
      
      Mattel has just unveiled what collectors are already calling the definitive Formula 1 collection for 2024. This limited edition box set features all ten constructor liveries from the current season, rendered with a level of precision previously unseen at this scale.
      
      ## The Details Matter
      Each car in the set features authentic tyre compounds marked with the Pirelli colors, precision-molded aero components, and sponsor decals that are legible even under a magnifying glass. 
      
      ## A Collector's Dream
      The set comes in a museum-grade display case with a commemorative plaque and a certificate of authenticity. For the first time, Mattel has used a new high-density alloy that gives these 1:64 models the weight and feel of larger premium pieces.
      
      Stay tuned for the official drop date and pre-order details.
    `
  },
  {
    id: 'a2',
    title: 'Why the \'67 Camaro Remains the King of Die-Cast',
    description: 'Exploring the cultural impact and enduring design of the legendary 1967 Chevrolet Camaro in the world of toy cars.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO7TSrlBDA6j1mw_SMIjV-kKCESbvQG5DIFpS0NsoRawUc21HPiSC5YjLT3DauLh9i3cO5VV8r5MoJgl7JC4pHBqo7m4FaKVVod1xPF00sLYH73lU2zB88-TvsNCINH0UAwcPonkyXdaFAYAdnmrM9v1gZ8aTfzPK955jeKWTq9WyXWIrjb5DIY2s0ciPa7lbSHAV86K_vhJaehb10Y0jH3mjVIxMEbXsIXsceh2eWfG34fDzfWy09C8Uj3ZEMeaN6kX87TkBGwJ0',
    publisher: 'Mattel Creations',
    timestamp: '2 hours ago',
    category: 'Market Trends',
    content: `
      # Why the '67 Camaro Remains the King of Die-Cast
      
      Since its debut in the original Hot Wheels Sweet 16 in 1968, the 1967 Chevrolet Camaro has held a special place in the hearts of collectors. But why does this specific model continue to dominate the market?
      
      ## An Eternal Silhouette
      The '67 Camaro represents the pinnacle of American muscle car design. Its balanced proportions and "Coke bottle" styling translate perfectly into smaller scales, maintaining its aggressive looks even at three inches long.
      
      ## The Rarity Factor
      From the elusive "Over-Chrome" versions to the original Spectraflame releases, the '67 Camaro has been the subject of some of the rarest variations in die-cast history.
    `
  },
  {
    id: 'a3',
    title: 'The Making of the Limited 1:18 scale 911 S/T',
    description: 'Go behind the scenes of the painstaking craftsmanship required to create the Porsche 911 S/T anniversary edition.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqJsMESFT1YCTHLlL-A0Tqe45Rg7_D-M4nzyUSuOijYvmf3RXvDiVB-gWmrdu9GwT-YEIlSgcRoDpTadV2TFQNR-APF33dVcWWxdDIAgZ_j8uMlBvldLXOIkRCON90HvWedXfe0M-YuANznCF5DAlyXYU631XeSS1Kf-Jgq3LNnMVUc3TkimXjNGZ3JU9EpQrZyv5r2071C3-rHiC32LH-OsAtNE_7lhd1Y5UdKIX6eZ7Hj7nvM5zOaz2ZUNgObLk1_ZR575U8jy0',
    publisher: 'Porsche Design',
    timestamp: '4 hours ago',
    category: 'Collector Stories',
    content: `
      # The Making of the Limited 1:18 scale 911 S/T
      
      Porsche Design has always been synonymous with precision, but their latest 1:18 scale 911 S/T takes things to a whole new level. 
      
      ## 800 Individual Components
      Each model is hand-assembled from over 800 individual parts. The interior features real leather upholstery, and the engine bay is a perfect miniature of the high-revving naturally aspirated flat-six.
    `
  },
  {
    id: 'a4',
    title: 'Sotheby\'s Record Breaking Auction',
    description: 'A collection of rare action figures fetches millions at a single evening auction.',
    image: 'https://images.unsplash.com/photo-1540759786422-c60d5ecd57ad?auto=format&fit=crop&q=80&w=800',
    publisher: 'Auction Weekly',
    timestamp: '1 day ago',
    category: 'Auctions',
    content: `
      # Sotheby's Record Breaking Auction
      The collectible market continues to soar as a private collection of rare star wars prototypes sold for a combined $4.2 million yesterday.
    `
  },
  {
    id: 'a5',
    title: 'Upcoming Collector Expo 2026',
    description: 'Everything you need to know about the largest gathering of toy collectors in Asia.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
    publisher: 'Events Horizon',
    timestamp: '3 days ago',
    category: 'Events',
    content: `
      # Upcoming Collector Expo 2026
      Get ready for three days of trading, panels, and exclusive reveals. Hosted in the heart of Tokyo.
    `
  },
  {
    id: 'a6',
    title: 'Vintage Manga Market Analysis',
    description: 'Prices for first edition 90s manga are seeing a sharp 20% increase this quarter.',
    image: 'https://images.unsplash.com/photo-1612033448550-9d6f9c17f07d?auto=format&fit=crop&q=80&w=800',
    publisher: 'Market Watch',
    timestamp: '4 days ago',
    category: 'Market Trends',
    content: `
      # Vintage Manga Market Analysis
      The data shows a consistent upward trend for pristine copies of cult classics.
    `
  },
  {
    id: 'a7',
    title: 'The Rise of Designer Toys',
    description: 'A deep dive into why KAWS and Bearbrick define modern luxury collecting.',
    image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&q=80&w=800',
    publisher: 'Culture Pulse',
    timestamp: '1 week ago',
    category: 'Collector Stories',
    content: `
      # The Rise of Designer Toys
      How vinyl figures transitioned from niche hobbies to centerpieces of contemporary art collections.
    `
  },
  {
    id: 'a8',
    title: 'Hot Wheels Elite 64 New Reveal',
    description: 'The upcoming Lamborghini LB-Works Huracán is poised to be a sell-out.',
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800',
    publisher: 'Diecast Daily',
    timestamp: '1 week ago',
    category: 'New Releases',
    content: `
      # Hot Wheels Elite 64 New Reveal
      High-end detail meets the iconic Orange Track brand once again.
    `
  }
];

export const auctions: Auction[] = [
  {
    id: 'auc1',
    title: '1968 \'Custom Mustang\' Prototypes',
    currentBid: '$14,200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiWQPUIuATJ53uUHWKBtX2lForZNGypF8zY3flGTZXA-Kxq3PsTprZUW-Vs4tQRIPzC6Z5SRHQB6l7G4hUNyxsdVwtpaqsEr71jaqjomy08UFBQrorzw5kJ7oIujSAqlnY927Ql2vFGvLRnHUaxyxQ4OMbQgFEuZ1Gknus4ZNfwS-Kam-TW2QICbB9Irg_yev3yOu6QbgEyb1KvfL9nIBDZ7KF9gExaWlJMuxr3TTbKqEVlTdgNboliT3GnY2BO_iszx4PVdiaFkY',
    endTime: '2h 15m',
    isEndingSoon: true
  }
];

export const categories: Category[] = [
  { id: 'c1', name: 'Action Figures', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEjpZWHkgxQG12-KyD49y79-Mtc9lhLsgxaigYEMJHAlZAMPoj8lELsLQRJyJMVS1HvKrLoqlZGoFL6JSjMgAXE6aCmfOnMJhPn9QVpTtGdx2eJeptblf7l96TEBKIq5f2H_w8siVKFkeTgqPOOKY2nnebHseNGyGChFhmOS7sIbX7XpXbNASbKyn7amF4eG9fhOeB8UgC_iSK0fbUffaCefBM4Etx0UgN5q9-pbpMJzvjYH4nPanL4-i4kE6qNI0F3M5DJQii8tI' },
  { id: 'c2', name: 'Pokémon Cards', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWEN0qx-IafOmA2G3LdvFCO5FbC7tWU3fs4t_jYUSNhLkfkc4rJvM-jC-D-zxIrlDYhRqTPSvWsVdgcOt-XHJN10ZI-4zr8bO49XIUJx1bfB1urDFjOivrroRXZk6bQJyy-Yh-J1Ky6_GwOz_XkBx8RFY8Wb82tInJvh4NejDYHct90iQjE51ODOS32SbMmANDTwjyfS0Bz3swFq4e_pzPMZ-5pQMGs-VNSwTVTpX3F8GJeSkfHgZMafm4nDN6KmKYEumH3Xs-cvk' },
  { id: 'c3', name: 'Hot Wheels', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSRMd0ezZhrFWCi6Ty7SW_ofEIhMAvGeumIK40lOYHgMgZ51JrSyXk4YYiFnnGcrD8eBfz-RP-weISuKvhWudnMPai_xNH-DDA1ORwPvrzxJH5UYhsT3JMIWhwYib97VnyBQ3GjysRlTXVR-aqV-V09YwcCDtqECaUshyrvIwNt712nfQBGhGhBcUozUO9Z74nmUjmAYU1000EF01dWV-gkDifE_jhBuS_38243IPwENawF2iOzm0t6FjsOg6WQ57asLb5RpR2uDc' },
  { id: 'c4', name: 'Toys', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2_yShY4jADbMFqOP8C7YDGSFoa4cr18qejYzjCU-EpPC-8Rc6sFdm2Q7sWnqj9LKyOoILRKPVORRUV0J8pHrnR4r7mHl_RbECZmo8cjJhnnc9PIwkrHyOvdQlQlsKeSEEwpHwsW6Ysu4oHFseYzgQoHvOLMR_SaW9gUUPMIKn5Id40MlSasukL2muCPcKUiGEb33VsIObdKUwxhEgNo8kf2mr72jpw6OigFl5HvSY33CPPIXjHIgrIuQbszIW7NjKT4ZxsTlnjZg' },
  { id: 'c5', name: 'Antique', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXl1nKOuT2XnF7_nX4lSHf3Q-hqaLxyzSEdA&s' },
  { id: 'c6', name: 'Books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400' },
  { id: 'c7', name: 'Sport Cards', image: 'https://cms.cdn4vest.com/images/investing-in-sports-cards.width-1028.jpg' },
  { id: 'c8', name: 'Comics & Manga', image: 'https://galvestonislandguide.com/wp-content/uploads/2017/01/Lone-Star-Heroes-galveston-tx-comic-books.jpg' },
  { id: 'c9', name: 'K-Pop Merchandise', image: 'https://bandwagon-gig-finder.s3.amazonaws.com/system/tinymce/image/file/1519/content_mceu_2875599941607564718033.jpg' }
];

export const mainAsset: Asset = {
  id: 'a1',
  name: '998 Promo Pikachu Illustrator',
  series: 'Grail Asset',
  price: '$480,000.00',
  change: '+45.8%',
  image: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F03%2F480000-usd-pokemon-tcg-illustrator-pikachu-zero-auction-bids-info-tw.jpg?w=960&cbr=1&q=90&fit=max',
  description: 'The Holy Grail of Pokémon cards. Originally awarded to winners of the 1997 CoroCoro Comic Illustration Contest, this is one of the rarest and most legendary collectibles in existence.',
  specs: {
    releaseDate: 'JAN 1998',
    colorway: 'Promo / Holofoil',
    retailPrice: 'N/A (Award)',
    stockNumber: '#CORO-PIKA-ILLUST'
  },
  scarcity: 'LEGENDARY',
  category: 'Card',
  matchPercentage: 99.9
};

export const scanningAsset: Asset = {
  id: 'a2',
  name: '998 Promo Pikachu Illustrator',
  series: 'Grail Asset',
  price: '$480,000.00',
  change: '+45.8%',
  image: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F03%2F480000-usd-pokemon-tcg-illustrator-pikachu-zero-auction-bids-info-tw.jpg?w=960&cbr=1&q=90&fit=max',
  description: 'The Holy Grail of Pokémon cards. Originally awarded to winners of the 1997 CoroCoro Comic Illustration Contest, this is one of the rarest and most legendary collectibles in existence.',
  specs: {
    releaseDate: 'JAN 1998',
    colorway: 'Promo / Holofoil',
    retailPrice: 'N/A (Award)',
    stockNumber: '#CORO-PIKA-ILLUST'
  },
  scarcity: 'LEGENDARY',
  category: 'Card',
  matchPercentage: 99.9
};

const figureAsset: Asset = {
  id: 'a4',
  name: 'Iron Commander',
  series: 'Neo-Future Legends',
  price: '$450.00',
  change: '+8.5%',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_qhlL_VGdxKtsEyDQDeMIBSAcYQk54M6hzQ&s',
  description: 'Hyper-articulated commander unit with interchangeable plasma blades.',
  specs: {
    releaseDate: '2023',
    colorway: 'Crimson Red / Gunmetal',
    retailPrice: '$299.99',
    stockNumber: '#FIG-IC7'
  },
  scarcity: 'EPIC',
  category: 'Figure'
};

export const allAssets: Asset[] = [
  mainAsset,
  scanningAsset,
  { ...mainAsset, id: 'a3', name: 'MC Astray Gold Frame', series: 'Legacy Digital Assets', image: 'https://i.redd.it/1gz70oxuxkzd1.jpeg', price: '$2,400.00', scarcity: 'EPIC', category: 'Figure' },
  figureAsset,
  { ...figureAsset, id: 'a6', name: 'Vanguard Elite', category: 'Figure', image: 'https://cards.scryfall.io/large/front/2/8/28a5c350-2ed1-4a25-9626-0f8da5d1aef7.jpg?1580013650' },
  { ...scanningAsset, id: 'a7', name: 'Nissan Skyline GTR', category: 'Car', image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mbv28z8kh0fm92' },
  { ...mainAsset, id: 'a8', name: 'Blue-Eyes White Dragon', category: 'Card', image: 'https://i.ebayimg.com/images/g/H6QAAOSw-hJnzbHp/s-l1600.webp' },
];

export const badges: Badge[] = [
  { id: 'b1', name: 'Alpha Curator', icon: 'verified_user', color: 'blue', isUnlocked: true },
  { id: 'b2', name: 'Streak Master', icon: 'military_tech', color: 'amber', isUnlocked: true },
  { id: 'b3', name: 'Eco-Validator', icon: 'eco', color: 'emerald', isUnlocked: true },
  { id: 'b4', name: 'Top Contributor', icon: 'favorite', color: 'rose', isUnlocked: true },
  { id: 'b5', name: 'Legendary Tier', icon: 'lock', color: 'zinc', isUnlocked: false }
];

export const challenges: Challenge[] = [
  { id: 'ch1', title: 'Visual Hunter', description: 'Identify 10 unique vintage labels today.', xp: '+200 XP', progress: 70, icon: 'image_search' },
  { id: 'ch2', title: 'The Chronicler', description: 'Write 5 detailed descriptions for your collection.', xp: '+500 XP', progress: 40, icon: 'history_edu' }
];

export const gameLeaderboards: Record<string, GameLeaderboardEntry[]> = {
  kitbash: [
    { id: 'lb1', user: topCollectors[1], score: 98, formattedScore: '98/100', timestamp: '10m ago' },
    { id: 'lb2', user: topCollectors[2], score: 95, formattedScore: '95/100', timestamp: '1h ago' },
    { id: 'lb3', user: currentUser, score: 88, formattedScore: '88/100', timestamp: '2h ago' },
  ],
  puzzle: [
    { id: 'lb4', user: topCollectors[3], score: 45, formattedScore: '45.2s', timestamp: '30m ago' },
    { id: 'lb5', user: topCollectors[1], score: 52, formattedScore: '52.5s', timestamp: '5h ago' },
    { id: 'lb6', user: currentUser, score: 68, formattedScore: '68.1s', timestamp: '1d ago' },
  ],
  racing: [
    { id: 'lb7', user: topCollectors[2], score: 12, formattedScore: '12.4s', timestamp: '15m ago' },
    { id: 'lb8', user: topCollectors[3], score: 14, formattedScore: '14.8s', timestamp: '4h ago' },
    { id: 'lb9', user: currentUser, score: 18, formattedScore: '18.2s', timestamp: '1d ago' },
  ],
  bookshelf: [
    { id: 'lb10', user: topCollectors[1], score: 12, formattedScore: '12 Items', timestamp: '1h ago' },
    { id: 'lb11', user: topCollectors[3], score: 8, formattedScore: '8 Items', timestamp: '6h ago' },
    { id: 'lb12', user: currentUser, score: 5, formattedScore: '5 Items', timestamp: '2d ago' },
  ],
};
