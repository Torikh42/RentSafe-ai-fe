import { motion } from 'framer-motion';
import { LayoutGrid, Building2, Plus } from 'lucide-react';
import { PropertyCard } from '@/components/properties/property-card';
import type { Property } from '@/types/property';

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
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-accent-500/20 animate-pulse" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-t-2 border-accent-500 animate-spin" />
        </div>
        <p className="text-secondary-400 font-medium tracking-wide animate-pulse uppercase text-[10px]">
          Synchronizing your assets...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-error-50 flex items-center justify-center mb-6">
          <Building2 className="w-8 h-8 text-error-500" />
        </div>
        <h3 className="text-xl font-bold text-primary-900 mb-2">Sync Error</h3>
        <p className="text-secondary-500 max-w-sm mb-8 text-sm">
          We encountered a problem retrieving your portfolio. Please check your
          connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 rounded-xl bg-white border border-primary-100 text-primary-900 font-semibold hover:bg-primary-50 transition-all shadow-sm"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-32 px-8 text-center rounded-[40px] border-2 border-dashed border-primary-100 bg-white shadow-sm"
      >
        <div className="w-24 h-24 rounded-[32px] bg-accent-500/10 flex items-center justify-center mb-8 border border-accent-500/20">
          <LayoutGrid className="w-10 h-10 text-accent-500" />
        </div>
        <h3 className="text-2xl font-bold text-primary-900 mb-3 font-display">
          {searchQuery || filterAvailable !== null
            ? 'No Results Found'
            : 'Portfolio is Empty'}
        </h3>
        <p className="text-secondary-500 text-lg max-w-md mb-10 leading-relaxed">
          {searchQuery || filterAvailable !== null
            ? 'Try refining your search parameters or clearing filters to find what you are looking for.'
            : 'Ready to scale? Add your first high-yield rental property and start managing with RentSafe AI.'}
        </p>
        <button
          onClick={onAddProperty}
          className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-primary-900 hover:bg-primary-800 text-white font-bold shadow-xl shadow-primary-900/10 transition-all"
        >
          <Plus className="w-5 h-5 text-accent-500" />
          Add First Asset
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
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
