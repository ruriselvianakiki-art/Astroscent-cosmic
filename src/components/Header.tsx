import React, { useState } from 'react';
import { Volume2, VolumeX, ShoppingBag, Sparkles, UserCheck } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynth';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCosmicPass: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenCosmicPass,
  activeSection,
  onNavigate,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleToggleAudio = () => {
    const state = cosmicAudio.toggle();
    setIsAudioPlaying(state);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080812]/90 backdrop-blur-md border-b border-[#D8B56D]/15">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-18">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 text-left group shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#54258A] to-[#D8B56D] p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-[#080812] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D8B56D] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] text-white whitespace-nowrap">
            ASTRO<span className="text-[#D8B56D]">SCENT</span>
          </span>
        </button>

        {/* Zone 2: 4–5 single-line clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wider uppercase text-[#D8D9E8]/70">
          <button
            onClick={() => onNavigate('galaxy')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#D8B56D] ${
              activeSection === 'galaxy' ? 'text-[#D8B56D] font-semibold' : ''
            }`}
          >
            Jelajah Galaksi
          </button>
          <button
            onClick={() => onNavigate('zodiac')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#D8B56D] ${
              activeSection === 'zodiac' ? 'text-[#D8B56D] font-semibold' : ''
            }`}
          >
            12 Zodiak
          </button>
          <button
            onClick={() => onNavigate('scent-finder')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#D8B56D] ${
              activeSection === 'scent-finder' ? 'text-[#D8B56D] font-semibold' : ''
            }`}
          >
            Cosmic Finder
          </button>
          <button
            onClick={() => onNavigate('alchemy')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#D8B56D] ${
              activeSection === 'alchemy' ? 'text-[#D8B56D] font-semibold' : ''
            }`}
          >
            Alchemy Lab
          </button>
          <button
            onClick={() => onNavigate('couple')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#D8B56D] ${
              activeSection === 'couple' ? 'text-[#D8B56D] font-semibold' : ''
            }`}
          >
            Zodiac Couple
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#D8B56D] ${
              activeSection === 'catalog' ? 'text-[#D8B56D] font-semibold' : ''
            }`}
          >
            Koleksi Parfum
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility icons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Ambient space music toggle */}
          <button
            onClick={handleToggleAudio}
            title={isAudioPlaying ? 'Matikan musik ambient semesta' : 'Putar musik ambient semesta'}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#D8B56D] border border-[#D8B56D]/20 transition-colors"
            aria-label="Toggle cosmic ambient audio"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#D8D9E8]/60" />
            )}
          </button>

          {/* Cosmic Identity Pass Button */}
          <button
            onClick={onOpenCosmicPass}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#54258A]/30 hover:bg-[#54258A]/50 text-[#D8B56D] border border-[#D8B56D]/25 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Cosmic ID</span>
          </button>

          {/* Shopping Bag CTA */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#D8B56D] hover:bg-[#c6a257] text-[#080812] text-xs font-semibold shadow-md transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Keranjang</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#080812] text-[#D8B56D] text-[10px] font-bold font-mono flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
