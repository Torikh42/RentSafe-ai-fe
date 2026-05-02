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
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'User';
  const firstName = userName.split(' ')[0];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <header className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-accent-500/10 text-accent-500">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <span className="text-[11px] font-semibold tracking-widest text-accent-500 uppercase">
              RentSafe AI System
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl text-foreground">
            Welcome back,{' '}
            <span className="text-accent-500 italic">{firstName}</span>.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button className="group relative flex h-12 items-center justify-center overflow-hidden rounded-xl bg-accent-500 px-6 font-medium text-white transition-all hover:bg-accent-600 shadow-sm active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              New Inspection{' '}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </header>

      {/* Stats Bento Grid */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Main Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm md:col-span-8 min-h-[280px] flex flex-col justify-between"
        >
          {/* Subtle glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-500/5 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="mb-10 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-300">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                  Escrow Portfolio
                </p>
                <div className="flex items-baseline gap-3">
                  <p className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                    Rp 12.5M
                  </p>
                  <span className="flex items-center gap-1 text-xs font-medium text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/30 px-2.5 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3" /> +12%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-border pt-8">
              <div className="space-y-2">
                <p className="text-[11px] text-foreground-muted font-medium uppercase tracking-wider">
                  Secured in Contracts
                </p>
                <p className="text-xl font-semibold text-foreground">
                  Rp 10.000.000
                </p>
                <div className="w-full h-1 bg-secondary rounded-full mt-2 overflow-hidden">
                  <div className="w-[80%] h-full bg-accent-500 rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] text-foreground-muted font-medium uppercase tracking-wider">
                  Available Liquidity
                </p>
                <p className="text-xl font-semibold text-accent-500">
                  Rp 2.500.000
                </p>
                <div className="w-full h-1 bg-secondary rounded-full mt-2 overflow-hidden">
                  <div className="w-[20%] h-full bg-primary-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Properties Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm md:col-span-4 flex flex-col group cursor-pointer hover:border-accent-500/30 transition-colors"
        >
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-auto">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground-muted">
                <Home className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Active Management
              </h3>
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="font-display text-6xl font-bold text-foreground leading-none tracking-tight">
                  02
                </p>
                <p className="mt-2 text-xs font-medium text-foreground-muted">
                  Properties Active
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-hover text-foreground-muted group-hover:bg-accent-500 group-hover:text-white group-hover:border-accent-500 transition-all">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid: Activity & Inspections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border border-border bg-surface p-8 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Activity className="h-5 w-5 text-foreground-muted" /> Activity
              Log
            </h3>
            <Link
              href="/dashboard/activity"
              className="group flex items-center gap-1 text-xs font-medium text-foreground-muted hover:text-accent-500 transition-colors"
            >
              View All{' '}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Rent Collection: Apt. Sudirman',
                date: '09:41 AM • Automatic Escrow',
                amount: 'Rp 5.0M',
                status: 'Completed',
                icon: <CheckCircle2 className="w-4 h-4 text-success-600" />,
              },
              {
                title: 'Deposit Refund: Kos Kebon Jeruk',
                date: 'Yesterday • Manual Release',
                amount: 'Rp 2.0M',
                status: 'Processed',
                icon: <Clock className="w-4 h-4 text-foreground-muted" />,
              },
              {
                title: 'AI Inspection: Apt. Sudirman',
                date: '12 Oct • System Generated',
                amount: 'Verified',
                status: 'Active',
                icon: <ShieldCheck className="w-4 h-4 text-accent-500" />,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface-hover/50 hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface border border-border">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-foreground-muted mt-0.5">
                      {item.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-foreground">
                    {item.amount}
                  </p>
                  <p className="text-[10px] font-medium text-foreground-muted mt-0.5">
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Inspections / Pending Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between relative z-10">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <AlertCircle className="h-5 w-5 text-accent-500" /> Critical
              Actions
            </h3>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="group flex flex-col gap-4 rounded-xl border border-accent-500/20 bg-accent-50/50 dark:bg-accent-500/5 p-6 hover:bg-accent-50 dark:hover:bg-accent-500/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-100 dark:bg-accent-900/50 text-accent-600 dark:text-accent-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                    <p className="text-[10px] font-bold text-accent-600 dark:text-accent-400 uppercase tracking-widest">
                      Inspection Alert
                    </p>
                  </div>
                  <p className="text-base font-semibold text-foreground leading-tight">
                    AI Move-out Verification Required
                  </p>
                </div>
              </div>

              <p className="text-sm text-foreground-muted leading-relaxed">
                Kos Kebon Jeruk contract terminates in{' '}
                <span className="font-semibold text-foreground">48 hours</span>.
                Complete the visual condition report to secure deposit release.
              </p>

              <div className="pt-2">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground text-background py-2.5 text-sm font-medium transition-opacity hover:opacity-90">
                  Execute AI Inspection <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-foreground-muted uppercase tracking-wider pt-2">
              <ShieldCheck className="w-3.5 h-3.5" /> All other systems
              operational
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
