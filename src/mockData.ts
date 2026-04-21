import { Post, NewsArticle, Auction, Category, Asset, User, Badge, Challenge, Seller, GameLeaderboardEntry } from './types.ts';

export const currentUser: User = {
  id: 'u1',
  name: 'Julian Vane',
  username: 'julianvane',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG4uitfuqu3cF2sSBdWC5ZUfVRByGsGpDbpXTOfRzZKeoV6QzvC1wLc8RhmXAW6CXfceQKGpfp_YRfukbie-QtXfviUMVprb3u8_2xkOFiQUVzxjMGZk_eWd15Mkl8DcZlMAgYf0nX4dUID5JmCfTdLcAs3jp_x44yGxr2hVL6v1jprtoTcEaPsI-ka0KawZdm0W3odB6y0uFmqyCY0QMfUPrp7Gj7nQec_oCo592DQy9wjcMjRR6S_YKeeaUEc7MdWxaq22piZO8',
  role: 'Prime Collector',
  location: 'New York, NY',
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
    avatar: 'https://picsum.photos/seed/shop1/100/100',
    rating: 4.9,
    reviewCount: 1240,
    location: 'Tokyo, JP',
    specialty: 'Rare Figures'
  },
  {
    id: 's2',
    name: 'Diecast Haven',
    avatar: 'https://picsum.photos/seed/shop2/100/100',
    rating: 4.8,
    reviewCount: 850,
    location: 'Los Angeles, US',
    specialty: 'Vintage Cars'
  },
  {
    id: 's3',
    name: 'Card Kingdom',
    avatar: 'https://picsum.photos/seed/shop3/100/100',
    rating: 4.7,
    reviewCount: 3100,
    location: 'Seattle, US',
    specialty: 'Trading Cards'
  },
  {
    id: 's4',
    name: 'Mecha Central',
    avatar: 'https://picsum.photos/seed/shop4/100/100',
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
      'https://picsum.photos/seed/vanguard2/800/800',
      'https://picsum.photos/seed/vanguard3/800/800'
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
    caption: 'Clean build. Custom wheels and lowered suspension for a more aggressive stance.',
    timestamp: '4 hours ago',
    likes: 450,
    comments: [],
    estimatedValue: '$35.00',
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
    caption: 'Just hit the local flea market and found these gems from \'85. Original packaging too!',
    timestamp: '3 days ago',
    likes: 560,
    comments: [],
    estimatedValue: '$200.00',
    type: 'wide'
  }
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
    category: 'Analysis',
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
    content: `
      # The Making of the Limited 1:18 scale 911 S/T
      
      Porsche Design has always been synonymous with precision, but their latest 1:18 scale 911 S/T takes things to a whole new level. 
      
      ## 800 Individual Components
      Each model is hand-assembled from over 800 individual parts. The interior features real leather upholstery, and the engine bay is a perfect miniature of the high-revving naturally aspirated flat-six.
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
  { id: 'c2', name: 'Toys', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSRMd0ezZhrFWCi6Ty7SW_ofEIhMAvGeumIK40lOYHgMgZ51JrSyXk4YYiFnnGcrD8eBfz-RP-weISuKvhWudnMPai_xNH-DDA1ORwPvrzxJH5UYhsT3JMIWhwYib97VnyBQ3GjysRlTXVR-aqV-V09YwcCDtqECaUshyrvIwNt712nfQBGhGhBcUozUO9Z74nmUjmAYU1000EF01dWV-gkDifE_jhBuS_38243IPwENawF2iOzm0t6FjsOg6WQ57asLb5RpR2uDc' },
  { id: 'c3', name: 'Idol Merch', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2_yShY4jADbMFqOP8C7YDGSFoa4cr18qejYzjCU-EpPC-8Rc6sFdm2Q7sWnqj9LKyOoILRKPVORRUV0J8pHrnR4r7mHl_RbECZmo8cjJhnnc9PIwkrHyOvdQlQlsKeSEEwpHwsW6Ysu4oHFseYzgQoHvOLMR_SaW9gUUPMIKn5Id40MlSasukL2muCPcKUiGEb33VsIObdKUwxhEgNo8kf2mr72jpw6OigFl5HvSY33CPPIXjHIgrIuQbszIW7NjKT4ZxsTlnjZg' },
  { id: 'c4', name: 'Trading Cards', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWEN0qx-IafOmA2G3LdvFCO5FbC7tWU3fs4t_jYUSNhLkfkc4rJvM-jC-D-zxIrlDYhRqTPSvWsVdgcOt-XHJN10ZI-4zr8bO49XIUJx1bfB1urDFjOivrroRXZk6bQJyy-Yh-J1Ky6_GwOz_XkBx8RFY8Wb82tInJvh4NejDYHct90iQjE51ODOS32SbMmANDTwjyfS0Bz3swFq4e_pzPMZ-5pQMGs-VNSwTVTpX3F8GJeSkfHgZMafm4nDN6KmKYEumH3Xs-cvk' }
];

export const mainAsset: Asset = {
  id: 'a1',
  name: 'Shadow Specter First Edition',
  series: 'Grail Asset',
  price: '$12,450.00',
  change: '+12.4%',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0tUVqHNjLZd_hCwNEw6F8Vh7H21_rB-0xrKG_rY000I_5SsYcSjzp1oO-seTUWVCJai1JKpP3bhq0TltcNPR-SpKbj-ydOUZaHINEQSHxS4ZrwCkWk2qMFnW-dMaadLpubbX3ArE0FavjK-lLuVk_uRQOje3uEk-WhTd5zG5wJL2azzYHQwY6PIPi9gTOsL1nHTdY88IJc8RVXgFDWU2fW_VvkQKn3awTa6s_hGGM14_oxlv6N8Djsd3KXA3ar41XiTTpqimnDmM',
  description: 'A legendary relic from the 1998 inaugural release. Pristine condition with a grade of 10. Minimal surfacing wear and perfect centering makes this a definitive cornerstone for any elite vault.',
  specs: {
    releaseDate: 'OCT 12, 1998',
    colorway: 'Void Obsidian / Holo',
    retailPrice: '$3.99 (MSRP)',
    stockNumber: '#001-FF-SPEC'
  },
  scarcity: 'RARE',
  category: 'Card',
  matchPercentage: 98.4
};

export const scanningAsset: Asset = {
  id: 'a2',
  name: '1969 Dodge Charger',
  series: 'HotWheels Redline Series (1969)',
  price: '$145.00',
  change: '+5.2%',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeBdsJLI_vzyLWNZMTC6NpaJG8VUR9AnTnXz95tB9uVhwJp1DoHRPRPbyc8ZtU1KUBxHMBsdNuduG41p0xtgOhH6TSXvXclY6I8o8G8u35WMCEcnu8Ej-ZclaMEz1faj9MBkEI4XMh3EqtARuXHYIW1EqnRyQBoYeg-n-QLVsxVzD6qy5bqMnuCuic41lqBlbXEJUJ__sjHVz1A4Gxtt_OBDe_YqlIyeobZMbmB5j3nfr1sujsdTJNNP1TpF-werjA4Q6Zhi1pJrg',
  description: 'Original Spectraflame Paint. Hong Kong Casting.',
  specs: {
    releaseDate: '1969',
    colorway: 'Spectraflame Orange',
    retailPrice: '$0.85 (MSRP)',
    stockNumber: '#H69-DODGE'
  },
  scarcity: 'RARE',
  category: 'Car',
  matchPercentage: 98.4
};

const figureAsset: Asset = {
  id: 'a4',
  name: 'Iron Commander 7',
  series: 'Neo-Future Legends',
  price: '$450.00',
  change: '+8.5%',
  image: 'https://picsum.photos/seed/actionfig1/800/800',
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

const bookAsset: Asset = {
  id: 'a5',
  name: 'The Art of Rare Finds',
  series: 'Collector Archives',
  price: '$85.00',
  change: '+2.1%',
  image: 'https://picsum.photos/seed/book1/800/800',
  description: 'A comprehensive guide to identifying and preserving museum-grade collectibles.',
  specs: {
    releaseDate: '2021',
    colorway: 'Matte Black / Gold Foil',
    retailPrice: '$45.00',
    stockNumber: '#BOOK-ARF'
  },
  scarcity: 'COMMON',
  category: 'Book'
};

export const allAssets: Asset[] = [
  mainAsset,
  scanningAsset,
  { ...mainAsset, id: 'a3', name: 'MC Astray Gold Frame', series: 'Legacy Digital Assets', image: 'https://i.redd.it/1gz70oxuxkzd1.jpeg', price: '$2,400.00', scarcity: 'EPIC', category: 'Figure' },
  figureAsset,
  bookAsset,
  { ...figureAsset, id: 'a6', name: 'Vanguard Elite', category: 'Figure', image: 'https://picsum.photos/seed/fig2/800/800' },
  { ...scanningAsset, id: 'a7', name: 'Nissan Skyline GTR', category: 'Car', image: 'https://picsum.photos/seed/car2/800/800' },
  { ...mainAsset, id: 'a8', name: 'Blue-Eyes White Dragon', category: 'Card', image: 'https://picsum.photos/seed/card2/800/800' },
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
