import Link from 'next/link';
import { MotionDiv } from '@/types/framer-motion';

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuOverlayProps {
  isMobileMenuOpen: boolean;
  navLinks: NavLink[];
  session: unknown;
  firstName: string;
  userRole: string | undefined;
  setMobileMenuOpen: (open: boolean) => void;
  handleSignOut: () => Promise<void>;
}

export function MobileMenuOverlay({
  isMobileMenuOpen,
  navLinks,
  session,
  firstName,
  userRole,
  setMobileMenuOpen,
  handleSignOut,
}: MobileMenuOverlayProps) {
  if (!isMobileMenuOpen) return null;

  return (
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
                <span className="font-bold text-primary-900">{firstName}</span>
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
  );
}
