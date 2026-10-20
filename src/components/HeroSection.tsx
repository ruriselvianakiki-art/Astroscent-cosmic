import React from 'react';
import { Sparkles, Compass, ArrowRight, ShieldCheck, Flame, Droplets, Wind, Mountain } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynth';

interface HeroSectionProps {
  onExploreGalaxy: () => void;
  onStartQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGalaxy,
  onStartQuiz,
}) => {
  return (
    <section className="relative w-full pt-10 pb-16 lg:py-20 overflow-hidden">
      {/* Background radial cosmic glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#54258A]/30 via-[#4768C8]/15 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed clean metadata kicker */}
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#D8B56D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Parfumerie Kosmik & Astrologi Modern</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#D8D9E8]/70">Edisi Koleksi Galaksi 2026</span>
            </div>

            {/* Dominant Headline with balanced text wrap */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] text-balance">
              Discover the Fragrance <br />
              <span className="bg-gradient-to-r from-[#FFF5D6] via-[#D8B56D] to-[#E9C46A] bg-clip-text text-transparent">
                Written in Your Stars.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#D8D9E8]/80 leading-relaxed max-w-xl font-light">
              Bukan sekadar parfum, melainkan penjelajahan alam semesta pribadi. Temukan aroma khas
              yang diracik berdasar karakter zodiak, frekuensi astrologi, dan harmoni kosmikmu.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  cosmicAudio.playStarChime();
                  onStartQuiz();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#080812] bg-[#D8B56D] hover:bg-[#c9a65d] rounded-xl shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Temukan Aroma Kosmikmu</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => {
                  cosmicAudio.playStarChime();
                  onExploreGalaxy();
                }}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/15 hover:border-[#D8B56D]/40 transition-colors"
              >
                <span>Jelajahi Tata Surya Zodiak</span>
              </button>
            </div>

            {/* 4 Elements Subtle Indicator */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-4 gap-4 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-[#D8D9E8]/70">
                <Flame className="w-4 h-4 text-[#E63946]" />
                <span>Api (Gairah)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#D8D9E8]/70">
                <Mountain className="w-4 h-4 text-[#2EC4B6]" />
                <span>Tanah (Elegan)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#D8D9E8]/70">
                <Wind className="w-4 h-4 text-[#F4A261]" />
                <span>Udara (Cerdas)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#D8D9E8]/70">
                <Droplets className="w-4 h-4 text-[#4CC9F0]" />
                <span>Air (Intuitif)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Flacon */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-[#D8B56D]/30 shadow-2xl group bg-[#0e0c1f]">
              <img
                src="/src/assets/images/hero_celestial_perfume_1792493698893.jpg"
                alt="AstroScent Celestial Signature Flacon floating in galaxy stardust"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-transparent to-transparent opacity-80" />

              {/* Quiet overlay label */}
              <div className="absolute bottom-5 left-5 right-5 cosmic-glass p-4 rounded-xl border border-[#D8B56D]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] tracking-widest text-[#D8B56D] uppercase font-semibold">
                      Grand Parfum
                    </div>
                    <div className="font-serif text-base font-bold text-white">
                      Aethel Aurora D’Or
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-[#D8D9E8]/60">Minyak Atsiri Grasse</div>
                    <div className="text-xs font-mono font-bold text-[#D8B56D]">Pure Parfum Extrait</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width editorial metrics strip below hero */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
          <div>
            <div className="font-serif text-2xl lg:text-3xl font-bold text-[#D8B56D] font-mono tabular-nums">
              12
            </div>
            <div className="text-xs text-[#D8D9E8]/70 mt-1">Konstelasi Zodiak Unik</div>
          </div>
          <div>
            <div className="font-serif text-2xl lg:text-3xl font-bold text-[#D8B56D] font-mono tabular-nums">
              16+ Jam
            </div>
            <div className="text-xs text-[#D8D9E8]/70 mt-1">Daya Tahan Aroma (Longevity)</div>
          </div>
          <div>
            <div className="font-serif text-2xl lg:text-3xl font-bold text-[#D8B56D] font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs text-[#D8D9E8]/70 mt-1">Minyak Atsiri Teruji Lab</div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-[#D8B56D] shrink-0" />
            <div className="text-xs text-[#D8D9E8]/70">
              <span className="font-semibold text-white block">Formulasi Terverifikasi</span>
              Aman di kulit & terdaftar BPOM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
