'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Coins, Landmark, PiggyBank, Wallet, FileText } from 'lucide-react';

export default function HalamanLaporan() {
  // 'utama' | 'emas' | 'saham' | 'reksadana' | 'tabungan' | 'semua'
  const [tampilan, setTampilan] = useState('utama');

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
        <BarChart3 size={24} />
        Halaman Laporan & Analisis Keuangan
      </h2>

      {/* ====== TOMBOL NAVIGASI (buat testing) ====== */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-5 flex flex-wrap gap-2 text-xs">
        <span className="font-bold mr-2">Coba klik:</span>
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
            className={`px-3 py-1 rounded-full border ${
              tampilan === t.key ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-50'
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
              bg="from-yellow-300 to-orange-400"
              isi={['Total Gram : 10.5 gram', 'Investasi: Rp 10.500.000,-', 'Nilai: Rp 12.600.000,- (+20%)']}
              onClick={() => setTampilan('emas')}
            />
            <KartuAset
              judul="Saham"
              bg="from-sky-300 to-blue-500"
              isi={['Total Lot : 3 Lot ( 300 lembar )', 'Investasi : Rp 2.550.000,-', 'Nilai: Rp 2.700.000,- (+5.88%)']}
              onClick={() => setTampilan('saham')}
            />
            <KartuAset
              judul="Reksa Dana"
              bg="from-purple-300 to-purple-500"
              isi={['Total Unit : 1550 unit', 'Investasi : Rp 15.500.000,-', 'Nilai: Rp 16.275.000,- (+5%)']}
              onClick={() => setTampilan('reksadana')}
            />
            <KartuAset
              judul="Tabungan"
              bg="from-orange-300 to-orange-500"
              isi={['Total Saldo : Rp 12.500.000,-', 'Bank : Rp 15.500.000,-', 'E-wallet : Rp 16.275.000']}
              onClick={() => setTampilan('tabungan')}
            />
          </div>

          {/* ===== Total Aset + 2 Tabel ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Total Aset */}
            <div className="bg-gradient-to-b from-emerald-200 to-emerald-300 rounded-lg p-4">
              <h3 className="text-2xl font-bold text-emerald-800 mb-1">Total Aset</h3>
              <p className="text-sm text-emerald-700 mb-4">Total Kekayaan: Rp 44.075.000</p>
              <div className="bg-white/60 rounded p-3 text-xs space-y-1">
                <p>🥇 Emas &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Rp 12.600.000</p>
                <p>📈 Saham &nbsp;&nbsp;&nbsp;&nbsp;: Rp 2.700.000</p>
                <p>💼 Reksa &nbsp;&nbsp;&nbsp;&nbsp;: Rp 16.275.000</p>
                <p>🏦 Tabungan : Rp 12.500.000</p>
              </div>
              <button
                onClick={() => setTampilan('semua')}
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 rounded-full"
              >
                Lihat Laporan →
              </button>
            </div>

            {/* Tabel Pemasukan */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-blue-700 text-sm mb-2">📊 TOTAL PEMASUKAN (Semua Aset)</h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1 text-left">Aset</th>
                    <th className="border p-1">Total Investasi</th>
                    <th className="border p-1">Nilai Saat Ini</th>
                    <th className="border p-1">Untung</th>
                  </tr>
                </thead>
                <tbody>
                  {['Emas', 'Saham', 'Reksa', 'Tabungan'].map((a) => (
                    <tr key={a}>
                      <td className="border p-1">{a}</td>
                      <td className="border p-1 text-center">-</td>
                      <td className="border p-1 text-center">-</td>
                      <td className="border p-1 text-center">-</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="border p-1">TOTAL</td>
                    <td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tabel Pengeluaran */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-blue-700 text-sm mb-2">📊 TOTAL PENGELUARAN (Penjualan Aset)</h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1 text-left">Aset</th>
                    <th className="border p-1">Total Jual</th>
                    <th className="border p-1">Total Keuntungan</th>
                    <th className="border p-1">% Return</th>
                  </tr>
                </thead>
                <tbody>
                  {['Emas', 'Saham', 'Reksa', 'Tabungan'].map((a) => (
                    <tr key={a}>
                      <td className="border p-1">{a}</td>
                      <td className="border p-1 text-center">-</td>
                      <td className="border p-1 text-center">-</td>
                      <td className="border p-1 text-center">-</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="border p-1">TOTAL</td>
                    <td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== Rekap Bulanan + Grafik ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Rekap Bulanan */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-bold text-gray-700 mb-3 text-sm">📋 REKAP BULANAN SELURUH ASET</h3>
              <label className="block text-xs font-semibold mb-1">pilih tahun</label>
              <select className="border rounded px-3 py-1 text-xs mb-3">
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
              </select>
              <table className="w-full text-xs bg-white border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-1">waktu</th>
                    <th className="border p-1">Pemasukan</th>
                    <th className="border p-1">pengeluaran</th>
                    <th className="border p-1">Net</th>
                    <th className="border p-1">Total Aset</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-1">Maret</td>
                    <td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Grafik */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-gray-500 text-right text-sm mb-2">Grafik : -</h3>
              <div className="h-48 flex items-center justify-center text-gray-400 italic text-sm">
                Grafik akan tampil di sini
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* TAMPILAN LAPORAN PER ASET (Emas, Saham, Reksa, Tabungan) */}
      {/* =================================================== */}
      {['emas', 'saham', 'reksadana', 'tabungan'].includes(tampilan) && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Laporan {labelAset(tampilan)}
          </h3>

          {/* Tombol Export */}
          <div className="flex items-center gap-2 mb-5 text-xs">
            <span className="font-semibold">EXPORT:</span>
            <button className="px-2 py-1 border rounded hover:bg-gray-100">PDF</button>
            <span>|</span>
            <button className="px-2 py-1 border rounded hover:bg-gray-100">Excel</button>
            <span>|</span>
            <button className="px-2 py-1 border rounded hover:bg-gray-100">Jpg</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Riwayat Pembelian */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-bold text-blue-700 text-sm mb-2">
                📥 RIWAYAT PEMBELIAN {labelAset(tampilan).toUpperCase()}
              </h4>
              <p className="text-xs text-gray-600 mb-2">Export Laporan</p>
              <table className="w-full text-xs bg-white border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-1">Tanggal & Waktu</th>
                    <th className="border p-1">Aplikasi</th>
                    <th className="border p-1">{satuanAset(tampilan)}</th>
                    <th className="border p-1">Harga/{satuanHarga(tampilan)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-4 italic">
                      Belum ada data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Riwayat Penjualan */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-bold text-blue-700 text-sm mb-2">
                📤 RIWAYAT PENJUALAN {labelAset(tampilan).toUpperCase()}
              </h4>
              <p className="text-xs text-gray-600 mb-2">Export Laporan</p>
              <table className="w-full text-xs bg-white border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-1">Tanggal & Waktu</th>
                    <th className="border p-1">Aplikasi</th>
                    <th className="border p-1">{satuanAset(tampilan)}</th>
                    <th className="border p-1">Harga/{satuanHarga(tampilan)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-4 italic">
                      Belum ada data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={() => setTampilan('utama')}
            className="mt-5 text-sm text-blue-600 hover:underline"
          >
            ← Kembali ke Laporan Utama
          </button>
        </div>
      )}

      {/* =================================================== */}
      {/* TAMPILAN SEMUA ASET (Total Aset)                      */}
      {/* =================================================== */}
      {tampilan === 'semua' && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Laporan Seluruh Aset</h3>

          {/* Tombol Export */}
          <div className="flex items-center gap-2 mb-5 text-xs">
            <span className="font-semibold">EXPORT:</span>
            <button className="px-2 py-1 border rounded hover:bg-gray-100">PDF</button>
            <span>|</span>
            <button className="px-2 py-1 border rounded hover:bg-gray-100">Excel</button>
            <span>|</span>
            <button className="px-2 py-1 border rounded hover:bg-gray-100">Jpg</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Laporan Transaksi */}
            <div className="lg:col-span-2 bg-gray-100 rounded-lg p-4">
              <h4 className="font-bold text-blue-700 text-sm mb-2">📊 LAPORAN SELURUH TRANSAKSI</h4>
              <p className="text-xs text-gray-600 mb-2">Export Laporan</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs bg-white border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-1">No</th>
                      <th className="border p-1">Tanggal</th>
                      <th className="border p-1">Waktu</th>
                      <th className="border p-1">Aset</th>
                      <th className="border p-1">Detail</th>
                      <th className="border p-1">Kategori</th>
                      <th className="border p-1">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7} className="text-center text-gray-400 py-4 italic">
                        Belum ada data
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rekap Per Aset + Ringkasan */}
            <div className="flex flex-col gap-4">

              {/* Rekap Per Aset */}
              <div className="bg-white rounded-lg shadow p-4">
                <h4 className="font-bold text-blue-700 text-sm mb-2">📋 REKAP PER ASET</h4>
                <p className="text-xs text-gray-600 mb-2">Export Rekap</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-1">No</th>
                        <th className="border p-1">Aset</th>
                        <th className="border p-1">Pemasukan</th>
                        <th className="border p-1">Pengeluaran</th>
                        <th className="border p-1">Net</th>
                        <th className="border p-1">Nilai Sekarang</th>
                        <th className="border p-1">Untung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['Emas', 'Saham', 'Reksa Dana', 'Tabungan'].map((a) => (
                        <tr key={a}>
                          <td className="border p-1 text-center">-</td>
                          <td className="border p-1">{a}</td>
                          <td className="border p-1 text-center">-</td>
                          <td className="border p-1 text-center">-</td>
                          <td className="border p-1 text-center">-</td>
                          <td className="border p-1 text-center">-</td>
                          <td className="border p-1 text-center">-</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-semibold">
                        <td className="border p-1"></td>
                        <td className="border p-1">TOTAL</td>
                        <td className="border p-1 text-center">-</td>
                        <td className="border p-1 text-center">-</td>
                        <td className="border p-1 text-center">-</td>
                        <td className="border p-1 text-center">-</td>
                        <td className="border p-1 text-center">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ringkasan Transaksi */}
              <div className="bg-gray-50 rounded-lg p-4 text-xs space-y-1">
                <h4 className="font-bold text-blue-700 text-sm mb-2">📊 RINGKASAN TRANSAKSI</h4>
                <div className="flex justify-between border-b py-1">
                  <span>🥇 TOTAL PEMASUKAN (Pembelian + Tambah Saldo)</span>
                  <span className="font-semibold">: -</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>📤 TOTAL PENGELUARAN (Penjualan + Kurang Saldo)</span>
                  <span className="font-semibold">: -</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span>📈 NET FLOW</span>
                  <span className="font-semibold">: -</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>💎 TOTAL NILAI ASET SAAT INI</span>
                  <span className="font-semibold">: -</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>💼 TOTAL INVESTASI</span>
                  <span className="font-semibold">: -</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>📊 TOTAL KEUNTUNGAN</span>
                  <span className="font-semibold">: -</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setTampilan('utama')}
            className="mt-5 text-sm text-blue-600 hover:underline"
          >
            ← Kembali ke Laporan Utama
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================ */
/* Komponen kecil: Kartu Aset                                    */
/* ============================================================ */
function KartuAset({ judul, bg, isi, onClick }) {
  return (
    <div className={`bg-gradient-to-br ${bg} rounded-lg p-4 text-white shadow`}>
      <h3 className="text-2xl font-bold mb-2">{judul}</h3>
      <div className="text-xs space-y-0.5 mb-3">
        {isi.map((t, i) => <p key={i}>{t}</p>)}
      </div>
      <button
        onClick={onClick}
        className="w-full bg-white/30 hover:bg-white/50 backdrop-blur text-white text-xs font-semibold py-1.5 rounded-full transition"
      >
        Lihat Laporan →
      </button>
    </div>
  );
}

/* ============================================================ */
/* Helper: label & satuan                                        */
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