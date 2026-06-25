import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/lib/query-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
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
  themeColor: '#0B2147',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased selection:bg-accent-500 selection:text-white">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
