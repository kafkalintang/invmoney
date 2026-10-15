'use client';

import { useState } from 'react';
import {
  StickyNote,
  ArrowLeft,
  Edit,
  Trash2,
  FileText,
  Coins,
  TrendingUp,
  Landmark,
  CircleDollarSign,
  Inbox,
  Clock,
  CalendarDays,
  Filter,
  TrendingDown,
  BarChart3,
  Sparkles,
  ChevronRight,
  Wallet,
  BookOpen,
  PlusCircle,
  Activity,
  Award,
} from 'lucide-react';

/* ============================================================ */
/* Hook: efek miring 3D halus                                    */
/* ============================================================ */
function useTilt(max = 6, lift = 8) {
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
export default function HalamanCatatan() {
  const [kategori, setKategori] = useState(null);
  const [filter, setFilter] = useState('hari-ini');

  return (
    <div className="rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <style>{`
        .btn-3d { transition: transform 120ms ease, box-shadow 120ms ease; }
        .btn-3d:hover { transform: translateY(-1px); }
        .btn-3d:active { transform: translateY(4px); }
        @media (prefers-reduced-motion: reduce) {
          .tilt-3d, .btn-3d { transform: none !important; transition: none !important; }
        }
      `}</style>

      {/* Judul */}
      <div className="flex items-center gap-3 mb-7">
        <div
          className="grid place-items-center w-12 h-12 rounded-xl text-white bg-gradient-to-br from-rose-400 to-pink-500"
          style={{
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,.6), 0 5px 0 #be185d, 0 12px 20px -6px rgba(236,72,153,.45)',
            transform: 'translateY(-3px)',
          }}
        >
          <StickyNote size={24} />
        </div>
        <h2 className="text-2xl font-extrabold text-rose-900 tracking-tight">
          Halaman Catatan
        </h2>
      </div>

      {/* =================================================== */}
      {/* TAMPILAN UTAMA                                       */}
      {/* =================================================== */}
      {kategori === null && (
        <>
          {/* 4 kartu kategori */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {[
              { key: 'emas',      label: 'CATATAN EMAS',       icon: Coins,             grad: 'from-amber-100 to-yellow-200',   border: 'border-amber-200',   teks: 'text-amber-800',   ikon: 'text-amber-600'   },
              { key: 'saham',     label: 'CATATAN SAHAM',      icon: TrendingUp,        grad: 'from-sky-100 to-blue-200',      border: 'border-sky-200',     teks: 'text-sky-800',     ikon: 'text-sky-600'     },
              { key: 'reksadana', label: 'CATATAN REKSA DANA', icon: Landmark,          grad: 'from-purple-100 to-fuchsia-200', border: 'border-purple-200', teks: 'text-purple-800',  ikon: 'text-purple-600'  },
              { key: 'tabungan',  label: 'CATATAN TABUNGAN',   icon: CircleDollarSign,  grad: 'from-emerald-100 to-teal-200',  border: 'border-emerald-200', teks: 'text-emerald-800', ikon: 'text-emerald-600' },
            ].map(({ key, label, icon: Icon, grad, border, teks, ikon }) => (
              <KartuKategori
                key={key}
                label={label}
                Ikon={Icon}
                grad={grad}
                border={border}
                teks={teks}
                ikon={ikon}
                onClick={() => setKategori(key)}
              />
            ))}
          </div>

          {/* ====== SECTION TAMBAHAN (biar gak kosong) ====== */}

          {/* 4 kartu statistik */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KartuStat
              ikon={BookOpen}
              label="Total Catatan"
              nilai="0"
              grad="from-rose-100 to-pink-200"
              teks="text-rose-800"
              ikonWarna="text-rose-500"
            />
            <KartuStat
              ikon={TrendingUp}
              label="Pemasukan"
              nilai="Rp -"
              grad="from-emerald-100 to-teal-200"
              teks="text-emerald-800"
              ikonWarna="text-emerald-500"
            />
            <KartuStat
              ikon={TrendingDown}
              label="Pengeluaran"
              nilai="Rp -"
              grad="from-orange-100 to-red-200"
              teks="text-orange-800"
              ikonWarna="text-orange-500"
            />
            <KartuStat
              ikon={Award}
              label="Keuntungan"
              nilai="Rp -"
              grad="from-amber-100 to-yellow-200"
              teks="text-amber-800"
              ikonWarna="text-amber-600"
            />
          </div>

          {/* 2 panel: Aktivitas Terbaru + Ringkasan Bulan */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Aktivitas terbaru (2 kolom) */}
            <Panel className="lg:col-span-2">
              <JudulPanel ikon={Activity} teks="Aktivitas Terbaru" warna="text-rose-800" ikonWarna="text-rose-500" />

              <div className="space-y-3">
                {[
                  { ikon: Coins,            warna: 'text-amber-500',   bg: 'bg-amber-50',   judul: 'Catatan Emas',        sub: 'Belum ada aktivitas' },
                  { ikon: TrendingUp,       warna: 'text-sky-500',     bg: 'bg-sky-50',     judul: 'Catatan Saham',       sub: 'Belum ada aktivitas' },
                  { ikon: Landmark,         warna: 'text-purple-500',  bg: 'bg-purple-50',  judul: 'Catatan Reksa Dana',  sub: 'Belum ada aktivitas' },
                  { ikon: CircleDollarSign, warna: 'text-emerald-500', bg: 'bg-emerald-50', judul: 'Catatan Tabungan',    sub: 'Belum ada aktivitas' },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
                    <div className={`grid place-items-center w-10 h-10 rounded-xl ${a.bg}`}>
                      <a.ikon size={18} className={a.warna} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">{a.judul}</p>
                      <p className="text-xs text-slate-500">{a.sub}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                ))}
              </div>
            </Panel>

            {/* Ringkasan bulan */}
            <Panel>
              <JudulPanel ikon={BarChart3} teks="Ringkasan Bulan Ini" warna="text-purple-800" ikonWarna="text-purple-500" />

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-4 border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-purple-500" />
                  <span className="text-xs font-semibold text-purple-700">Total Aktivitas</span>
                </div>
                <p className="text-3xl font-extrabold text-purple-900">0</p>
                <p className="text-xs text-purple-600 mt-1">catatan bulan ini</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="flex items-center gap-2 text-slate-600">
                    <CalendarDays size={14} className="text-rose-400" />
                    Hari ini
                  </span>
                  <span className="font-semibold text-slate-700">0</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Clock size={14} className="text-sky-400" />
                    Minggu ini
                  </span>
                  <span className="font-semibold text-slate-700">0</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Wallet size={14} className="text-emerald-400" />
                    Bulan ini
                  </span>
                  <span className="font-semibold text-slate-700">0</span>
                </div>
              </div>

              <button
                className="btn-3d mt-4 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xs font-semibold py-2 rounded-full"
                style={{
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,.5), 0 4px 0 #be185d, 0 10px 16px -6px rgba(236,72,153,.45)',
                }}
              >
                <PlusCircle size={14} />
                Buat Catatan Baru
              </button>
            </Panel>
          </div>
        </>
      )}

      {/* =================================================== */}
      {/* TAMPILAN DETAIL — kartu catatan                       */}
      {/* =================================================== */}
      {kategori !== null && (
        <div>
          {/* Baris atas: kembali + judul + filter */}
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <button
              onClick={() => setKategori(null)}
              className="grid place-items-center w-10 h-10 rounded-xl bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 transition"
            >
              <ArrowLeft size={18} />
            </button>

            <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-bold text-rose-900 border border-rose-200 shadow-sm">
              <StickyNote size={16} className="text-rose-500" />
              CATATAN {labelKategori(kategori).toUpperCase()}
            </span>

            <div className="flex items-center gap-1 text-xs flex-wrap">
              <Filter size={14} className="text-slate-500" />
              {['hari-ini', 'minggu-ini', 'bulan-ini', 'kustom'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full transition ${
                    filter === f
                      ? 'bg-rose-500 text-white shadow'
                      : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  {labelFilter(f)}
                </button>
              ))}
            </div>
          </div>

          {/* Bagian Pemasukan */}
          <div className="mb-6">
            <JudulPanel ikon={TrendingUp} teks={`PEMASUKAN (Beli ${labelKategori(kategori)})`} warna="text-emerald-800" ikonWarna="text-emerald-500" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <KartuCatatan tanggal="--" detail="-" harga="-" total="-" catatan="-" />
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 italic mt-3">
              <Inbox size={16} />
              Belum ada catatan pemasukan.
            </div>
          </div>

          {/* Bagian Pengeluaran */}
          <div>
            <JudulPanel ikon={TrendingDown} teks={`PENGELUARAN (Jual ${labelKategori(kategori)})`} warna="text-rose-800" ikonWarna="text-rose-500" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <KartuCatatan tanggal="--" detail="-" harga="-" total="-" catatan="-" />
            </div>

            <div className="flex items-center gap-2 text-xs text-rose-400 italic mt-3">
              <Inbox size={16} />
              Belum ada catatan pengeluaran.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================ */
/* Komponen                                                     */
/* ============================================================ */
function Panel({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl bg-white/90 p-5 border border-white ${className}`}
      style={{
        boxShadow:
          'inset 0 1px 0 #fff, 0 6px 0 -2px rgba(251,207,232,.5), 0 22px 36px -16px rgba(236,72,153,.3)',
      }}
    >
      {children}
    </div>
  );
}

