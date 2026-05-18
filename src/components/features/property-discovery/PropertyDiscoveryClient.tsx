'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  usePropertiesList,
  usePropertySearch,
} from '@/hooks/use-property-discovery';
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
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [minPrice] = useState<number | undefined>(initialMinPrice);
  const [maxPrice] = useState<number | undefined>(initialMaxPrice);
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

        <div className="mb-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <div className="flex flex-wrap gap-6 border-b border-secondary-300 pb-6">
              <div className="flex min-w-[200px] flex-col gap-2">
                <label className="font-mono text-[11px] font-semibold uppercase tracking-wider text-secondary-500">
                  Pencarian
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nama properti..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    className="w-full appearance-none border-b border-secondary-300 bg-transparent px-0 py-2 font-sans text-base text-primary-900 focus:border-b-2 focus:border-primary-500 focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex min-w-[200px] flex-col gap-2">
                <label className="font-mono text-[11px] font-semibold uppercase tracking-wider text-secondary-500">
                  Lokasi
                </label>
                <div className="relative">
                  <select className="w-full cursor-pointer appearance-none border-b border-secondary-300 bg-transparent px-0 py-2 font-sans text-base text-primary-900 focus:border-b-2 focus:border-primary-500 focus:ring-0">
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
                <label className="font-mono text-[11px] font-semibold uppercase tracking-wider text-secondary-500">
                  Ketersediaan
                </label>
                <div className="relative">
                  <select
                    value={available === undefined ? '' : available.toString()}
                    onChange={(e) => {
                      const val = e.target.value;
                      setAvailable(val === '' ? undefined : val === 'true');
                      setPage(1);
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
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex flex-col items-start gap-6 border-t border-secondary-300 py-8 transition-colors duration-200 hover:bg-white md:flex-row md:items-center"
                  >
                    <div className="h-32 w-full shrink-0 overflow-hidden rounded bg-secondary-200 md:w-48">
                      {property.image ? (
                        <img
                          src={property.image}
                          alt={property.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-mono text-[10px] text-secondary-400">
                          NO_IMAGE
                        </div>
                      )}
                    </div>

                    <div className="flex w-full flex-grow grid-cols-1 flex-col items-center gap-6 md:grid md:grid-cols-12">
                      <div className="flex flex-col gap-2 md:col-span-5">
                        <h3 className="font-display text-xl font-semibold text-primary-900 transition-colors group-hover:text-primary-700">
                          {property.name}
                        </h3>
                        <p className="flex items-center gap-1 font-sans text-base text-secondary-600">
                          <span className="text-[16px]">📍</span>
                          {property.address}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 md:col-span-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[13px] font-semibold text-secondary-500 uppercase">
                            ID:
                          </span>
                          <span
                            className="font-mono text-[13px] text-primary-900 truncate max-w-[150px]"
                            title={property.id}
                          >
                            {property.id.split('-')[0]}...
                          </span>
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center rounded border px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                              property.available
                                ? 'border-primary-200 bg-primary-50 text-primary-700'
                                : 'border-secondary-300 bg-secondary-100 text-secondary-500'
                            }`}
                          >
                            {property.available ? 'Tersedia' : 'Disewa'}
                          </span>
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-4 md:col-span-3 md:w-auto md:items-end">
                        <div className="font-mono text-[13px] font-bold text-primary-900">
                          Rp {property.price.toLocaleString('id-ID')}{' '}
                          <span className="font-normal text-secondary-500">
                            / bln
                          </span>
                        </div>
                        <Link
                          href={`/properties/${property.id}`}
                          className="w-full rounded border border-transparent bg-accent-500 px-6 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-600 md:w-auto"
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
                  </motion.div>
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
