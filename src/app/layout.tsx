import './globals.css';
import './styles/calendar.css';
import LayoutWrapper from './components/common/LayoutWrapper';

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body className="mt-[44px] pb-[110px]">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
