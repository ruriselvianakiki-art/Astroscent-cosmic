import React, { useState } from 'react';
import { ZODIAC_FRAGRANCES } from '../data/zodiacFragrances';
import { ZodiacFragrance } from '../types';
import { cosmicAudio } from '../utils/audioSynth';
import { ShoppingBag, Eye, Star, Flame, Droplets, Wind, Mountain, Radio } from 'lucide-react';

interface ZodiacExplorerProps {
  onSelectFragrance: (fragrance: ZodiacFragrance) => void;
  onAddToCart: (fragrance: ZodiacFragrance, size: '50ml') => void;
}

export const ZodiacExplorer: React.FC<ZodiacExplorerProps> = ({
  onSelectFragrance,
  onAddToCart,
}) => {
  const [activeZodiacId, setActiveZodiacId] = useState<string>('scorpio');
  const activeSign = ZODIAC_FRAGRANCES.find((z) => z.id === activeZodiacId) || ZODIAC_FRAGRANCES[7];

  const handleSelectSign = (id: string) => {
    cosmicAudio.playStarChime();
    setActiveZodiacId(id);
  };

  const renderElementIcon = (element: string) => {
    switch (element) {
      case 'Fire':
        return <Flame className="w-3.5 h-3.5 text-[#E63946]" />;
      case 'Water':
        return <Droplets className="w-3.5 h-3.5 text-[#4CC9F0]" />;
      case 'Air':
        return <Wind className="w-3.5 h-3.5 text-[#F4A261]" />;
      case 'Earth':
        return <Mountain className="w-3.5 h-3.5 text-[#2EC4B6]" />;
      default:
        return null;
    }
  };

  return (
    <section id="zodiac-collection" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase text-[#D8B56D] font-semibold mb-2">
          <span>Koleksi 12 Rasi Bintang Semesta</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Sistem Parfum 12 Zodiak
        </h2>
        <p className="mt-3 text-sm text-[#D8D9E8]/75 leading-relaxed">
          Pilih zodiakmu untuk membangkitkan konstelasi langit, membuka narasi kosmik, dan menemukan aroma khas yang diciptakan untuk jiwamu.
        </p>
      </div>

      {/* 12 Zodiac selector rail */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start lg:justify-center">
        {ZODIAC_FRAGRANCES.map((item) => {
          const isActive = item.id === activeZodiacId;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectSign(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 border ${
                isActive
                  ? 'bg-[#D8B56D] text-[#080812] border-[#D8B56D] font-bold shadow-lg scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-[#D8D9E8] border-white/10 hover:border-[#D8B56D]/30'
              }`}
            >
              <span className="text-sm">{item.symbol}</span>
              <span>{item.zodiac}</span>
            </button>
          );
        })}
      </div>

      {/* Main Selected Zodiac Presentation Chamber */}
      <div
        className="relative rounded-3xl overflow-hidden border border-[#D8B56D]/25 p-6 sm:p-10 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 75% 30%, ${activeSign.colorHex}22 0%, #080812 70%)`,
        }}
      >
        {/* Constellation background lines SVG */}
        <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full opacity-35 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {activeSign.constellationStars.map((star, idx) => {
              const nextStar = activeSign.constellationStars[idx + 1];
              return (
                <g key={idx}>
                  <circle cx={star.x} cy={star.y} r="1.5" fill="#FFF5D6" />
                  <circle cx={star.x} cy={star.y} r="3" fill="#D8B56D" opacity="0.4" />
                  {nextStar && (
                    <line
                      x1={star.x}
                      y1={star.y}
                      x2={nextStar.x}
                      y2={nextStar.y}
                      stroke="#D8B56D"
                      strokeWidth="0.4"
                      strokeDasharray="1, 1"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md border border-white/20"
                style={{ backgroundColor: activeSign.colorHex }}
              >
                {activeSign.symbol}
              </span>
              <div>
                <div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#D8B56D]">
                  <span>{activeSign.zodiac}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    {renderElementIcon(activeSign.element)}
                    <span>Elemen {activeSign.element}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Planet {activeSign.rulingPlanet}</span>
                </div>
                <div className="text-xs text-[#D8D9E8]/60">{activeSign.dates}</div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
                {activeSign.perfumeName}
              </h3>
              <p className="mt-2 text-base text-[#D8B56D] italic font-light">
                "{activeSign.tagline}"
              </p>
            </div>

            <p className="text-sm text-[#D8D9E8]/80 leading-relaxed font-light">
              {activeSign.description}
            </p>

            {/* Scent Pyramid Breakdown */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
              <div className="cosmic-glass p-3 rounded-xl border border-white/10">
                <div className="text-[10px] tracking-wider uppercase text-[#D8B56D] font-semibold mb-1">
                  Top Notes
                </div>
                <div className="text-xs text-white leading-snug">
                  {activeSign.topNotes.join(', ')}
                </div>
              </div>
              <div className="cosmic-glass p-3 rounded-xl border border-white/10">
                <div className="text-[10px] tracking-wider uppercase text-[#D8B56D] font-semibold mb-1">
                  Heart Notes
                </div>
                <div className="text-xs text-white leading-snug">
                  {activeSign.heartNotes.join(', ')}
                </div>
              </div>
              <div className="cosmic-glass p-3 rounded-xl border border-white/10">
                <div className="text-[10px] tracking-wider uppercase text-[#D8B56D] font-semibold mb-1">
                  Base Notes
                </div>
                <div className="text-xs text-white leading-snug">
                  {activeSign.baseNotes.join(', ')}
                </div>
              </div>
            </div>

            {/* Spec tags */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#D8D9E8]/80">
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#D8B56D]" />
                <span>Frekuensi: {activeSign.cosmicFrequency}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#D8B56D] fill-[#D8B56D]" />
                <span>Rating: {activeSign.rating} ({activeSign.reviewsCount} Ulasan)</span>
              </div>
              <div>
                <span>Ketahanan: <strong className="text-white font-mono">{activeSign.longevity}</strong></span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  cosmicAudio.playStarChime();
                  onAddToCart(activeSign, '50ml');
                }}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Beli Parfum (Rp {(activeSign.price50ml).toLocaleString('id-ID')})</span>
              </button>

              <button
                onClick={() => onSelectFragrance(activeSign)}
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Jelajahi Cerita Lengkap</span>
              </button>
            </div>
          </div>

          {/* Right Product Flacon Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-[#D8B56D]/30 shadow-2xl bg-[#0d0b1a] group">
              <img
                src={activeSign.image}
                alt={`${activeSign.perfumeName} - ${activeSign.zodiac} signature perfume bottle`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080812]/90 via-transparent to-transparent" />

              {/* Inscription badge on bottle frame */}
              <div className="absolute bottom-4 left-4 right-4 cosmic-glass p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#D8B56D] uppercase tracking-widest font-semibold">
                    {activeSign.zodiac} Archetype
                  </div>
                  <div className="text-xs font-serif font-bold text-white">
                    {activeSign.perfumeName} · 50ml Eau de Parfum
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-[#D8B56D]">
                    Rp {(activeSign.price50ml / 1000).toLocaleString('id-ID')}k
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
