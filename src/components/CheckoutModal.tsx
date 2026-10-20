import React, { useState } from 'react';
import { CartItem, OrderRecord } from '../types';
import { cosmicAudio } from '../utils/audioSynth';
import { ShieldCheck, Truck, CreditCard, QrCode, CheckCircle2, Sparkles, Package } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  freeGift: string;
  onOrderSuccess: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  freeGift,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');

  // Form states
  const [recipientName, setRecipientName] = useState<string>('Ruri Selviana');
  const [phone, setPhone] = useState<string>('081234567890');
  const [address, setAddress] = useState<string>('Jl. Bintang Timur No. 42, Kebayoran Baru, Jakarta Selatan');
  const [city, setCity] = useState<string>('Jakarta');
  const [postalCode, setPostalCode] = useState<string>('12190');

  // Shipping
  const [courier, setCourier] = useState<string>('Paxel Cold Chain');
  const courierCost = courier === 'Paxel Cold Chain' ? 35000 : courier === 'JNE YES Express' ? 28000 : 45000;

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<string>('QRIS (BCA / GoPay / OVO)');

  // Completed order
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const totalPayment = subtotal - discount + courierCost;

  const handleConfirmOrder = () => {
    cosmicAudio.playStarChime();
    const orderId = `ASTRO-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `CEL-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: OrderRecord = {
      orderId,
      date: '20 Oktober 2026',
      items,
      total: totalPayment,
      status: 'Peracikan Formula',
      courier,
      trackingNumber,
      recipientName,
      address: `${address}, ${city} ${postalCode}`,
      paymentMethod,
    };

    setCompletedOrder(newOrder);
    onOrderSuccess(newOrder);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative max-w-3xl w-full cosmic-glass p-6 sm:p-8 rounded-3xl border border-[#D8B56D]/40 shadow-2xl my-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10"
          aria-label="Tutup form pembayaran"
        >
          ✕
        </button>

        {step === 'form' ? (
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <div className="text-xs uppercase tracking-widest text-[#D8B56D] font-mono">
                AstroScent Official Checkout
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide mt-1">
                Data Penerima & Pengiriman
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recipient Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D8B56D]">
                  1. Informasi Penerima
                </h3>

                <div>
                  <label className="text-xs text-[#D8D9E8]/70 block mb-1">Nama Lengkap:</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-[#080812] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D8B56D]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#D8D9E8]/70 block mb-1">Nomor WhatsApp / Telepon:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#080812] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D8B56D]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#D8D9E8]/70 block mb-1">Alamat Pengiriman:</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#080812] border border-white/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D8B56D] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-[#D8D9E8]/70 block mb-1">Kota:</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#080812] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D8B56D]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#D8D9E8]/70 block mb-1">Kode Pos:</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-[#080812] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D8B56D]"
                    />
                  </div>
                </div>
              </div>

              {/* Courier & Payment Selection */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D8B56D] flex items-center gap-1.5 mb-2">
                    <Truck className="w-3.5 h-3.5" />
                    <span>2. Pilihan Kurir Pengiriman</span>
                  </h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Paxel Cold Chain', note: 'Terjaga di suhu sejuk khusus flacon mewah', cost: 35000 },
                      { name: 'JNE YES Express', note: 'Garansi 1 hari sampai ke seluruh Indonesia', cost: 28000 },
                      { name: 'Celestial Same Day', note: 'Kurir khusus wilayah Jabodetabek', cost: 45000 },
                    ].map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setCourier(c.name)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                          courier === c.name
                            ? 'bg-[#54258A]/40 border-[#D8B56D] text-white'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#D8D9E8]/80'
                        }`}
                      >
                        <div className="flex justify-between font-semibold">
                          <span>{c.name}</span>
                          <span className="font-mono text-[#D8B56D]">Rp {c.cost.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="text-[10px] text-[#D8D9E8]/60 mt-0.5">{c.note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D8B56D] flex items-center gap-1.5 mb-2">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>3. Metode Pembayaran</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'QRIS (BCA / GoPay / OVO)',
                      'BCA / Mandiri Virtual Account',
                      'Kartu Kredit / Debit Visa',
                      'Cash on Delivery (COD)',
                    ].map((m) => (
                      <button
                        key={m}
                        onClick={() => setPaymentMethod(m)}
                        className={`p-2.5 rounded-xl border text-left text-[11px] font-medium transition-all ${
                          paymentMethod === m
                            ? 'bg-[#54258A]/50 border-[#D8B56D] text-white font-bold'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#D8D9E8]/70'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Strip */}
            <div className="p-4 bg-[#080812] rounded-2xl border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#D8D9E8]/80">
                <span>Subtotal Parfum ({items.length} item):</span>
                <span className="font-mono tabular-nums text-white">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Diskon Promo Bintang:</span>
                  <span className="font-mono tabular-nums">- Rp {discount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#D8D9E8]/80">
                <span>Ongkos Kirim ({courier}):</span>
                <span className="font-mono tabular-nums text-white">Rp {courierCost.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[#D8B56D] text-[11px]">
                <span>Bonus Hadiah:</span>
                <span>{freeGift}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between font-serif text-lg font-bold text-white">
                <span>Total Pembayaran:</span>
                <span className="text-[#D8B56D] font-mono tabular-nums">
                  Rp {totalPayment.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleConfirmOrder}
              className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Selesaikan Pesanan & Mulai Peracikan Bintang</span>
            </button>
          </div>
        ) : (
          /* Step 2: Order Confirmed & Live Order Tracking */
          completedOrder && (
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-[#D8B56D] font-mono">
                  PESANAN TELAH DIKONFIRMASI
                </div>
                <h2 className="font-serif text-3xl font-bold text-white mt-1">
                  Terima Kasih, {completedOrder.recipientName}!
                </h2>
                <p className="text-xs text-[#D8D9E8]/80 mt-1">
                  Nomor Pesanan:{' '}
                  <span className="font-mono font-bold text-white">{completedOrder.orderId}</span>
                </p>
              </div>

              {/* Simulated Live Order Tracking Timeline */}
              <div className="cosmic-glass p-5 rounded-2xl border border-[#D8B56D]/30 text-left space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#D8B56D]" />
                    <span>Status Pelacakan Pesanan Kosmik</span>
                  </span>
                  <span className="text-xs font-mono text-[#D8B56D]">
                    Resi: {completedOrder.trackingNumber}
                  </span>
                </div>

                <div className="space-y-3 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#D8B56D]/30">
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                    <div className="text-xs font-bold text-white">Pesanan Berhasil Dikonfirmasi & Lunas</div>
                    <div className="text-[10px] text-[#D8D9E8]/60">20 Okt 2026, 10:54 WIB · Metode: {completedOrder.paymentMethod}</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-[#D8B56D] animate-ping" />
                    <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-[#D8B56D]" />
                    <div className="text-xs font-bold text-[#D8B56D]">Peracikan Ekstrak Minyak Bintang di Laboratorium</div>
                    <div className="text-[10px] text-[#D8D9E8]/60">Sedang diproses oleh Alchemist Master · Waktu maserasi optimal</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-white/30" />
                    <div className="text-xs text-white/50">Pengemasan Khusus Segel Lilin Astronomi</div>
                    <div className="text-[10px] text-[#D8D9E8]/40">Menunggu penyelesaian formula</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-white/30" />
                    <div className="text-xs text-white/50">Kurir {completedOrder.courier} Mengantar Menuju Alamat</div>
                    <div className="text-[10px] text-[#D8D9E8]/40">{completedOrder.address}</div>
                  </div>
                </div>
              </div>

              {/* Cosmic Points Award Badge */}
              <div className="p-4 rounded-xl bg-[#54258A]/30 border border-[#D8B56D]/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-left">
                  <Sparkles className="w-5 h-5 text-[#D8B56D]" />
                  <div>
                    <div className="text-xs font-bold text-white">+150 Cosmic Points Diperoleh!</div>
                    <div className="text-[10px] text-[#D8D9E8]/70">Telah ditambahkan ke akun The Cosmic Identity kamu.</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#D8B56D]">STARDUST VIP</span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-[#080812] bg-[#D8B56D] hover:bg-[#c6a257] transition-colors"
              >
                Kembali Menjelajahi Alam Semesta
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
