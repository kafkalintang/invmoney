'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  Coins,
  Landmark,
  CircleDollarSign,
  BarChart3,
  Wallet,
  StickyNote,
} from 'lucide-react';

const menu = [
  { label: 'Dashboard',   href: '/',           icon: LayoutDashboard },
  { label: 'Saham',       href: '/saham',      icon: TrendingUp },
  { label: 'Emas',        href: '/emas',       icon: Coins },
  { label: 'Reksa Dana',  href: '/reksadana',  icon: Landmark },
  { label: 'Tabungan',    href: '/tabungan',   icon: CircleDollarSign },
  { label: 'Laporan',     href: '/laporan',    icon: BarChart3 },
  { label: 'Multi-bank',  href: '/multibank',  icon: Wallet },
  { label: 'Catatan',     href: '/catatan',    icon: StickyNote },
];

// ===== Warna per huruf "InvMoney" =====
const hurufLogo = [
  { char: 'I', warna: '#ffffff' },
  { char: 'n', warna: '#bfdbfe' },
  { char: 'v', warna: '#93c5fd' },
  { char: 'M', warna: '#60a5fa' },
  { char: 'o', warna: '#38bdf8' },
  { char: 'n', warna: '#22d3ee' },
  { char: 'e', warna: '#67e8f9' },
  { char: 'y', warna: '#a5f3fc' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="relative w-64 min-h-screen shrink-0 p-5 text-white overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 35%, #0f172a 100%)',
      }}
    >
      {/* ===== Logo InvMoney (center, warna per huruf + kilau tipis) ===== */}
      <h1
        className="relative text-3xl font-black mb-10 tracking-tight text-center"
        style={{
          filter:
            'drop-shadow(0 0 3px rgba(255,255,255,.35)) drop-shadow(0 0 6px rgba(147,197,253,.25))',
        }}
      >
        {hurufLogo.map((h, i) => (
          <span
            key={i}
            style={{
              color: h.warna,
              textShadow: '0 0 2px rgba(255,255,255,.35)',
            }}
          >
            {h.char}
          </span>
        ))}
      </h1>

      {/* ===== Menu ===== */}
      <nav className="relative flex flex-col gap-1.5">
        {menu.map(({ label, href, icon: Icon }) => {
          const aktif = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                aktif
                  ? 'bg-white text-blue-900 font-bold shadow-lg shadow-blue-900/40'
                  : 'text-blue-100 hover:bg-white/10 hover:translate-x-1'
              }`}
            >
              <Icon
                size={20}
                className={`transition-transform ${
                  aktif ? 'text-blue-700' : 'text-blue-200 group-hover:text-white'
                }`}
              />
              <span>{label}</span>

              {aktif && (
                <span className="ml-auto w-2 h-2 rounded-full bg-blue-600" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}