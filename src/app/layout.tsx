import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RentSafe-ai',
  description: 'Safe and secure property rental platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
