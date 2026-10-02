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
    <aside className="w-64 min-h-screen bg-blue-900 text-white p-5 shrink-0">
      <h1 className="text-2xl font-bold mb-8">InvMoney</h1>
      <nav className="flex flex-col gap-1">
        {menu.map(({ label, href, icon: Icon }) => {
          const aktif = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
                ${aktif ? 'bg-blue-700 font-semibold' : 'hover:bg-blue-800'}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}