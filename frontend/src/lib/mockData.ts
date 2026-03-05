// Mock data for watch e-commerce site

export interface Product {
  id: number;
  brand: string;
  modelName: string;
  referenceNumber: string;
  movementType: string;
  caseSizeMm: number;
  caseMaterial: string;
  strapMaterial: string;
  waterResistance: string;
  price: number;
  stock: number;
  description: string;
  imageUrls: string[];
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    brand: "Rolex",
    modelName: "Submariner",
    referenceNumber: "126610LN",
    movementType: "Automatic",
    caseSizeMm: 41,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Stainless Steel",
    waterResistance: "300m",
    price: 9550,
    stock: 5,
    description: "The Submariner is a legendary diving watch with exceptional water resistance and timeless design. Features a unidirectional rotatable bezel and Chromalight display.",
    imageUrls: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=600&h=600&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: 2,
    brand: "Omega",
    modelName: "Seamaster Diver 300M",
    referenceNumber: "210.30.42.20.01.001",
    movementType: "Automatic",
    caseSizeMm: 42,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Stainless Steel",
    waterResistance: "300m",
    price: 5600,
    stock: 8,
    description: "Professional diving watch with Co-Axial Master Chronometer certification. Features helium escape valve and ceramic dial with laser-engraved wave pattern.",
    imageUrls: [
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600&h=600&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 92
  },
  {
    id: 3,
    brand: "Tag Heuer",
    modelName: "Carrera Calibre 16",
    referenceNumber: "CV2A1R.BA0799",
    movementType: "Automatic Chronograph",
    caseSizeMm: 41,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Leather",
    waterResistance: "100m",
    price: 4850,
    stock: 12,
    description: "Racing-inspired chronograph with bold design. Features date display, tachymeter scale, and exhibition caseback showing the automatic movement.",
    imageUrls: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&h=600&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 78
  },
  {
    id: 4,
    brand: "Patek Philippe",
    modelName: "Calatrava",
    referenceNumber: "5227G-001",
    movementType: "Manual",
    caseSizeMm: 39,
    caseMaterial: "White Gold",
    strapMaterial: "Alligator Leather",
    waterResistance: "30m",
    price: 32500,
    stock: 2,
    description: "Elegant dress watch representing the pinnacle of watchmaking. Hand-wound movement with small seconds, embodying timeless sophistication and craftsmanship.",
    imageUrls: [
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&h=600&fit=crop"
    ],
    rating: 5.0,
    reviewCount: 34
  },
  {
    id: 5,
    brand: "Seiko",
    modelName: "Presage Cocktail Time",
    referenceNumber: "SRPB43",
    movementType: "Automatic",
    caseSizeMm: 40.5,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Leather",
    waterResistance: "50m",
    price: 425,
    stock: 25,
    description: "Elegant automatic watch inspired by cocktail culture. Features sunburst blue dial with date display and exhibition caseback showing the 4R35 movement.",
    imageUrls: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&h=600&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 234
  },
  {
    id: 6,
    brand: "Breitling",
    modelName: "Navitimer B01",
    referenceNumber: "AB0127211C1A1",
    movementType: "Automatic Chronograph",
    caseSizeMm: 46,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Alligator Leather",
    waterResistance: "30m",
    price: 8600,
    stock: 6,
    description: "Iconic aviation chronograph with slide rule bezel. In-house Caliber 01 movement with 70-hour power reserve. A pilot's watch legend since 1952.",
    imageUrls: [
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1548171916-c8d0cdb02342?w=600&h=600&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 67
  },
  {
    id: 7,
    brand: "Tudor",
    modelName: "Black Bay Fifty-Eight",
    referenceNumber: "M79030N-0001",
    movementType: "Automatic",
    caseSizeMm: 39,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Fabric",
    waterResistance: "200m",
    price: 3775,
    stock: 10,
    description: "Vintage-inspired dive watch with modern performance. Features snowflake hands, bidirectional bezel, and COSC-certified movement with 70-hour power reserve.",
    imageUrls: [
      "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&h=600&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 143
  },
  {
    id: 8,
    brand: "IWC",
    modelName: "Pilot's Watch Mark XVIII",
    referenceNumber: "IW327015",
    movementType: "Automatic",
    caseSizeMm: 40,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Leather",
    waterResistance: "60m",
    price: 4450,
    stock: 7,
    description: "Clean, functional pilot's watch with exceptional legibility. Features soft-iron inner case for magnetic field protection and date display at 3 o'clock.",
    imageUrls: [
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1455859539836-1321f064849e?w=600&h=600&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: 9,
    brand: "Cartier",
    modelName: "Santos de Cartier",
    referenceNumber: "WSSA0009",
    movementType: "Automatic",
    caseSizeMm: 39.8,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Stainless Steel",
    waterResistance: "100m",
    price: 7100,
    stock: 4,
    description: "Iconic square watch case with exposed screws. Features QuickSwitch bracelet system and SmartLink easy adjustment. A symbol of refined elegance.",
    imageUrls: [
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=600&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 112
  },
  {
    id: 10,
    brand: "Grand Seiko",
    modelName: "Heritage SBGR317",
    referenceNumber: "SBGR317",
    movementType: "Automatic",
    caseSizeMm: 41,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Stainless Steel",
    waterResistance: "100m",
    price: 5800,
    stock: 8,
    description: "Japanese precision timepiece with manual winding movement. Features stunning Zaratsu polished case and Mt. Iwate inspired dial texture.",
    imageUrls: [
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=600&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 76
  },
  {
    id: 11,
    brand: "Citizen",
    modelName: "Promaster Diver",
    referenceNumber: "BN0150-28E",
    movementType: "Eco-Drive",
    caseSizeMm: 44,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Rubber",
    waterResistance: "200m",
    price: 295,
    stock: 30,
    description: "Solar-powered dive watch. Never needs a battery. Features rotating bezel, luminous hands, and ISO compliant diving specifications.",
    imageUrls: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=600&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 189
  },
  {
    id: 12,
    brand: "Tissot",
    modelName: "PRX Powermatic 80",
    referenceNumber: "T137.407.11.051.00",
    movementType: "Automatic",
    caseSizeMm: 40,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Stainless Steel",
    waterResistance: "100m",
    price: 675,
    stock: 20,
    description: "Retro-inspired integrated bracelet watch with modern movement. Features 80-hour power reserve and slim profile perfect for daily wear.",
    imageUrls: [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=600&h=600&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 267
  },
  {
    id: 13,
    brand: "Audemars Piguet",
    modelName: "Royal Oak",
    referenceNumber: "15500ST.OO.1220ST.01",
    movementType: "Automatic",
    caseSizeMm: 41,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Stainless Steel",
    waterResistance: "50m",
    price: 28500,
    stock: 2,
    description: "The iconic Royal Oak features the legendary octagonal bezel with exposed screws. Designed by Gerald Genta, it revolutionized luxury sports watches with its Tapisserie dial and integrated bracelet.",
    imageUrls: [
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=600&h=600&fit=crop"
    ],
    rating: 5.0,
    reviewCount: 45
  },
  {
    id: 14,
    brand: "Jaeger-LeCoultre",
    modelName: "Reverso Classic",
    referenceNumber: "Q3858520",
    movementType: "Manual",
    caseSizeMm: 40,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Alligator Leather",
    waterResistance: "30m",
    price: 8200,
    stock: 5,
    description: "The legendary reversible watch originally designed for polo players. Art Deco design with a swiveling case that protects the dial. A masterpiece of horological engineering.",
    imageUrls: [
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&h=600&fit=crop&q=80"
    ],
    rating: 4.9,
    reviewCount: 58
  },
  {
    id: 15,
    brand: "Panerai",
    modelName: "Luminor Marina",
    referenceNumber: "PAM01312",
    movementType: "Automatic",
    caseSizeMm: 44,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Rubber",
    waterResistance: "300m",
    price: 7900,
    stock: 6,
    description: "Bold Italian military-inspired dive watch with the iconic crown-protecting bridge device. Luminescent sandwich dial for superior readability underwater. A favorite of professional divers.",
    imageUrls: [
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1628527304948-06157ee3cbe5?w=600&h=600&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 73
  },
  {
    id: 16,
    brand: "Hublot",
    modelName: "Big Bang",
    referenceNumber: "301.SB.131.RX",
    movementType: "Automatic Chronograph",
    caseSizeMm: 44,
    caseMaterial: "Titanium",
    strapMaterial: "Rubber",
    waterResistance: "100m",
    price: 14500,
    stock: 3,
    description: "Fusion concept combining titanium, ceramic, and rubber in one bold design. Features the HUB1112 self-winding chronograph movement. The Art of Fusion philosophy at its finest.",
    imageUrls: [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=600&h=600&fit=crop&q=80"
    ],
    rating: 4.6,
    reviewCount: 41
  },
  {
    id: 17,
    brand: "Longines",
    modelName: "Spirit Zulu Time",
    referenceNumber: "L3.812.4.53.6",
    movementType: "Automatic GMT",
    caseSizeMm: 42,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Stainless Steel",
    waterResistance: "100m",
    price: 2875,
    stock: 15,
    description: "Aviation-inspired GMT watch with dual time zone tracking. Features a silicon hairspring for anti-magnetic properties and COSC chronometer certification. Perfect for the frequent traveler.",
    imageUrls: [
      "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&h=600&fit=crop&q=80"
    ],
    rating: 4.8,
    reviewCount: 96
  },
  {
    id: 18,
    brand: "Zenith",
    modelName: "Chronomaster Sport",
    referenceNumber: "03.3100.3600/69.M3100",
    movementType: "Automatic Chronograph",
    caseSizeMm: 41,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Stainless Steel",
    waterResistance: "100m",
    price: 9600,
    stock: 4,
    description: "Featuring the legendary El Primero high-frequency movement beating at 36,000 VPH. Capable of measuring time to 1/10th of a second. The world's first automatic chronograph movement.",
    imageUrls: [
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544117519-31731f4fac3d?w=600&h=600&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 62
  },
  {
    id: 19,
    brand: "Hamilton",
    modelName: "Khaki Field Mechanical",
    referenceNumber: "H69439931",
    movementType: "Manual",
    caseSizeMm: 38,
    caseMaterial: "Stainless Steel",
    strapMaterial: "Fabric NATO",
    waterResistance: "50m",
    price: 495,
    stock: 20,
    description: "Military-heritage field watch with clean, high-contrast dial. Hand-wound H-50 movement with impressive 80-hour power reserve. No-nonsense reliability meets classic Swiss craftsmanship.",
    imageUrls: [
      "https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1434056886845-dbe89f0b9571?w=600&h=600&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 312
  },
  {
    id: 20,
    brand: "Casio",
    modelName: "G-Shock MR-G",
    referenceNumber: "MRGB2000B-1A",
    movementType: "Quartz Solar",
    caseSizeMm: 49.8,
    caseMaterial: "Titanium",
    strapMaterial: "Titanium",
    waterResistance: "200m",
    price: 3200,
    stock: 10,
    description: "The ultimate G-Shock. Full titanium construction with DLC coating, Bluetooth connectivity, Multi-Band 6 atomic timekeeping, and Tough Solar power. Nearly indestructible luxury.",
    imageUrls: [
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=600&fit=crop&q=80"
    ],
    rating: 4.8,
    reviewCount: 187
  }
];

export const mockReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: "James Wilson",
    rating: 5,
    comment: "Absolutely stunning watch! The quality is exceptional and it looks even better in person. Worth every penny.",
    date: "2026-02-15"
  },
  {
    id: 2,
    productId: 1,
    userName: "Sarah Chen",
    rating: 5,
    comment: "Classic Rolex quality. The Submariner is a timeless piece that never goes out of style. Highly recommend!",
    date: "2026-02-10"
  },
  {
    id: 3,
    productId: 1,
    userName: "Michael Brown",
    rating: 4,
    comment: "Great watch, but the waiting list was long. Finally got mine and couldn't be happier with the build quality.",
    date: "2026-01-28"
  },
  {
    id: 4,
    productId: 2,
    userName: "Emma Johnson",
    rating: 5,
    comment: "The Omega Seamaster is perfect for diving and everyday wear. Love the wave dial pattern!",
    date: "2026-02-20"
  },
  {
    id: 5,
    productId: 2,
    userName: "David Martinez",
    rating: 5,
    comment: "Exceptional value for money. The Co-Axial movement is smooth and accurate. A true professional dive watch.",
    date: "2026-02-05"
  },
  {
    id: 6,
    productId: 3,
    userName: "Lisa Anderson",
    rating: 4,
    comment: "Beautiful chronograph with racing heritage. The leather strap is very comfortable.",
    date: "2026-02-12"
  },
  {
    id: 7,
    productId: 5,
    userName: "Robert Taylor",
    rating: 5,
    comment: "Best value automatic watch on the market! The Cocktail Time dial is mesmerizing. Seiko quality at its finest.",
    date: "2026-02-25"
  },
  {
    id: 8,
    productId: 5,
    userName: "Jennifer Lee",
    rating: 4,
    comment: "Gorgeous watch for the price. The blue sunburst dial looks amazing in different lighting conditions.",
    date: "2026-02-18"
  },
  {
    id: 9,
    productId: 6,
    userName: "Alex Turner",
    rating: 5,
    comment: "The Navitimer is a work of art. The slide rule bezel is incredibly detailed and functional. A true aviation icon.",
    date: "2026-02-22"
  },
  {
    id: 10,
    productId: 6,
    userName: "Thomas Grant",
    rating: 5,
    comment: "Stunning chronograph. The in-house B01 movement is buttery smooth. Wearing history on your wrist.",
    date: "2026-01-30"
  },
  {
    id: 11,
    productId: 8,
    userName: "Karen White",
    rating: 5,
    comment: "Perfect everyday pilot's watch. Clean, legible, and the leather strap develops a beautiful patina over time.",
    date: "2026-02-14"
  },
  {
    id: 12,
    productId: 8,
    userName: "Daniel Kim",
    rating: 4,
    comment: "IWC quality at a reasonable price point. The Mark XVIII is understated elegance at its best.",
    date: "2026-02-08"
  },
  {
    id: 13,
    productId: 13,
    userName: "Richard Hayes",
    rating: 5,
    comment: "The Royal Oak is THE luxury sports watch. The finishing on this piece is absolutely extraordinary.",
    date: "2026-02-21"
  },
  {
    id: 14,
    productId: 15,
    userName: "Marco Rossi",
    rating: 5,
    comment: "Bold Italian design meets Swiss precision. The Luminor Marina has incredible wrist presence. Love it!",
    date: "2026-02-16"
  },
  {
    id: 15,
    productId: 17,
    userName: "Sophie Laurent",
    rating: 5,
    comment: "Amazing GMT watch for the price. The Longines Spirit tracks two time zones flawlessly. My go-to travel companion.",
    date: "2026-02-19"
  },
  {
    id: 16,
    productId: 19,
    userName: "Chris Evans",
    rating: 5,
    comment: "The Hamilton Khaki Field is the ultimate everyday watch. 80 hours of power reserve in a hand-wound watch is incredible value.",
    date: "2026-02-23"
  },
  {
    id: 17,
    productId: 19,
    userName: "Anna Park",
    rating: 4,
    comment: "Clean, military-inspired design and super reliable. The NATO strap gives it a rugged yet stylish look.",
    date: "2026-02-11"
  },
  {
    id: 18,
    productId: 20,
    userName: "Steve Rogers",
    rating: 5,
    comment: "Near-indestructible and beautifully made. The MR-G is proof that G-Shock can be truly luxurious.",
    date: "2026-02-17"
  }
];

// LocalStorage keys
export const STORAGE_KEYS = {
  CART: 'swiftcart_cart',
  USER: 'swiftcart_user',
  ORDERS: 'swiftcart_orders',
  REVIEWS: 'swiftcart_reviews'
};

// Helper functions for localStorage management
export const getStoredCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CART);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export const getStoredUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const saveUser = (user: any): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const clearUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const getStoredReviews = (): Review[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return stored ? JSON.parse(stored) : [...mockReviews];
  } catch {
    return [...mockReviews];
  }
};

export const saveReviews = (reviews: Review[]): void => {
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
};
