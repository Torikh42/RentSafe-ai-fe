import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export function PropertyNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary-50 font-sans text-primary-900 selection:bg-primary-500 selection:text-white antialiased">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 font-display text-2xl font-bold text-primary-900">
            Properti Tidak Ditemukan
          </h2>
          <Link
            href="/properties"
            className="mt-4 inline-block font-mono text-xs font-bold uppercase tracking-widest text-accent-500 hover:text-accent-600"
          >
            ← Kembali ke Daftar Properti
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
