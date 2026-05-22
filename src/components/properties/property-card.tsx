import { motion } from 'framer-motion';
import Link from 'next/link';
import { type Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Pencil, Trash2, Camera } from 'lucide-react';

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group flex flex-col gap-6 border-b border-border/40 py-6 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6"
    >
      <div className="flex w-full items-center gap-6 sm:w-auto">
        {/* Minimal Image Thumbnail */}
        <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-muted/50 border border-border/40">
          {property.image ? (
            <img
              src={property.image}
              alt={property.name}
              className="size-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <Building2 className="size-6 text-muted-foreground/50" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h3 className="font-sans text-lg font-semibold tracking-tight text-primary">
              {property.name}
            </h3>
            <Badge
              variant="outline"
              className={`rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${property.available ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-border bg-muted/50 text-muted-foreground'}`}
            >
              {property.available ? 'Available' : 'Occupied'}
            </Badge>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            <span className="max-w-[200px] truncate sm:max-w-[300px]">
              {property.address}
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-8 sm:w-auto sm:justify-end">
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Monthly Yield
          </p>
          <span className="font-mono text-lg font-bold text-primary">
            Rp {property.price.toLocaleString('id-ID')}
          </span>
        </div>

        {(onEdit || onDelete) && (
          <div className="flex items-center gap-1">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="size-8 rounded-sm text-muted-foreground hover:text-primary hover:bg-muted/50"
            >
              <Link href={`/landlord/properties/${property.id}/inspect`}>
                <Camera className="size-4" />
                <span className="sr-only">Inspect</span>
              </Link>
            </Button>
            {onEdit && (
              <Button
                onClick={() => onEdit(property)}
                variant="ghost"
                size="icon"
                className="size-8 rounded-sm text-muted-foreground hover:text-primary hover:bg-muted/50"
              >
                <Pencil className="size-4" />
                <span className="sr-only">Edit</span>
              </Button>
            )}
            {onDelete && (
              <Button
                onClick={() => onDelete(property.id)}
                variant="ghost"
                size="icon"
                className="size-8 rounded-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="size-4" />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
