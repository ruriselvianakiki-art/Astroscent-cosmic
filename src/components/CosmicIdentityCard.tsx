import React, { useState } from 'react';
import { UserCosmicProfile } from '../types';
import { cosmicAudio } from '../utils/audioSynth';
import { Sparkles, QrCode, Award, Share2, Check } from 'lucide-react';

interface CosmicIdentityCardProps {
  profile: UserCosmicProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const CosmicIdentityCard: React.FC<CosmicIdentityCardProps> = ({
  profile,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyId = () => {
    cosmicAudio.playStarChime();
    navigator.clipboard?.writeText(
      `ASTROSCENT COSMIC PASS [${profile.cosmicId}] · Element: ${profile.element} · Scent: ${profile.signatureScent}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative max-w-md w-full cosmic-glass p-6 sm:p-8 rounded-3xl border border-[#D8B56D]/40 shadow-2xl space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-1 text-sm"
          aria-label="Tutup kartu identitas"
        >
          ✕
        </button>

        {/* Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#D8B56D] font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Celestial Pass</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
            The Cosmic Identity
          </h3>
          <p className="text-xs text-[#D8D9E8]/70 mt-1">
            Kartu identitas wewangian kosmik resmimu di dalam ekosistem AstroScent.
          </p>
        </div>

        {/* The Holographic Pass Card Container */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full aspect-[1.58/1] rounded-2xl p-5 border border-[#D8B56D]/50 relative overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.02] shadow-2xl bg-gradient-to-br from-[#1b1539] via-[#0f0c24] to-[#080812]"
        >
          {/* Holographic shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none" />

          {/* Top row */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="font-serif text-base font-bold tracking-widest text-white">
                ASTRO<span className="text-[#D8B56D]">SCENT</span>
              </span>
              <span className="text-[10px] text-[#D8B56D] font-mono px-1.5 py-0.5 rounded border border-[#D8B56D]/30">
                VIP
              </span>
            </div>
            <div className="text-[11px] font-mono text-[#D8B56D] tracking-widest">
              {profile.cosmicId}
            </div>
          </div>

          {/* Middle Body */}
          <div className="mt-4 grid grid-cols-2 gap-3 relative z-10">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-[#D8D9E8]/60">SIGNATURE SCENT</div>
              <div className="text-sm font-serif font-bold text-white truncate">
                {profile.signatureScent}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-[#D8D9E8]/60">COSMIC ELEMENT</div>
              <div className="text-sm font-bold text-[#D8B56D]">
                {profile.element} ({profile.zodiac})
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-[#D8D9E8]/60">AURA FREQUENCY</div>
              <div className="text-xs font-mono text-white/90">
                {profile.auraName}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-[#D8D9E8]/60">LOYALTY POINTS</div>
              <div className="text-xs font-mono font-bold text-[#D8B56D]">
                {profile.cosmicPoints} Stardust Pts
              </div>
            </div>
          </div>

          {/* Bottom Card Footer with simulated QR & seal */}
          <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between border-t border-white/10 pt-2 z-10">
            <div className="text-[9px] text-[#D8D9E8]/50 uppercase tracking-widest font-mono">
              EST. MMXXVI · GRASSE × CELESTIAL
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#D8B56D]">
              <QrCode className="w-4 h-4" />
              <span className="font-mono text-[9px]">VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Badges collected */}
        <div>
          <div className="text-xs font-semibold text-[#D8B56D] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Koleksi Lencana Galaksi Kamu ({profile.unlockedBadges.length}):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.unlockedBadges.map((badge) => (
              <span
                key={badge}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/90"
              >
                ✨ {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleCopyId}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Identitas Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Salin & Bagikan ID Kosmik</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl text-xs font-medium text-white bg-white/10 hover:bg-white/15 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
