import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-display mb-4 text-5xl font-bold text-secondary-800">
            RentSafe AI
          </h1>
          <p className="mb-4 text-xl text-primary-600">
            Platform sewa properti dengan perlindungan AI
          </p>
          <p className="mx-auto mb-8 max-w-2xl text-[var(--foreground-muted)]">
            Solusi cerdas untuk sengketa deposit dan kontrak sewa. Dengan AI
            Smart Contract, Inspection Otomatis, dan Escrow System.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/properties"
              className="rounded-lg bg-primary-500 px-6 py-3 text-white shadow-md transition hover:bg-primary-600 hover:shadow-lg"
            >
              Cari Properti
            </Link>
            <Link
              href="/register"
              className="rounded-lg border border-primary-500 px-6 py-3 text-primary-600 transition hover:bg-primary-50"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="bg-[var(--surface)] hover:bg-[var(--surface-hover)] rounded-lg p-6 shadow-md transition hover:shadow-lg">
            <div className="mb-4 text-4xl">🔒</div>
            <h3 className="font-display mb-2 text-xl font-semibold text-secondary-800">
              Smart Escrow
            </h3>
            <p className="text-[var(--foreground-muted)]">
              Deposit aman dalam escrow. Dirilis otomatis berdasarkan AI
              verdict.
            </p>
          </div>

          <div className="bg-[var(--surface)] hover:bg-[var(--surface-hover)] rounded-lg p-6 shadow-md transition hover:shadow-lg">
            <div className="mb-4 text-4xl">📝</div>
            <h3 className="font-display mb-2 text-xl font-semibold text-secondary-800">
              AI Smart Contract
            </h3>
            <p className="text-[var(--foreground-muted)]">
              Kontrak sewa KUHPerdata-compliant dalam 5 menit. Fairness score
              otomatis.
            </p>
          </div>

          <div className="bg-[var(--surface)] hover:bg-[var(--surface-hover)] rounded-lg p-6 shadow-md transition hover:shadow-lg">
            <div className="mb-4 text-4xl">📸</div>
            <h3 className="font-display mb-2 text-xl font-semibold text-secondary-800">
              AI Inspection
            </h3>
            <p className="text-[var(--foreground-muted)]">
              Dokumentasi kondisi properti dengan Gemini Vision. Deteksi
              kerusakan otomatis.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 rounded-2xl bg-secondary-800 px-8 py-12 text-center text-white shadow-lg">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="font-display text-accent-500 text-4xl font-bold">95%</div>
              <div className="mt-2 text-primary-100">
                Lebih murah dari pengacara
              </div>
            </div>
            <div>
              <div className="font-display text-accent-500 text-4xl font-bold">98%</div>
              <div className="mt-2 text-primary-100">Lebih cepat penyelesaian</div>
            </div>
            <div>
              <div className="font-display text-accent-500 text-4xl font-bold">9.3jt</div>
              <div className="mt-2 text-primary-100">Mahasiswa di Indonesia</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-[var(--border)] bg-[var(--surface)] border-t py-8">
        <div className="container mx-auto px-4 text-center text-[var(--foreground-muted)]">
          <p>© 2026 RentSafe AI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
