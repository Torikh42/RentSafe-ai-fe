import { motion } from 'framer-motion';
import { LayoutGrid, Building2, Plus } from 'lucide-react';
import { PropertyCard } from '@/components/properties/property-card';
import type { Property } from '@/types/property';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

interface PropertiesGridProps {
  isLoading: boolean;
  isError: boolean;
  properties: Property[];
  searchQuery: string;
  filterAvailable: boolean | null;
  onAddProperty: () => void;
  onEditProperty: (property: Property) => void;
  onDeleteProperty: (id: string) => void;
}

export function PropertiesGrid({
  isLoading,
  isError,
  properties,
  searchQuery,
  filterAvailable,
  onAddProperty,
  onEditProperty,
  onDeleteProperty,
}: PropertiesGridProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-32">
        <div className="relative">
          <div className="size-16 animate-pulse rounded-full border-2 border-[#e38b29]/20" />
          <div className="absolute inset-0 size-16 animate-spin rounded-full border-t-2 border-[#e38b29]" />
        </div>
        <p className="animate-pulse font-mono text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          Synchronizing your assets...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-sm bg-destructive/10">
          <Building2 className="size-8 text-destructive" />
        </div>
        <h3 className="mb-2 font-sans text-xl font-semibold text-primary">
          Sync Error
        </h3>
        <p className="mb-8 max-w-sm text-sm text-muted-foreground">
          We encountered a problem retrieving your portfolio. Please check your
          connection and try again.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="rounded-sm font-mono text-xs font-semibold uppercase tracking-widest"
        >
          Retry Connection
        </Button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/10 px-8 py-32 text-center"
      >
        <div className="mb-8 flex size-24 items-center justify-center rounded-sm border border-[#e38b29]/20 bg-[#e38b29]/10">
          <LayoutGrid className="size-10 text-[#e38b29]" />
        </div>
        <h3 className="mb-3 font-sans text-2xl font-semibold text-primary">
          {searchQuery || filterAvailable !== null
            ? 'No Results Found'
            : 'Portfolio is Empty'}
        </h3>
        <p className="mb-10 max-w-md text-lg leading-relaxed text-muted-foreground">
          {searchQuery || filterAvailable !== null
            ? 'Try refining your search parameters or clearing filters to find what you are looking for.'
            : 'Ready to scale? Add your first high-yield rental property and start managing with RentSafe AI.'}
        </p>
        <Button
          onClick={onAddProperty}
          size="lg"
          className="rounded-sm bg-primary font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-sm"
        >
          <Plus data-icon="inline-start" className="text-[#e38b29]" />
          Add First Asset
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mt-8 flex flex-col border-t border-border/40"
    >
      {properties.map((property, i) => (
        <PropertyCard
          key={property.id}
          property={property}
          onEdit={onEditProperty}
          onDelete={onDeleteProperty}
          index={i}
        />
      ))}
    </motion.div>
  );
}
