interface DiscoveryFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  available: boolean | undefined;
  setAvailable: (val: boolean | undefined) => void;
}

export function DiscoveryFilters({
  searchQuery,
  setSearchQuery,
  available,
  setAvailable,
}: DiscoveryFiltersProps) {
  return (
    <div className="mb-16 grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-10 md:col-start-2">
        <div className="flex flex-wrap gap-6 border-b border-secondary-300 pb-6">
          <div className="flex min-w-[200px] flex-col gap-2">
            <label
              htmlFor="search-property"
              className="font-mono text-[11px] font-semibold uppercase tracking-wider text-secondary-500"
            >
              Pencarian
            </label>
            <div className="relative">
              <input
                id="search-property"
                type="text"
                placeholder="Nama properti..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="w-full appearance-none border-b border-secondary-300 bg-transparent px-0 py-2 font-sans text-base text-primary-900 focus:border-b-2 focus:border-primary-500 focus:ring-0"
              />
            </div>
          </div>

          <div className="flex min-w-[200px] flex-col gap-2">
            <label
              htmlFor="location-filter"
              className="font-mono text-[11px] font-semibold uppercase tracking-wider text-secondary-500"
            >
              Lokasi
            </label>
            <div className="relative">
              <select
                id="location-filter"
                className="w-full cursor-pointer appearance-none border-b border-secondary-300 bg-transparent px-0 py-2 font-sans text-base text-primary-900 focus:border-b-2 focus:border-primary-500 focus:ring-0"
              >
                <option>Semua Lokasi</option>
                <option>Jakarta Selatan</option>
                <option>Jakarta Pusat</option>
              </select>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-secondary-500">
                ▼
              </span>
            </div>
          </div>

          <div className="flex min-w-[200px] flex-col gap-2">
            <label
              htmlFor="availability-filter"
              className="font-mono text-[11px] font-semibold uppercase tracking-wider text-secondary-500"
            >
              Ketersediaan
            </label>
            <div className="relative">
              <select
                id="availability-filter"
                value={available === undefined ? '' : available.toString()}
                onChange={(e) => {
                  const val = e.target.value;
                  setAvailable(val === '' ? undefined : val === 'true');
                }}
                className="w-full cursor-pointer appearance-none border-b border-secondary-300 bg-transparent px-0 py-2 font-sans text-base text-primary-900 focus:border-b-2 focus:border-primary-500 focus:ring-0"
              >
                <option value="">Semua Status</option>
                <option value="true">Tersedia</option>
                <option value="false">Disewa</option>
              </select>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-secondary-500">
                ▼
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
