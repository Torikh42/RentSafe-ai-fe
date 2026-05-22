import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function StatsBentoGrid() {
  return (
    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-12">
      {/* Main Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex h-full flex-col md:col-span-8"
      >
        <Card className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-md border-border/40 bg-white shadow-none">
          {/* Subtle background mesh glow */}
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#e38b29]/5 blur-3xl" />
          <CardContent className="relative z-10 flex h-full w-full flex-col justify-between p-8">
            <div className="mb-10 flex items-start gap-4">
              <div className="flex size-11 items-center justify-center rounded-sm border border-primary/10 bg-primary/5 text-primary">
                <Wallet className="size-5" />
              </div>
              <div className="flex-grow">
                <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Escrow Portfolio
                </p>
                <div className="flex flex-wrap items-baseline gap-3">
                  <p className="font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                    Rp 12.500.000
                  </p>
                  <Badge
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 font-mono text-[10px] font-medium text-emerald-700"
                  >
                    <TrendingUp className="mr-1 size-3" /> +12%
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-1 gap-8 border-t border-border/40 pt-8 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Secured in Contracts
                  </p>
                  <span className="font-mono text-[10px] font-bold text-primary">
                    80%
                  </span>
                </div>
                <p className="font-mono text-xl font-bold text-primary">
                  Rp 10.000.000
                </p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[80%] rounded-full bg-primary" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Available Liquidity
                  </p>
                  <span className="font-mono text-[10px] font-bold text-[#e38b29]">
                    20%
                  </span>
                </div>
                <p className="font-mono text-xl font-bold text-[#e38b29]">
                  Rp 2.500.000
                </p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[20%] rounded-full bg-[#e38b29]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Properties Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex h-full flex-col md:col-span-4"
      >
        <Link
          href="/landlord/properties"
          className="flex h-full flex-col justify-between focus:outline-none"
        >
          <Card className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-md border-border/40 bg-white p-8 shadow-none transition-colors hover:border-primary/20">
            <CardContent className="flex h-full flex-col justify-between p-0">
              <div className="w-full">
                <div className="mb-6 flex size-11 items-center justify-center rounded-sm border border-[#e38b29]/20 bg-[#e38b29]/10 text-[#e38b29]">
                  <Home className="size-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-primary">
                  Active Management
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Add and inspect properties under escrow compliance.
                </p>
              </div>

              <div className="mt-8 flex w-full items-end justify-between">
                <div>
                  <p className="font-mono text-6xl font-bold leading-none tracking-tighter text-primary">
                    02
                  </p>
                  <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Properties Active
                  </p>
                </div>
                <div className="flex size-9 items-center justify-center rounded-sm border border-border bg-muted/50 text-muted-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-active:scale-95">
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    </div>
  );
}
