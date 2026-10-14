'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Coins,
  Save,
  Smartphone,
  Scale,
  Banknote,
  Wallet,
  CalendarDays,
  StickyNote,
  TrendingUp,
  TrendingDown,
  Inbox,
  LineChart,
  Receipt,
  PiggyBank,
} from 'lucide-react';

/* ============================================================ */
/* Hook: efek miring 3D halus mengikuti kursor                   */
/* ============================================================ */
function useTilt(max = 8, lift = 10) {
  const [t, setT] = useState({ rx: 0, ry: 0, x: 50, y: 50, on: false });

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2, x: px * 100, y: py * 100, on: true });
  };
  const onMouseLeave = () => setT((p) => ({ ...p, rx: 0, ry: 0, on: false }));

  const style = {
    transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(${t.on ? lift : 0}px)`,
    transition: t.on ? 'transform 80ms linear' : 'transform 450ms cubic-bezier(.2,.8,.2,1)',
    transformStyle: 'preserve-3d',
  };
  const glare = {
    background: `radial-gradient(circle at ${t.x}% ${t.y}%, rgba(255,255,255,.55), transparent 55%)`,
    opacity: t.on ? 1 : 0,
    transition: 'opacity 300ms',
  };

  return { handlers: { onMouseMove, onMouseLeave }, style, glare };
}

/* ============================================================ */
/* Konfigurasi kolom form                                        */
/* ============================================================ */
const kolomBeli = [
  { label: 'Nama Aplikasi',        key: 'aplikasi', ikon: Smartphone },
  { label: 'Jumlah Gram',          key: 'gram',     ikon: Scale },
  { label: 'Harga Beli per Gram',  key: 'harga',    ikon: Banknote },
  { label: 'Total Harga',          key: 'total',    ikon: Wallet },
  { label: 'Tanggal',              key: 'tanggal',  ikon: CalendarDays, tipe: 'date' },
  { label: 'Catatan',              key: 'catatan',  ikon: StickyNote },
];

const kolomJual = [
  { label: 'Nama Aplikasi',        key: 'aplikasi',   ikon: Smartphone },
  { label: 'Jumlah Gram Dijual',   key: 'gram',       ikon: Scale },
  { label: 'Harga Jual per Gram',  key: 'harga',      ikon: Banknote },
  { label: 'Total Hasil',          key: 'total',      ikon: Wallet },
  { label: 'Keuntungan',           key: 'keuntungan', ikon: TrendingUp },
  { label: 'Tanggal',              key: 'tanggal',    ikon: CalendarDays, tipe: 'date' },
  { label: 'Catatan',              key: 'catatan',    ikon: StickyNote },
];

/* ============================================================ */
/* Halaman utama                                                 */
/* ============================================================ */
export default function HalamanEmas() {
  const [formBeli, setFormBeli] = useState({
    aplikasi: '', gram: '', harga: '', total: '', tanggal: '', catatan: '',
  });
  const [formJual, setFormJual] = useState({
    aplikasi: '', gram: '', harga: '', total: '', keuntungan: '', tanggal: '', catatan: '',
  });

  return (
    // ===== Background LUAR: biru-ungu-pink (kayak Saham) =====
    <div className="rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-sky-50 via-indigo-50 to-rose-50">
      {/* ===== Background DALAM: kuning (khas Emas) ===== */}
      <div className="rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <style>{`
          .btn-3d { transition: transform 120ms ease, box-shadow 120ms ease; }
          .btn-3d:hover { transform: translateY(-1px); }
          .btn-3d:active { transform: translateY(4px); box-shadow: 0 1px 0 var(--sisi), 0 4px 8px -4px var(--bayang) !important; }
          @media (prefers-reduced-motion: reduce) {
            .tilt-3d, .btn-3d { transform: none !important; transition: none !important; }
          }
        `}</style>

        {/* Judul */}
        <div className="flex items-center gap-3 mb-7">
          <div
            className="grid place-items-center w-12 h-12 rounded-xl text-white bg-gradient-to-br from-amber-300 to-yellow-500"
            style={{
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,.6), 0 5px 0 #d97706, 0 12px 20px -6px rgba(217,119,6,.45)',
              transform: 'translateY(-3px)',
            }}
          >
            <LayoutDashboard size={24} />
          </div>
          <h2 className="text-2xl font-extrabold text-amber-900 tracking-tight">
            Dashboard Tata Kelola Emas
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ================= KOLOM KIRI ================= */}
          <div className="flex flex-col gap-6">
            <PanelForm
              judul="Form Beli Emas (Pemasukan)"
              ikon={ShoppingCart}
              kolom={kolomBeli}
              nilai={formBeli}
              setNilai={setFormBeli}
              nada={{
                ikonBg: 'from-amber-200 to-yellow-300',
                ikonWarna: 'text-amber-700',
                judul: 'text-amber-800',
                fokus: 'focus-within:ring-amber-300',
                tombol: 'from-amber-400 to-amber-500',
                sisi: '#d97706',
                bayang: 'rgba(217,119,6,.45)',
                ikonInput: 'text-amber-500',
                dasarInput: 'bg-amber-50',
                bayangInput: 'inset 0 2px 4px rgba(245,158,11,.2)',
              }}
            />

            <PanelForm
              judul="Form Jual Emas (Pengeluaran)"
              ikon={Coins}
              kolom={kolomJual}
              nilai={formJual}
              setNilai={setFormJual}
              nada={{
                ikonBg: 'from-orange-200 to-rose-300',
                ikonWarna: 'text-rose-700',
                judul: 'text-rose-800',
                fokus: 'focus-within:ring-rose-300',
                tombol: 'from-orange-400 to-rose-400',
                sisi: '#e11d48',
                bayang: 'rgba(244,63,94,.4)',
                ikonInput: 'text-rose-400',
                dasarInput: 'bg-rose-50',
                bayangInput: 'inset 0 2px 4px rgba(244,63,94,.15)',
              }}
            />
          </div>

          {/* ================= KOLOM KANAN ================= */}
          <div className="flex flex-col gap-6">
            <Panel>
              <JudulPanel ikon={Receipt} teks="Data Pembelian Emas" />
              <TabelData
                kolom={['No', 'Waktu', 'Nama Aplikasi', 'Jumlah Gram', 'Harga Beli/gr', 'Harga Beli']}
              />
              <p className="text-xs text-stone-500 mt-3">Total Pembelian: -</p>
            </Panel>

            <Panel>
              <JudulPanel ikon={Receipt} teks="Data Penjualan Hari Ini" />
              <TabelData
                kolom={['No', 'Waktu', 'Nama Aplikasi', 'Jumlah Gram', 'Harga Jual/gr', 'Total Hasil', 'Keuntungan']}
              />
              <p className="text-xs text-stone-500 mt-3">Total Penjualan: - | Total Keuntungan: -</p>
            </Panel>

            {/* ===== Kartu Ringkas ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <KartuRingkas
                label="Pemasukan Hari Ini"
                ikon={TrendingUp}
                warna="from-amber-100 to-amber-300"
                teks="text-amber-900"
                glow="251,191,36"
              />
              <KartuRingkas
                label="Pengeluaran Hari Ini"
                ikon={TrendingDown}
                warna="from-rose-100 to-rose-300"
                teks="text-rose-900"
                glow="251,113,133"
              />
              <KartuRingkas
                label="Total Pendapatan Hari Ini"
                ikon={PiggyBank}
                warna="from-emerald-100 to-emerald-300"
                teks="text-emerald-900"
                glow="52,211,153"
              />
            </div>

            {/* ===== Grafik Emas ===== */}
            <Panel>
              <div className="flex items-center justify-between mb-3">
                <JudulPanel ikon={LineChart} teks="Grafik Emas" tanpaMargin />
                <span className="text-sm text-stone-500">Aplikasi: -</span>
              </div>
              <div className="h-48 rounded-xl border-2 border-dashed border-amber-200 bg-amber-50/60 flex flex-col items-center justify-center gap-2 text-amber-400 text-sm">
                <LineChart size={32} />
                Grafik akan tampil di sini
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Komponen: Panel timbul (pembungkus umum)                      */
/* ============================================================ */
function Panel({ children }) {
  return (
    <div
      className="rounded-2xl bg-white/90 p-5 border border-white"
      style={{
        boxShadow:
          'inset 0 1px 0 #fff, 0 6px 0 -2px rgba(252,211,77,.5), 0 22px 36px -16px rgba(217,119,6,.3)',
      }}
    >
      {children}
    </div>
  );
}

function JudulPanel({ ikon: Ikon, teks, tanpaMargin = false }) {
  return (
    <h3 className={`flex items-center gap-2 font-bold text-amber-800 ${tanpaMargin ? '' : 'mb-3'}`}>
      <Ikon size={18} className="text-amber-500" />
      {teks}
    </h3>
  );
}

/* ============================================================ */
/* Komponen: Form (dipakai untuk beli & jual)                    */
/* ============================================================ */
function PanelForm({ judul, ikon: Ikon, kolom, nilai, setNilai, nada }) {
  return (
    <Panel>
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br ${nada.ikonBg} ${nada.ikonWarna}`}
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7), 0 3px 8px -2px rgba(217,119,6,.3)' }}
        >
          <Ikon size={20} />
        </div>
        <h3 className={`font-bold ${nada.judul}`}>{judul}</h3>
      </div>

      {kolom.map((f) => {
        const IkonField = f.ikon;
        return (
          <div key={f.key} className="mb-3">
            <label className="block text-xs font-semibold text-stone-600 mb-1 ml-1">{f.label}</label>
            <div
              className={`flex items-center gap-2 rounded-full px-4 ${nada.dasarInput} ring-2 ring-transparent transition ${nada.fokus}`}
              style={{ boxShadow: nada.bayangInput }}
            >
              <IkonField size={16} className={nada.ikonInput} />
              <input
                type={f.tipe || 'text'}
                value={nilai[f.key]}
                onChange={(e) => setNilai({ ...nilai, [f.key]: e.target.value })}
                className="w-full bg-transparent py-2 text-sm text-stone-700 outline-none"
              />
            </div>
          </div>
        );
      })}

      <div className="flex justify-end mt-5">
        <button
          type="button"
          className={`btn-3d inline-flex items-center gap-2 bg-gradient-to-br ${nada.tombol} text-white font-semibold px-8 py-2 rounded-full`}
          style={{
            '--sisi': nada.sisi,
            '--bayang': nada.bayang,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,.5), 0 5px 0 ${nada.sisi}, 0 12px 18px -6px ${nada.bayang}`,
          }}
        >
          <Save size={16} />
          Simpan
        </button>
      </div>
    </Panel>
  );
}

/* ============================================================ */
/* Komponen: Tabel                                               */
/* ============================================================ */
function TabelData({ kolom }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-amber-100">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gradient-to-b from-amber-50 to-yellow-100 text-amber-800">
            {kolom.map((k) => (
              <th key={k} className="p-2 font-semibold text-left whitespace-nowrap">
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={kolom.length} className="py-6">
              <div className="flex flex-col items-center gap-1 text-amber-300 italic">
                <Inbox size={24} />
                Belum ada data
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================ */
/* Komponen: Kartu Ringkas 3D lembut                             */
/* ============================================================ */
function KartuRingkas({ label, ikon: Ikon, warna, teks, glow }) {
  const { handlers, style, glare } = useTilt(8, 12);

  return (
    <div style={{ perspective: 900 }}>
      <div
        {...handlers}
        style={{
          ...style,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,.8), 0 6px 0 -2px rgba(${glow},.55), 0 20px 26px -12px rgba(${glow},.65)`,
        }}
        className={`tilt-3d relative overflow-hidden rounded-xl p-4 bg-gradient-to-br ${warna} ${teks}`}
      >
        <span className="absolute -right-5 -top-7 w-24 h-24 rounded-full bg-white/30" />

        <div className="relative flex items-center justify-between gap-3">
          <div style={{ transform: 'translateZ(24px)' }}>
            <p className="font-extrabold text-lg">Rp -</p>
            <p className="text-xs mt-1 opacity-80">{label}</p>
          </div>
          <div
            style={{ transform: 'translateZ(40px)' }}
            className="grid place-items-center w-10 h-10 rounded-full bg-white/60 shrink-0"
          >
            <Ikon size={20} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0" style={glare} />
      </div>
    </div>
  );
}