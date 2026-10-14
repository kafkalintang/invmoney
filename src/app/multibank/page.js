'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Save,
  Smartphone,
  Banknote,
  Inbox,
  Receipt,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpCircle,
  ArrowDownCircle,
  Landmark,
  Wallet,
  LineChart,
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
/* Halaman utama                                                 */
/* ============================================================ */
export default function HalamanMultiBank() {
  const [formMasuk, setFormMasuk] = useState({ nama: '', jumlah: '' });
  const [formKeluar, setFormKeluar] = useState({ nama: '', jumlah: '' });

  return (
    <div className="rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50">
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
          className="grid place-items-center w-12 h-12 rounded-xl text-white bg-gradient-to-br from-sky-400 to-cyan-500"
          style={{
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,.6), 0 5px 0 #0369a1, 0 12px 20px -6px rgba(14,165,233,.45)',
            transform: 'translateY(-3px)',
          }}
        >
          <LayoutDashboard size={24} />
        </div>
        <h2 className="text-2xl font-extrabold text-sky-900 tracking-tight">
          Dashboard Data Bank
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ================= KOLOM KIRI ================= */}
        <div className="flex flex-col gap-6">

          {/* Form Nabung */}
          <Panel>
            <JudulPanel ikon={ArrowUpCircle} teks="Nabung Berapa Hari Ini" warna="text-emerald-800" ikonWarna="text-emerald-500" />

            <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100">
              <div className="mb-3">
                <label className="block text-xs font-semibold text-slate-600 mb-1 ml-1">Nama</label>
                <div
                  className="flex items-center gap-2 rounded-full px-4 bg-white ring-2 ring-transparent focus-within:ring-emerald-300 transition"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(16,185,129,.15)' }}
                >
                  <Landmark size={16} className="text-emerald-500" />
                  <input
                    type="text"
                    value={formMasuk.nama}
                    onChange={(e) => setFormMasuk({ ...formMasuk, nama: e.target.value })}
                    className="w-full bg-transparent py-2 text-sm text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1 ml-1">Jumlah Pemasukan</label>
                <div
                  className="flex items-center gap-2 rounded-full px-4 bg-white ring-2 ring-transparent focus-within:ring-emerald-300 transition"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(16,185,129,.15)' }}
                >
                  <Banknote size={16} className="text-emerald-500" />
                  <input
                    type="text"
                    value={formMasuk.jumlah}
                    onChange={(e) => setFormMasuk({ ...formMasuk, jumlah: e.target.value })}
                    className="w-full bg-transparent py-2 text-sm text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  className="btn-3d inline-flex items-center gap-2 bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-semibold px-8 py-2 rounded-full text-sm"
                  style={{
                    '--sisi': '#0d9488',
                    '--bayang': 'rgba(13,148,136,.45)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,.5), 0 5px 0 #0d9488, 0 12px 18px -6px rgba(13,148,136,.45)',
                  }}
                >
                  <Save size={16} />
                  Simpan
                </button>
              </div>
            </div>
          </Panel>

          {/* Form Pengeluaran */}
          <Panel>
            <JudulPanel ikon={ArrowDownCircle} teks="Ada Pengeluaran Apa Hari Ini" warna="text-rose-800" ikonWarna="text-rose-500" />

            <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-100">
              <div className="mb-3">
                <label className="block text-xs font-semibold text-slate-600 mb-1 ml-1">Nama aplikasi</label>
                <div
                  className="flex items-center gap-2 rounded-full px-4 bg-white ring-2 ring-transparent focus-within:ring-rose-300 transition"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(244,63,94,.15)' }}
                >
                  <Smartphone size={16} className="text-rose-400" />
                  <input
                    type="text"
                    value={formKeluar.nama}
                    onChange={(e) => setFormKeluar({ ...formKeluar, nama: e.target.value })}
                    className="w-full bg-transparent py-2 text-sm text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1 ml-1">Jumlah Pengeluaran</label>
                <div
                  className="flex items-center gap-2 rounded-full px-4 bg-white ring-2 ring-transparent focus-within:ring-rose-300 transition"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(244,63,94,.15)' }}
                >
                  <Banknote size={16} className="text-rose-400" />
                  <input
                    type="text"
                    value={formKeluar.jumlah}
                    onChange={(e) => setFormKeluar({ ...formKeluar, jumlah: e.target.value })}
                    className="w-full bg-transparent py-2 text-sm text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  className="btn-3d inline-flex items-center gap-2 bg-gradient-to-br from-orange-400 to-rose-400 text-white font-semibold px-8 py-2 rounded-full text-sm"
                  style={{
                    '--sisi': '#e11d48',
                    '--bayang': 'rgba(244,63,94,.4)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,.5), 0 5px 0 #e11d48, 0 12px 18px -6px rgba(244,63,94,.4)',
                  }}
                >
                  <Save size={16} />
                  Simpan
                </button>
              </div>
            </div>
          </Panel>
        </div>

        {/* ================= KOLOM KANAN ================= */}
        <div className="flex flex-col gap-6">

          {/* Tabel Tabungan Hari Ini */}
          <Panel>
            <JudulPanel ikon={Receipt} teks="Data Tabungan Hari Ini" warna="text-emerald-800" ikonWarna="text-emerald-500" />
            <TabelData
              kolom={['No', 'Waktu', 'Nama Aplikasi', 'Jumlah Tabungan']}
              border="border-emerald-100"
              headerBg="from-emerald-50 to-teal-100 text-emerald-800"
              emptyColor="text-emerald-300"
            />
          </Panel>

          {/* Tabel Pengeluaran Hari Ini */}
          <Panel>
            <JudulPanel ikon={Receipt} teks="Data Pengeluaran Hari Ini" warna="text-rose-800" ikonWarna="text-rose-500" />
            <TabelData
              kolom={['No', 'Waktu', 'Nama Aplikasi', 'Jumlah Pengeluaran']}
              border="border-rose-100"
              headerBg="from-rose-50 to-pink-100 text-rose-800"
              emptyColor="text-rose-300"
            />
          </Panel>

          {/* 3 Kotak Warna + Grafik */}
          <div className="grid grid-cols-2 gap-4 items-start">

            {/* 3 kotak warna */}
            <div className="flex flex-col gap-3">
              <KotakWarna grad="from-emerald-100 to-teal-200" border="border-emerald-200" label="Pemasukan" />
              <KotakWarna grad="from-rose-100 to-red-200"   border="border-rose-200"    label="Pengeluaran" />
              <KotakWarna grad="from-slate-100 to-slate-300" border="border-slate-200"  label="Total" />
            </div>

            {/* Grafik */}
            <Panel>
              <div className="flex items-center justify-between mb-2">
                <JudulPanel ikon={LineChart} teks="Grafik" warna="text-sky-800" ikonWarna="text-sky-500" tanpaMargin />
                <span className="text-xs text-slate-500">-</span>
              </div>
              <div className="h-40 rounded-xl border-2 border-dashed border-sky-200 bg-sky-50/60 flex flex-col items-center justify-center gap-2 text-sky-400 text-xs">
                <LineChart size={28} />
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
/* Komponen kecil                                                */
/* ============================================================ */
function Panel({ children }) {
  return (
    <div
      className="rounded-2xl bg-white/90 p-5 border border-white"
      style={{
        boxShadow:
          'inset 0 1px 0 #fff, 0 6px 0 -2px rgba(165,243,252,.5), 0 22px 36px -16px rgba(14,165,233,.3)',
      }}
    >
      {children}
    </div>
  );
}

