import React, { useState } from 'react';
import { ZODIAC_FRAGRANCES } from '../data/zodiacFragrances';
import { ZodiacFragrance, ZodiacSign } from '../types';
import { cosmicAudio } from '../utils/audioSynth';
import { Sparkles, Calendar, ArrowRight, RotateCcw, ShoppingBag, Eye, Check } from 'lucide-react';

interface CosmicScentFinderProps {
  onSelectFragrance: (fragrance: ZodiacFragrance) => void;
  onAddToCart: (fragrance: ZodiacFragrance, size: '50ml') => void;
}

export const CosmicScentFinder: React.FC<CosmicScentFinderProps> = ({
  onSelectFragrance,
  onAddToCart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [birthDate, setBirthDate] = useState<string>('');
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign>('Scorpio');
  const [selectedTrait, setSelectedTrait] = useState<string>('Misterius dan elegan');
  const [selectedScentFamily, setSelectedScentFamily] = useState<string>('Woody');
  const [intensity, setIntensity] = useState<string>('Intens & Tahan Lama');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [matchedFragrance, setMatchedFragrance] = useState<ZodiacFragrance | null>(null);

  // Helper to determine Zodiac from month and day
  const calculateZodiacFromDate = (dateString: string) => {
    if (!dateString) return;
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let sign: ZodiacSign = 'Aries';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sign = 'Aries';
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sign = 'Taurus';
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sign = 'Gemini';
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sign = 'Cancer';
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sign = 'Leo';
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sign = 'Virgo';
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sign = 'Libra';
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sign = 'Scorpio';
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sign = 'Sagittarius';
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sign = 'Capricorn';
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sign = 'Aquarius';
    else sign = 'Pisces';

    setSelectedZodiac(sign);
  };

  const handleSynthesize = () => {
    setIsCalculating(true);
    cosmicAudio.playStarChime();

    setTimeout(() => {
      // Find best match algorithm based on zodiac or olfactory preference
      let match = ZODIAC_FRAGRANCES.find((z) => z.zodiac === selectedZodiac);

      // If user chose specific strong scent family that conflicts, prioritize harmony
      if (selectedScentFamily === 'Fresh' && selectedZodiac !== 'Aquarius' && selectedZodiac !== 'Virgo') {
        // Can offer aquatic/fresh or keep sign's signature with fresh twist
        const freshAlt = ZODIAC_FRAGRANCES.find((z) => z.id === 'aquarius');
        if (freshAlt && Math.random() > 0.5) match = freshAlt;
      }

      setMatchedFragrance(match || ZODIAC_FRAGRANCES[7]);
      setIsCalculating(false);
      setStep(4);
    }, 1200);
  };

  const handleReset = () => {
    setStep(1);
    setMatchedFragrance(null);
  };

  return (
    <section id="scent-finder" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="cosmic-glass rounded-3xl p-6 sm:p-10 border border-[#D8B56D]/30 relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#54258A]/20 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#D8B56D] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Algoritma Penyelarasan Bintang & Aroma</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
            Cosmic Scent Finder
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#D8D9E8]/75 leading-relaxed">
            Jawab 3 pertanyaan intuitif untuk membuka racikan parfum yang selaras dengan energi kosmik pribadimu.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-colors ${
                  step === s
                    ? 'bg-[#D8B56D] text-[#080812] ring-4 ring-[#D8B56D]/20'
                    : step > s
                    ? 'bg-[#54258A] text-white'
                    : 'bg-white/10 text-[#D8D9E8]/40'
                }`}
              >
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
              {s < 4 && <div className={`w-8 h-[2px] ${step > s ? 'bg-[#54258A]' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Birthdate & Zodiac */}
        {step === 1 && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Langkah 1: Masukkan Tanggal Lahir (Opsional)</span>
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  calculateZodiacFromDate(e.target.value);
                }}
                className="w-full bg-[#080812]/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D8B56D]"
              />
              <p className="text-[11px] text-[#D8D9E8]/60">
                Sistem akan menghitung tanda zodiakmu secara otomatis berdasarkan orbit matahari saat kamu lahir.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
                Atau Pilih Zodiakmu Langsung:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {ZODIAC_FRAGRANCES.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      cosmicAudio.playStarChime();
                      setSelectedZodiac(z.zodiac);
                    }}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                      selectedZodiac === z.zodiac
                        ? 'bg-[#D8B56D] text-[#080812] border-[#D8B56D] font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-[#D8D9E8] border-white/10'
                    }`}
                  >
                    <span>{z.symbol} {z.zodiac}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] rounded-xl transition-all"
              >
                <span>Lanjut ke Karakter Diri</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Karakter Diri */}
        {step === 2 && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
                Langkah 2: Karakter yang Paling Mewakili Jiwamu
              </label>
              <p className="text-xs text-[#D8D9E8]/70 mt-1">
                Pilih getaran energi yang ingin kamu pancarkan ke sekelilingmu:
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: '🔥 Berani dan percaya diri', desc: 'Tegas, berkharisma, menginspirasi, dan tidak ragu mengambil risiko.' },
                { label: '🌹 Romantis dan lembut', desc: 'Hangat, penuh kasih sayang, puitis, dan memiliki empati mendalam.' },
                { label: '🌑 Misterius dan elegan', desc: 'Menawan dalam keheningan, dalam, penuh intrik, dan tak terlupakan.' },
                { label: '🌊 Tenang dan menenangkan', desc: 'Damai, menyejukkan hati, teratur, dan membawa rasa aman.' },
                { label: '⚡ Aktif dan penuh energi', desc: 'Dinamis, kreatif, berpikiran bebas, dan selalu menyukai petualangan.' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    cosmicAudio.playStarChime();
                    setSelectedTrait(item.label);
                  }}
                  className={`w-full p-4 rounded-xl text-left border transition-all ${
                    selectedTrait === item.label
                      ? 'bg-[#54258A]/40 border-[#D8B56D] shadow-md ring-1 ring-[#D8B56D]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#D8D9E8]'
                  }`}
                >
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                  <div className="text-xs text-[#D8D9E8]/70 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#D8D9E8]/70 hover:text-white"
              >
                ← Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] rounded-xl transition-all"
              >
                <span>Lanjut ke Aroma Favorit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Scent Family & Intensity */}
        {step === 3 && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
                Langkah 3: Preferensi Keluarga Aroma (Olfactory Family)
              </label>
              <p className="text-xs text-[#D8D9E8]/70 mt-1">
                Pilih profil aroma yang paling membuatmu merasa nyaman dan berharga:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'Floral', desc: 'Mawar, melati, peony' },
                { name: 'Fruity', desc: 'Jeruk manis, litchi, buah plum' },
                { name: 'Woody', desc: 'Sandalwood, oud, cedarwood' },
                { name: 'Fresh', desc: 'Akuatik, mineral, citrus segar' },
                { name: 'Sweet', desc: 'Bourbon vanilla, tonka bean' },
                { name: 'Spicy', desc: 'Lada hitam, kapulaga, saffron' },
              ].map((fam) => (
                <button
                  key={fam.name}
                  onClick={() => {
                    cosmicAudio.playStarChime();
                    setSelectedScentFamily(fam.name);
                  }}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    selectedScentFamily === fam.name
                      ? 'bg-[#54258A]/50 border-[#D8B56D] text-white shadow-md'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#D8D9E8]'
                  }`}
                >
                  <div className="text-sm font-bold text-white">{fam.name}</div>
                  <div className="text-[11px] text-[#D8D9E8]/70 mt-1">{fam.desc}</div>
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs uppercase tracking-wider text-[#D8B56D] font-semibold">
                Kekuatan Jejak Aroma (Sillage):
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Halus & Intim (Skin Scent)', 'Intens & Tahan Lama (Statement)'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setIntensity(opt)}
                    className={`p-3 rounded-lg text-xs font-medium border text-center transition-all ${
                      intensity === opt
                        ? 'bg-[#D8B56D] text-[#080812] border-[#D8B56D] font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-[#D8D9E8] border-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-[#D8D9E8]/70 hover:text-white"
              >
                ← Kembali
              </button>
              <button
                onClick={handleSynthesize}
                disabled={isCalculating}
                className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] rounded-xl transition-all shadow-lg"
              >
                {isCalculating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#080812]" />
                    <span>Menyelaraskan Bintang...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Sintesis Aroma Pribadiku</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Reveal Result */}
        {step === 4 && matchedFragrance && (
          <div className="space-y-6 max-w-2xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#D8B56D] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Hasil Penyelarasan Bintang Selesai</span>
            </div>

            <div className="cosmic-glass p-6 sm:p-8 rounded-2xl border border-[#D8B56D]/40 text-left relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-44 aspect-[4/5] rounded-xl overflow-hidden border border-[#D8B56D]/30 shadow-xl bg-[#080812]">
                    <img
                      src={matchedFragrance.image}
                      alt={matchedFragrance.perfumeName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <div className="text-xs uppercase tracking-widest text-[#D8B56D] font-semibold">
                    ✨ Your Cosmic Scent Match
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {matchedFragrance.perfumeName}
                  </h3>
                  <div className="text-xs text-[#D8D9E8]/80 flex flex-wrap gap-x-3 gap-y-1">
                    <span>Zodiak: <strong className="text-white">{selectedZodiac}</strong></span>
                    <span>·</span>
                    <span>Karakter: <strong className="text-white">{selectedTrait.split(' ')[1]}</strong></span>
                    <span>·</span>
                    <span>Aroma: <strong className="text-white">{selectedScentFamily}</strong></span>
                  </div>

                  <p className="text-xs text-[#D8D9E8]/90 italic border-l-2 border-[#D8B56D] pl-3 py-1 bg-white/5 rounded-r">
                    "{matchedFragrance.tagline}"
                  </p>

                  <div className="text-xs text-[#D8D9E8]/70 pt-2">
                    <span className="font-semibold text-white">Kesan Kosmik:</span>{' '}
                    Mendalam, hangat, dan memancarkan wibawa alami. Kehadiranmu berbisik anggun sebelum langkahmu terdengar.
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        cosmicAudio.playStarChime();
                        onAddToCart(matchedFragrance, '50ml');
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] rounded-lg shadow-md transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Beli Parfum (Rp {(matchedFragrance.price50ml / 1000).toLocaleString('id-ID')}k)</span>
                    </button>

                    <button
                      onClick={() => onSelectFragrance(matchedFragrance)}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-white bg-white/10 hover:bg-white/15 rounded-lg border border-white/15 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Detail</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-[#D8D9E8]/60 hover:text-[#D8B56D] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Tes Scent Finder</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
