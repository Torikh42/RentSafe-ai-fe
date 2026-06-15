import { Plus, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface QuickActionsCardProps {
  onAddPropertyClick: () => void;
}

export function QuickActionsCard({
  onAddPropertyClick,
}: QuickActionsCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-xl border border-accent-100 bg-[#fffbeb] p-6 shadow-sm">
      <button
        onClick={onAddPropertyClick}
        className="absolute right-6 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-white shadow-md hover:bg-accent-600 transition-all"
      >
        <Plus className="h-5 w-5" />
      </button>
      <h3 className="text-base font-bold tracking-tight text-accent-700 mb-6">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onAddPropertyClick}
          className="flex flex-col items-center gap-3 rounded-lg border border-secondary-100 bg-white p-4 text-center hover:border-accent-200 transition-all group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600 group-hover:scale-110 transition-transform">
            <Building2 className="h-4.5 w-4.5" />
          </div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-secondary-600 group-hover:text-primary-900">
            Add Property
          </span>
        </button>
      </div>
    </Card>
  );
}
