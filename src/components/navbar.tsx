'use client';

import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/types/framer-motion';
import { useUiStore } from '@/store/ui-store';

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const isMobileMenuOpen = useUiStore((state) => state.isMobileMenuOpen);
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    setMobileMenuOpen(false);
  };

  const firstName = session?.user?.name?.split(' ')[0] || 'Tenant';
  const userRole = (session?.user as { role?: string } | undefined)?.role;

  const navLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'Safety', href: '/how-it-works' },
    { name: 'AI Insure', href: '/ai-insure' },
  ];

  return (
    <>
      <nav className="fixed top-6 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 px-4">
        <div className="glass flex items-center justify-between rounded-full px-4 py-2 sm:px-6 sm:py-3">
          <Link
            href="/"
            className="font-display text-xl font-bold text-primary-600 transition-colors hover:text-primary-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            RentSafe
          </Link>

          {/* Desktop Links */}
          <div className="hidden gap-6 text-sm font-medium md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-primary-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {session ? (
              <>
                <span className="text-sm font-medium text-foreground-muted">
                  Hello, <span className="text-foreground">{firstName}</span>
                </span>
                {userRole === 'landlord' && (
                  <Link
                    href="/landlord/properties"
                    className="rounded-full border border-primary-600/40 bg-primary-600/10 px-4 py-1.5 text-xs font-semibold text-primary-400 transition-all hover:bg-primary-600/20"
                  >
                    My Properties
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="rounded-full bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs font-semibold transition-all hover:bg-surface hover:text-error-500"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-secondary-900 px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 dark:bg-primary-500"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            {session && !isMobileMenuOpen && (
              <Link
                href="/dashboard"
                className="rounded-full bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-primary-700"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/50 text-foreground transition-colors hover:bg-surface"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-4 top-24 z-40 rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-black/60"
          >
            <div className="flex flex-col gap-6">
              {/* Mobile Links */}
              <div className="flex flex-col gap-4 text-lg font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="border-b border-border/50 pb-2 hover:text-primary-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="flex flex-col gap-3 pt-2">
                {session ? (
                  <>
                    <div className="mb-2 text-sm font-medium text-foreground-muted">
                      Logged in as{' '}
                      <span className="text-foreground">{firstName}</span>
                    </div>
                    {userRole === 'landlord' && (
                      <Link
                        href="/landlord/properties"
                        className="flex w-full items-center justify-center rounded-xl border border-primary-600/40 bg-primary-600/10 py-3 text-sm font-semibold text-primary-400 transition-all hover:bg-primary-600/20"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Properties
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      className="flex w-full items-center justify-center rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center justify-center rounded-xl border border-error-200 bg-error-50 py-3 text-sm font-semibold text-error-600 transition-all hover:bg-error-100 dark:border-error-900/50 dark:bg-error-900/20 dark:hover:bg-error-900/40"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex w-full items-center justify-center rounded-xl bg-secondary-900 py-3 text-sm font-semibold text-white transition-all hover:bg-secondary-800 dark:bg-primary-500 dark:hover:bg-primary-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="flex w-full items-center justify-center rounded-xl border border-border bg-surface py-3 text-sm font-semibold transition-all hover:bg-surface/80"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
