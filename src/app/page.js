'use client';

import { useState } from 'react';
import { LayoutDashboard, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
        <LayoutDashboard size={24} />
        Dashboard Ringkasan keuangan terkini
      </h2>

      {/* ====== 8 Kartu Ringkasan ====== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Baris 1: Pemasukan */}
        <KartuRingkas label="Pemasukan Hari Ini"    warna="bg-emerald-600" />
        <KartuRingkas label="Pemasukan Bulan Ini"   warna="bg-sky-500" />
        <KartuRingkas label="Pemasukan Tahun Ini"   warna="bg-amber-500" />
        <KartuRingkas label="Seluruh Pemasukan"     warna="bg-neutral-800" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Baris 2: Pengeluaran */}
        <KartuRingkas label="Pengeluaran Hari Ini"  warna="bg-red-600" />
        <KartuRingkas label="Pengeluaran Bulan Ini" warna="bg-red-600" />
        <KartuRingkas label="Pengeluaran Tahun Ini" warna="bg-red-600" />
        <KartuRingkas label="Seluruh Pengeluaran"   warna="bg-neutral-800" />
      </div>

      {/* ====== Grafik + Kalender ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Grafik Batang */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-5 border-2 border-blue-400">
          <GrafikBatang />
        </div>

        {/* Kalender */}
        <div className="bg-white rounded-lg shadow p-4 border-2 border-blue-900">
          <Kalender />
        </div>

      </div>
    </div>
  );
}

/* ============================================================ */
/* Komponen: Kartu Ringkasan                                     */
/* ============================================================ */
function KartuRingkas({ label, warna }) {
  return (
    <div className={`${warna} text-white rounded-md p-4 flex justify-between items-center shadow`}>
      <div>
        <p className="font-bold text-base">Rp -</p>
        <p className="text-xs opacity-90 mt-1">{label}</p>
      </div>
      <TrendingUp size={32} className="opacity-40" />
    </div>
  );
}

/* ============================================================ */
/* Komponen: Grafik Batang (pakai recharts)                      */
/* ============================================================ */
function GrafikBatang() {
  // Data kosong (placeholder) — nanti diisi dari backend
  const dataKosong = [
    { tanggal: '1/16', nilai: 0 },
    { tanggal: '2/16', nilai: 0 },
    { tanggal: '3/16', nilai: 0 },
    { tanggal: '4/16', nilai: 0 },
    { tanggal: '5/16', nilai: 0 },
    { tanggal: '6/16', nilai: 0 },
    { tanggal: '7/16', nilai: 0 },
  ];

  // Import dinamis biar gak error SSR
  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } = require('recharts');

  const warnaBar = ['#3b82f6', '#60a5fa', '#1e3a8a', '#bfdbfe', '#1e40af', '#93c5fd', '#7dd3fc'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dataKosong}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="tanggal" fontSize={11} />
        <YAxis fontSize={11} domain={[0, 20]} ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]} />
        <Bar dataKey="nilai" radius={[2, 2, 0, 0]}>
          {dataKosong.map((_, i) => (
            <Cell key={i} fill={warnaBar[i % warnaBar.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ============================================================ */
/* Komponen: Kalender                                            */
/* ============================================================ */
function Kalender() {
  const [aktif] = useState(12);

  const hari = ['MIN', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const offset = 1; // Juli 2019 mulai hari Senin
  const totalHari = 31;
  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: totalHari }, (_, i) => i + 1),
  ];

  return (
    <div>
      {/* Header: tanggal besar + bulan/tahun */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-3xl font-bold text-blue-900">{aktif}</span>
        <span className="text-xs text-gray-500">Jul 2019</span>
      </div>

      {/* Baris nama hari */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-500 mb-1">
        {hari.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>

      {/* Grid tanggal */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {cells.map((t, i) => (
          <div
            key={i}
            className={`py-1 rounded-full ${
              t === aktif ? 'bg-pink-500 text-white font-bold' : 'text-gray-700'
            }`}
          >
            {t || ''}
          </div>
        ))}
      </div>
    </div>
  );
}