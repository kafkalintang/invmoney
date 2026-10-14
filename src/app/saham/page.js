'use client';

import { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function HalamanSaham() {
  // State kosong dulu — nanti kita isi logic
  const [formBeli, setFormBeli] = useState({
    kode: '', emiten: '', lot: '', harga: '', total: '', tanggal: '', catatan: '',
  });
  const [formJual, setFormJual] = useState({
    kode: '', lot: '', harga: '', total: '', keuntungan: '', tanggal: '', catatan: '',
  });

  return (
    <div>
      {/* Judul */}
      <h2 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
        <LayoutDashboard size={24} />
        Dashboard Tata Kelola Saham
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ================= KOLOM KIRI ================= */}
        <div className="flex flex-col gap-5">

          {/* ===== Form Beli Saham ===== */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-blue-900 mb-4">Form Beli Saham</h3>

            {[
              { label: 'Nama Saham (kode)', key: 'kode' },
              { label: 'Nama Emiten',       key: 'emiten' },
              { label: 'Jumlah Lot',        key: 'lot' },
              { label: 'Harga Beli per Lembar', key: 'harga' },
              { label: 'Total Investasi',   key: 'total' },
              { label: 'Tanggal',           key: 'tanggal' },
              { label: 'Catatan',           key: 'catatan' },
            ].map((f) => (
              <div key={f.key} className="mb-3">
                <label className="block text-xs font-semibold mb-1">{f.label}</label>
                <input
                  type="text"
                  value={formBeli[f.key]}
                  onChange={(e) => setFormBeli({ ...formBeli, [f.key]: e.target.value })}
                  className="w-full bg-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="flex justify-end mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-full">
                Simpan
              </button>
            </div>
          </div>

          {/* ===== Form Jual Saham ===== */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-blue-900 mb-4">Form Jual Saham</h3>

            {[
              { label: 'Kode Saham',           key: 'kode' },
              { label: 'Jumlah Lot Dijual',    key: 'lot' },
              { label: 'Harga Jual per Lembar', key: 'harga' },
              { label: 'Total Hasil',          key: 'total' },
              { label: 'Keuntungan',           key: 'keuntungan' },
              { label: 'Tanggal',              key: 'tanggal' },
              { label: 'Catatan',              key: 'catatan' },
            ].map((f) => (
              <div key={f.key} className="mb-3">
                <label className="block text-xs font-semibold mb-1">{f.label}</label>
                <input
                  type="text"
                  value={formJual[f.key]}
                  onChange={(e) => setFormJual({ ...formJual, [f.key]: e.target.value })}
                  className="w-full bg-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="flex justify-end mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-full">
                Simpan
              </button>
            </div>
          </div>

        </div>

        {/* ================= KOLOM KANAN ================= */}
        <div className="flex flex-col gap-5">

          {/* ===== Tabel Pembelian ===== */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-3">Data Pembelian Saham</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1">No</th>
                    <th className="border p-1">Waktu</th>
                    <th className="border p-1">Kode Saham</th>
                    <th className="border p-1">Lot</th>
                    <th className="border p-1">Lembar</th>
                    <th className="border p-1">Harga Beli</th>
                    <th className="border p-1">Emiten</th>
                    <th className="border p-1">Total Investasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={8} className="text-center text-gray-400 py-4 italic">
                      Belum ada data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">Total Investasi Saham: -</p>
          </div>

          {/* ===== Tabel Pengeluaran ===== */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-3">Data Pengeluaran Hari Ini</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1">No</th>
                    <th className="border p-1">Waktu</th>
                    <th className="border p-1">Kode</th>
                    <th className="border p-1">Emiten</th>
                    <th className="border p-1">Lot</th>
                    <th className="border p-1">Lembar</th>
                    <th className="border p-1">Harga Jual/Lembar</th>
                    <th className="border p-1">Total Hasil</th>
                    <th className="border p-1">Keuntungan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={9} className="text-center text-gray-400 py-4 italic">
                      Belum ada data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">Total Penjualan: - | Total Keuntungan: -</p>
          </div>

          {/* ===== Kartu Ringkas ===== */}
          <div className="flex flex-col gap-3">
            <div className="bg-cyan-400 text-white rounded-md p-3">
              <p className="font-semibold text-sm">Rp -</p>
              <p className="text-xs opacity-90">Pemasukan Hari Ini</p>
            </div>
            <div className="bg-orange-400 text-white rounded-md p-3">
              <p className="font-semibold text-sm">Rp -</p>
              <p className="text-xs opacity-90">Pengeluaran Hari Ini</p>
            </div>
            <div className="bg-gray-400 text-white rounded-md p-3">
              <p className="font-semibold text-sm">Rp -</p>
              <p className="text-xs opacity-90">Total Pendapatan Hari Ini</p>
            </div>
          </div>

          {/* ===== Grafik Saham ===== */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500 text-right mb-2">Grafik Saham : -</h3>
            <div className="h-48 flex items-center justify-center text-gray-400 italic text-sm">
              Grafik akan tampil di sini
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}