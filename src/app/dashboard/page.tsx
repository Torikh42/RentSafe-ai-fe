'use client';

import { useSession } from '@/lib/auth-client';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsBentoGrid } from '@/components/dashboard/StatsBentoGrid';
import { ActivityAndActions } from '@/components/dashboard/ActivityAndActions';

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'User';
  const firstName = userName.split(' ')[0];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <DashboardHeader firstName={firstName} />
      <StatsBentoGrid />
      <ActivityAndActions />
    </div>
  );
}
