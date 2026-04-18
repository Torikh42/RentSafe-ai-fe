import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'RentSafe AI — Safe Property Rental Platform',
  description:
    'AI-powered platform untuk menyelesaikan sengketa sewa kos-kosan & apartemen di Indonesia. Smart contracts, AI inspection, dan escrow system.',
  keywords: [
    'sewa kos',
    'sewa apartemen',
    'properti Indonesia',
    'AI smart contract',
    'escrow',
  ],
  authors: [{ name: 'RentSafe AI' }],
  openGraph: {
    title: 'RentSafe AI',
    description: 'Safe and Secure Property Rental Platform',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A9E75',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
