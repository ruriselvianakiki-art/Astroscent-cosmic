import React, { useState } from 'react';
import { CartItem } from '../types';
import { cosmicAudio } from '../utils/audioSynth';
import { ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, Sparkles, Gift } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (subtotal: number, discount: number, freeGift: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');
  const [selectedFreeSample, setSelectedFreeSample] = useState<string>('Scorpio (Midnight Venom 2ml)');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * appliedDiscount);
  const finalSubtotal = rawSubtotal - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'STARDUST15') {
      cosmicAudio.playStarChime();
      setAppliedDiscount(0.15);
      setPromoError('');
    } else {
      setPromoError('Kode tidak valid. Gunakan "STARDUST15" untuk diskon 15%');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080812] border-l border-[#D8B56D]/30 flex flex-col justify-between shadow-2xl">
          {/* Cart Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D8B56D]" />
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                Keranjang Belanja Kosmik
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white p-1 text-base"
              aria-label="Tutup keranjang"
            >
              ✕
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D8B56D]">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <p className="text-sm text-[#D8D9E8]/70">
                  Keranjangmu masih hampa seperti ruang antariksa.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#080812] bg-[#D8B56D] rounded-lg"
                >
                  Jelajahi Koleksi Parfum
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="cosmic-glass p-4 rounded-xl border border-white/10 flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.perfumeName}
                    className="w-16 h-16 rounded-lg object-cover border border-[#D8B56D]/30 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-serif font-bold text-white truncate">
                        {item.perfumeName}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#D8B56D]">
                      {item.size} {item.zodiac ? `· ${item.zodiac}` : ''}
                    </div>

                    {item.customEngraving && (
                      <div className="text-[10px] text-[#D8D9E8]/60 font-mono truncate">
                        Ukiran: "{item.customEngraving}"
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs font-mono font-bold text-white tabular-nums">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-2 bg-[#080812] px-2 py-0.5 rounded-lg border border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-white/70 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-white/70 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Free Gift Vial Selection */}
            {items.length > 0 && (
              <div className="p-3.5 rounded-xl bg-[#54258A]/20 border border-[#D8B56D]/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-[#D8B56D] font-bold">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Bonus Gratis: 1 Vial Sample Zodiak (2ml)</span>
                </div>
                <select
                  value={selectedFreeSample}
                  onChange={(e) => setSelectedFreeSample(e.target.value)}
                  className="w-full bg-[#080812] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D8B56D]"
                >
                  <option value="Scorpio (Midnight Venom 2ml)">Scorpio — Midnight Venom (2ml)</option>
                  <option value="Leo (Solar Majesty 2ml)">Leo — Solar Majesty (2ml)</option>
                  <option value="Pisces (Neptune Dream 2ml)">Pisces — Neptune Dream (2ml)</option>
                  <option value="Aries (Inferno 2ml)">Aries — Inferno (2ml)</option>
                  <option value="Taurus (Velvet Earth 2ml)">Taurus — Velvet Earth (2ml)</option>
                </select>
              </div>
            )}

            {/* Promo Code Input */}
            {items.length > 0 && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#D8D9E8]/50 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Kode Promo (coba: STARDUST15)"
                      className="w-full bg-[#080812] border border-white/20 rounded-xl pl-8 pr-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-[#D8B56D]"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#D8B56D] border border-[#D8B56D]/30 transition-colors"
                  >
                    Gunakan
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-[11px] text-emerald-400">
                    ✓ Diskon 15% Kosmik Berhasil Diterapkan!
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-400">{promoError}</p>
                )}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-4 bg-[#0a0817]">
              <div className="space-y-1.5 text-xs text-[#D8D9E8]/80">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white tabular-nums">
                    Rp {rawSubtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Diskon Bintang (15%):</span>
                    <span className="font-mono tabular-nums">
                      - Rp {discountAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-serif text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Tagihan:</span>
                  <span className="text-[#D8B56D] font-mono tabular-nums">
                    Rp {finalSubtotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  cosmicAudio.playStarChime();
                  onProceedToCheckout(rawSubtotal, discountAmount, selectedFreeSample);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] transition-all shadow-lg cursor-pointer"
              >
                <span>Lanjut ke Pengiriman & Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
