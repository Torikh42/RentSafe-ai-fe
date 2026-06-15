'use client';

import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useUiStore } from '@/store/ui-store';
import { DesktopNav } from './navbar/DesktopNav';
import { MobileMenuOverlay } from './navbar/MobileMenuOverlay';

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

          <DesktopNav
            navLinks={navLinks}
            session={session}
            firstName={firstName}
            userRole={userRole}
            handleSignOut={handleSignOut}
          />

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
        <MobileMenuOverlay
          isMobileMenuOpen={isMobileMenuOpen}
          navLinks={navLinks}
          session={session}
          firstName={firstName}
          userRole={userRole}
          setMobileMenuOpen={setMobileMenuOpen}
          handleSignOut={handleSignOut}
        />
      </AnimatePresence>
    </>
  );
}
