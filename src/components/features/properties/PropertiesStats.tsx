import { motion } from 'framer-motion';
import { Building2, LayoutGrid, SlidersHorizontal } from 'lucide-react';

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
      className="grid grid-cols-1 sm:grid-cols-3 gap-6"
    >
      {[
        {
          label: 'Total Assets',
          value: total,
          icon: Building2,
          accent: 'text-white',
          bg: 'bg-primary-900/40',
          border: 'border-white/5',
        },
        {
          label: 'Available Units',
          value: available,
          icon: LayoutGrid,
          accent: 'text-accent-400',
          bg: 'bg-accent-500/5',
          border: 'border-accent-500/10',
        },
        {
          label: 'Active Tenancies',
          value: occupied,
          icon: SlidersHorizontal,
          accent: 'text-zinc-300',
          bg: 'bg-white/5',
          border: 'border-white/5',
        },
      ].map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bg} ${stat.border} relative group rounded-3xl p-8 border flex items-center justify-between overflow-hidden transition-all hover:bg-opacity-60`}
        >
          <div>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <p className={`text-4xl font-bold ${stat.accent} tracking-tight`}>
              {stat.value}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-accent-500/10 transition-colors">
            <stat.icon className={`w-8 h-8 ${stat.accent}`} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}
