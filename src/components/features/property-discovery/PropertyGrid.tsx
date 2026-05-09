'use client';

import { motion } from 'framer-motion';
import { Loader2, Search } from 'lucide-react';
import { PropertyListCard } from './PropertyListCard';
import type { Property } from '@/types/property';

interface PropertyGridProps {
  isLoading: boolean;
  properties: Property[];
  hasMore: boolean;
  onLoadMore: () => void;
}

export function PropertyGrid({
  isLoading,
  properties,
  hasMore,
  onLoadMore,
}: PropertyGridProps) {
  if (isLoading && properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-accent-500/30" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10">
            <Loader2 className="h-8 w-8 animate-spin text-accent-500" />
          </div>
        </div>
        <p className="text-zinc-500 font-medium">Searching properties...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500">
          <Search className="h-10 w-10" />
        </div>
        <h3 className="text-xl font-bold text-primary-900 mb-2">
          No Properties Found
        </h3>
        <p className="text-zinc-400 max-w-md">
          Try adjusting your search criteria or filters to find what you are
          looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {properties.map((property, index) => (
          <PropertyListCard
            key={property.id}
            property={property}
            index={index}
          />
        ))}
      </motion.div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="px-8 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Properties'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
