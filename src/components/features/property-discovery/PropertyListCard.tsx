'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, BadgeDollarSign, Heart } from 'lucide-react';
import type { Property } from '@/types/property';

interface PropertyListCardProps {
  property: Property;
  index?: number;
}

export function PropertyListCard({
  property,
  index = 0,
}: PropertyListCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white hover:border-accent-500/50 transition-all duration-300 shadow-sm hover:shadow-premium"
    >
      {/* Top Status Bar */}
      <div
        className={`h-1.5 w-full ${
          property.available
            ? 'bg-gradient-to-r from-accent-500 via-amber-400 to-accent-600'
            : 'bg-secondary-200'
        }`}
      />

      <div className="flex flex-col flex-1 p-5">
        {/* Header with badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="font-bold text-primary-900 text-lg leading-tight line-clamp-2 font-display">
            {property.name}
          </h3>
          <button className="flex-shrink-0 p-2 rounded-lg hover:bg-primary-50 transition-colors text-secondary-400 hover:text-accent-500">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-2.5 mb-6 flex-1">
          <div className="flex items-center gap-2 text-sm text-secondary-500">
            <MapPin className="w-4 h-4 text-secondary-400 flex-shrink-0" />
            <span className="truncate">{property.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary-50">
              <BadgeDollarSign className="w-4 h-4 text-accent-500 flex-shrink-0" />
            </div>
            <span className="text-lg font-black text-primary-900 tracking-tight">
              Rp {property.price.toLocaleString('id-ID')}
            </span>
            <span className="text-secondary-400 text-xs font-medium">/ month</span>
          </div>
        </div>

        {/* Description */}
        {property.description && (
          <p className="text-xs text-secondary-500 line-clamp-2 mb-4 leading-relaxed pb-4 border-t border-primary-50 pt-4">
            {property.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-primary-50">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                property.available
                  ? 'bg-success-500 animate-pulse'
                  : 'bg-secondary-300'
              }`}
            />
            <span className="text-xs font-medium text-secondary-500">
              {property.available ? 'Available' : 'Occupied'}
            </span>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="ml-auto px-4 py-2 rounded-lg text-xs font-bold text-accent-500 hover:text-white hover:bg-accent-500/10 transition-all duration-200"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
