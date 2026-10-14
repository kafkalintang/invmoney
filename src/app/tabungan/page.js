'use client';

import { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function HalamanTabungan() {
  const [formTambah, setFormTambah] = useState({
    nama: '', jenis: '', nominal: '', sumber: '', tanggal: '', catatan: '',
  });
  const [formKurang, setFormKurang] = useState({
    nama: '', jenis: '', nominal: '', tujuan: '', tanggal: '', catatan: '',
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
        <LayoutDashboard size={24} />
        Dashboard Tata Kelola Tabungan
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ============ KIRI ============ */}
        <div className="flex flex-col gap-5">

          {/* Form Tambah Saldo */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-4">Form Tambah Saldo (Pemasukan)</h3>
            {[
              { label: 'Nama Bank/E-Wallet', key: 'nama' },
              { label: 'Jenis',              key: 'jenis' },
              { label: 'Nominal Tambah',     key: 'nominal' },
              { label: 'Sumber Dana',        key: 'sumber' },
              { label: 'Tanggal',            key: 'tanggal' },
              { label: 'Catatan',            key: 'catatan' },
            ].map((f) => (
              <div key={f.key} className="mb-3">
                <label className="block text-xs font-semibold mb-1">{f.label}</label>
                <input
                  type="text"
                  value={formTambah[f.key]}
                  onChange={(e) => setFormTambah({ ...formTambah, [f.key]: e.target.value })}
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

          {/* Form Kurang Saldo */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-4">Form Kurang Saldo (Pengeluaran)</h3>
            {[
              { label: 'Nama Bank/E-Wallet', key: 'nama' },
              { label: 'Jenis',              key: 'jenis' },
              { label: 'Nominal Kurang',     key: 'nominal' },
              { label: 'Tujuan',             key: 'tujuan' },
              { label: 'Tanggal',            key: 'tanggal' },
              { label: 'Catatan',            key: 'catatan' },
            ].map((f) => (
              <div key={f.key} className="mb-3">
                <label className="block text-xs font-semibold mb-1">{f.label}</label>
                <input
                  type="text"
                  value={formKurang[f.key]}
                  onChange={(e) => setFormKurang({ ...formKurang, [f.key]: e.target.value })}
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

          {/* Tabel Tabungan Masuk */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-3">Data Tabungan Hari Ini</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1">No</th>
                    <th className="border p-1">Waktu</th>
                    <th className="border p-1">Jenis</th>
                    <th className="border p-1">Nama Bank/E-Wallet</th>
                    <th className="border p-1">Sumber</th>
                    <th className="border p-1">Nominal</th>
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
            <p className="text-xs text-gray-500 mt-2">Total Pemasukan: -</p>
          </div>

          {/* Tabel Pengeluaran Tabungan */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-gray-700 mb-3">Data Pengeluaran Tabungan</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-1">No</th>
                    <th className="border p-1">Waktu</th>
                    <th className="border p-1">Jenis</th>
                    <th className="border p-1">Nama Bank/E-Wallet</th>
                    <th className="border p-1">Tujuan</th>
                    <th className="border p-1">Nominal</th>
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
            <p className="text-xs text-gray-500 mt-2">Total Pengeluaran: -</p>
          </div>

          {/* Kartu Ringkas — Hijau, Orange, Gelap */}
          <div className="flex flex-col gap-3">
            <div className="bg-emerald-500 text-white rounded-md p-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-sm">Rp 250.000,-</p>
                <p className="text-xs opacity-90">Pemasukan Hari Ini</p>
              </div>
              <span className="text-2xl opacity-70">📊</span>
            </div>
            <div className="bg-orange-300 text-white rounded-md p-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-sm">Rp 250.000,-</p>
                <p className="text-xs opacity-90">Pengeluaran Hari Ini</p>
              </div>
              <span className="text-2xl opacity-70">📊</span>
            </div>
            <div className="bg-gray-600 text-white rounded-md p-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-sm">Rp 250.000,-</p>
                <p className="text-xs opacity-90">Total Keseluruhan Hari Ini</p>
              </div>
              <span className="text-2xl opacity-70">📊</span>
            </div>
          </div>

          {/* Grafik */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500 text-right mb-2">Grafik Tabungan : -</h3>
            <div className="h-48 flex items-center justify-center text-gray-400 italic text-sm">
              Grafik akan tampil di sini
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}