'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdDashboard,
  MdShowChart,
  MdMonetizationOn,
  MdAccountBalance,
  MdSavings,
  MdBarChart,
  MdAccountBalanceWallet,
  MdNote,
} from 'react-icons/md';

const menu = [
  { label: 'Dashboard',   href: '/',           icon: MdDashboard },
  { label: 'Saham',       href: '/saham',      icon: MdShowChart },
  { label: 'Emas',        href: '/emas',       icon: MdMonetizationOn },
  { label: 'Reksa Dana',  href: '/reksadana',  icon: MdAccountBalance },
  { label: 'Tabungan',    href: '/tabungan',   icon: MdSavings },
  { label: 'Laporan',     href: '/laporan',    icon: MdBarChart },
  { label: 'Multi-bank',  href: '/multibank',  icon: MdAccountBalanceWallet },
  { label: 'Catatan',     href: '/catatan',    icon: MdNote },
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