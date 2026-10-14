'use client';

import { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function HalamanMultiBank() {
  const [formMasuk, setFormMasuk] = useState({ nama: '', jumlah: '' });
  const [formKeluar, setFormKeluar] = useState({ nama: '', jumlah: '' });

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
        <LayoutDashboard size={24} />
        Dashboard Data Bank
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ============ KIRI ============ */}
        <div className="flex flex-col gap-5">

          {/* Form Nabung */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-center font-bold text-gray-600 mb-5">Nabung Berapa Hari Ini</h3>

            <div className="bg-gray-100 rounded-lg p-4">
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">Nama</label>
                <input
                  type="text"
                  value={formMasuk.nama}
                  onChange={(e) => setFormMasuk({ ...formMasuk, nama: e.target.value })}
                  className="w-full bg-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Jumlah Pemasukan</label>
                <input
                  type="text"
                  value={formMasuk.jumlah}
                  onChange={(e) => setFormMasuk({ ...formMasuk, jumlah: e.target.value })}
                  className="w-full bg-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-1.5 rounded-full text-sm">
                  Simpan
                </button>
              </div>
            </div>
          </div>

          {/* Form Pengeluaran */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-center font-bold text-gray-600 mb-5">Ada Pengeluaran Apa Hari Ini</h3>

            <div className="bg-gray-100 rounded-lg p-4">
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">Nama aplikasi</label>
                <input
                  type="text"
                  value={formKeluar.nama}
                  onChange={(e) => setFormKeluar({ ...formKeluar, nama: e.target.value })}
                  className="w-full bg-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Jumlah Pengeluaran</label>
                <input
                  type="text"
                  value={formKeluar.jumlah}
                  onChange={(e) => setFormKeluar({ ...formKeluar, jumlah: e.target.value })}
                  className="w-full bg-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-1.5 rounded-full text-sm">
                  Simpan
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ============ KANAN ============ */}
        <div className="flex flex-col gap-5">

          {/* Tabel Tabungan Hari Ini */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-3">Data Tabungan Hari Ini</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1">No</th>
                    <th className="border p-1">Waktu</th>
                    <th className="border p-1">Nama Aplikasi</th>
                    <th className="border p-1">Jumlah Tabungan</th>
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

          {/* Tabel Pengeluaran Hari Ini */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-3">Data Pengeluaran Hari Ini</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1">No</th>
                    <th className="border p-1">Waktu</th>
                    <th className="border p-1">Nama Aplikasi</th>
                    <th className="border p-1">Jumlah Pengeluaran</th>
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

          {/* 3 Kotak Warna + Grafik */}
          <div className="grid grid-cols-2 gap-4 items-start">

            {/* 3 kotak warna */}
            <div className="flex flex-col gap-3">
              <div className="bg-teal-500 h-14 rounded-sm"></div>
              <div className="bg-red-600 h-14 rounded-sm"></div>
              <div className="bg-slate-800 h-14 rounded-sm"></div>
            </div>

            {/* Grafik */}
            <div className="bg-white rounded-lg shadow p-3">
              <h3 className="text-gray-500 text-right text-xs mb-1">Florida : 14.9k</h3>
              <div className="h-40 flex items-center justify-center text-gray-400 italic text-xs">
                Grafik akan tampil di sini
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}