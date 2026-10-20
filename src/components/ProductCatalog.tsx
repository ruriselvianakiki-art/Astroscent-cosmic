import React, { useState } from 'react';
import { ZODIAC_FRAGRANCES, DISCOVERY_SETS } from '../data/zodiacFragrances';
import { ZodiacFragrance, ElementType } from '../types';
import { cosmicAudio } from '../utils/audioSynth';
import { ShoppingBag, Eye, Star, Filter } from 'lucide-react';

interface ProductCatalogProps {
  onSelectFragrance: (fragrance: ZodiacFragrance) => void;
  onAddToCart: (fragrance: ZodiacFragrance, size: '50ml' | '100ml' | '10ml') => void;
  onAddDiscoverySetToCart: (set: typeof DISCOVERY_SETS[0]) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectFragrance,
  onAddToCart,
  onAddDiscoverySetToCart,
}) => {
  const [filterElement, setFilterElement] = useState<'ALL' | ElementType>('ALL');
  const [categoryTab, setCategoryTab] = useState<'zodiac' | 'discovery'>('zodiac');

  const filteredFragrances = filterElement === 'ALL'
    ? ZODIAC_FRAGRANCES
    : ZODIAC_FRAGRANCES.filter((z) => z.element === filterElement);

  return (
    <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#D8B56D] font-bold mb-1">
            Boutique & Katalog Resmi
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Koleksi Parfum AstroScent
          </h2>
          <p className="text-xs sm:text-sm text-[#D8D9E8]/75 mt-1">
            Diformulasikan di Grasse, Prancis dengan konsentrasi Extrait de Parfum (25-30% perfume oil).
          </p>
        </div>

        {/* Category Tabs: Zodiac vs Discovery */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
          <button
            onClick={() => setCategoryTab('zodiac')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              categoryTab === 'zodiac'
                ? 'bg-[#D8B56D] text-[#080812] shadow-sm'
                : 'text-[#D8D9E8]/80 hover:text-white'
            }`}
          >
            12 Zodiak Extrait
          </button>
          <button
            onClick={() => setCategoryTab('discovery')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              categoryTab === 'discovery'
                ? 'bg-[#D8B56D] text-[#080812] shadow-sm'
                : 'text-[#D8D9E8]/80 hover:text-white'
            }`}
          >
            Discovery Sample Sets
          </button>
        </div>
      </div>

      {/* Filter by Element (When on Zodiac tab) */}
      {categoryTab === 'zodiac' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <span className="text-xs text-[#D8D9E8]/60 flex items-center gap-1 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Elemen:</span>
          </span>
          {(['ALL', 'Fire', 'Earth', 'Air', 'Water'] as const).map((elem) => (
            <button
              key={elem}
              onClick={() => setFilterElement(elem)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                filterElement === elem
                  ? 'bg-[#54258A] border-[#D8B56D] text-white font-semibold'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#D8D9E8]/70'
              }`}
            >
              {elem === 'ALL' ? 'Semua Elemen (12)' : `Elemen ${elem}`}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid: Zodiac Extrait */}
      {categoryTab === 'zodiac' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFragrances.map((item) => (
            <div
              key={item.id}
              className="cosmic-glass rounded-2xl overflow-hidden border border-[#D8B56D]/20 hover:border-[#D8B56D]/50 transition-all duration-300 flex flex-col group shadow-lg"
            >
              {/* Product Image Lead (65-75% height) */}
              <div className="relative aspect-[4/3] bg-[#0c0a1a] overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.perfumeName} - ${item.zodiac}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080812]/80 via-transparent to-transparent" />

                {/* Zodiac badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#080812]/85 backdrop-blur-md border border-[#D8B56D]/30 text-xs font-semibold text-[#D8B56D]">
                  <span>{item.symbol}</span>
                  <span>{item.zodiac}</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-[#080812]/85 backdrop-blur-md border border-white/10 text-[11px] text-white font-mono">
                  <Star className="w-3 h-3 text-[#D8B56D] fill-[#D8B56D]" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#D8B56D] font-mono">
                    Elemen {item.element} · {item.rulingPlanet}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white tracking-wide mt-0.5">
                    {item.perfumeName}
                  </h3>
                  <p className="text-xs text-[#D8D9E8]/70 line-clamp-2 mt-1 leading-relaxed">
                    {item.scentCharacter} — {item.description}
                  </p>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#D8D9E8]/60">Mulai dari (50ml):</div>
                    <div className="font-serif text-lg font-bold text-white font-mono tabular-nums">
                      Rp {(item.price50ml).toLocaleString('id-ID')}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectFragrance(item)}
                      title="Lihat Detail & Piramida Aroma"
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors"
                      aria-label="Detail Produk"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        cosmicAudio.playStarChime();
                        onAddToCart(item, '50ml');
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#D8B56D] hover:bg-[#c6a257] text-[#080812] text-xs font-bold transition-all shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>+ Keranjang</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discovery Sets Tab */}
      {categoryTab === 'discovery' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DISCOVERY_SETS.map((set) => (
            <div
              key={set.id}
              className="cosmic-glass rounded-3xl overflow-hidden border border-[#D8B56D]/30 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 relative">
                <img
                  src={set.image}
                  alt={set.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-widest text-[#D8B56D]">
                  Atelier Discovery Edition
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-bold text-white">{set.name}</h3>
                <p className="text-xs text-[#D8B56D] italic">"{set.tagline}"</p>
                <p className="text-xs text-[#D8D9E8]/80 leading-relaxed">{set.description}</p>

                <div className="space-y-1 pt-2">
                  <div className="text-[11px] font-semibold text-white uppercase tracking-wider">
                    Isi Dalam Kotak Sampler:
                  </div>
                  {set.items.map((it) => (
                    <div key={it} className="text-xs text-[#D8D9E8]/70 flex items-center gap-1.5">
                      <span className="text-[#D8B56D]">✦</span>
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#D8D9E8]/60">Harga Paket Sampler:</div>
                  <div className="font-serif text-2xl font-bold text-white font-mono tabular-nums">
                    Rp {set.price.toLocaleString('id-ID')}
                  </div>
                </div>

                <button
                  onClick={() => {
                    cosmicAudio.playStarChime();
                    onAddDiscoverySetToCart(set);
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D8B56D] hover:bg-[#c6a257] text-[#080812] text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pesan Discovery Set</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
