import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Home, ArrowRight } from 'lucide-react';

export function StatsBentoGrid() {
  return (
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
  );
}
