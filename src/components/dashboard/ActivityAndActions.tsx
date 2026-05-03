import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

export function ActivityAndActions() {
  return (
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
            <Activity className="h-5 w-5 text-foreground-muted" /> Activity Log
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
            <AlertCircle className="h-5 w-5 text-accent-500" /> Critical Actions
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
  );
}
