'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

/* ============================================================ */
/* Hook: efek miring 3D mengikuti kursor                         */
/* ============================================================ */
function useTilt(max = 10, lift = 12) {
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
export default function Dashboard() {
  return (
    <div className="rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .tilt-3d { transform: none !important; transition: none !important; }
        }
      `}</style>

      {/* ===== Header: judul + jam real-time ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
        {/* Kiri: ikon + judul */}
        <div className="flex items-center gap-3">
          <div
            className="grid place-items-center w-12 h-12 rounded-xl text-white bg-gradient-to-br from-blue-400 to-blue-700"
            style={{
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,.45), 0 6px 0 #1e3a8a, 0 14px 22px -4px rgba(30,58,138,.45)',
              transform: 'translateY(-3px)',
            }}
          >
            <LayoutDashboard size={24} />
          </div>
          <h2 className="text-2xl font-extrabold text-blue-950 tracking-tight">
            Dashboard Ringkasan Keuangan Terkini
          </h2>
        </div>

        {/* Kanan: jam real-time */}
        <JamRealtime />
      </div>

      {/* ====== 8 Kartu Ringkasan ====== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <KartuRingkas label="Pemasukan Hari Ini"  warna="from-emerald-100 to-emerald-300" glow="16,185,129" />
        <KartuRingkas label="Pemasukan Bulan Ini" warna="from-sky-100 to-sky-300"         glow="14,165,233" />
        <KartuRingkas label="Pemasukan Tahun Ini" warna="from-amber-100 to-amber-300"     glow="245,158,11" />
        <KartuRingkas label="Seluruh Pemasukan"   warna="from-slate-100 to-slate-300"    glow="100,116,139" ikon="dompet" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KartuRingkas label="Pengeluaran Hari Ini"  warna="from-rose-100 to-rose-300"    glow="225,29,72" turun />
        <KartuRingkas label="Pengeluaran Bulan Ini" warna="from-rose-100 to-rose-300"    glow="225,29,72" turun />
        <KartuRingkas label="Pengeluaran Tahun Ini" warna="from-rose-100 to-rose-300"    glow="225,29,72" turun />
        <KartuRingkas label="Seluruh Pengeluaran"   warna="from-slate-100 to-slate-300"  glow="100,116,139" ikon="dompet" />
      </div>

      {/* ====== Grafik + Kalender ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PanelTilt className="lg:col-span-2" tepi="from-blue-400 to-indigo-600">
          <div className="p-5">
            <h3 className="font-bold text-blue-950 mb-3">Arus kas 7 hari terakhir</h3>
            <GrafikBatang />
          </div>
        </PanelTilt>

        <PanelTilt tepi="from-blue-800 to-blue-950">
          <div className="p-5">
            <Kalender />
          </div>
        </PanelTilt>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Komponen: Jam Real-time                                       */
/* ============================================================ */
function JamRealtime() {
  const [waktu, setWaktu] = useState(null);

  useEffect(() => {
    const tick = () => setWaktu(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!waktu) return <div className="text-sm text-slate-400">--:--:--</div>;

  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulan = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
  ];

  const jam = String(waktu.getHours()).padStart(2, '0');
  const menit = String(waktu.getMinutes()).padStart(2, '0');
  const detik = String(waktu.getSeconds()).padStart(2, '0');
  const tanggal = `${hari[waktu.getDay()]}, ${waktu.getDate()} ${bulan[waktu.getMonth()]} ${waktu.getFullYear()}`;

  return (
    <div
      className="px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80"
      style={{
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,.9), 0 6px 0 -2px rgba(30,58,138,.15), 0 14px 22px -10px rgba(30,58,138,.35)',
      }}
    >
      <p className="text-xs text-slate-500 font-medium">{tanggal}</p>
      <p className="text-2xl font-black text-blue-900 tabular-nums tracking-tight">
        {jam}
        <span className="text-blue-400 animate-pulse">:</span>
        {menit}
        <span className="text-blue-400 text-lg">:{detik}</span>
      </p>
    </div>
  );
}

/* ============================================================ */
/* Komponen: Panel 3D (pembungkus grafik & kalender)             */
/* ============================================================ */
function PanelTilt({ children, className = '', tepi }) {
  const { handlers, style, glare } = useTilt(3, 6);
  return (
    <div className={`${className}`} style={{ perspective: 1200 }}>
      <div
        {...handlers}
        style={{
          ...style,
          boxShadow:
            '0 2px 0 rgba(255,255,255,.9) inset, 0 10px 0 -2px rgba(30,58,138,.18), 0 28px 50px -18px rgba(30,58,138,.45)',
        }}
        className={`tilt-3d relative rounded-2xl p-[3px] bg-gradient-to-br ${tepi}`}
      >
        <div className="relative rounded-[13px] bg-white overflow-hidden">
          {children}
          <div className="pointer-events-none absolute inset-0" style={glare} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Komponen: Kartu Ringkasan 3D (versi SOFT)                     */
/* ============================================================ */
function KartuRingkas({ label, warna, glow, turun = false, ikon }) {
  const { handlers, style, glare } = useTilt(12, 16);
  const Ikon = ikon === 'dompet' ? Wallet : turun ? TrendingDown : TrendingUp;

  return (
    <div style={{ perspective: 900 }}>
      <div
        {...handlers}
        style={{
          ...style,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,.9), inset 0 -3px 6px rgba(0,0,0,.06), 0 8px 0 -2px rgba(${glow},.35), 0 24px 30px -12px rgba(${glow},.35)`,
        }}
        className={`tilt-3d relative overflow-hidden rounded-xl p-4 bg-gradient-to-br ${warna} text-slate-800 flex justify-between items-center`}
      >
        {/* lingkaran dekoratif (lebih lembut) */}
        <span className="absolute -right-6 -top-8 w-28 h-28 rounded-full bg-white/50" />
        <span className="absolute -right-2 -bottom-10 w-24 h-24 rounded-full bg-white/30" />

        <div style={{ transform: 'translateZ(28px)' }} className="relative">
          <p className="font-extrabold text-xl text-slate-900 drop-shadow-sm">Rp -</p>
          <p className="text-xs mt-1 text-slate-700">{label}</p>
        </div>

        <div
          style={{ transform: 'translateZ(46px)' }}
          className="relative grid place-items-center w-12 h-12 rounded-full bg-white/70 text-slate-700 backdrop-blur-sm"
        >
          <Ikon size={26} className="drop-shadow-sm" />
        </div>

        <div className="pointer-events-none absolute inset-0" style={glare} />
      </div>
    </div>
  );
}

