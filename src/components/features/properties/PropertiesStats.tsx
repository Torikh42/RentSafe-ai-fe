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
          accent: 'text-primary-900',
          bg: 'bg-white',
          border: 'border-primary-100',
        },
        {
          label: 'Available Units',
          value: available,
          icon: LayoutGrid,
          accent: 'text-accent-600',
          bg: 'bg-white',
          border: 'border-primary-100',
        },
        {
          label: 'Active Tenancies',
          value: occupied,
          icon: SlidersHorizontal,
          accent: 'text-secondary-600',
          bg: 'bg-white',
          border: 'border-primary-100',
        },
      ].map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bg} ${stat.border} relative group rounded-[24px] p-8 border flex items-center justify-between overflow-hidden transition-all duration-300 hover:shadow-premium hover:-translate-y-1`}
        >
          <div>
            <p className="text-[10px] font-bold text-secondary-400 uppercase tracking-[0.2em] mb-1">
              {stat.label}
            </p>
            <p className={`text-4xl font-bold ${stat.accent} tracking-tight`}>
              {stat.value}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-primary-50/50 group-hover:bg-accent-500/10 transition-colors">
            <stat.icon className={`w-8 h-8 ${stat.accent}`} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}
