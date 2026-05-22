'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandlordPropertiesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?tab=properties');
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="animate-pulse font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Redirecting...
      </div>
    </div>
  );
}
