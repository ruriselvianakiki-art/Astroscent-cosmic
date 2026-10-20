import React, { useState } from 'react';
import { ZODIAC_FRAGRANCES, FEATURED_COUPLE_SETS } from '../data/zodiacFragrances';
import { ZodiacSign } from '../types';
import { cosmicAudio } from '../utils/audioSynth';
import { Heart, Sparkles, Gift, ShoppingBag, MessageSquare } from 'lucide-react';

interface ZodiacCompatibilityProps {
  onAddCoupleSetToCart: (coupleSet: {
    title: string;
    zodiac1: ZodiacSign;
    zodiac2: ZodiacSign;
    packageType: string;
    romanticMessage: string;
    price: number;
    image: string;
  }) => void;
}

export const ZodiacCompatibility: React.FC<ZodiacCompatibilityProps> = ({
  onAddCoupleSetToCart,
}) => {
  const [zodiac1, setZodiac1] = useState<ZodiacSign>('Leo');
  const [zodiac2, setZodiac2] = useState<ZodiacSign>('Libra');
  const [packageType, setPackageType] = useState<string>('Couple Signature Duo (2 × 50ml)');
  const [romanticMessage, setRomanticMessage] = useState<string>('Dituliskan di antara bintang, diikat dalam semerbak abadi.');

  const sign1 = ZODIAC_FRAGRANCES.find((z) => z.zodiac === zodiac1) || ZODIAC_FRAGRANCES[4];
  const sign2 = ZODIAC_FRAGRANCES.find((z) => z.zodiac === zodiac2) || ZODIAC_FRAGRANCES[6];

  // Calculate elemental harmony
  const getElementalReading = (e1: string, e2: string) => {
    if ((e1 === 'Fire' && e2 === 'Air') || (e1 === 'Air' && e2 === 'Fire')) {
      return 'Gairah & Inspirasi: Udara mengobarkan api menjadi nyala terang yang saling melengkapi.';
    }
    if ((e1 === 'Earth' && e2 === 'Water') || (e1 === 'Water' && e2 === 'Earth')) {
      return 'Ketenangan & Kesuburan Jiwa: Air menyuburkan tanah, menumbuhkan komitmen yang hangat dan abadi.';
    }
    if (e1 === e2) {
      return 'Resonansi Sejiwa: Dua energi kosmik yang serupa, saling memahami tanpa butuh banyak penjelasan.';
    }
    return 'Dinamika Misterius: Perbedaan karakter yang saling memikat dan memperkaya sudut pandang hidup.';
  };

  const couplePrice = 1740000;

  const handleOrderCouple = () => {
    cosmicAudio.playStarChime();
    onAddCoupleSetToCart({
      title: `Cosmic Couple: ${sign1.perfumeName} × ${sign2.perfumeName}`,
      zodiac1,
      zodiac2,
      packageType,
      romanticMessage,
      price: couplePrice,
      image: sign1.image,
    });
  };

  return (
    <section id="couple" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#D8B56D] font-semibold mb-2">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>Cosmic Love Collection</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Zodiac Compatibility & Couple Sets
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-[#D8D9E8]/75 leading-relaxed">
          Temukan harmoni dua aroma semesta. Pilih zodiakmu dan pasangan untuk menghasilkan kombinasi wewangian berpasangan dalam kotak kado beludru eksklusif.
        </p>
      </div>

      <div className="cosmic-glass rounded-3xl p-6 sm:p-10 border border-[#D8B56D]/30 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-950/20 blur-3xl pointer-events-none" />

        {/* Dual Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* You */}
          <div className="md:col-span-5 cosmic-glass-subtle p-5 rounded-2xl border border-white/10 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-bold block">
              Zodiakmu (You)
            </span>
            <select
              value={zodiac1}
              onChange={(e) => {
                cosmicAudio.playStarChime();
                setZodiac1(e.target.value as ZodiacSign);
              }}
              className="w-full bg-[#080812] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-serif font-bold focus:outline-none focus:border-[#D8B56D]"
            >
              {ZODIAC_FRAGRANCES.map((z) => (
                <option key={z.id} value={z.zodiac} className="bg-[#080812]">
                  {z.symbol} {z.zodiac} — {z.perfumeName}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-3 pt-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ backgroundColor: sign1.colorHex }}
              >
                {sign1.symbol}
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-white">{sign1.perfumeName}</div>
                <div className="text-[11px] text-[#D8D9E8]/70">{sign1.scentCharacter}</div>
              </div>
            </div>
          </div>

          {/* Plus / Cosmic Heart Divider */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <div className="w-10 h-10 rounded-full bg-[#54258A]/50 border border-[#D8B56D]/40 flex items-center justify-center text-[#D8B56D]">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
          </div>

          {/* Partner */}
          <div className="md:col-span-5 cosmic-glass-subtle p-5 rounded-2xl border border-white/10 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#D8B56D] font-bold block">
              Zodiak Pasangan (Partner)
            </span>
            <select
              value={zodiac2}
              onChange={(e) => {
                cosmicAudio.playStarChime();
                setZodiac2(e.target.value as ZodiacSign);
              }}
              className="w-full bg-[#080812] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-serif font-bold focus:outline-none focus:border-[#D8B56D]"
            >
              {ZODIAC_FRAGRANCES.map((z) => (
                <option key={z.id} value={z.zodiac} className="bg-[#080812]">
                  {z.symbol} {z.zodiac} — {z.perfumeName}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-3 pt-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ backgroundColor: sign2.colorHex }}
              >
                {sign2.symbol}
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-white">{sign2.perfumeName}</div>
                <div className="text-[11px] text-[#D8D9E8]/70">{sign2.scentCharacter}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility Reading & Duo Presentation */}
        <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
          <div className="bg-[#080812]/70 p-5 rounded-2xl border border-[#D8B56D]/20">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D8B56D] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Resonansi Kosmik: {zodiac1} × {zodiac2}</span>
            </div>
            <p className="text-sm text-white leading-relaxed font-light">
              {getElementalReading(sign1.element, sign2.element)}
            </p>
            <p className="mt-2 text-xs text-[#D8D9E8]/75 italic">
              "Dua karakter berbeda, dua aroma istimewa, satu kisah tak terlupakan yang diciptakan bersama."
            </p>
          </div>

          {/* Gift Box Options & Romantic Inscription */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#D8B56D] font-bold block mb-2">
                Pilihan Kemasan Kotak Hadiah:
              </label>
              <div className="space-y-2">
                {[
                  'Couple Signature Duo (2 × 50ml)',
                  'His & Hers Deluxe Velvet Box (2 × 100ml)',
                  'Anniversary Constellation Gift Box',
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPackageType(opt)}
                    className={`w-full p-3 rounded-xl text-left text-xs border transition-all ${
                      packageType === opt
                        ? 'bg-[#54258A]/40 border-[#D8B56D] text-white font-medium'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#D8D9E8]/75'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      <Gift className="w-3.5 h-3.5 text-[#D8B56D]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#D8B56D] font-bold flex items-center gap-1.5 mb-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Pesan Romantis Pada Kartu Ucapan:</span>
              </label>
              <textarea
                value={romanticMessage}
                onChange={(e) => setRomanticMessage(e.target.value)}
                rows={3}
                maxLength={120}
                placeholder="Tuliskan ucapan istimewa untuk pasangan..."
                className="w-full bg-[#080812] border border-white/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D8B56D] resize-none"
              />
              <div className="flex justify-between text-[11px] text-[#D8D9E8]/50 mt-1">
                <span>Dicetak dengan tinta emas pada kertas perkamen bintang</span>
                <span>{romanticMessage.length}/120</span>
              </div>
            </div>
          </div>

          {/* Order Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#D8D9E8]/70">Total Paket Kado Pasangan:</div>
              <div className="font-serif text-2xl font-bold text-[#D8B56D]">
                Rp {couplePrice.toLocaleString('id-ID')}
              </div>
              <div className="text-[11px] text-[#D8D9E8]/60">Gratis Kotak Kado Beludru & Kartu Lilin Emas</div>
            </div>

            <button
              onClick={handleOrderCouple}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pesan Paket Hadiah Zodiak Couple</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
