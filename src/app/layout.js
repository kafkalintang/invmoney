import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'InvMoney - Kelola Keuangan',
  description: 'Aplikasi manajemen keuangan pribadi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 overflow-x-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}