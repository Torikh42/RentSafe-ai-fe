import Link from 'next/link';
import Image from 'next/image';
import { LogOut } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

interface MobileTopbarProps {
  visibleNav: NavItem[];
  pathname: string;
  onSignOut: () => void;
}

export function MobileTopbar({
  visibleNav,
  pathname,
  onSignOut,
}: MobileTopbarProps) {
  return (
    <div className="lg:hidden h-16 flex items-center justify-between px-6 border-b border-white/5 bg-primary-950/80 backdrop-blur-xl sticky top-0 z-20">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="relative w-7 h-7 rounded-lg bg-white overflow-hidden shadow-md">
          <Image
            src="/images/logo.jpg"
            alt="RentSafe AI"
            fill
            className="object-cover"
          />
        </div>
        <span className="font-bold text-white text-base tracking-tight">
          RentSafe <span className="text-accent-500">AI</span>
        </span>
      </Link>
      <div className="flex items-center gap-2.5">
        {visibleNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 rounded-xl text-sm transition-all duration-200 ${
              pathname === item.href
                ? 'bg-accent-500/15 text-accent-400 border border-accent-500/20'
                : 'text-primary-400 hover:text-white hover:bg-white/5'
            }`}
            title={item.label}
          >
            {item.icon}
          </Link>
        ))}
        <div className="w-px h-6 bg-white/10 mx-1" />
        <button
          onClick={onSignOut}
          className="p-2 rounded-xl text-primary-400 hover:text-error-400 hover:bg-error-500/10 transition-all duration-200"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
