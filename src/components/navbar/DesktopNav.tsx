import Link from 'next/link';

interface NavLink {
  name: string;
  href: string;
}

interface DesktopNavProps {
  navLinks: NavLink[];
  session: unknown;
  firstName: string;
  userRole: string | undefined;
  handleSignOut: () => Promise<void>;
}

export function DesktopNav({
  navLinks,
  session,
  firstName,
  userRole,
  handleSignOut,
}: DesktopNavProps) {
  return (
    <>
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
    </>
  );
}
