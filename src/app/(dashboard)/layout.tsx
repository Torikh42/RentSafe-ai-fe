'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, Building2, LayoutDashboard } from 'lucide-react';
import { signOut } from '@/lib/auth-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileTopbar } from '@/components/layout/MobileTopbar';

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
      <div className="flex min-h-screen items-center justify-center bg-primary-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-14 w-14 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-accent-500/20 animate-ping" />
            <Loader2 className="h-7 w-7 animate-spin text-accent-500" />
          </div>
          <p className="text-sm text-primary-300 tracking-widest uppercase font-medium animate-pulse">
            Authenticating
          </p>
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
    <div className="flex min-h-screen bg-primary-950 text-white selection:bg-accent-500/30">
      <Sidebar
        visibleNav={visibleNav}
        pathname={pathname}
        firstName={firstName}
        roleLabel={roleLabel}
        onSignOut={handleSignOut}
      />

      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <MobileTopbar
          visibleNav={visibleNav}
          pathname={pathname}
          onSignOut={handleSignOut}
        />

        {/* Page content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1 p-6 lg:p-12"
          >
            {/* Background mesh for content area */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30">
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-500/10 blur-[120px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-500/10 blur-[120px]" />
            </div>

            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
