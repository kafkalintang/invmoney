'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  Coins,
  Landmark,
  PiggyBank,
  BarChart3,
  Wallet,
  StickyNote,
} from 'lucide-react';

const menu = [
  { label: 'Dashboard',   href: '/',           icon: LayoutDashboard },
  { label: 'Saham',       href: '/saham',      icon: TrendingUp },
  { label: 'Emas',        href: '/emas',       icon: Coins },
  { label: 'Reksa Dana',  href: '/reksadana',  icon: Landmark },
  { label: 'Tabungan',    href: '/tabungan',   icon: PiggyBank },
  { label: 'Laporan',     href: '/laporan',    icon: BarChart3 },
  { label: 'Multi-bank',  href: '/multibank',  icon: Wallet },
  { label: 'Catatan',     href: '/catatan',    icon: StickyNote },
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
      {/* ===== Efek glow di belakang logo ===== */}
      <div
        className="absolute top-0 left-0 w-full h-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(96,165,250,.55), transparent 70%)',
        }}
      />

      {/* ===== Logo InvMoney bersinar ===== */}
      <h1 className="relative text-3xl font-black mb-10 tracking-tight">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #ffffff 0%, #bfdbfe 40%, #ffffff 60%, #dbeafe 100%)',
            filter: 'drop-shadow(0 0 12px rgba(147,197,253,.9)) drop-shadow(0 0 24px rgba(59,130,246,.6))',
            backgroundSize: '200% auto',
            animation: 'shine 3s linear infinite',
          }}
        >
          InvMoney
        </span>
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

              {/* Titik kecil di kanan kalau aktif */}
              {aktif && (
                <span className="ml-auto w-2 h-2 rounded-full bg-blue-600" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ===== Animasi shine (dipasang via style tag) ===== */}
      <style jsx global>{`
        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </aside>
  );
}