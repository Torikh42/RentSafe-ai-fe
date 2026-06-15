import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatItem {
  title: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

interface OverviewStatsCardsProps {
  stats: StatItem[];
}

export function OverviewStatsCards({ stats }: OverviewStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="rounded-xl border border-secondary-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-50">
                {card.icon}
              </div>
              {card.badge && (
                <Badge
                  variant="outline"
                  className="rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider border-accent-200 bg-accent-50 text-accent-700"
                >
                  {card.badge}
                </Badge>
              )}
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-400">
                {card.title}
              </p>
              <p className="mt-1 font-mono text-xl font-bold tracking-tight text-primary-900 truncate">
                {card.value}
              </p>
              <p className="text-[9px] text-secondary-400 mt-0.5">
                {card.label}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
