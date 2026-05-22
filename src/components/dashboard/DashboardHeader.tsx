import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  firstName: string;
}

export function DashboardHeader({ firstName }: DashboardHeaderProps) {
  return (
    <header className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-border/40 pb-8 md:flex-row md:items-end">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col gap-1.5"
      >
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-sm border-primary/20 bg-primary/5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
            <ShieldCheck data-icon="inline-start" className="mr-1 text-primary" />
            RentSafe AI System
          </Badge>
        </div>
        <h1 className="font-sans text-3xl font-semibold tracking-tight text-primary md:text-4xl">
          Welcome back, <span className="font-medium text-[#e38b29]">{firstName}</span>.
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor your property compliance, escrow transactions, and rental activities.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Button asChild size="lg" className="rounded-sm bg-primary font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-sm hover:bg-primary/90">
          <Link href="/landlord/properties">
            Manage Properties
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </motion.div>
    </header>
  );
}
