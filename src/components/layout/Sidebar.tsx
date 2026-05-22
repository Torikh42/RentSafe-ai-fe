import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, ChevronRight, Home, LogOut } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

interface SidebarProps {
  visibleNav: NavItem[];
  pathname: string;
  firstName: string;
  roleLabel: string;
  onSignOut: () => void;
}

export function Sidebar({
  visibleNav,
  pathname,
  firstName,
  roleLabel,
  onSignOut,
}: SidebarProps) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');

  const checkActive = (href: string) => {
    if (href.includes('?tab=')) {
      const tabName = href.split('?tab=')[1];
      return currentTab === tabName;
    }
    if (href === '/dashboard') {
      return pathname === '/dashboard' && !currentTab;
    }
    return pathname === href;
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 border-r border-white/5 bg-[#030c24] text-white fixed inset-y-0 left-0 z-30">
      {/* Brand */}
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-white overflow-hidden shadow-lg shadow-black/20 group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.jpg"
              alt="RentSafe AI Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-tight text-white group-hover:text-accent-500 transition-colors">
              RentSafe <span className="text-accent-500">AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
              Enterprise Portal
            </span>
          </div>
        </Link>
      </div>

      {/* User profile card */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300 cursor-pointer group">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center p-[2px]">
              <div className="w-full h-full rounded-full bg-[#030c24] flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success-500 border-2 border-[#030c24] shadow-sm" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate leading-none mb-1">
              {firstName}
            </p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-500/10 text-accent-400 border border-accent-500/20">
              {roleLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
          Management
        </p>
        {visibleNav.map((item) => {
          const isActive = checkActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group relative ${
                isActive
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent-500 rounded-r-full shadow-[0_0_12px_rgba(227,139,41,0.5)]"
                />
              )}
              <span
                className={
                  isActive
                    ? 'text-accent-500'
                    : 'text-gray-400 group-hover:text-white transition-colors'
                }
              >
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto text-accent-500/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="p-6 border-t border-white/5 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-error-400 hover:bg-error-500/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
