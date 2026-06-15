'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { api } from '@/lib/api';
import { OverviewContent } from '@/components/dashboard/OverviewContent';

interface StatsData {
  properties: Array<{
    available: boolean;
    price: number;
    name?: string;
    address?: string;
  }>;
  bookings: Array<{
    status: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    property?: { name: string; price: number };
    tenant?: { name: string };
    landlord?: { name: string };
  }>;
  contracts: Array<{
    status: string;
    signedByTenant: boolean;
    createdAt: string;
    property?: { name: string };
  }>;
}

function DashboardLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-accent-500" />
      <p className="font-mono text-xs uppercase tracking-widest text-secondary-400 animate-pulse">
        Loading Overview...
      </p>
    </div>
  );
}

function DashboardContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const userRole = (session?.user as { role?: string })?.role ?? 'tenant';
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    if (session) {
      api.statistics
        .get()
        .then((res) => setStats(res.data as unknown as StatsData));
    }
  }, [session]);

  const handleAddPropertyRedirect = () => {
    router.push('/landlord/properties?add=true');
  };

  return (
    <div className="w-full">
      {/* Header and Title */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-primary-900">
            Portfolio Overview
          </h1>
          <p className="mt-1 text-sm text-secondary-500">
            Good morning. Here is what requires your attention today.
          </p>
        </div>
      </div>

      <OverviewContent
        userRole={userRole}
        properties={stats?.properties || []}
        bookings={stats?.bookings || []}
        contracts={stats?.contracts || []}
        onAddPropertyClick={handleAddPropertyRedirect}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
