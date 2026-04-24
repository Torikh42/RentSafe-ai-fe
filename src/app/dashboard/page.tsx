'use client';

import { useSession } from '@/lib/auth-client';
import {
  ShieldCheck,
  Wallet,
  FileText,
  AlertCircle,
  ArrowRight,
  Home,
  Activity,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'Tenant';

  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <header className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/20 text-xs text-primary-500">
              <ShieldCheck className="h-3 w-3" />
            </span>
            <span className="text-sm font-semibold tracking-wider text-primary-600 uppercase">
              Verified Tenant
            </span>
          </div>
          <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
            Welcome back,
            <br />
            <span className="italic text-primary-500">{userName}.</span>
          </h1>
        </div>
        <button className="group relative flex h-12 items-center justify-center overflow-hidden rounded-xl bg-foreground px-6 font-medium text-background transition-all hover:scale-105 hover:shadow-2xl hover:shadow-foreground/20">
          <span className="relative z-10 flex items-center gap-2">
            New Contract{' '}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </header>

      {/* Stats Bento Grid */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Main Balance Card */}
        <div className="glass group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl md:col-span-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl transition-all group-hover:bg-primary-500/30" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/20 text-primary-500 shadow-inner">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground-muted">
                  Total Escrow Balance
                </p>
                <p className="font-display text-4xl font-bold tracking-tight">
                  Rp 12.500.000
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">
                  Secured in Contract
                </p>
                <p className="text-xl font-medium">Rp 10.000.000</p>
              </div>
              <div>
                <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">
                  Available to Withdraw
                </p>
                <p className="text-xl font-medium text-primary-400">
                  Rp 2.500.000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Properties Card */}
        <div className="glass relative overflow-hidden rounded-3xl border border-white/10 bg-surface/40 p-8 shadow-xl md:col-span-4">
          <div className="flex h-full flex-col">
            <div className="mb-auto">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-500">
                <Home className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl font-medium">
                Active Rentals
              </h3>
            </div>
            <div className="mt-8">
              <p className="font-display text-6xl font-bold text-foreground">
                2
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                Properties currently under active smart contracts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Activity & Inspections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-3xl border border-border bg-surface/20 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display flex items-center gap-2 text-xl font-medium">
              <Activity className="h-5 w-5 text-primary-500" /> Recent Activity
            </h3>
            <Link
              href="/dashboard/activity"
              className="text-sm font-medium text-primary-500 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Rent Paid: Apt. Sudirman',
                date: 'Today, 09:41 AM',
                amount: '- Rp 5.000.000',
                positive: false,
              },
              {
                title: 'Deposit Refund: Kos Kebon Jeruk',
                date: 'Yesterday, 14:20 PM',
                amount: '+ Rp 2.000.000',
                positive: true,
              },
              {
                title: 'Contract Signed: Apt. Sudirman',
                date: 'Oct 12, 10:00 AM',
                amount: 'Active',
                positive: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-foreground-muted">{item.date}</p>
                </div>
                <div
                  className={`font-semibold ${item.positive ? 'text-primary-400' : 'text-foreground'}`}
                >
                  {item.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Inspections */}
        <div className="relative overflow-hidden rounded-3xl border border-error-500/20 bg-error-500/5 p-8">
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-error-500/10 blur-3xl" />
          <div className="mb-6 flex items-center justify-between relative z-10">
            <h3 className="font-display flex items-center gap-2 text-xl font-medium">
              <AlertCircle className="h-5 w-5 text-error-500" /> Pending Actions
            </h3>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-error-500/30 bg-error-500/10 p-5 transition-all hover:bg-error-500/20">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-error-500/20 text-error-500">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-error-600 dark:text-error-400">
                  AI Move-out Inspection Required
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  Kos Kebon Jeruk contract ends in 3 days. Please upload current
                  condition photos.
                </p>
                <button className="mt-3 flex items-center gap-1 text-sm font-semibold text-error-500 transition-transform group-hover:translate-x-1">
                  Start Inspection <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
