import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary-500 selection:text-white">
      {/* Background Decor */}
      <div className="bg-mesh absolute inset-0 z-0" />
      <div className="noise absolute inset-0 z-10" />
      
      {/* Navigation Bar (Floating) */}
      <nav className="fixed top-6 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 px-4">
        <div className="glass flex items-center justify-between rounded-full px-6 py-3">
          <div className="font-display text-xl font-bold text-primary-600">RentSafe</div>
          <div className="hidden gap-6 text-sm font-medium md:flex">
            <Link href="/properties" className="hover:text-primary-500 transition-colors">Properties</Link>
            <Link href="/how-it-works" className="hover:text-primary-500 transition-colors">Safety</Link>
            <Link href="/ai-insure" className="hover:text-primary-500 transition-colors">AI Insure</Link>
          </div>
          <Link 
            href="/login" 
            className="rounded-full bg-secondary-900 px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 dark:bg-primary-500"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">
        <div className="animate-fade-in mb-6 flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/50 px-4 py-1 text-sm font-medium text-primary-700 backdrop-blur-sm dark:border-primary-800 dark:bg-primary-950/30 dark:text-primary-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
          </span>
          AI-Powered Security for Property Rental
        </div>
        
        <h1 className="font-display animate-slide-up mb-6 max-w-4xl text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
          Sewa Properti <br /> 
          <span className="italic text-primary-600">Tanpa Sengketa.</span>
        </h1>
        
        <p className="animate-slide-up mx-auto mb-10 max-w-2xl text-lg text-foreground-muted [animation-delay:200ms] md:text-xl">
          Solusi cerdas berbasis AI untuk deposit dan kontrak sewa. 
          Lindungi aset Anda dengan Smart Escrow dan Gemini Vision Inspection.
        </p>

        <div className="animate-slide-up flex flex-col items-center gap-4 [animation-delay:400ms] sm:flex-row sm:gap-6">
          <Link
            href="/properties"
            className="group relative flex h-14 items-center justify-center overflow-hidden rounded-2xl bg-primary-600 px-8 text-lg font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-2xl hover:shadow-primary-500/30"
          >
            Cari Properti
            <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/register"
            className="flex h-14 items-center justify-center rounded-2xl border border-border bg-surface/50 px-8 text-lg font-medium transition-all hover:bg-surface hover:shadow-lg"
          >
            Daftar Tenant
          </Link>
        </div>
      </section>

      {/* Trust & Stats (Bento Style) */}
      <section className="container relative z-20 mx-auto px-4 py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Main Stat Card */}
          <div className="glass animate-slide-up group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 [animation-delay:100ms] md:col-span-8">
            <div className="relative z-10">
              <span className="mb-4 inline-block text-4xl">🛡️</span>
              <h2 className="font-display mb-4 text-3xl font-medium">Standard Keamanan Baru</h2>
              <p className="max-w-md text-foreground-muted">
                Kami menggabungkan Smart Contracts dengan AI Vision untuk memastikan kondisi properti tercatat sempurna sebelum dan sesudah masa sewa.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary-600">95%</div>
                <p className="text-sm text-foreground-muted">Cost Efficiency</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">10k+</div>
                <p className="text-sm text-foreground-muted">Verified Property</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">24/7</div>
                <p className="text-sm text-foreground-muted">AI Dispute Resolution</p>
              </div>
            </div>
            {/* Visual Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl transition-all group-hover:bg-primary-500/20" />
          </div>

          {/* Side Card 1 */}
          <div className="glass animate-slide-up flex flex-col items-center justify-center rounded-3xl p-8 text-center [animation-delay:200ms] md:col-span-4">
            <div className="mb-4 text-5xl font-bold text-secondary-900 dark:text-primary-400">98%</div>
            <p className="font-medium text-foreground">Sengketa Selesai Cepat</p>
            <p className="mt-2 text-sm text-foreground-muted">Dispute deposit diselesaikan dalam hitungan jam, bukan minggu.</p>
          </div>

          {/* Side Card 2 */}
          <div className="glass animate-slide-up bg-secondary-900 p-8 text-white [animation-delay:300ms] md:col-span-4 dark:bg-primary-600">
             <div className="flex h-full flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl">Gemini AI <br /> Inspection</h3>
                  <p className="mt-4 text-sm opacity-80">Gunakan kamera HP untuk dokumentasi. AI kami mendeteksi kerusakan secara real-time.</p>
                </div>
                <div className="mt-8 flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-secondary-900 bg-secondary-700 dark:border-primary-600" />
                  ))}
                  <div className="flex h-8 items-center pl-4 text-xs font-medium">+1.2k checked today</div>
                </div>
             </div>
          </div>

          {/* Side Card 3 */}
          <div className="glass animate-slide-up rounded-3xl p-8 [animation-delay:400ms] md:col-span-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex-1">
                <h3 className="font-display text-2xl font-medium">Smart Escrow System</h3>
                <p className="mt-2 text-foreground-muted text-sm">
                  Uang deposit Anda tidak langsung ke pemilik properti. Disimpan di Smart Escrow dan dilepaskan hanya setelah verifikasi AI selesai.
                </p>
              </div>
              <div className="flex h-24 items-center justify-center rounded-2xl bg-surface p-4 shadow-inner dark:bg-secondary-900 md:w-48">
                <div className="flex items-end gap-1">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className="h-10 w-2 animate-float rounded-full bg-primary-500" style={{ animationDelay: `${i * 200}ms` }} />
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-border bg-surface/30 py-12 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="font-display text-2xl font-bold text-primary-600">RentSafe</div>
            <div className="flex gap-8 text-sm text-foreground-muted">
              <Link href="#" className="hover:text-primary-500">Twitter</Link>
              <Link href="#" className="hover:text-primary-500">Instagram</Link>
              <Link href="#" className="hover:text-primary-500">LinkedIn</Link>
            </div>
            <div className="text-sm text-foreground-muted">
              © 2026 RentSafe AI. Crafting trust in rentals.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
