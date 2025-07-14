import './globals.css';
import './styles/calendar.css';
import Header from './components/common/ui/Header';
import BottomNavWrapper from './components/common/ui/BottomNavWrapper';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '혼라이프',
  description: '혼라이프와 함께 루틴 실천해요',
  manifest: '/manifest.json',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mt-[30px] pb-[110px]">
        <Header />
        {children}
        <BottomNavWrapper />
      </body>
    </html>
  );
}
