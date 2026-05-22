'use client';

import { Search, Bell, Grid, User } from 'lucide-react';
import { useSession } from '@/lib/auth-client';

export function DashboardTopBar() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'Admin';

  return (
    <div className="flex w-full items-center justify-between border-b border-secondary-100 bg-white px-8 py-4 shadow-sm/5 backdrop-blur-md">
      {/* Search Input */}
      <div className="relative flex w-full max-w-md items-center">
        <Search className="absolute left-3.5 h-4.5 w-4.5 text-secondary-400" />
        <input
          type="text"
          placeholder="Search properties, tenants, or transactions..."
          className="w-full rounded-full border border-secondary-200 bg-secondary-50/50 py-2 pl-11 pr-4 text-xs font-medium text-primary-900 placeholder-secondary-400 outline-none transition-all duration-200 focus:border-primary-400 focus:bg-white focus:ring-1 focus:ring-primary-400/20"
        />
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-secondary-100 text-secondary-600 transition-colors hover:bg-secondary-50 hover:text-primary-900">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
        </button>

        {/* Apps Grid */}
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary-100 text-secondary-600 transition-colors hover:bg-secondary-50 hover:text-primary-900">
          <Grid className="h-4.5 w-4.5" />
        </button>

        <div className="h-6 w-px bg-secondary-200" />

        {/* Profile Card */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={userName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-4 w-4" />
            )}
          </div>
          <span className="text-xs font-bold text-primary-900">{userName}</span>
        </div>
      </div>
    </div>
  );
}
