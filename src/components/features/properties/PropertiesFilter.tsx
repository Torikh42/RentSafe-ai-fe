import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PropertiesFilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterAvailable: boolean | null;
  setFilterAvailable: (val: boolean | null) => void;
}

export function PropertiesFilter({
  searchQuery,
  setSearchQuery,
  filterAvailable,
  setFilterAvailable,
}: PropertiesFilterProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border/40 pb-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex gap-6">
        {(
          [
            { label: 'All Assets', value: null },
            { label: 'Available', value: true },
            { label: 'Occupied', value: false },
          ] as const
        ).map((opt) => (
          <button
            key={opt.label}
            onClick={() => setFilterAvailable(opt.value)}
            className={`pb-2 font-mono text-xs font-semibold uppercase tracking-widest transition-all ${
              filterAvailable === opt.value
                ? 'border-b-2 border-primary text-primary'
                : 'border-b-2 border-transparent text-muted-foreground hover:text-primary'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Filter by name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-sm border-border/40 pl-9 font-mono text-xs shadow-none focus-visible:ring-primary/20"
        />
      </div>
    </div>
  );
}
