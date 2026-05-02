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
      whileHover={{ y: -3 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-zinc-900/40 backdrop-blur-md hover:border-accent-500/30 transition-all duration-300 shadow-xl"
    >
      {/* Ambient glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent-500/10 via-transparent to-transparent" />

      {/* Top accent bar */}
      <div
        className={`h-1 w-full ${
          property.available
            ? 'bg-gradient-to-r from-accent-500 via-amber-400 to-accent-600'
            : 'bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-800'
        }`}
      />

      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                property.available
                  ? 'bg-accent-500/10 text-accent-500 group-hover:bg-accent-500 group-hover:text-primary-950'
                  : 'bg-zinc-800 text-zinc-500'
              }`}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg leading-tight truncate">
              {property.name}
            </h3>
          </div>

          <Badge
            variant="outline"
            className={`flex-shrink-0 flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold border-2 px-2.5 py-1 rounded-xl transition-all ${
              property.available
                ? 'border-accent-500/20 bg-accent-500/5 text-accent-500'
                : 'border-zinc-700/50 bg-zinc-800/50 text-zinc-500'
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
          <div className="flex items-center gap-2.5 text-sm text-zinc-400">
            <MapPin className="w-4 h-4 text-zinc-600 flex-shrink-0" />
            <span className="truncate">{property.address}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm">
            <div className="p-1.5 rounded-lg bg-white/5">
              <BadgeDollarSign className="w-4 h-4 text-accent-500 flex-shrink-0" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Rp {property.price.toLocaleString('id-ID')}
            </span>
            <span className="text-zinc-600 text-xs font-medium uppercase tracking-widest">
              / Month
            </span>
          </div>

          {property.description && (
            <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed pt-2 border-t border-white/5">
              {property.description}
            </p>
          )}
        </div>

        {/* Footer divider + actions */}
        {(onEdit || onDelete) && (
          <div className="flex items-center justify-end gap-2 pt-5 border-t border-white/5 mt-auto">
            <Link
              href={`/landlord/properties/${property.id}/inspect`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-accent-500 hover:bg-accent-500/10 transition-all duration-200"
              title="Inspect property with AI"
            >
              <Camera className="w-3.5 h-3.5" />
              INSPECT
            </Link>
            {onEdit && (
              <button
                onClick={() => onEdit(property)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-accent-500 hover:bg-accent-500/10 transition-all duration-200"
              >
                <Pencil className="w-3.5 h-3.5" />
                EDIT
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(property.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                DELETE
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
