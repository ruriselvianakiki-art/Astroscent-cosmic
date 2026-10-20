import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveGalaxy } from './components/InteractiveGalaxy';
import { ZodiacExplorer } from './components/ZodiacExplorer';
import { CosmicScentFinder } from './components/CosmicScentFinder';
import { PerfumeAlchemyLab } from './components/PerfumeAlchemyLab';
import { ZodiacCompatibility } from './components/ZodiacCompatibility';
import { DailyAuraSection } from './components/DailyAuraSection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CosmicIdentityCard } from './components/CosmicIdentityCard';
import { Footer } from './components/Footer';
import { ZODIAC_FRAGRANCES, DISCOVERY_SETS } from './data/zodiacFragrances';
import { CartItem, ZodiacFragrance, UserCosmicProfile, OrderRecord } from './types';
import { cosmicAudio } from './utils/audioSynth';
import { Sparkles, Check } from 'lucide-react';

export default function App() {
  // Navigation section tracker
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Modals & Drawers
  const [selectedFragrance, setSelectedFragrance] = useState<ZodiacFragrance | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isCosmicPassOpen, setIsCosmicPassOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-init-scorpio',
      fragranceId: 'scorpio',
      perfumeName: 'Midnight Venom',
      zodiac: 'Scorpio',
      size: '50ml',
      price: 950000,
      quantity: 1,
      image: '/src/assets/images/scorpio_midnight_venom_1792493701613.jpg',
      customEngraving: 'SCORPIO MYSTIQUE',
    },
  ]);

  // Checkout transfer data
  const [checkoutData, setCheckoutData] = useState<{
    subtotal: number;
    discount: number;
    freeGift: string;
  }>({
    subtotal: 950000,
    discount: 0,
    freeGift: 'Scorpio (Midnight Venom 2ml)',
  });

  // User Cosmic Profile (The Secret Cosmic Identity)
  const [userProfile, setUserProfile] = useState<UserCosmicProfile>({
    name: 'Penjelajah Bintang',
    zodiac: 'Scorpio',
    cosmicId: 'SC-0726',
    element: 'Water',
    auraColor: '#800E13',
    auraName: 'Midnight Obsidian 140.25 Hz',
    scentFamily: 'Woody & Spicy',
    signatureScent: 'Midnight Venom',
    cosmicPoints: 340,
    unlockedBadges: [
      'Stargazer Pioneer',
      'Midnight Venom Owner',
      'Cosmic Scent Finder Alumnus',
      'Alchemy Novice',
    ],
  });

  // Navigation smoothly scrolls to anchor
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add Zodiac Fragrance to Cart
  const handleAddToCart = (
    fragrance: ZodiacFragrance,
    size: '50ml' | '100ml' | '10ml' = '50ml',
    engraving?: string
  ) => {
    const price =
      size === '100ml'
        ? fragrance.price100ml
        : size === '10ml'
        ? fragrance.price10ml
        : fragrance.price50ml;

    const existingIdx = cart.findIndex(
      (item) =>
        item.fragranceId === fragrance.id &&
        item.size === size &&
        item.customEngraving === engraving
    );

    if (existingIdx > -1) {
      const updated = [...cart];
      updated[existingIdx].quantity += 1;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        fragranceId: fragrance.id,
        perfumeName: fragrance.perfumeName,
        zodiac: fragrance.zodiac,
        size,
        price,
        quantity: 1,
        image: fragrance.image,
        customEngraving: engraving,
      };
      setCart([...cart, newItem]);
    }

    showToast(`✓ ${fragrance.perfumeName} (${size}) ditambahkan ke keranjang.`);
  };

  // Add Custom Bespoke Alchemy Bottle to Cart
  const handleAddCustomToCart = (custom: {
    perfumeName: string;
    zodiac: import('./types').ZodiacSign;
    top: string;
    heart: string;
    base: string;
    capColor: string;
    engraving: string;
    price: number;
    image: string;
  }) => {
    const newItem: CartItem = {
      id: `cart-bespoke-${Date.now()}`,
      fragranceId: 'bespoke-alchemy',
      perfumeName: custom.perfumeName,
      zodiac: custom.zodiac,
      size: 'Bespoke Flacon',
      price: custom.price,
      quantity: 1,
      image: custom.image,
      customEngraving: custom.engraving,
      customNotes: {
        top: custom.top,
        heart: custom.heart,
        base: custom.base,
        flaconCap: custom.capColor,
      },
    };

    setCart([...cart, newItem]);
    showToast(`✓ Botol Racikan "${custom.perfumeName}" ditambahkan ke keranjang.`);
    setIsCartOpen(true);
  };

  // Add Couple Duo Set to Cart
  const handleAddCoupleSetToCart = (coupleSet: {
    title: string;
    zodiac1: import('./types').ZodiacSign;
    zodiac2: import('./types').ZodiacSign;
    packageType: string;
    romanticMessage: string;
    price: number;
    image: string;
  }) => {
    const newItem: CartItem = {
      id: `cart-couple-${Date.now()}`,
      fragranceId: `couple-${coupleSet.zodiac1}-${coupleSet.zodiac2}`,
      perfumeName: coupleSet.title,
      size: 'Couple Duo',
      price: coupleSet.price,
      quantity: 1,
      image: coupleSet.image,
      customEngraving: coupleSet.romanticMessage,
    };

    setCart([...cart, newItem]);
    showToast(`✓ Paket Hadiah "${coupleSet.title}" masuk keranjang belanja.`);
    setIsCartOpen(true);
  };

  // Add Discovery Set to Cart
  const handleAddDiscoverySetToCart = (discoverySet: typeof DISCOVERY_SETS[0]) => {
    const newItem: CartItem = {
      id: `cart-discovery-${Date.now()}`,
      fragranceId: discoverySet.id,
      perfumeName: discoverySet.name,
      size: 'Discovery Set',
      price: discoverySet.price,
      quantity: 1,
      image: discoverySet.image,
    };

    setCart([...cart, newItem]);
    showToast(`✓ ${discoverySet.name} masuk keranjang belanja.`);
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    setCart(updated);
  };

  // Remove Item from Cart
  const handleRemoveCartItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Checkout Flow
  const handleProceedToCheckout = (subtotal: number, discount: number, freeGift: string) => {
    setCheckoutData({ subtotal, discount, freeGift });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // On successful order completion
  const handleOrderSuccess = (order: OrderRecord) => {
    // Empty cart & award +150 points
    setCart([]);
    setUserProfile((prev) => ({
      ...prev,
      cosmicPoints: prev.cosmicPoints + 150,
      unlockedBadges: Array.from(new Set([...prev.unlockedBadges, 'Galactic Patron VIP'])),
    }));
  };

  const handleOpenDetail = (fragrance: ZodiacFragrance) => {
    cosmicAudio.playStarChime();
    setSelectedFragrance(fragrance);
    setIsDetailOpen(true);
  };

  const handleSaveToVault = (formulaName: string) => {
    setUserProfile((prev) => ({
      ...prev,
      cosmicPoints: prev.cosmicPoints + 25,
      unlockedBadges: Array.from(new Set([...prev.unlockedBadges, `Alchemist: ${formulaName}`])),
    }));
    showToast(`✓ Formula "${formulaName}" berhasil disimpan ke Universe Vault.`);
  };

  const handleSaveDailyInspiration = (title: string) => {
    setUserProfile((prev) => ({
      ...prev,
      cosmicPoints: prev.cosmicPoints + 10,
    }));
    showToast(`✓ Inspirasi harian "${title}" tersimpan.`);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#080812] text-[#D8D9E8] relative selection:bg-[#D8B56D]/30 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 cosmic-glass px-4 py-3 rounded-xl border border-[#D8B56D]/50 shadow-2xl flex items-center gap-2 text-xs text-white font-medium animate-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-[#D8B56D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar following Top Bar Contract */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCosmicPass={() => setIsCosmicPassOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1 space-y-12">
        {/* Hero Section */}
        <HeroSection
          onExploreGalaxy={() => handleNavigate('galaxy')}
          onStartQuiz={() => handleNavigate('scent-finder')}
        />

        {/* 1. Interactive 2D/3D Canvas Galaxy Solar Orbit */}
        <section id="galaxy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <div className="text-xs uppercase tracking-widest text-[#D8B56D] font-bold mb-1">
              Virtual Solar System
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">
              Tata Surya Kosmik AstroScent
            </h2>
            <p className="text-xs sm:text-sm text-[#D8D9E8]/70 mt-1">
              Putar dan sentuh 12 planet zodiak untuk membuka portal aroma dan mendengar frekuensi bintang.
            </p>
          </div>
          <InteractiveGalaxy
            onSelectZodiac={handleOpenDetail}
            onAddToCart={(fragrance) => handleAddToCart(fragrance, '50ml')}
          />
        </section>

        {/* 2. Sistem Parfum 12 Zodiak */}
        <div id="zodiac">
          <ZodiacExplorer
            onSelectFragrance={handleOpenDetail}
            onAddToCart={(fragrance) => handleAddToCart(fragrance, '50ml')}
          />
        </div>

        {/* 3. Cosmic Scent Finder Quiz */}
        <CosmicScentFinder
          onSelectFragrance={handleOpenDetail}
          onAddToCart={(fragrance) => handleAddToCart(fragrance, '50ml')}
        />

        {/* 4. Daily Aura Inspirasi Hari Ini */}
        <DailyAuraSection
          onSelectFragrance={handleOpenDetail}
          onSaveInspiration={handleSaveDailyInspiration}
        />

        {/* 5. Perfume Alchemy Lab (Ciptakan Parfum Sendiri) */}
        <PerfumeAlchemyLab
          onAddCustomToCart={handleAddCustomToCart}
          onSaveToVault={handleSaveToVault}
        />

        {/* 6. Zodiac Compatibility (Parfum Pasangan & Gift Box) */}
        <ZodiacCompatibility
          onAddCoupleSetToCart={handleAddCoupleSetToCart}
        />

        {/* 7. Katalog Toko Parfum Resmi */}
        <ProductCatalog
          onSelectFragrance={handleOpenDetail}
          onAddToCart={handleAddToCart}
          onAddDiscoverySetToCart={handleAddDiscoverySetToCart}
        />
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        fragrance={selectedFragrance}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal & Live Order Tracking */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={checkoutData.subtotal}
        discount={checkoutData.discount}
        freeGift={checkoutData.freeGift}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* The Cosmic Identity Pass Modal */}
      <CosmicIdentityCard
        profile={userProfile}
        isOpen={isCosmicPassOpen}
        onClose={() => setIsCosmicPassOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCosmicPass={() => setIsCosmicPassOpen(true)}
      />
    </div>
  );
}
