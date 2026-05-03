import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface DashboardHeaderProps {
  firstName: string;
}

export function DashboardHeader({ firstName }: DashboardHeaderProps) {
  return (
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
        <Link href="/landlord/properties">
          <button className="group relative flex h-12 items-center justify-center overflow-hidden rounded-xl bg-accent-500 px-6 font-medium text-white transition-all hover:bg-accent-600 shadow-sm active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Manage Properties
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </Link>
      </motion.div>
    </header>
  );
}