function JudulPanel({ ikon: Ikon, teks, warna = 'text-rose-800', ikonWarna = 'text-rose-500' }) {
  return (
    <h3 className={`flex items-center gap-2 font-bold ${warna} mb-3 text-sm`}>
      <Ikon size={16} className={ikonWarna} />
      {teks}
    </h3>
  );
}

function KartuKategori({ label, Ikon, grad, border, teks, ikon, onClick }) {
  const { handlers, style, glare } = useTilt(6, 8);
  return (
    <div style={{ perspective: 900 }}>
      <div
        {...handlers}
        style={{
          ...style,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9), 0 5px 0 -2px rgba(148,163,184,.3), 0 18px 26px -14px rgba(148,163,184,.45)',
        }}
        className={`tilt-3d relative overflow-hidden rounded-full py-4 px-6 flex items-center justify-between bg-gradient-to-br ${grad} ${border} border`}
      >
        <div className="flex items-center gap-3 relative" style={{ transform: 'translateZ(20px)' }}>
          <div className="grid place-items-center w-9 h-9 rounded-full bg-white/70">
            <Ikon size={18} className={ikon} />
          </div>
          <span className={`font-bold ${teks} text-sm`}>{label}</span>
        </div>

        <button
          onClick={onClick}
          className={`relative inline-flex items-center gap-1 ${teks} font-semibold text-xs hover:underline`}
          style={{ transform: 'translateZ(30px)' }}
        >
          Lihat Semua <ChevronRight size={14} />
        </button>

        <div className="pointer-events-none absolute inset-0" style={glare} />
      </div>
    </div>
  );
}

