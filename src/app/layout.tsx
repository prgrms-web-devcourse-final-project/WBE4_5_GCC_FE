
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
