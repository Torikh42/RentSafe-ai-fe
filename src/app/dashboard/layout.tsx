'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Navbar } from '@/components/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, mounted, router]);

  // Loading state with visual flair
  if (!mounted || isPending) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
        <div className="bg-mesh absolute inset-0 z-0 opacity-30" />
        <div className="noise absolute inset-0 z-10" />
        <div className="relative z-20 flex flex-col items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute h-full w-full animate-ping rounded-full bg-primary-500/20" />
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          </div>
          <p className="font-display animate-pulse text-lg tracking-tight text-primary-600">
            Verifying Identity...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background Decor */}
      <div className="bg-mesh absolute inset-0 z-0 opacity-20" />
      <div className="noise absolute inset-0 z-10" />

      <div className="relative z-20 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">{children}</main>
      </div>
    </div>
  );
}
