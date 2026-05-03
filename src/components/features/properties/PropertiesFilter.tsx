import { Search } from 'lucide-react';

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
    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between p-2 rounded-[28px] bg-primary-950/50 border border-white/5 backdrop-blur-sm">
      <div className="relative flex-1 group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-accent-500 transition-colors" />
        <input
          type="text"
          placeholder="Filter by name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-transparent border-none text-base text-white placeholder:text-zinc-600 focus:outline-none focus:ring-0 transition-all"
        />
      </div>

      <div className="flex items-center gap-2 p-2 bg-white/5 rounded-2xl">
        {(
          [
            { label: 'All', value: null },
            { label: 'Available', value: true },
            { label: 'Occupied', value: false },
          ] as const
        ).map((opt) => (
          <button
            key={opt.label}
            onClick={() => setFilterAvailable(opt.value)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              filterAvailable === opt.value
                ? 'bg-accent-500 text-primary-950 shadow-lg shadow-accent-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
