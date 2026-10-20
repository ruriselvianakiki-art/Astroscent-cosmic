import React, { useState } from 'react';
import { ZODIAC_FRAGRANCES } from '../data/zodiacFragrances';
import { ZodiacFragrance } from '../types';
import { cosmicAudio } from '../utils/audioSynth';
import { Moon, Sparkles, Share2, Bookmark, Check, Eye } from 'lucide-react';

interface DailyAuraSectionProps {
  onSelectFragrance: (fragrance: ZodiacFragrance) => void;
  onSaveInspiration: (title: string) => void;
}

export const DailyAuraSection: React.FC<DailyAuraSectionProps> = ({
  onSelectFragrance,
  onSaveInspiration,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);

  // Today's cosmic configuration
  const todayDate = '20 Oktober 2026';
  const auraTitle = 'Golden Confidence';
  const auraScent = 'Amber dan Sandalwood';
  const dailyAffirmation =
    'Berjalanlah dengan percaya diri. Tidak semua hal perlu dibuktikan dengan kata-kata—biarkan auramu berbicara dalam keheningan.';
  const recommendedFragrance = ZODIAC_FRAGRANCES[4]; // Solar Majesty (Leo)

  const handleShare = () => {
    cosmicAudio.playStarChime();
    setShowStoryModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(
      `✨ Daily Aura AstroScent [${todayDate}]: ${auraTitle} - "${dailyAffirmation}"`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    cosmicAudio.playStarChime();
    onSaveInspiration(`${auraTitle} (${todayDate})`);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden border border-[#D8B56D]/30 cosmic-glass p-6 sm:p-10 shadow-2xl">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D8B56D]/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Celestial Aura Card */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D8B56D] font-bold">
              <Moon className="w-3.5 h-3.5" />
              <span>Your Daily Aura · {todayDate}</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
              {auraTitle}
            </h3>

            <div className="text-xs text-[#D8D9E8]/80 flex items-center gap-2 border-b border-white/10 pb-3">
              <span>Inspirasi Aroma Hari Ini:</span>
              <strong className="text-[#D8B56D] font-medium">{auraScent}</strong>
            </div>

            <p className="text-sm text-white/90 italic leading-relaxed font-light pl-3 border-l-2 border-[#D8B56D]">
              "{dailyAffirmation}"
            </p>

            <div className="text-xs text-[#D8D9E8]/70 pt-1">
              Rekomendasi Parfum Selaras:{' '}
              <span className="text-white font-bold">{recommendedFragrance.perfumeName}</span> ({recommendedFragrance.zodiac})
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onSelectFragrance(recommendedFragrance)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] rounded-xl shadow-md transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Rekomendasi</span>
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition-colors"
              >
                {saved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{saved ? 'Tersimpan!' : 'Simpan Inspirasi'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#D8B56D] bg-[#54258A]/30 hover:bg-[#54258A]/50 rounded-xl border border-[#D8B56D]/30 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan ke Instagram</span>
              </button>
            </div>
          </div>

          {/* Right: Instagram Story Graphic Card Preview */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[260px] aspect-[9/16] rounded-2xl p-4 flex flex-col justify-between border border-[#D8B56D]/40 bg-gradient-to-b from-[#18152e] via-[#0d0a1b] to-[#080812] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D8B56D]/15 blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between text-[10px] text-[#D8B56D] tracking-widest uppercase font-mono">
                  <span>ASTROSCENT</span>
                  <span>{todayDate}</span>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-[10px] text-[#D8D9E8]/60 uppercase tracking-widest">AURA HARI INI</div>
                  <div className="font-serif text-lg font-bold text-white mt-1 text-balance">
                    {auraTitle}
                  </div>
                </div>
              </div>

              <div className="text-center my-auto px-2">
                <div className="w-8 h-8 rounded-full bg-[#D8B56D]/20 border border-[#D8B56D]/40 mx-auto mb-2 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D8B56D]" />
                </div>
                <p className="text-[11px] text-[#D8D9E8]/90 italic leading-snug">
                  "{dailyAffirmation}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-3 text-center">
                <div className="text-[9px] text-[#D8D9E8]/60 uppercase">Signature Scent</div>
                <div className="text-xs font-serif font-bold text-[#D8B56D]">
                  {recommendedFragrance.perfumeName}
                </div>
                <div className="text-[9px] text-[#D8D9E8]/50 mt-1 font-mono">
                  astroscent.universe
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-[#D8D9E8]/50">
            *Daily Aura merupakan hiburan dan panduan keselarasan aroma personal yang diperbarui setiap putaran 24 jam rotasi bumi.
          </p>
        </div>
      </div>

      {/* Story Share Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="cosmic-glass p-6 rounded-2xl border border-[#D8B56D]/40 max-w-sm w-full space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold text-white">Bagikan Daily Aura</h4>
              <button
                onClick={() => setShowStoryModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#D8D9E8]/80 leading-relaxed">
              Kartu cerita Instagram siap dibagikan ke Story atau media sosialmu! Salin teks inspirasi atau unduh grafis galaksi.
            </p>
            <div className="p-3 bg-[#080812] rounded-xl border border-white/10 text-xs font-mono text-[#D8B56D]">
              "Daily Aura [{todayDate}]: {auraTitle} · {recommendedFragrance.perfumeName}"
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] transition-colors"
              >
                {copied ? 'Teks Tersalin!' : 'Salin Teks Story'}
              </button>
              <button
                onClick={() => setShowStoryModal(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-medium text-white bg-white/10 hover:bg-white/15"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
