'use client';

import { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function HalamanEmas() {
  const [formBeli, setFormBeli] = useState({
    aplikasi: '', gram: '', harga: '', total: '', tanggal: '', catatan: '',
  });
  const [formJual, setFormJual] = useState({
    aplikasi: '', gram: '', harga: '', total: '', keuntungan: '', tanggal: '', catatan: '',
  });

  return (
    <div>
      {/* Judul */}
      <h2 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
        <LayoutDashboard size={24} />
        Dashboard Tata Kelola Emas
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ================= KOLOM KIRI ================= */}
        <div className="flex flex-col gap-5">

          {/* ===== Form Beli Emas ===== */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-4">Form Beli Emas (Pemasukan)</h3>

            {[
              { label: 'Nama aplikasi',      key: 'aplikasi' },
              { label: 'Jumlah Gram',        key: 'gram' },
              { label: 'Harga Beli per Gram', key: 'harga' },
              { label: 'Total Harga',        key: 'total' },
              { label: 'Tanggal',            key: 'tanggal' },
              { label: 'Catatan',            key: 'catatan' },
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

          {/* ===== Form Jual Emas ===== */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-4">Form Jual Emas (Pengeluaran)</h3>

            {[
              { label: 'Nama aplikasi',      key: 'aplikasi' },
              { label: 'Jumlah Gram Dijual', key: 'gram' },
              { label: 'Harga Jual per Gram', key: 'harga' },
              { label: 'Total Hasil',        key: 'total' },
              { label: 'Keuntungan',         key: 'keuntungan' },
              { label: 'Tanggal',            key: 'tanggal' },
              { label: 'Catatan',            key: 'catatan' },
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
            <h3 className="font-bold text-gray-700 mb-3">Data Pembelian Emas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1">No</th>
                    <th className="border p-1">Waktu</th>
                    <th className="border p-1">Nama Aplikasi</th>
                    <th className="border p-1">Jumlah Gram</th>
                    <th className="border p-1">Harga Beli/gr</th>
                    <th className="border p-1">Harga Beli</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center text-gray-400 py-4 italic">
                      Belum ada data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">Total Pembelian: -</p>
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
                    <th className="border p-1">Nama Aplikasi</th>
                    <th className="border p-1">Jumlah Gram</th>
                    <th className="border p-1">Harga Jual/gr</th>
                    <th className="border p-1">Total Hasil</th>
                    <th className="border p-1">Keuntungan</th>
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
            <p className="text-xs text-gray-500 mt-2">Total Penjualan: - | Total Keuntungan: -</p>
          </div>

          {/* ===== Kartu Ringkas ===== */}
          <div className="flex flex-col gap-3">
            <div className="bg-purple-500 text-white rounded-md p-3">
              <p className="font-semibold text-sm">Rp -</p>
              <p className="text-xs opacity-90">Pemasukan Hari Ini</p>
            </div>
            <div className="bg-orange-400 text-white rounded-md p-3">
              <p className="font-semibold text-sm">Rp -</p>
              <p className="text-xs opacity-90">Pemasukan Hari Ini</p>
            </div>
            <div className="bg-gray-500 text-white rounded-md p-3">
              <p className="font-semibold text-sm">Rp -</p>
              <p className="text-xs opacity-90">Pemasukan Hari Ini</p>
            </div>
          </div>

          {/* ===== Grafik ===== */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500 text-right mb-2">Grafik Emas : -</h3>
            <div className="h-48 flex items-center justify-center text-gray-400 italic text-sm">
              Grafik akan tampil di sini
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}