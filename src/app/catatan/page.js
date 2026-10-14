'use client';

import { useState } from 'react';
import { StickyNote, ArrowLeft, Edit, Trash2, FileText, Coins, TrendingUp, Landmark, PiggyBank } from 'lucide-react';

export default function HalamanCatatan() {
  // null = tampilan utama, atau 'emas' | 'saham' | 'reksadana' | 'tabungan'
  const [kategori, setKategori] = useState(null);
  const [filter, setFilter] = useState('hari-ini');

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
        <StickyNote size={24} />
        Halaman Catatan
      </h2>

      {/* =================================================== */}
      {/* TAMPILAN UTAMA — 4 kartu kategori                    */}
      {/* =================================================== */}
      {kategori === null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { key: 'emas',      label: 'CATATAN EMAS',       icon: Coins },
            { key: 'saham',     label: 'CATATAN SAHAM',      icon: TrendingUp },
            { key: 'reksadana', label: 'CATATAN REKSA DANA', icon: Landmark },
            { key: 'tabungan',  label: 'CATATAN TABUNGAN',   icon: PiggyBank },
          ].map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="bg-gray-100 hover:bg-gray-200 rounded-full py-4 px-6 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-blue-700" />
                <span className="font-bold text-blue-900 text-sm">{label}</span>
              </div>
              <button
                onClick={() => setKategori(key)}
                className="text-blue-700 font-semibold text-sm hover:underline"
              >
                [ Lihat Semua ]
              </button>
            </div>
          ))}
        </div>
      )}

      {/* =================================================== */}
      {/* TAMPILAN DETAIL — kartu catatan                       */}
      {/* =================================================== */}
      {kategori !== null && (
        <div>
          {/* Baris atas: tombol kembali + judul + filter waktu */}
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <button
              onClick={() => setKategori(null)}
              className="text-gray-700 hover:text-blue-700"
            >
              <ArrowLeft size={24} />
            </button>

            <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-bold text-blue-900">
              📝 CATATAN {labelKategori(kategori).toUpperCase()}
            </span>

            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-600">📅</span>
              {['hari-ini', 'minggu-ini', 'bulan-ini', 'kustom'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 py-1 ${
                    filter === f
                      ? 'bg-blue-900 text-white rounded'
                      : 'text-blue-900 hover:underline'
                  }`}
                >
                  {filter === f ? `[ ${labelFilter(f)} ]` : `[ ${labelFilter(f)} ]`}
                </button>
              ))}
            </div>
          </div>

          {/* ===== Bagian Pemasukan ===== */}
          <div className="mb-6">
            <h3 className="font-semibold text-blue-900 text-sm mb-3">
              📥 PEMASUKAN (Beli {labelKategori(kategori)})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Placeholder card 1 */}
              <KartuCatatan
                tanggal="--"
                detail="-"
                harga="-"
                total="-"
                catatan="-"
              />
            </div>

            <p className="text-xs text-gray-400 italic mt-2">Belum ada catatan pemasukan.</p>
          </div>

          {/* ===== Bagian Pengeluaran ===== */}
          <div>
            <h3 className="font-semibold text-blue-900 text-sm mb-3">
              📤 PENGELUARAN (Jual {labelKategori(kategori)})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <KartuCatatan
                tanggal="--"
                detail="-"
                harga="-"
                total="-"
                catatan="-"
              />
            </div>

            <p className="text-xs text-gray-400 italic mt-2">Belum ada catatan pengeluaran.</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================ */
/* Komponen kartu catatan                                        */
/* ============================================================ */
function KartuCatatan({ tanggal, detail, harga, total, catatan }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      {/* Header tanggal */}
      <div className="bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
        {tanggal}
      </div>

      {/* Isi */}
      <div className="px-4 py-3 text-xs space-y-1.5 text-gray-700">
        <p>⚖️ {detail}</p>
        <p>💰 {harga}</p>
        <p>💵 Total: {total}</p>
        <p className="italic text-gray-500">"{catatan}"</p>
      </div>

      {/* Tombol aksi */}
      <div className="flex gap-2 px-4 pb-3">
        <button className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded">
          [ Edit ]
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded">
          [ Hapus ]
        </button>
        <button className="bg-blue-700 hover:bg-blue-800 text-white text-xs px-3 py-1 rounded">
          [ Detail ]
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