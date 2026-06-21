'use client';

import { useState, useCallback } from 'react';
import {
  usePropertiesList,
  usePropertySearch,
} from '@/hooks/use-property-discovery';
import { Navbar } from '@/components/navbar';
import type { PropertyListResponse } from '@/lib/api';
import { useDebounce } from '@/hooks/use-debounce';
import { DiscoveryFilters } from './DiscoveryFilters';
import { DiscoveryPropertyCard } from './DiscoveryPropertyCard';

interface PropertyDiscoveryClientProps {
  initialData: PropertyListResponse;
  initialSearch?: string;
  initialMinPrice?: number;
  initialMaxPrice?: number;
  initialAvailable?: boolean;
}

export function PropertyDiscoveryClient({
  initialData,
  initialSearch = '',
  initialMinPrice,
  initialMaxPrice,
  initialAvailable,
}: PropertyDiscoveryClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [minPrice] = useState<number | undefined>(initialMinPrice);
  const [maxPrice] = useState<number | undefined>(initialMaxPrice);
  const [available, setAvailable] = useState<boolean | undefined>(
    initialAvailable
  );
  const limit = 12;

  const hasActiveFilters =
    debouncedSearchQuery ||
    minPrice !== undefined ||
    maxPrice !== undefined ||
    available !== undefined;

  const searchQuery_use = usePropertySearch(
    debouncedSearchQuery,
    { minPrice, maxPrice, available },
    limit
  );

  const listQuery = usePropertiesList(limit);

  const currentQuery = hasActiveFilters ? searchQuery_use : listQuery;
  
  // Flatten pages for infinite scroll
  const properties = currentQuery.data?.pages.flatMap((page) => page.data) || 
                     (!currentQuery.isFetching && initialData ? initialData.data : []);

  const isLoading = currentQuery.isLoading && properties.length === 0;

  // The last page determines if there is more data
  const hasMore = currentQuery.hasNextPage || false;

  const handleLoadMore = useCallback(() => {
    currentQuery.fetchNextPage();
  }, [currentQuery]);

  return (
    <main className="flex min-h-screen flex-col bg-secondary-50 font-sans text-primary-900 selection:bg-primary-500 selection:text-white antialiased">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl flex-grow px-4 py-16 md:px-12 xl:px-16">
        <div className="mb-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <h1 className="font-display text-5xl font-semibold tracking-tight text-primary-900">
              Properti Tersedia
            </h1>
          </div>
        </div>

        <DiscoveryFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          available={available}
          setAvailable={setAvailable}
        />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <div className="flex w-full flex-col">
              {isLoading ? (
                <div className="py-8 text-center font-mono text-sm text-secondary-500">
                  MEMUAT DATA...
                </div>
              ) : properties.length === 0 ? (
                <div className="py-8 text-center font-mono text-sm text-secondary-500">
                  TIDAK ADA PROPERTI DITEMUKAN
                </div>
              ) : (
                properties.map((property) => (
                  <DiscoveryPropertyCard
                    key={property.id}
                    property={property}
                  />
                ))
              )}

              <div className="mt-8 border-t border-secondary-300"></div>

              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={currentQuery.isFetching}
                    className="rounded border border-primary-500 bg-transparent px-6 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-primary-500 transition-colors hover:bg-primary-50 disabled:opacity-50"
                  >
                    {currentQuery.isFetching
                      ? 'MEMUAT...'
                      : 'MUAT LEBIH BANYAK'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
