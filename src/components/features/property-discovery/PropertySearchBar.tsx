'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface PropertySearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onFilterToggle: () => void;
}

export function PropertySearchBar({
  query,
  onQueryChange,
  onFilterToggle,
}: PropertySearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-4 rounded-2xl bg-surface border transition-all duration-300 ${isFocused ? 'border-accent-500/50 ring-2 ring-accent-500/20' : 'border-border'}`}
    >
      <Search
        className={`w-5 h-5 shrink-0 transition-colors ${isFocused ? 'text-accent-500' : 'text-zinc-600'}`}
      />

      <input
        type="text"
        placeholder="Search by name or address..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-sm"
      />

      <button
        onClick={onFilterToggle}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        title="Toggle filters"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="hidden sm:inline">Filters</span>
      </button>
    </div>
  );
}
