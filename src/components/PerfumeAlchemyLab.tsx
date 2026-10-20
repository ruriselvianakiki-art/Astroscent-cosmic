import React, { useState } from 'react';
import { ZODIAC_FRAGRANCES } from '../data/zodiacFragrances';
import { ZodiacSign } from '../types';
import { cosmicAudio } from '../utils/audioSynth';
import { Sparkles, FlaskConical, ShoppingBag, BookmarkCheck, Check } from 'lucide-react';

interface PerfumeAlchemyLabProps {
  onAddCustomToCart: (customItem: {
    perfumeName: string;
    zodiac: ZodiacSign;
    top: string;
    heart: string;
    base: string;
    capColor: string;
    engraving: string;
    price: number;
    image: string;
  }) => void;
  onSaveToVault: (name: string) => void;
}

export const PerfumeAlchemyLab: React.FC<PerfumeAlchemyLabProps> = ({
  onAddCustomToCart,
  onSaveToVault,
}) => {
  const [perfumeName, setPerfumeName] = useState<string>('Eclipse No. 07');
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign>('Scorpio');
  const [engravingText, setEngravingText] = useState<string>('AURA COELESTIS');
  const [capFinish, setCapFinish] = useState<'Gold' | 'Obsidian' | 'Silver'>('Gold');

  // Notes selections
  const [topNote, setTopNote] = useState<string>('Bergamot Calabria');
  const [heartNote, setHeartNote] = useState<string>('Damask Rose');
  const [baseNote, setBaseNote] = useState<string>('Amber & Cashmere Musk');

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const topOptions = [
    'Bergamot Calabria',
    'Pink Pepper & Blood Orange',
    'Sparkling Yuzu & Green Tea',
    'Crisp White Pear',
    'Amalfi Lemon & Mint',
  ];

  const heartOptions = [
    'Damask Rose',
    'Night Blooming Jasmine',
    'French Lavender',
    'Solar Saffron Petals',
    'Blue Iris & Violet',
  ];

  const baseOptions = [
    'Amber & Cashmere Musk',
    'Smoked Cambodian Oud',
    'Mysore Sandalwood & Vanilla',
    'White Ambergris & Driftwood',
    'Roasted Tonka & Cedar',
  ];

  const handleOrder = () => {
    cosmicAudio.playStarChime();
    onAddCustomToCart({
      perfumeName: perfumeName || 'Custom Celestial Atelier',
      zodiac: selectedZodiac,
      top: topNote,
      heart: heartNote,
      base: baseNote,
      capColor: capFinish,
      engraving: engravingText,
      price: 1450000,
      image: '/src/assets/images/alchemy_custom_flacon_1792493701396.jpg',
    });
  };

  const handleSaveFormula = () => {
    cosmicAudio.playStarChime();
    onSaveToVault(perfumeName);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <section id="alchemy" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#D8B56D] font-semibold mb-2">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Atelier Alkemis Mandiri</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Perfume Alchemy Lab
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-[#D8D9E8]/75 leading-relaxed">
          Racik formula parfum impianmu sendiri. Pilih kombinasi Top, Heart, dan Base notes, beri nama pada botol kristalmu, lalu pesan flacon bespoke bertutup emas champagne.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customizer Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Identity & Zodiac Inspiration */}
          <div className="cosmic-glass p-5 rounded-2xl border border-[#D8B56D]/20 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D8B56D] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1. Identitas & Zodiak Inspirasi</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#D8D9E8]/80 block mb-1">Nama Parfum Ciptaanmu:</label>
                <input
                  type="text"
                  value={perfumeName}
                  onChange={(e) => setPerfumeName(e.target.value)}
                  maxLength={28}
                  placeholder="e.g. Celestial Nocturne No. 9"
                  className="w-full bg-[#080812] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D8B56D]"
                />
              </div>

              <div>
                <label className="text-xs text-[#D8D9E8]/80 block mb-1">Ukiran Label Flacon (Max 20 Karakter):</label>
                <input
                  type="text"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  maxLength={20}
                  placeholder="e.g. YOUR NAME / DATE"
                  className="w-full bg-[#080812] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white uppercase tracking-wider focus:outline-none focus:border-[#D8B56D]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#D8D9E8]/80 block mb-1.5">Inspirasi Zodiak:</label>
              <div className="flex flex-wrap gap-1.5">
                {ZODIAC_FRAGRANCES.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      cosmicAudio.playStarChime();
                      setSelectedZodiac(z.zodiac);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                      selectedZodiac === z.zodiac
                        ? 'bg-[#D8B56D] text-[#080812] border-[#D8B56D] font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-[#D8D9E8] border-white/10'
                    }`}
                  >
                    {z.symbol} {z.zodiac}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3 Notes Selection Layers */}
          <div className="cosmic-glass p-5 rounded-2xl border border-[#D8B56D]/20 space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D8B56D] flex items-center gap-2">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>2. Lapisan Tiga Tingkat Piramida Aroma</span>
            </h3>

            {/* Top Notes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">Top Notes (Aroma Pembuka Fajar)</span>
                <span className="text-[11px] text-[#D8B56D] font-mono">{topNote}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      cosmicAudio.playStarChime();
                      setTopNote(opt);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs text-left border transition-all ${
                      topNote === opt
                        ? 'bg-[#54258A]/50 border-[#D8B56D] text-white font-medium ring-1 ring-[#D8B56D]'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#D8D9E8]/80'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Heart Notes */}
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">Heart Notes (Jiwa Inti Kosmik)</span>
                <span className="text-[11px] text-[#D8B56D] font-mono">{heartNote}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {heartOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      cosmicAudio.playStarChime();
                      setHeartNote(opt);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs text-left border transition-all ${
                      heartNote === opt
                        ? 'bg-[#54258A]/50 border-[#D8B56D] text-white font-medium ring-1 ring-[#D8B56D]'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#D8D9E8]/80'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Base Notes */}
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">Base Notes (Jejak Abadi Semesta)</span>
                <span className="text-[11px] text-[#D8B56D] font-mono">{baseNote}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {baseOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      cosmicAudio.playStarChime();
                      setBaseNote(opt);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs text-left border transition-all ${
                      baseNote === opt
                        ? 'bg-[#54258A]/50 border-[#D8B56D] text-white font-medium ring-1 ring-[#D8B56D]'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#D8D9E8]/80'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottle Hardware Options */}
          <div className="cosmic-glass p-5 rounded-2xl border border-[#D8B56D]/20 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D8B56D]">
              3. Sentuhan Mahkota Tutup Botol (Cap Finish)
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Gold', label: 'Champagne Gold', hex: '#D8B56D' },
                { name: 'Obsidian', label: 'Obsidian Noir', hex: '#1c1b29' },
                { name: 'Silver', label: 'Lunar Silver', hex: '#C0C0C8' },
              ].map((cap) => (
                <button
                  key={cap.name}
                  onClick={() => setCapFinish(cap.name as 'Gold' | 'Obsidian' | 'Silver')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    capFinish === cap.name
                      ? 'border-[#D8B56D] bg-[#D8B56D]/15'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full mx-auto mb-1.5 border border-white/20"
                    style={{ backgroundColor: cap.hex }}
                  />
                  <div className="text-xs font-medium text-white">{cap.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Bespoke Bottle Digital Mockup & Actions */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-[#D8B56D]/30 shadow-2xl bg-[#0b0918]">
            <img
              src="/src/assets/images/alchemy_custom_flacon_1792493701396.jpg"
              alt="Bespoke custom artisanal perfume bottle on meteorite stone"
              className="w-full aspect-[4/3] sm:aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-transparent to-transparent opacity-85" />

            {/* Real-time Digital Bottle Label Engraving */}
            <div className="absolute bottom-6 left-6 right-6 cosmic-glass p-4 rounded-xl border border-[#D8B56D]/40 text-center space-y-1">
              <div className="text-[10px] uppercase tracking-widest text-[#D8B56D] font-mono">
                Bespoke Artisanal Extrait · 100ml
              </div>
              <h4 className="font-serif text-lg font-bold text-white tracking-wide truncate">
                {perfumeName || 'Celestial Formulation'}
              </h4>
              <div className="text-xs text-[#D8D9E8]/80 font-mono tracking-widest uppercase border-t border-white/10 pt-1 mt-1">
                {engravingText || 'COSMIC EDITION'}
              </div>
              <div className="text-[11px] text-[#D8B56D] italic">
                Zodiak {selectedZodiac} · {topNote.split(' ')[0]} / {heartNote.split(' ')[0]} / {baseNote.split(' ')[0]}
              </div>
            </div>
          </div>

          {/* Pricing & Dual Action */}
          <div className="cosmic-glass p-5 rounded-2xl border border-[#D8B56D]/20 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-[#D8D9E8]/70">Estimasi Formulasi Mandiri:</div>
                <div className="font-serif text-2xl font-bold text-white">Rp 1.450.000</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#D8B56D] font-mono block">100ml Pure Extrait</span>
                <span className="text-[10px] text-[#D8D9E8]/60">Termasuk Ukiran Laser Emas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleSaveFormula}
                className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition-colors"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Tersimpan di Vault!</span>
                  </>
                ) : (
                  <>
                    <BookmarkCheck className="w-4 h-4" />
                    <span>Simpan Formula Digital</span>
                  </>
                )}
              </button>

              <button
                onClick={handleOrder}
                className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pesan Botol Custom</span>
              </button>
            </div>

            <p className="text-[11px] text-[#D8D9E8]/50 text-center leading-relaxed">
              *Pesanan botol custom membutuhkan waktu maserasi 3-5 hari kerja oleh kurator parfum profesional sebelum dikirimkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
