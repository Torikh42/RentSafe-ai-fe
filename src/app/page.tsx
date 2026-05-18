import Link from 'next/link';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary-50 font-sans text-primary-900 selection:bg-primary-500 selection:text-white antialiased">
      <Navbar />

      <main className="flex-grow">
        {/* Section 1: Hero */}
        <section className="grid grid-cols-1 items-start gap-8 border-b border-secondary-200 px-4 py-16 md:px-12 lg:grid-cols-12 lg:pt-24 lg:pb-16 xl:px-16">
          <div className="lg:col-span-5 lg:pr-12">
            <div className="mb-6 inline-flex items-center gap-2 border border-secondary-200 bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-primary-700 uppercase tracking-widest">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
              </span>
              Standard Keamanan Institusional
            </div>

            <h1 className="mb-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-primary-900 lg:text-[42px] xl:text-6xl">
              Sewa Properti
              <br />
              Tanpa Sengketa.
            </h1>

            <p className="mb-8 max-w-sm text-base leading-relaxed text-secondary-600">
              Solusi cerdas berbasis AI untuk deposit dan kontrak sewa. Lindungi
              aset Anda dengan Smart Escrow dan Gemini Vision Inspection.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/properties"
                className="rounded border border-transparent bg-accent-500 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-600"
              >
                Cari Properti
              </Link>
              <Link
                href="/register"
                className="rounded border border-primary-500 bg-transparent px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-primary-500 transition-colors hover:bg-primary-50"
              >
                Daftar Tenant
              </Link>
            </div>
          </div>

          <div className="relative mt-8 lg:col-span-7 lg:mt-0 hidden lg:block">
            {/* Placeholder for Hero Illustration/Graphic */}
          </div>
        </section>

        {/* Dense Horizontal Ticker */}
        <div className="relative w-full overflow-hidden border-b border-secondary-200 bg-secondary-100 py-2">
          <div className="flex animate-ticker items-center gap-12 whitespace-nowrap hover:[animation-play-state:paused]">
            <div className="flex items-center gap-12">
              <span className="font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                MIDTRANS_ESCROW_ACTIVE
              </span>
              <span className="font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                KUHPERDATA_COMPLIANT
              </span>
              <span className="font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                GEMINI_VISION_v1.5
              </span>
              <span className="font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                AUTO_DISPUTE_RES: 98%
              </span>
              <span className="font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                ZERO_TRUST_SECURITY
              </span>
            </div>
            {/* Duplicated for seamless loop */}
            <div className="flex items-center gap-12 pl-12">
              <span className="font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                MIDTRANS_ESCROW_ACTIVE
              </span>
              <span className="font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                KUHPERDATA_COMPLIANT
              </span>
              <span className="font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                GEMINI_VISION_v1.5
              </span>
              <span className="font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                AUTO_DISPUTE_RES: 98%
              </span>
              <span className="font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                ZERO_TRUST_SECURITY
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Features (Zig-Zag, Tightened) */}
        <section>
          {/* Feature 1: Smart Contracts */}
          <div className="grid grid-cols-1 items-start gap-8 border-b border-secondary-200 px-4 py-16 md:px-12 lg:grid-cols-12 xl:px-16">
            <div className="lg:col-span-8 lg:col-start-1 max-w-2xl">
              <div className="mb-2 font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                Infrastruktur Legal
              </div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-primary-900 lg:text-3xl">
                AI Smart Contracts
              </h2>
              <p className="mb-6 text-base leading-relaxed text-secondary-600">
                Setiap sewa diamankan secara matematis. Kami menerjemahkan
                bahasa hukum (KUHPerdata) menjadi kode yang dapat dieksekusi,
                menghilangkan ambiguitas dan memastikan kepatuhan.
              </p>
            </div>
          </div>

          {/* Feature 2: AI Inspection */}
          <div className="grid grid-cols-1 items-start gap-8 border-b border-secondary-200 bg-white px-4 py-16 md:px-12 lg:grid-cols-12 xl:px-16">
            <div className="lg:col-span-8 lg:col-start-1 max-w-2xl">
              <div className="mb-2 font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-widest">
                Inspeksi_Otomatis
              </div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-primary-900 lg:text-3xl">
                Gemini Vision AI
              </h2>
              <p className="mb-6 text-base leading-relaxed text-secondary-600">
                Gunakan kamera HP untuk dokumentasi Check-in dan Check-out.
                Jaringan neural kami mendeteksi kerusakan dan keausan secara
                real-time untuk mencegah klaim sepihak.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Stats (Dense Editorial) */}
        <section className="border-b border-secondary-200 px-4 py-16 md:px-12 xl:px-16 bg-white">
          <div className="grid grid-cols-1 border border-secondary-200 md:grid-cols-4">
            <div className="border-b border-secondary-200 p-8 md:border-r md:border-b-0">
              <div className="mb-4 font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-wider">
                EFISIENSI_BIAYA
              </div>
              <div className="mb-2 font-mono text-[32px] font-bold text-primary-900">
                95%
              </div>
              <div className="font-mono text-[11px] leading-snug text-secondary-500">
                Lebih murah dibandingkan menggunakan jasa hukum tradisional.
              </div>
            </div>
            <div className="border-b border-secondary-200 p-8 md:border-r md:border-b-0">
              <div className="mb-4 font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-wider">
                SENGKETA_SELESAI
              </div>
              <div className="mb-2 font-mono text-[32px] font-bold text-primary-900">
                98%
              </div>
              <div className="font-mono text-[11px] leading-snug text-secondary-500">
                Selesai dalam hitungan jam berkat mediasi AI netral.
              </div>
            </div>
            <div className="border-b border-secondary-200 p-8 md:border-r md:border-b-0">
              <div className="mb-4 font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-wider">
                RELIABILITAS_SISTEM
              </div>
              <div className="mb-2 font-mono text-[32px] font-bold text-primary-900">
                24/7
              </div>
              <div className="font-mono text-[11px] leading-snug text-secondary-500">
                Arbiter AI tersedia kapan saja untuk menyelesaikan masalah.
              </div>
            </div>
            <div className="p-8">
              <div className="mb-4 font-mono text-[10px] font-semibold text-secondary-500 uppercase tracking-wider">
                PROPERTI_TERVERIFIKASI
              </div>
              <div className="mb-2 font-mono text-[32px] font-bold text-primary-900">
                10k+
              </div>
              <div className="font-mono text-[11px] leading-snug text-secondary-500">
                Aset disewakan dengan keamanan protokol tingkat tinggi.
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
