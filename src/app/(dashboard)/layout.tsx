'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Loader2,
  Building2,
  LayoutDashboard,
  ChevronRight,
  LogOut,
  User,
  Home,
  ShieldCheck,
} from 'lucide-react';
import { signOut } from '@/lib/auth-client';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
    roles: ['landlord', 'tenant', 'admin'],
  },
  {
    label: 'My Properties',
    href: '/landlord/properties',
    icon: <Building2 className="w-4 h-4" />,
    roles: ['landlord'],
  },
];

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, mounted, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!mounted || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-14 w-14 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping" />
            <Loader2 className="h-7 w-7 animate-spin text-teal-400" />
          </div>
          <p className="text-sm text-zinc-500 tracking-widest uppercase">Authenticating</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const userRole = (session.user as { role?: string }).role ?? 'tenant';
  const visibleNav = NAV_ITEMS.filter((item) => item.roles.includes(userRole));
  const firstName = session.user.name?.split(' ')[0] ?? 'User';
  const roleLabel = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* ─── Sidebar ─────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-zinc-950/80 backdrop-blur-xl fixed inset-y-0 left-0 z-30">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-shadow">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white tracking-tight">RentSafe</span>
          </Link>
        </div>

        {/* User card */}
        <div className="px-4 py-5 border-b border-white/5">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-500/20">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{firstName}</p>
              <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-widest text-teal-400">
                {roleLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-3">
            Menu
          </p>
          {visibleNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-300'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-teal-400 rounded-full"
                  />
                )}
                <span className={isActive ? 'text-teal-400' : 'text-zinc-500 group-hover:text-zinc-300 transition-colors'}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-teal-500/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all"
          >
            <Home className="w-4 h-4 text-zinc-500" />
            Back to Home
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─────────────────────────────────── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile topbar */}
        <div className="lg:hidden h-14 flex items-center justify-between px-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-teal-500 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white text-sm">RentSafe</span>
          </Link>
          <div className="flex items-center gap-2">
            {visibleNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  pathname === item.href
                    ? 'bg-teal-500/15 text-teal-400'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                }`}
                title={item.label}
              >
                {item.icon}
              </Link>
            ))}
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex-1 p-6 lg:p-10"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