function KartuStat({ ikon: Ikon, label, nilai, grad, teks, ikonWarna }) {
  const { handlers, style, glare } = useTilt(6, 10);
  return (
    <div style={{ perspective: 900 }}>
      <div
        {...handlers}
        style={{
          ...style,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9), 0 5px 0 -2px rgba(148,163,184,.3), 0 18px 26px -14px rgba(148,163,184,.4)',
        }}
        className={`tilt-3d relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${grad} ${teks}`}
      >
        <span className="absolute -right-4 -top-6 w-20 h-20 rounded-full bg-white/40" />

        <div className="relative flex items-center gap-2 mb-2">
          <div className="grid place-items-center w-8 h-8 rounded-lg bg-white/70">
            <Ikon size={16} className={ikonWarna} />
          </div>
        </div>

        <p className="relative font-extrabold text-lg" style={{ transform: 'translateZ(20px)' }}>
          {nilai}
        </p>
        <p className="relative text-xs opacity-80 mt-0.5">{label}</p>

        <div className="pointer-events-none absolute inset-0" style={glare} />
      </div>
    </div>
  );
}

function KartuCatatan({ tanggal, detail, harga, total, catatan }) {
  return (
    <div
      className="rounded-2xl bg-white overflow-hidden border border-rose-100"
      style={{
        boxShadow:
          'inset 0 1px 0 #fff, 0 4px 0 -1px rgba(251,113,133,.3), 0 14px 22px -12px rgba(236,72,153,.3)',
      }}
    >
      {/* Header tanggal */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 px-4 py-2 text-xs font-semibold text-rose-800 flex items-center gap-2">
        <CalendarDays size={14} className="text-rose-500" />
        {tanggal}
      </div>

      {/* Isi */}
      <div className="px-4 py-3 text-xs space-y-2 text-slate-700">
        <p className="flex items-center gap-2">
          <Coins size={14} className="text-amber-500" /> {detail}
        </p>
        <p className="flex items-center gap-2">
          <Wallet size={14} className="text-emerald-500" /> {harga}
        </p>
        <p className="flex items-center gap-2">
          <BarChart3 size={14} className="text-sky-500" /> Total: {total}
        </p>
        <p className="italic text-slate-500 flex items-start gap-2">
          <FileText size={14} className="text-slate-400 mt-0.5" />
          "{catatan}"
        </p>
      </div>

      {/* Tombol aksi */}
      <div className="flex gap-2 px-4 pb-3">
        <button className="btn-3d inline-flex items-center gap-1 bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 3px 0 #0d9488' }}
        >
          <Edit size={12} /> Edit
        </button>
        <button className="btn-3d inline-flex items-center gap-1 bg-gradient-to-br from-rose-400 to-red-500 hover:from-rose-500 hover:to-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 3px 0 #be123c' }}
        >
          <Trash2 size={12} /> Hapus
        </button>
        <button className="btn-3d inline-flex items-center gap-1 bg-gradient-to-br from-indigo-400 to-blue-500 hover:from-indigo-500 hover:to-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 3px 0 #1d4ed8' }}
        >
          <FileText size={12} /> Detail
        </button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Helper                                                        */
/* ============================================================ */
function labelKategori(key) {
  return { emas: 'Emas', saham: 'Saham', reksadana: 'Reksa Dana', tabungan: 'Tabungan' }[key] || key;
}

function labelFilter(key) {
  return { 'hari-ini': 'Hari Ini', 'minggu-ini': 'Minggu Ini', 'bulan-ini': 'Bulan Ini', 'kustom': 'Kustom' }[key] || key;
}