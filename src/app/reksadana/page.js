'use client';

import { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function HalamanReksaDana() {
  const [formBeli, setFormBeli] = useState({
    nama: '', jenis: '', unit: '', nab: '', total: '', tanggal: '', catatan: '',
  });
  const [formJual, setFormJual] = useState({
    nama: '', unit: '', nab: '', total: '', keuntungan: '', tanggal: '', catatan: '',
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
        <LayoutDashboard size={24} />
        Dashboard Tata Kelola Reksa Dana
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ============ KIRI ============ */}
        <div className="flex flex-col gap-5">

          {/* Form Beli */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-4">Form Beli Unit Reksa Dana (Pemasukan)</h3>
            {[
              { label: 'Nama Reksa Dana', key: 'nama' },
              { label: 'Jenis Reksa Dana', key: 'jenis' },
              { label: 'Jumlah Unit',      key: 'unit' },
              { label: 'NAB per Unit',     key: 'nab' },
              { label: 'Total Investasi',  key: 'total' },
              { label: 'Tanggal',          key: 'tanggal' },
              { label: 'Catatan',          key: 'catatan' },
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

          {/* Form Jual */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-4">Form Jual Unit Reksa Dana (Pengeluaran)</h3>
            {[
              { label: 'Nama Reksa Dana',  key: 'nama' },
              { label: 'Jumlah Unit Dijual', key: 'unit' },
              { label: 'NAB Jual per Unit',  key: 'nab' },
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

        {/* ============ KANAN ============ */}
        <div className="flex flex-col gap-5">

          {/* Tabel Pembelian */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-3">Data Pembelian Reksa Dana</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1">No</th>
                    <th className="border p-1">Waktu</th>
                    <th className="border p-1">Nama</th>
                    <th className="border p-1">Jenis</th>
                    <th className="border p-1">Unit</th>
                    <th className="border p-1">NAB Beli</th>
                    <th className="border p-1">Total Investasi</th>
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
            <p className="text-xs text-gray-500 mt-2">Total Investasi Reksa Dana: -</p>
          </div>

          {/* Tabel Penjualan */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-3">Data Penjualan Reksa Dana</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1">No</th>
                    <th className="border p-1">Waktu</th>
                    <th className="border p-1">Nama Reksa Dana</th>
                    <th className="border p-1">Jenis</th>
                    <th className="border p-1">Unit</th>
                    <th className="border p-1">NAB Jual</th>
                    <th className="border p-1">Total Hasil</th>
                    <th className="border p-1">Keuntungan</th>
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
            <p className="text-xs text-gray-500 mt-2">Total Penjualan: - | Total Keuntungan: -</p>
          </div>

          {/* Kartu Ringkas — Cyan, Pink, Gelap */}
          <div className="flex flex-col gap-3">
            <div className="bg-cyan-500 text-white rounded-md p-3">
              <p className="font-semibold text-sm">Rp -</p>
              <p className="text-xs opacity-90">Pemasukan Hari Ini</p>
            </div>
            <div className="bg-pink-500 text-white rounded-md p-3">
              <p className="font-semibold text-sm">Rp -</p>
              <p className="text-xs opacity-90">Pengeluaran Hari Ini</p>
            </div>
            <div className="bg-gray-800 text-white rounded-md p-3">
              <p className="font-semibold text-sm">Rp -</p>
              <p className="text-xs opacity-90">Total Keseluruhan Hari Ini</p>
            </div>
          </div>

          {/* Grafik */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500 text-right mb-2">Grafik Reksa Dana : -</h3>
            <div className="h-48 flex items-center justify-center text-gray-400 italic text-sm">
              Grafik akan tampil di sini
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}