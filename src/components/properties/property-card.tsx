'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { type Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  MapPin,
  BadgeDollarSign,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Camera,
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onEdit?: (property: Property) => void;
  onDelete?: (id: string) => void;
  index?: number;
}

export function PropertyCard({
  property,
  onEdit,
  onDelete,
  index = 0,
}: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.21, 1.11, 0.81, 0.99],
      }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-[24px] overflow-hidden border border-primary-100 bg-white hover:border-accent-500/30 transition-all duration-300 shadow-sm hover:shadow-premium"
    >
      {/* Ambient glow on hover */}
      <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary-500/5 via-transparent to-transparent" />

      {/* Top accent bar */}
      <div
        className={`h-1 w-full ${
          property.available
            ? 'bg-gradient-to-r from-accent-500 to-amber-300'
            : 'bg-gradient-to-r from-secondary-200 to-secondary-300'
        }`}
      />

      {/* Property Image */}
      <div className="relative aspect-video overflow-hidden">
        {property.image ? (
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-primary-50 flex items-center justify-center">
            <Building2 className="w-12 h-12 text-primary-200" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                property.available
                  ? 'bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white'
                  : 'bg-secondary-50 text-secondary-400'
              }`}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-primary-900 text-lg leading-tight truncate font-display">
              {property.name}
            </h3>
          </div>

          <Badge
            variant="outline"
            className={`flex-shrink-0 flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold border px-2.5 py-1 rounded-full transition-all ${
              property.available
                ? 'border-success-100 bg-success-50 text-success-700'
                : 'border-secondary-100 bg-secondary-50 text-secondary-500'
            }`}
          >
            {property.available ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
            {property.available ? 'Available' : 'Occupied'}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center gap-2.5 text-sm text-secondary-500">
            <MapPin className="w-4 h-4 text-secondary-400 flex-shrink-0" />
            <span className="truncate">{property.address}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm">
            <div className="p-1.5 rounded-lg bg-primary-50">
              <BadgeDollarSign className="w-4 h-4 text-accent-500 flex-shrink-0" />
            </div>
            <span className="text-xl font-bold text-primary-900 tracking-tight">
              Rp {property.price.toLocaleString('id-ID')}
            </span>
            <span className="text-secondary-400 text-[10px] font-bold uppercase tracking-widest">
              / Month
            </span>
          </div>

          {property.description && (
            <p className="text-xs text-secondary-400 line-clamp-2 leading-relaxed pt-2 border-t border-primary-50">
              {property.description}
            </p>
          )}
        </div>

        {/* Footer divider + actions */}
        {(onEdit || onDelete) && (
          <div className="flex items-center justify-end gap-1 pt-5 border-t border-primary-50 mt-auto">
            <Link
              href={`/landlord/properties/${property.id}/inspect`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold text-secondary-500 hover:text-accent-600 hover:bg-accent-50 transition-all duration-200 uppercase tracking-wider"
              title="Inspect property with AI"
            >
              <Camera className="w-3.5 h-3.5" />
              Inspect
            </Link>
            {onEdit && (
              <button
                onClick={() => onEdit(property)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 uppercase tracking-wider"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(property.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold text-secondary-400 hover:text-error-600 hover:bg-error-50 transition-all duration-200 uppercase tracking-wider"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
