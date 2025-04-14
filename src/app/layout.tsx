// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alcatelz',
  description: 'CloudKit-powered website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        }}
        className={inter.className}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}