'use client';

import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Coins,
  Landmark,
  PiggyBank,
  Wallet,
  FileText,
  FileSpreadsheet,
  Image,
  ArrowLeft,
  ArrowRight,
  Download,
  Receipt,
  ClipboardList,
  Gem,
  CircleDollarSign,
  ScrollText,
} from 'lucide-react';

export default function HalamanLaporan() {
  const [tampilan, setTampilan] = useState('utama');

  return (
    <div className="rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50">
      <style>{`
        .btn-3d { transition: transform 120ms ease, box-shadow 120ms ease; }
        .btn-3d:hover { transform: translateY(-1px); }
        .btn-3d:active { transform: translateY(3px); }
        @media (prefers-reduced-motion: reduce) { .btn-3d { transform: none !important; } }
      `}</style>

      {/* Judul */}
      <div className="flex items-center gap-3 mb-7">
        <div
          className="grid place-items-center w-12 h-12 rounded-xl text-white bg-gradient-to-br from-indigo-400 to-sky-500"
          style={{
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,.6), 0 5px 0 #4338ca, 0 12px 20px -6px rgba(99,102,241,.45)',
            transform: 'translateY(-3px)',
          }}
        >
          <BarChart3 size={24} />
        </div>
        <h2 className="text-2xl font-extrabold text-indigo-900 tracking-tight">
          Halaman Laporan & Analisis Keuangan
        </h2>
      </div>

      {/* ====== Tombol navigasi (testing) ====== */}
      <div className="bg-white/70 backdrop-blur rounded-xl p-3 mb-5 flex flex-wrap gap-2 text-xs border border-indigo-100">
        <span className="font-bold mr-2 text-indigo-800">Coba klik:</span>
        {[
          { key: 'utama',     label: 'Utama' },
          { key: 'emas',      label: 'Emas' },
          { key: 'saham',     label: 'Saham' },
          { key: 'reksadana', label: 'Reksa Dana' },
          { key: 'tabungan',  label: 'Tabungan' },
          { key: 'semua',     label: 'Total Aset' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTampilan(t.key)}
            className={`px-3 py-1 rounded-full border transition ${
              tampilan === t.key
                ? 'bg-indigo-500 border-indigo-500 text-white shadow'
                : 'bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* =================================================== */}
      {/* TAMPILAN UTAMA                                       */}
      {/* =================================================== */}
      {tampilan === 'utama' && (
        <div className="flex flex-col gap-5">

          {/* ===== 4 Kartu Aset ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KartuAset
              judul="Emas"
              ikon={Coins}
              bg="from-amber-100 via-yellow-100 to-orange-200"
              teks="text-amber-900"
              glow="251,191,36"
              isi={['Total Gram : -', 'Investasi: -', 'Nilai: -']}
              onClick={() => setTampilan('emas')}
            />
            <KartuAset
              judul="Saham"
              ikon={TrendingUp}
              bg="from-sky-100 via-cyan-100 to-blue-200"
              teks="text-blue-900"
              glow="56,189,248"
              isi={['Total Lot : -', 'Investasi : -', 'Nilai: -']}
              onClick={() => setTampilan('saham')}
            />
            <KartuAset
              judul="Reksa Dana"
              ikon={Landmark}
              bg="from-purple-100 via-fuchsia-100 to-pink-200"
              teks="text-purple-900"
              glow="168,85,247"
              isi={['Total Unit : -', 'Investasi : -', 'Nilai: -']}
              onClick={() => setTampilan('reksadana')}
            />
            <KartuAset
              judul="Tabungan"
              ikon={PiggyBank}
              bg="from-emerald-100 via-teal-100 to-cyan-200"
              teks="text-emerald-900"
              glow="52,211,153"
              isi={['Total Saldo : -', 'Bank : -', 'E-wallet : -']}
              onClick={() => setTampilan('tabungan')}
            />
          </div>

          {/* ===== Total Aset + 2 Tabel ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Total Aset */}
            <div className="bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 rounded-2xl p-4 border border-white shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <Gem size={22} className="text-emerald-600" />
                <h3 className="text-2xl font-bold text-emerald-800">Total Aset</h3>
              </div>
              <p className="text-sm text-emerald-700 mb-4">Total Kekayaan: -</p>

              <div className="bg-white/70 backdrop-blur rounded-xl p-3 text-xs space-y-1.5 text-slate-700">
                <p className="flex items-center gap-2"><Coins size={14} className="text-amber-500" /> Emas &nbsp;&nbsp;&nbsp;&nbsp;: -</p>
                <p className="flex items-center gap-2"><TrendingUp size={14} className="text-sky-500" /> Saham &nbsp;&nbsp;&nbsp;: -</p>
                <p className="flex items-center gap-2"><Landmark size={14} className="text-purple-500" /> Reksa &nbsp;&nbsp;&nbsp;: -</p>
                <p className="flex items-center gap-2"><PiggyBank size={14} className="text-emerald-500" /> Tabungan : -</p>
              </div>

              <button
                onClick={() => setTampilan('semua')}
                className="btn-3d mt-4 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-sm font-semibold py-2 rounded-full"
                style={{
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,.5), 0 5px 0 #0d9488, 0 12px 18px -6px rgba(13,148,136,.45)',
                }}
              >
                Lihat Laporan <ArrowRight size={16} />
              </button>
            </div>

            {/* Tabel Pemasukan */}
            <Panel>
              <JudulPanel ikon={TrendingUp} teks="TOTAL PEMASUKAN (Semua Aset)" warna="text-emerald-700" ikonWarna="text-emerald-500" />
              <TabelMini
                kolom={['Aset', 'Total Investasi', 'Nilai Saat Ini', 'Untung']}
                baris={['Emas', 'Saham', 'Reksa', 'Tabungan']}
                headerBg="from-emerald-50 to-teal-100 text-emerald-800"
                border="border-emerald-100"
              />
            </Panel>

            {/* Tabel Pengeluaran */}
            <Panel>
              <JudulPanel ikon={TrendingDown} teks="TOTAL PENGELUARAN (Penjualan Aset)" warna="text-rose-700" ikonWarna="text-rose-500" />
              <TabelMini
                kolom={['Aset', 'Total Jual', 'Total Keuntungan', '% Return']}
                baris={['Emas', 'Saham', 'Reksa', 'Tabungan']}
                headerBg="from-rose-50 to-pink-100 text-rose-800"
                border="border-rose-100"
              />
            </Panel>
          </div>

          {/* ===== Rekap Bulanan + Grafik ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Rekap Bulanan */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-white shadow-lg">
              <JudulPanel ikon={ClipboardList} teks="REKAP BULANAN SELURUH ASET" warna="text-slate-700" ikonWarna="text-slate-500" />

              <label className="block text-xs font-semibold mb-1 mt-2 text-slate-600">Pilih tahun</label>
              <select className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs mb-3 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300">
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
              </select>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-b from-slate-100 to-slate-200 text-slate-700">
                      <th className="p-1.5 font-semibold text-left">Waktu</th>
                      <th className="p-1.5 font-semibold">Pemasukan</th>
                      <th className="p-1.5 font-semibold">Pengeluaran</th>
                      <th className="p-1.5 font-semibold">Net</th>
                      <th className="p-1.5 font-semibold">Total Aset</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="py-6">
                        <div className="flex flex-col items-center gap-1 text-slate-300 italic">
                          <ClipboardList size={22} />
                          Belum ada data
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grafik */}
            <Panel>
              <div className="flex items-center justify-between mb-2">
                <JudulPanel ikon={BarChart3} teks="Grafik Laporan" warna="text-indigo-700" ikonWarna="text-indigo-500" tanpaMargin />
                <span className="text-xs text-slate-500">Periode: -</span>
              </div>
              <div className="h-48 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/60 flex flex-col items-center justify-center gap-2 text-indigo-400 text-sm">
                <BarChart3 size={32} />
                Grafik akan tampil di sini
              </div>
            </Panel>
          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* TAMPILAN LAPORAN PER ASET                             */}
      {/* =================================================== */}
      {['emas', 'saham', 'reksadana', 'tabungan'].includes(tampilan) && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => setTampilan('utama')}
              className="grid place-items-center w-10 h-10 rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition"
            >
              <ArrowLeft size={18} />
            </button>
            <h3 className="text-lg font-bold text-indigo-900">
              Laporan {labelAset(tampilan)}
            </h3>
          </div>

          {/* Tombol Export */}
          <div className="flex items-center gap-2 mb-5 text-xs flex-wrap">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Download size={14} /> EXPORT:
            </span>
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition">
              <FileText size={12} /> PDF
            </button>
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition">
              <FileSpreadsheet size={12} /> Excel
            </button>
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition">
              <Image size={12} /> Jpg
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Riwayat Pembelian */}
            <Panel>
              <JudulPanel
                ikon={Receipt}
                teks={`RIWAYAT PEMBELIAN ${labelAset(tampilan).toUpperCase()}`}
                warna="text-emerald-800"
                ikonWarna="text-emerald-500"
              />
              <p className="text-xs text-slate-500 mb-3">Export Laporan</p>
              <TabelData
                kolom={['Tanggal & Waktu', 'Aplikasi', satuanAset(tampilan), `Harga/${satuanHarga(tampilan)}`]}
                border="border-emerald-100"
                headerBg="from-emerald-50 to-teal-100 text-emerald-800"
                emptyColor="text-emerald-300"
              />
            </Panel>

            {/* Riwayat Penjualan */}
            <Panel>
              <JudulPanel
                ikon={Receipt}
                teks={`RIWAYAT PENJUALAN ${labelAset(tampilan).toUpperCase()}`}
                warna="text-rose-800"
                ikonWarna="text-rose-500"
              />
              <p className="text-xs text-slate-500 mb-3">Export Laporan</p>
              <TabelData
                kolom={['Tanggal & Waktu', 'Aplikasi', satuanAset(tampilan), `Harga/${satuanHarga(tampilan)}`]}
                border="border-rose-100"
                headerBg="from-rose-50 to-pink-100 text-rose-800"
                emptyColor="text-rose-300"
              />
            </Panel>
          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* TAMPILAN SEMUA ASET                                   */}
      {/* =================================================== */}
      {tampilan === 'semua' && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => setTampilan('utama')}
              className="grid place-items-center w-10 h-10 rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition"
            >
              <ArrowLeft size={18} />
            </button>
            <h3 className="text-lg font-bold text-indigo-900">Laporan Seluruh Aset</h3>
          </div>

          {/* Tombol Export */}
          <div className="flex items-center gap-2 mb-5 text-xs flex-wrap">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Download size={14} /> EXPORT:
            </span>
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition">
              <FileText size={12} /> PDF
            </button>
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition">
              <FileSpreadsheet size={12} /> Excel
            </button>
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition">
              <Image size={12} /> Jpg
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Laporan Transaksi */}
            <div className="lg:col-span-2">
              <Panel>
                <JudulPanel ikon={ScrollText} teks="LAPORAN SELURUH TRANSAKSI" warna="text-indigo-800" ikonWarna="text-indigo-500" />
                <p className="text-xs text-slate-500 mb-3">Export Laporan</p>
                <TabelData
                  kolom={['No', 'Tanggal', 'Waktu', 'Aset', 'Detail', 'Kategori', 'Jumlah']}
                  border="border-indigo-100"
                  headerBg="from-indigo-50 to-sky-100 text-indigo-800"
                  emptyColor="text-indigo-300"
                />
              </Panel>
            </div>

            {/* Rekap Per Aset + Ringkasan */}
            <div className="flex flex-col gap-4">

              {/* Rekap Per Aset */}
              <Panel>
                <JudulPanel ikon={ClipboardList} teks="REKAP PER ASET" warna="text-sky-800" ikonWarna="text-sky-500" />
                <p className="text-xs text-slate-500 mb-3">Export Rekap</p>
                <div className="overflow-x-auto rounded-xl border border-sky-100">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-b from-sky-50 to-cyan-100 text-sky-800">
                        <th className="p-1.5 font-semibold">No</th>
                        <th className="p-1.5 font-semibold text-left">Aset</th>
                        <th className="p-1.5 font-semibold">Masuk</th>
                        <th className="p-1.5 font-semibold">Keluar</th>
                        <th className="p-1.5 font-semibold">Net</th>
                        <th className="p-1.5 font-semibold">Nilai</th>
                        <th className="p-1.5 font-semibold">Untung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['Emas', 'Saham', 'Reksa Dana', 'Tabungan'].map((a) => (
                        <tr key={a} className="hover:bg-sky-50/50">
                          <td className="p-1.5 text-center text-slate-500">-</td>
                          <td className="p-1.5 text-slate-700">{a}</td>
                          <td className="p-1.5 text-center text-slate-400">-</td>
                          <td className="p-1.5 text-center text-slate-400">-</td>
                          <td className="p-1.5 text-center text-slate-400">-</td>
                          <td className="p-1.5 text-center text-slate-400">-</td>
                          <td className="p-1.5 text-center text-slate-400">-</td>
                        </tr>
                      ))}
                      <tr className="bg-sky-50 font-semibold">
                        <td className="p-1.5"></td>
                        <td className="p-1.5 text-sky-900">TOTAL</td>
                        <td className="p-1.5 text-center text-slate-400">-</td>
                        <td className="p-1.5 text-center text-slate-400">-</td>
                        <td className="p-1.5 text-center text-slate-400">-</td>
                        <td className="p-1.5 text-center text-slate-400">-</td>
                        <td className="p-1.5 text-center text-slate-400">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Panel>

              {/* Ringkasan Transaksi */}
              <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 p-4 border border-white shadow-lg text-xs">
                <JudulPanel ikon={BarChart3} teks="RINGKASAN TRANSAKSI" warna="text-indigo-800" ikonWarna="text-indigo-500" />

                <div className="space-y-2 mt-3">
                  <BarisRingkas ikon={TrendingUp} label="TOTAL PEMASUKAN" sub="(Pembelian + Tambah Saldo)" warna="text-emerald-600" />
                  <BarisRingkas ikon={TrendingDown} label="TOTAL PENGELUARAN" sub="(Penjualan + Kurang Saldo)" warna="text-rose-600" />
                  <BarisRingkas ikon={BarChart3} label="NET FLOW" warna="text-sky-600" />
                  <BarisRingkas ikon={Gem} label="TOTAL NILAI ASET SAAT INI" warna="text-indigo-600" />
                  <BarisRingkas ikon={Wallet} label="TOTAL INVESTASI" warna="text-purple-600" />
                  <BarisRingkas ikon={CircleDollarSign} label="TOTAL KEUNTUNGAN" warna="text-amber-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================ */
/* Komponen kecil                                                */
/* ============================================================ */
function Panel({ children }) {
  return (
    <div
      className="rounded-2xl bg-white/90 p-4 border border-white"
      style={{
        boxShadow:
          'inset 0 1px 0 #fff, 0 6px 0 -2px rgba(199,210,254,.5), 0 22px 36px -16px rgba(99,102,241,.25)',
      }}
    >
      {children}
    </div>
  );
}

function JudulPanel({ ikon: Ikon, teks, warna = 'text-indigo-800', ikonWarna = 'text-indigo-500', tanpaMargin = false }) {
  return (
    <h3 className={`flex items-center gap-2 font-bold ${warna} ${tanpaMargin ? '' : 'mb-3'} text-sm`}>
      <Ikon size={16} className={ikonWarna} />
      {teks}
    </h3>
  );
}

function KartuAset({ judul, ikon: Ikon, bg, teks, glow, isi, onClick }) {
  return (
    <div
      className={`rounded-2xl p-4 bg-gradient-to-br ${bg} ${teks} border border-white`}
      style={{
        boxShadow: `inset 0 1px 0 rgba(255,255,255,.8), 0 6px 0 -2px rgba(${glow},.5), 0 20px 30px -14px rgba(${glow},.55)`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="grid place-items-center w-9 h-9 rounded-xl bg-white/60">
          <Ikon size={18} />
        </div>
        <h3 className="text-xl font-bold">{judul}</h3>
      </div>

      <div className="text-xs space-y-1 mb-3 opacity-90">
        {isi.map((t, i) => <p key={i}>{t}</p>)}
      </div>

      <button
        onClick={onClick}
        className="btn-3d w-full inline-flex items-center justify-center gap-1 bg-white/70 hover:bg-white backdrop-blur text-xs font-semibold py-1.5 rounded-full transition"
      >
        Lihat Laporan <ArrowRight size={12} />
      </button>
    </div>
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
                <Receipt size={22} />
                Belum ada data
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function TabelMini({ kolom, baris, headerBg, border }) {
  return (
    <div className={`overflow-x-auto rounded-xl border ${border}`}>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className={`bg-gradient-to-b ${headerBg}`}>
            {kolom.map((k, i) => (
              <th key={k} className={`p-1.5 font-semibold ${i === 0 ? 'text-left' : ''}`}>
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((a) => (
            <tr key={a} className="hover:bg-slate-50">
              <td className="p-1.5 text-slate-700">{a}</td>
              <td className="p-1.5 text-center text-slate-400">-</td>
              <td className="p-1.5 text-center text-slate-400">-</td>
              <td className="p-1.5 text-center text-slate-400">-</td>
            </tr>
          ))}
          <tr className="bg-slate-50 font-semibold">
            <td className="p-1.5 text-slate-700">TOTAL</td>
            <td className="p-1.5 text-center text-slate-400">-</td>
            <td className="p-1.5 text-center text-slate-400">-</td>
            <td className="p-1.5 text-center text-slate-400">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function BarisRingkas({ ikon: Ikon, label, sub, warna }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
      <span className={`flex items-center gap-2 ${warna} font-medium`}>
        <Ikon size={14} />
        {label}
        {sub && <span className="text-slate-500 font-normal">{sub}</span>}
      </span>
      <span className="font-semibold text-slate-700">: -</span>
    </div>
  );
}

/* ============================================================ */
/* Helper                                                        */
/* ============================================================ */
function labelAset(key) {
  return {
    emas: 'Emas',
    saham: 'Saham',
    reksadana: 'Reksa Dana',
    tabungan: 'Tabungan',
  }[key] || key;
}

function satuanAset(key) {
  return { emas: 'Gram', saham: 'Lot', reksadana: 'Unit', tabungan: 'Nominal' }[key] || 'Jumlah';
}

function satuanHarga(key) {
  return { emas: 'gr', saham: 'lembar', reksadana: 'unit', tabungan: '-' }[key] || '-';
}