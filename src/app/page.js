import { LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
        <LayoutDashboard size={24} />
        Dashboard Ringkasan keuangan terkini
      </h2>
      <p className="text-gray-600">
        Selamat datang di InvMoney. Halaman ini masih kosong — nanti kita isi kartu, grafik, dan kalender.
      </p>
    </div>
  );
}