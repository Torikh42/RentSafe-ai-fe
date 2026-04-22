import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-border bg-surface/30 py-12 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="font-display text-2xl font-bold text-primary-600">
            RentSafe
          </div>
          <div className="flex gap-8 text-sm text-foreground-muted">
            <Link href="#" className="hover:text-primary-500">
              Twitter
            </Link>
            <Link href="#" className="hover:text-primary-500">
              Instagram
            </Link>
            <Link href="#" className="hover:text-primary-500">
              LinkedIn
            </Link>
          </div>
          <div className="text-sm text-foreground-muted">
            © 2026 RentSafe AI. Crafting trust in rentals.
          </div>
        </div>
      </div>
    </footer>
  );
}
