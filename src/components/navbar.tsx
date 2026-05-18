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
      <nav className="sticky top-0 z-50 w-full border-b border-secondary-300 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-12 xl:px-16">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-primary-900 transition-colors hover:text-primary-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            RentSafe AI
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-[11px] font-semibold uppercase tracking-widest text-secondary-500 transition-colors hover:text-primary-900"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-6 md:flex">
            {session ? (
              <>
                <div className="flex items-center gap-2 border-r border-secondary-200 pr-6">
                  <span className="font-mono text-[11px] uppercase text-secondary-500">
                    USER:
                  </span>
                  <span className="font-mono text-[11px] font-bold text-primary-900">
                    {firstName}
                  </span>
                </div>

                {userRole === 'landlord' && (
                  <Link
                    href="/landlord/properties"
                    className="font-mono text-[11px] font-semibold uppercase tracking-widest text-secondary-600 hover:text-primary-900"
                  >
                    My Properties
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="rounded bg-primary-900 px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-800"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="rounded border border-secondary-300 bg-transparent px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-secondary-600 transition-colors hover:bg-secondary-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="font-mono text-[11px] font-semibold uppercase tracking-widest text-secondary-600 transition-colors hover:text-primary-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded bg-primary-900 px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-800"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {session && !isMobileMenuOpen && (
              <Link
                href="/dashboard"
                className="rounded bg-primary-900 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-800"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded border border-secondary-200 bg-secondary-50 text-primary-900 transition-colors hover:bg-secondary-100"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed inset-x-4 top-20 z-40 border border-secondary-300 bg-white p-6 shadow-none md:hidden"
          >
            <div className="flex flex-col gap-6">
              {/* Mobile Links */}
              <div className="flex flex-col gap-4 border-b border-secondary-200 pb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-mono text-[13px] font-semibold uppercase tracking-widest text-secondary-600 hover:text-primary-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="flex flex-col gap-3">
                {session ? (
                  <>
                    <div className="mb-2 font-mono text-[11px] text-secondary-500 uppercase">
                      Logged in as{' '}
                      <span className="font-bold text-primary-900">
                        {firstName}
                      </span>
                    </div>
                    {userRole === 'landlord' && (
                      <Link
                        href="/landlord/properties"
                        className="flex w-full items-center justify-center rounded border border-secondary-300 bg-secondary-50 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-primary-900 transition-colors hover:bg-secondary-100"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Properties
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      className="flex w-full items-center justify-center rounded bg-primary-900 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center justify-center rounded border border-secondary-300 bg-transparent py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-secondary-600 transition-colors hover:bg-secondary-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex w-full items-center justify-center rounded border border-secondary-300 bg-transparent py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-secondary-600 transition-colors hover:bg-secondary-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="flex w-full items-center justify-center rounded bg-primary-900 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Daftar
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
