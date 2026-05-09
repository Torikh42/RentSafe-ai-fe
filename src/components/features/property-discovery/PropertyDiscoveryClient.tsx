'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  usePropertiesList,
  usePropertySearch,
} from '@/hooks/use-property-discovery';
import { PropertySearchBar } from '@/components/features/property-discovery/PropertySearchBar';
import { PropertyFilterPanel } from '@/components/features/property-discovery/PropertyFilterPanel';
import { PropertyGrid } from '@/components/features/property-discovery/PropertyGrid';
import { Navbar } from '@/components/navbar';
import type { PropertyListResponse } from '@/lib/api';

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
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [minPrice, setMinPrice] = useState<number | undefined>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(initialMaxPrice);
  const [available, setAvailable] = useState<boolean | undefined>(
    initialAvailable
  );
  const [page, setPage] = useState(1);
  const limit = 12;

  const hasActiveFilters =
    searchQuery ||
    minPrice !== undefined ||
    maxPrice !== undefined ||
    available !== undefined;

  const searchQuery_use = usePropertySearch(
    searchQuery,
    { minPrice, maxPrice, available },
    page,
    limit
  );

  const listQuery = usePropertiesList(page, limit);

  // Use current data if loaded, otherwise fallback to initialData (for the very first render)
  const currentQuery = hasActiveFilters ? searchQuery_use : listQuery;
  const currentData =
    currentQuery.data ||
    (page === 1 && !currentQuery.isFetching ? initialData : null);
  const isLoading = currentQuery.isLoading && !currentData;

  const properties = currentData?.data || [];
  const pagination = currentData?.pagination;
  const hasMore = pagination?.hasNext || false;

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Background decor */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="bg-mesh absolute inset-0" />
      </div>

      {/* Navigation Bar (Floating) */}
      <Navbar />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl pb-20 mt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-accent-500/10 text-accent-500">
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              </svg>
            </span>
            <span className="text-[11px] font-semibold tracking-widest text-accent-500 uppercase">
              Property Discovery
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-3">
            Find Your Perfect <span className="text-accent-500">Property</span>
          </h1>
          <p className="text-foreground-muted max-w-2xl">
            Browse through our curated collection of rental properties. Search,
            filter, and compare to find the ideal home for you.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <PropertySearchBar
            query={searchQuery}
            onQueryChange={(q) => {
              setSearchQuery(q);
              setPage(1); // Reset page on search change
            }}
            onFilterToggle={() => setShowFilters(!showFilters)}
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <PropertyFilterPanel
                minPrice={minPrice}
                maxPrice={maxPrice}
                available={available}
                onMinPriceChange={(val) => {
                  setMinPrice(val);
                  setPage(1);
                }}
                onMaxPriceChange={(val) => {
                  setMaxPrice(val);
                  setPage(1);
                }}
                onAvailableChange={(val) => {
                  setAvailable(val);
                  setPage(1);
                }}
              />
            </motion.div>
          )}

          {/* Properties Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}
          >
            <PropertyGrid
              isLoading={isLoading}
              properties={properties}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
