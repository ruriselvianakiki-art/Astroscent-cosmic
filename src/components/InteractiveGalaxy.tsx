import React, { useEffect, useRef, useState } from 'react';
import { ZODIAC_FRAGRANCES } from '../data/zodiacFragrances';
import { ZodiacFragrance } from '../types';
import { cosmicAudio } from '../utils/audioSynth';
import { Sparkles, Eye, ShoppingBag, ArrowRight } from 'lucide-react';

interface InteractiveGalaxyProps {
  onSelectZodiac: (fragrance: ZodiacFragrance) => void;
  onAddToCart: (fragrance: ZodiacFragrance, size: '50ml') => void;
}

export const InteractiveGalaxy: React.FC<InteractiveGalaxyProps> = ({
  onSelectZodiac,
  onAddToCart,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<ZodiacFragrance | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<ZodiacFragrance | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 640);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 640;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = 180;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    // Generate shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      life: number;
      maxLife: number;
    }
    const shootingStars: ShootingStar[] = [];

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        len: Math.random() * 80 + 60,
        speed: Math.random() * 8 + 6,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
        life: 0,
        maxLife: Math.random() * 50 + 40,
      });
    };

    let shootingTimer = 0;

    // Interactive pointer particles
    const pointerParticles: { x: number; y: number; alpha: number; vx: number; vy: number; radius: number }[] = [];

    let rotationAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space background gradient
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, '#150f2f');
      bgGrad.addColorStop(0.5, '#0d0b1e');
      bgGrad.addColorStop(1, '#080812');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Shimmering stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.twinkleDir;
        if (star.alpha > 1) {
          star.alpha = 1;
          star.twinkleDir = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.twinkleDir = 1;
        }

        ctx.fillStyle = `rgba(216, 217, 232, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & render shooting stars
      shootingTimer++;
      if (shootingTimer > 160 && Math.random() > 0.6) {
        spawnShootingStar();
        shootingTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        const progress = s.life / s.maxLife;
        const alpha = Math.sin(progress * Math.PI) * 0.9;

        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'rgba(216, 181, 109, 0)');
        grad.addColorStop(1, `rgba(255, 240, 200, ${alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      // Pointer trail particles
      for (let i = pointerParticles.length - 1; i >= 0; i--) {
        const p = pointerParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        if (p.alpha <= 0) {
          pointerParticles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(216, 181, 109, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center Solar Sun / Central Luminary
      const centerX = width / 2;
      const centerY = height / 2;

      // Sun halo glow
      const sunHalo = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 90);
      sunHalo.addColorStop(0, 'rgba(216, 181, 109, 0.45)');
      sunHalo.addColorStop(0.4, 'rgba(84, 37, 138, 0.25)');
      sunHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunHalo;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
      ctx.fill();

      // Sun core
      const sunGrad = ctx.createRadialGradient(centerX - 4, centerY - 4, 3, centerX, centerY, 28);
      sunGrad.addColorStop(0, '#FFF5D6');
      sunGrad.addColorStop(0.6, '#D8B56D');
      sunGrad.addColorStop(1, '#8C6826');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
      ctx.fill();

      // Orbit tracks & Zodiac Planets
      rotationAngle += 0.0016;

      const baseRadius = Math.min(width, height) * 0.42;

      // Draw faint orbital ring
      ctx.strokeStyle = 'rgba(216, 181, 109, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 12 Planets around the orbit
      ZODIAC_FRAGRANCES.forEach((item, index) => {
        const angle = rotationAngle + (index * ((Math.PI * 2) / 12));
        const px = centerX + Math.cos(angle) * baseRadius;
        const py = centerY + Math.sin(angle) * (baseRadius * 0.62); // Slight elliptical tilt for 3D depth

        const isHovered = hoveredPlanet?.id === item.id;
        const isSelected = selectedPlanet?.id === item.id;
        const pRadius = isSelected ? 17 : isHovered ? 15 : 11;

        // Planet glow
        const glow = ctx.createRadialGradient(px, py, 2, px, py, pRadius * 2.5);
        glow.addColorStop(0, `${item.colorHex}99`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, pRadius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Planet body
        const planetGrad = ctx.createRadialGradient(px - pRadius * 0.3, py - pRadius * 0.3, 2, px, py, pRadius);
        planetGrad.addColorStop(0, '#FFFFFF');
        planetGrad.addColorStop(0.3, item.accentColor);
        planetGrad.addColorStop(1, item.colorHex);
        ctx.fillStyle = planetGrad;
        ctx.beginPath();
        ctx.arc(px, py, pRadius, 0, Math.PI * 2);
        ctx.fill();

        // Golden selection ring
        if (isSelected || isHovered) {
          ctx.strokeStyle = '#D8B56D';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(px, py, pRadius + 5, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Zodiac symbol text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.symbol, px, py);

        // Name tag on hover or selection
        if (isHovered || isSelected) {
          ctx.fillStyle = '#D8B56D';
          ctx.font = '11px sans-serif';
          ctx.fillText(item.zodiac.toUpperCase(), px, py - pRadius - 10);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse move listener for pointer particles & planet hover detection
    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Spawn interactive sparkles
      if (Math.random() > 0.4) {
        pointerParticles.push({
          x: mx,
          y: my,
          alpha: 0.8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2 + 1,
        });
      }

      // Check hover collision
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.42;

      let found: ZodiacFragrance | null = null;
      ZODIAC_FRAGRANCES.forEach((item, index) => {
        const angle = rotationAngle + (index * ((Math.PI * 2) / 12));
        const px = centerX + Math.cos(angle) * baseRadius;
        const py = centerY + Math.sin(angle) * (baseRadius * 0.62);
        const dist = Math.hypot(mx - px, my - py);
        if (dist <= 24) {
          found = item;
        }
      });

      setHoveredPlanet(found);
      canvas.style.cursor = found ? 'pointer' : 'default';
    };

    const handlePointerClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.42;

      ZODIAC_FRAGRANCES.forEach((item, index) => {
        const angle = rotationAngle + (index * ((Math.PI * 2) / 12));
        const px = centerX + Math.cos(angle) * baseRadius;
        const py = centerY + Math.sin(angle) * (baseRadius * 0.62);
        const dist = Math.hypot(mx - px, my - py);
        if (dist <= 28) {
          cosmicAudio.playStarChime();
          setSelectedPlanet(item);
        }
      });
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('click', handlePointerClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('click', handlePointerClick);
    };
  }, [hoveredPlanet, selectedPlanet]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#D8B56D]/20 bg-[#080812]">
      {/* Top Banner overlay indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs text-[#D8D9E8]/80 cosmic-glass px-3.5 py-1.5 rounded-lg border border-[#D8B56D]/15">
        <Sparkles className="w-3.5 h-3.5 text-[#D8B56D]" />
        <span>Sentuh atau klik planet zodiak untuk membuka portal aroma</span>
      </div>

      {/* Orbit Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-[480px] md:h-[580px] block"
      />

      {/* Pop-up detail drawer for selected planet */}
      {selectedPlanet && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-20 cosmic-glass p-5 rounded-xl border border-[#D8B56D]/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg shrink-0 border border-white/20"
                style={{ backgroundColor: selectedPlanet.colorHex }}
              >
                {selectedPlanet.symbol}
              </div>
              <div>
                <div className="text-xs tracking-wider text-[#D8B56D] uppercase font-semibold">
                  {selectedPlanet.zodiac} · {selectedPlanet.element}
                </div>
                <h4 className="text-lg font-serif font-bold text-white tracking-wide">
                  {selectedPlanet.perfumeName}
                </h4>
              </div>
            </div>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="text-white/60 hover:text-white text-sm p-1"
              aria-label="Tutup ringkasan planet"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-xs text-[#D8D9E8]/80 leading-relaxed italic">
            "{selectedPlanet.tagline}"
          </p>

          <div className="mt-3 text-xs text-[#D8D9E8]/70 border-t border-white/10 pt-2.5 flex items-center justify-between">
            <span>Karakter Aroma:</span>
            <span className="font-medium text-white">{selectedPlanet.scentCharacter}</span>
          </div>

          <div className="mt-1 text-xs text-[#D8D9E8]/70 flex items-center justify-between">
            <span>Ketahanan:</span>
            <span className="font-mono text-[#D8B56D]">{selectedPlanet.longevity}</span>
          </div>

          <div className="mt-4 flex items-center gap-2 pt-1">
            <button
              onClick={() => onSelectZodiac(selectedPlanet)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 rounded-lg border border-white/15 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Detail Aroma</span>
            </button>
            <button
              onClick={() => {
                cosmicAudio.playStarChime();
                onAddToCart(selectedPlanet, '50ml');
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#080812] bg-[#D8B56D] hover:bg-[#c4a159] rounded-lg shadow-md transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Beli (Rp {(selectedPlanet.price50ml / 1000).toLocaleString('id-ID')}k)</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Explore All button */}
      <div className="absolute bottom-4 left-4 z-10 hidden md:block">
        <button
          onClick={() => {
            const el = document.getElementById('zodiac-collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#D8B56D] hover:text-white bg-[#080812]/80 hover:bg-[#080812] border border-[#D8B56D]/30 rounded-lg transition-colors"
        >
          <span>Jelajahi 12 Rasi Zodiak Lengkap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
