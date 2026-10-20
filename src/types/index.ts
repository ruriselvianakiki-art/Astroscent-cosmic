export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type ElementType = 'Fire' | 'Earth' | 'Air' | 'Water';

export interface ZodiacFragrance {
  id: string;
  zodiac: ZodiacSign;
  symbol: string;
  dates: string;
  perfumeName: string;
  tagline: string;
  scentCharacter: string;
  colorName: string;
  colorHex: string;
  accentColor: string;
  element: ElementType;
  rulingPlanet: string;
  price50ml: number;
  price100ml: number;
  price10ml: number;
  image: string;
  description: string;
  story: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  sillage: 'Intense' | 'Moderate' | 'Ethereal';
  longevity: string;
  moods: string[];
  cosmicFrequency: string;
  reviewsCount: number;
  rating: number;
  inStock: boolean;
  constellationStars: { x: number; y: number }[];
}

export interface CartItem {
  id: string;
  fragranceId: string;
  perfumeName: string;
  zodiac?: ZodiacSign;
  size: '10ml' | '50ml' | '100ml' | 'Discovery Set' | 'Bespoke Flacon' | 'Couple Duo';
  price: number;
  quantity: number;
  image: string;
  customEngraving?: string;
  customNotes?: {
    top: string;
    heart: string;
    base: string;
    flaconCap?: string;
  };
}

export interface UserCosmicProfile {
  name: string;
  birthDate?: string;
  zodiac: ZodiacSign;
  cosmicId: string;
  element: ElementType;
  auraColor: string;
  auraName: string;
  scentFamily: string;
  signatureScent: string;
  cosmicPoints: number;
  unlockedBadges: string[];
}

export interface Review {
  id: string;
  author: string;
  zodiac: ZodiacSign;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface OrderRecord {
  orderId: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Dikonfirmasi' | 'Peracikan Formula' | 'Pengemasan Bintang' | 'Dalam Pengiriman' | 'Terkirim';
  courier: string;
  trackingNumber: string;
  recipientName: string;
  address: string;
  paymentMethod: string;
}