/* ============================================================ */
/* Batang 3D (isometrik)                                         */
/* ============================================================ */
function Batang3D({ x, y, width, height, fill }) {
  const d = Math.min(10, width * 0.35);

  if (!height || height <= d) {
    const t = 6;
    const base = y - t;
    return (
      <g opacity={0.45}>
        <rect x={x} y={base + d / 2} width={width - d} height={t} fill={fill} />
        <polygon
          points={`${x},${base + d / 2} ${x + d},${base - d / 2} ${x + width},${base - d / 2} ${x + width - d},${base + d / 2}`}
          fill={fill}
        />
        <polygon
          points={`${x + width - d},${base + d / 2} ${x + width},${base - d / 2} ${x + width},${base + t - d / 2} ${x + width - d},${base + t + d / 2}`}
          fill="#000"
          fillOpacity={0.25}
        />
        <polygon
          points={`${x},${base + d / 2} ${x + d},${base - d / 2} ${x + width},${base - d / 2} ${x + width - d},${base + d / 2}`}
          fill="#fff"
          fillOpacity={0.4}
        />
      </g>
    );
  }

  return (
    <g>
      <rect x={x} y={y + d} width={width - d} height={height - d} fill={fill} />
      <polygon
        points={`${x},${y + d} ${x + d},${y} ${x + width},${y} ${x + width - d},${y + d}`}
        fill={fill}
      />
      <polygon
        points={`${x},${y + d} ${x + d},${y} ${x + width},${y} ${x + width - d},${y + d}`}
        fill="#fff"
        fillOpacity={0.4}
      />
      <polygon
        points={`${x + width - d},${y + d} ${x + width},${y} ${x + width},${y + height - d} ${x + width - d},${y + height}`}
        fill={fill}
      />
      <polygon
        points={`${x + width - d},${y + d} ${x + width},${y} ${x + width},${y + height - d} ${x + width - d},${y + height}`}
        fill="#000"
        fillOpacity={0.28}
      />
    </g>
  );
}

/* ============================================================ */
/* Komponen: Grafik Batang                                       */
/* ============================================================ */
function GrafikBatang() {
  const [siap, setSiap] = useState(false);
  useEffect(() => setSiap(true), []);

  const data = ['1/16', '2/16', '3/16', '4/16', '5/16', '6/16', '7/16'].map((tanggal) => ({
    tanggal,
    nilai: 0,
  }));

  const warnaBar = ['#93c5fd', '#a5b4fc', '#bfdbfe', '#c7d2fe', '#a5f3fc', '#ddd6fe', '#bae6fd'];

  if (!siap) return <div style={{ height: 300 }} />;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="tanggal" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis
          fontSize={11}
          tickLine={false}
          axisLine={false}
          domain={[0, 20]}
          ticks={[0, 4, 8, 12, 16, 20]}
        />
        <Tooltip cursor={{ fill: 'rgba(147,197,253,.15)' }} />
        <Bar
          dataKey="nilai"
          shape={(p) => <Batang3D {...p} fill={warnaBar[p.index % warnaBar.length]} />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ============================================================ */
/* Komponen: Kalender                                            */
/* ============================================================ */
function Kalender() {
  const [now, setNow] = useState(null);
  useEffect(() => setNow(new Date()), []);

  const hari = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  if (!now) return <div style={{ height: 260 }} />;

  const tahun = now.getFullYear();
  const bln = now.getMonth();
  const aktif = now.getDate();
  const offset = new Date(tahun, bln, 1).getDay();
  const totalHari = new Date(tahun, bln + 1, 0).getDate();

  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: totalHari }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <span
          className="text-5xl font-black text-blue-900 leading-none"
          style={{ textShadow: '0 2px 0 #dbeafe, 0 5px 0 #bfdbfe, 0 9px 12px rgba(30,58,138,.25)' }}
        >
          {aktif}
        </span>
        <span className="text-sm font-semibold text-slate-500">
          {bulan[bln]} {tahun}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 mb-2">
        {hari.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
        {cells.map((t, i) => (
          <div
            key={i}
            className={`py-1.5 rounded-lg transition-colors ${
              t === aktif
                ? 'text-white font-bold bg-gradient-to-br from-pink-300 to-pink-500'
                : t
                ? 'text-slate-700 hover:bg-blue-50'
                : ''
            }`}
            style={
              t === aktif
                ? {
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,.6), 0 4px 0 #be185d, 0 8px 12px rgba(219,39,119,.35)',
                    transform: 'translateY(-3px)',
                  }
                : undefined
            }
          >
            {t || ''}
          </div>
        ))}
      </div>
    </div>
  );
}