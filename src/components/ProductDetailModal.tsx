import React, { useState } from 'react';
import { ZodiacFragrance } from '../types';
import { SAMPLE_REVIEWS } from '../data/zodiacFragrances';
import { cosmicAudio } from '../utils/audioSynth';
import { Star, ShoppingBag, Radio, ShieldCheck, Heart } from 'lucide-react';

interface ProductDetailModalProps {
  fragrance: ZodiacFragrance | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (fragrance: ZodiacFragrance, size: '50ml' | '100ml' | '10ml', engraving?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  fragrance,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml' | '10ml'>('50ml');
  const [engraving, setEngraving] = useState<string>('');

  if (!isOpen || !fragrance) return null;

  const currentPrice =
    selectedSize === '100ml'
      ? fragrance.price100ml
      : selectedSize === '10ml'
      ? fragrance.price10ml
      : fragrance.price50ml;

  const handleAdd = () => {
    cosmicAudio.playStarChime();
    onAddToCart(fragrance, selectedSize, engraving);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative max-w-4xl w-full cosmic-glass p-6 sm:p-8 rounded-3xl border border-[#D8B56D]/40 shadow-2xl my-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 z-10"
          aria-label="Tutup detail parfum"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Photo & Seal */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#D8B56D]/30 bg-[#090814] shadow-2xl">
              <img
                src={fragrance.image}
                alt={fragrance.perfumeName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080812]/90 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 cosmic-glass p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#D8B56D] font-mono uppercase">
                    {fragrance.zodiac} Constellation
                  </div>
                  <div className="text-xs font-serif font-bold text-white">
                    {fragrance.perfumeName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#D8D9E8]/60">Pure Extrait</div>
                  <div className="text-xs font-bold text-[#D8B56D] font-mono">28% Oil Conc.</div>
                </div>
              </div>
            </div>

            {/* Quick trust strip */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-[#D8D9E8]/80 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D8B56D] shrink-0" />
              <span>Garansi 100% Original Flacon Grasse & BPOM Resmi</span>
            </div>
          </div>

          {/* Right Column: Detailed Story, Notes, Size, Buy Module */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D8B56D] font-semibold">
                <span>{fragrance.symbol} {fragrance.zodiac}</span>
                <span aria-hidden="true">·</span>
                <span>Elemen {fragrance.element}</span>
                <span aria-hidden="true">·</span>
                <span>Planet {fragrance.rulingPlanet}</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-white tracking-wide mt-1">
                {fragrance.perfumeName}
              </h2>
              <p className="text-xs text-[#D8B56D] italic mt-1">"{fragrance.tagline}"</p>
            </div>

            {/* Story */}
            <p className="text-xs sm:text-sm text-[#D8D9E8]/85 leading-relaxed font-light">
              {fragrance.story}
            </p>

            {/* Scent Pyramid */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Piramida Komposisi Aroma:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#080812]/80 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[10px] uppercase text-[#D8B56D] block font-semibold">Top Notes</span>
                  <span className="text-xs text-white leading-tight">{fragrance.topNotes.join(', ')}</span>
                </div>
                <div className="bg-[#080812]/80 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[10px] uppercase text-[#D8B56D] block font-semibold">Heart Notes</span>
                  <span className="text-xs text-white leading-tight">{fragrance.heartNotes.join(', ')}</span>
                </div>
                <div className="bg-[#080812]/80 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[10px] uppercase text-[#D8B56D] block font-semibold">Base Notes</span>
                  <span className="text-xs text-white leading-tight">{fragrance.baseNotes.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span>Pilih Ukuran Botol:</span>
                <span className="text-[#D8B56D] font-mono">
                  {selectedSize === '100ml' ? '100ml Grand Flacon' : selectedSize === '10ml' ? '10ml Pocket Atomizer' : '50ml Signature Glass'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['50ml', '100ml', '10ml'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-2.5 rounded-xl text-center border text-xs font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-[#D8B56D] text-[#080812] border-[#D8B56D] shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                    }`}
                  >
                    <div>{size}</div>
                    <div className="text-[10px] font-mono mt-0.5 opacity-80">
                      Rp {(size === '100ml' ? fragrance.price100ml : size === '10ml' ? fragrance.price10ml : fragrance.price50ml).toLocaleString('id-ID')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Engraving */}
            <div className="space-y-1.5">
              <label className="text-xs text-[#D8D9E8]/80 block font-medium">
                Ukiran Nama / Monogram di Botol (Gratis):
              </label>
              <input
                type="text"
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                maxLength={20}
                placeholder="e.g. AURELIA · 2026"
                className="w-full bg-[#080812] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-[#D8B56D]"
              />
            </div>

            {/* Specs & Performance */}
            <div className="grid grid-cols-3 gap-2 text-[11px] text-[#D8D9E8]/70 border-t border-white/10 pt-3">
              <div>
                <span>Ketahanan:</span>
                <div className="text-white font-mono font-bold">{fragrance.longevity}</div>
              </div>
              <div>
                <span>Sillage:</span>
                <div className="text-white font-bold">{fragrance.sillage}</div>
              </div>
              <div>
                <span>Frekuensi:</span>
                <div className="text-[#D8B56D] font-mono font-bold">{fragrance.cosmicFrequency}</div>
              </div>
            </div>

            {/* Purchase CTA */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] text-[#D8D9E8]/60">Total Harga:</div>
                <div className="font-serif text-2xl font-bold text-white font-mono tabular-nums">
                  Rp {currentPrice.toLocaleString('id-ID')}
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#D8B56D] hover:bg-[#c6a257] text-[#080812] text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tambahkan ke Keranjang</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-[#D8B56D] fill-[#D8B56D]" />
              <span>Ulasan Penjelajah Bintang ({fragrance.reviewsCount})</span>
            </h4>
            <div className="text-xs text-[#D8B56D] font-mono font-bold">
              Skor Kosmik: {fragrance.rating} / 5.0
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SAMPLE_REVIEWS.slice(0, 2).map((rev) => (
              <div key={rev.id} className="bg-[#080812]/60 p-3.5 rounded-xl border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{rev.author} ({rev.zodiac})</span>
                  <span className="text-[10px] text-[#D8D9E8]/60">{rev.date}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[#D8B56D]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#D8B56D]" />
                  ))}
                </div>
                <p className="text-xs text-[#D8D9E8]/80 leading-relaxed pt-1">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
