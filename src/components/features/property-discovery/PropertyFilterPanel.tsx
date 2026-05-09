'use client';

interface PropertyFilterPanelProps {
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  onMinPriceChange: (price?: number) => void;
  onMaxPriceChange: (price?: number) => void;
  onAvailableChange: (available?: boolean) => void;
}

export function PropertyFilterPanel({
  minPrice,
  maxPrice,
  available,
  onMinPriceChange,
  onMaxPriceChange,
  onAvailableChange,
}: PropertyFilterPanelProps) {
  const priceRanges = [
    { label: 'Under Rp 2M', min: 0, max: 2000000 },
    { label: 'Rp 2M - Rp 5M', min: 2000000, max: 5000000 },
    { label: 'Rp 5M - Rp 10M', min: 5000000, max: 10000000 },
    { label: 'Over Rp 10M', min: 10000000, max: undefined },
  ];

  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-premium space-y-6">
      <div>
        <h3 className="font-bold text-primary-900 mb-4 font-display text-lg">Filters</h3>

        {/* Availability Filter */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary-400 mb-3">
            Availability
          </h4>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-primary-50 transition-colors group">
            <div className="relative w-4 h-4">
              <input
                type="checkbox"
                checked={available === undefined}
                onChange={() => onAvailableChange(undefined)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border-2 transition-all ${
                  available === undefined
                    ? 'bg-accent-500 border-accent-500'
                    : 'border-primary-100 group-hover:border-primary-300'
                }`}
              >
                {available === undefined && (
                  <svg
                    className="w-full h-full text-white p-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm font-semibold text-secondary-600 group-hover:text-primary-900 transition-colors">All Properties</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-primary-50 transition-colors group">
            <div className="relative w-4 h-4">
              <input
                type="checkbox"
                checked={available === true}
                onChange={() => onAvailableChange(true)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border-2 transition-all ${
                  available === true
                    ? 'bg-accent-500 border-accent-500'
                    : 'border-primary-100 group-hover:border-primary-300'
                }`}
              >
                {available === true && (
                  <svg
                    className="w-full h-full text-white p-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm font-semibold text-secondary-600 group-hover:text-primary-900 transition-colors">Available Only</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-primary-50 transition-colors group">
            <div className="relative w-4 h-4">
              <input
                type="checkbox"
                checked={available === false}
                onChange={() => onAvailableChange(false)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border-2 transition-all ${
                  available === false
                    ? 'bg-accent-500 border-accent-500'
                    : 'border-primary-100 group-hover:border-primary-300'
                }`}
              >
                {available === false && (
                  <svg
                    className="w-full h-full text-white p-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm font-semibold text-secondary-600 group-hover:text-primary-900 transition-colors">Occupied Only</span>
          </label>
        </div>

        {/* Price Ranges */}
        <div className="mt-6 pt-6 border-t border-primary-50">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary-400 mb-3">
            Price Range
          </h4>

          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => {
                  onMinPriceChange(range.min);
                  onMaxPriceChange(range.max);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  minPrice === range.min && maxPrice === range.max
                    ? 'bg-accent-500/10 text-accent-600 border border-accent-500/20'
                    : 'text-secondary-500 hover:text-primary-900 hover:bg-primary-50 border border-transparent'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {(minPrice || maxPrice || available !== undefined) && (
        <button
          onClick={() => {
            onMinPriceChange(undefined);
            onMaxPriceChange(undefined);
            onAvailableChange(undefined);
          }}
          className="w-full px-4 py-2 rounded-lg border border-error-500/30 bg-error-500/10 text-error-400 hover:bg-error-500/20 transition-colors text-sm font-medium"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