function JudulPanel({ ikon: Ikon, teks, warna = 'text-sky-800', ikonWarna = 'text-sky-500', tanpaMargin = false }) {
  return (
    <h3 className={`flex items-center gap-2 font-bold ${warna} ${tanpaMargin ? '' : 'mb-3'} text-sm`}>
      <Ikon size={16} className={ikonWarna} />
      {teks}
    </h3>
  );
}

function TabelData({ kolom, border, headerBg, emptyColor }) {
  return (
    <div className={`overflow-x-auto rounded-xl border ${border} bg-white`}>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className={`bg-gradient-to-b ${headerBg}`}>
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
              <div className={`flex flex-col items-center gap-1 ${emptyColor} italic`}>
                <Inbox size={22} />
                Belum ada data
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function KotakWarna({ grad, border, label }) {
  const { handlers, style, glare } = useTilt(6, 8);
  return (
    <div style={{ perspective: 900 }}>
      <div
        {...handlers}
        style={{
          ...style,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.8), 0 4px 0 -1px rgba(148,163,184,.4)',
        }}
        className={`tilt-3d relative overflow-hidden rounded-xl bg-gradient-to-br ${grad} ${border} border h-14 flex items-center px-4 text-xs font-semibold text-slate-700`}
      >
        {label}
        <div className="pointer-events-none absolute inset-0" style={glare} />
      </div>
    </div>
  );
}