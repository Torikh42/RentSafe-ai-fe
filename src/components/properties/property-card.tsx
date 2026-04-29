'use client';

import { motion } from 'framer-motion';
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
      whileHover={{ y: -3 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-zinc-900/60 backdrop-blur-sm hover:border-teal-500/30 transition-all duration-300"
    >
      {/* Ambient glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-teal-500/5 via-transparent to-transparent" />

      {/* Top accent bar */}
      <div
        className={`h-1 w-full ${
          property.available
            ? 'bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600'
            : 'bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-700'
        }`}
      />

      <div className="flex flex-col flex-1 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                property.available
                  ? 'bg-teal-500/15 text-teal-400'
                  : 'bg-zinc-700/60 text-zinc-400'
              }`}
            >
              <Building2 className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-semibold text-white text-base leading-tight truncate">
              {property.name}
            </h3>
          </div>

          <Badge
            variant="outline"
            className={`flex-shrink-0 flex items-center gap-1 text-[11px] font-medium border px-2 py-0.5 rounded-full ${
              property.available
                ? 'border-teal-500/40 bg-teal-500/10 text-teal-300'
                : 'border-zinc-600/60 bg-zinc-800/60 text-zinc-400'
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
        <div className="space-y-2.5 mb-4 flex-1">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
            <span className="truncate">{property.address}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <BadgeDollarSign className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
            <span className="font-semibold text-white">
              Rp {property.price.toLocaleString('id-ID')}
            </span>
            <span className="text-zinc-600 text-xs">/ bulan</span>
          </div>

          {property.description && (
            <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed pt-1">
              {property.description}
            </p>
          )}
        </div>

        {/* Footer divider + actions */}
        {(onEdit || onDelete) && (
          <div className="flex items-center justify-end gap-1 pt-4 border-t border-white/5 mt-auto">
            {onEdit && (
              <button
                onClick={() => onEdit(property)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-teal-300 hover:bg-teal-500/10 transition-all duration-200"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(property.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
