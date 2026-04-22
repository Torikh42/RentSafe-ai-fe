import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 px-4">
      <div className="glass flex items-center justify-between rounded-full px-6 py-3">
        <div className="font-display text-xl font-bold text-primary-600">
          RentSafe
        </div>
        <div className="hidden gap-6 text-sm font-medium md:flex">
          <Link
            href="/properties"
            className="hover:text-primary-500 transition-colors"
          >
            Properties
          </Link>
          <Link
            href="/how-it-works"
            className="hover:text-primary-500 transition-colors"
          >
            Safety
          </Link>
          <Link
            href="/ai-insure"
            className="hover:text-primary-500 transition-colors"
          >
            AI Insure
          </Link>
        </div>
        <Link
          href="/login"
          className="rounded-full bg-secondary-900 px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 dark:bg-primary-500"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
