import { motion } from 'framer-motion';
import { Building2, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PropertiesStatsProps {
  total: number;
  available: number;
  occupied: number;
}

export function PropertiesStats({
  total,
  available,
  occupied,
}: PropertiesStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-3"
    >
      {[
        {
          label: 'Total Assets',
          value: total,
          icon: Building2,
          accent: 'text-primary',
          bg: 'bg-primary/5',
        },
        {
          label: 'Available Units',
          value: available,
          icon: LayoutGrid,
          accent: 'text-[#e38b29]',
          bg: 'bg-[#e38b29]/10',
        },
        {
          label: 'Active Tenancies',
          value: occupied,
          icon: SlidersHorizontal,
          accent: 'text-emerald-600',
          bg: 'bg-emerald-50',
        },
      ].map((stat) => (
        <Card
          key={stat.label}
          className="group relative overflow-hidden rounded-md border-border/40 bg-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/20"
        >
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
              <p
                className={`font-mono text-4xl font-bold tracking-tight ${stat.accent}`}
              >
                {stat.value}
              </p>
            </div>
            <div className={`rounded-sm p-4 transition-colors ${stat.bg}`}>
              <stat.icon className={`size-6 ${stat.accent}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
