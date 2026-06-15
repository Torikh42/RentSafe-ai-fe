import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export function PropertyDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary-50 font-sans text-primary-900 selection:bg-primary-500 selection:text-white antialiased">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="font-mono text-sm text-secondary-500">
          MEMUAT DATA...
        </div>
      </div>
      <Footer />
    </div>
  );
}
