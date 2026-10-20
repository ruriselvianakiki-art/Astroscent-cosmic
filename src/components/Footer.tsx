import React from 'react';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenCosmicPass: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenCosmicPass,
}) => {
  return (
    <footer className="w-full bg-[#05050d] border-t border-[#D8B56D]/15 pt-16 pb-12 text-[#D8D9E8]/70 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D8B56D]" />
              <span className="font-serif text-lg font-bold tracking-widest text-white">
                ASTRO<span className="text-[#D8B56D]">SCENT</span>
              </span>
            </div>
            <p className="text-xs text-[#D8D9E8]/70 leading-relaxed font-light">
              "The universe is infinite. Your signature scent is personal."
            </p>
            <p className="text-[11px] text-[#D8D9E8]/50">
              Maison de Parfum Kosmik terinspirasi oleh 12 rasi zodiak, disuling dengan bahan alami berkualitas tinggi di Grasse.
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-2">
            <div className="text-xs uppercase font-bold text-[#D8B56D] tracking-wider mb-2">
              Eksplorasi Kosmik
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('galaxy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Tata Surya Zodiak Interaktif
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('zodiac')}
                  className="hover:text-white transition-colors text-left"
                >
                  12 Koleksi Parfum Zodiak
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scent-finder')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cosmic Scent Finder Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('alchemy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Perfume Alchemy Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Curations */}
          <div className="space-y-2">
            <div className="text-xs uppercase font-bold text-[#D8B56D] tracking-wider mb-2">
              Layanan Eksklusif
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('couple')}
                  className="hover:text-white transition-colors text-left"
                >
                  Zodiac Couple & Hadiah
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCosmicPass}
                  className="hover:text-white transition-colors text-left"
                >
                  The Cosmic Identity Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors text-left"
                >
                  Discovery Sample Box Set
                </button>
              </li>
              <li>
                <span className="text-[#D8D9E8]/50">Konsultasi Parfum Personal</span>
              </li>
            </ul>
          </div>

          {/* Ethics & Transparency */}
          <div className="space-y-2">
            <div className="text-xs uppercase font-bold text-[#D8B56D] tracking-wider mb-2">
              Transparansi & Keamanan
            </div>
            <p className="text-[11px] text-[#D8D9E8]/60 leading-relaxed">
              Formula parfum AstroScent diproduksi sesuai standar dermatologi IFRA (International Fragrance Association) dan terdaftar di BPOM RI.
            </p>
            <div className="pt-2 text-[10px] text-[#D8B56D] font-mono">
              JAKARTA · PARIS · GRASSE
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#D8D9E8]/50">
          <div>
            © 2026 AstroScent Fragrance House. All cosmic rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privasi Kosmik</span>
            <span>·</span>
            <span>Syarat & Ketentuan Toko</span>
            <span>·</span>
            <span>Sertifikasi BPOM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
