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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ActivityAndActions() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="h-full rounded-md border-border/40 bg-white shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-8 pb-4 pt-6">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-primary">
              <Activity className="size-5 text-muted-foreground" /> Activity Log
            </CardTitle>
            <Link
              href="/dashboard/activity"
              className="group flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-[#e38b29]"
            >
              View All{' '}
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-0">
            <div className="flex flex-col">
              {[
                {
                  title: 'Rent Collection: Apt. Sudirman',
                  date: '09:41 AM • Automatic Escrow',
                  amount: 'Rp 5.000.000',
                  status: 'Completed',
                  icon: <CheckCircle2 className="size-4 text-emerald-600" />,
                  badgeBg: 'border-emerald-100 bg-emerald-50 text-emerald-700',
                },
                {
                  title: 'Deposit Refund: Kos Kebon Jeruk',
                  date: 'Yesterday • Manual Release',
                  amount: 'Rp 2.000.000',
                  status: 'Processed',
                  icon: <Clock className="size-4 text-muted-foreground" />,
                  badgeBg: 'border-border bg-muted/50 text-muted-foreground',
                },
                {
                  title: 'AI Inspection: Apt. Sudirman',
                  date: '12 Oct • System Generated',
                  amount: 'Verified',
                  status: 'Active',
                  icon: <ShieldCheck className="size-4 text-[#e38b29]" />,
                  badgeBg: 'border-[#e38b29]/20 bg-[#e38b29]/10 text-[#e38b29]',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-center justify-between border-t border-border/40 py-4 transition-colors duration-150 hover:bg-muted/30 ${
                    index === 2 ? 'mb-2 border-b' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-border bg-muted/20">
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold leading-none text-primary">
                        {item.title}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="font-mono text-sm font-bold text-primary">
                      {item.amount}
                    </p>
                    <Badge variant="outline" className={`rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider ${item.badgeBg}`}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Inspections / Pending Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="relative h-full overflow-hidden rounded-md border-border/40 bg-white shadow-none">
          {/* Subtle decorative glow */}
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#e38b29]/5 blur-3xl" />

          <CardHeader className="relative z-10 px-8 pb-4 pt-6">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-primary">
              <AlertCircle className="size-5 animate-pulse text-[#e38b29]" /> Critical Actions
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10 flex flex-col gap-4 px-8 pb-8 pt-0">
            <div className="group flex flex-col gap-4 rounded-sm border border-[#e38b29]/20 bg-[#e38b29]/5 p-6 transition-colors hover:bg-[#e38b29]/10">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-[#e38b29]/20 bg-[#e38b29]/10 text-[#e38b29]">
                  <FileText className="size-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 animate-ping rounded-full bg-[#e38b29]" />
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#e38b29]">
                      Inspection Alert
                    </p>
                  </div>
                  <p className="text-base font-bold leading-tight text-primary">
                    AI Move-out Verification Required
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Kos Kebon Jeruk contract terminates in{' '}
                <span className="font-mono font-bold text-primary">48 hours</span>.
                Complete the visual condition report to secure deposit release.
              </p>

              <div className="pt-2">
                <Button className="w-full rounded-sm bg-primary font-mono text-[11px] font-semibold uppercase tracking-widest shadow-sm hover:bg-primary/90">
                  Execute AI Inspection <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 font-mono text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
              <ShieldCheck className="size-3.5 text-emerald-600" /> All other systems operational
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
