'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Building2,
  LayoutGrid,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import {
  useGetMyProperties,
  useCreateProperty,
  useUpdateProperty,
  useDeleteProperty,
} from '@/hooks/use-properties';
import { PropertyCard } from '@/components/properties/property-card';
import { PropertyFormModal } from '@/components/properties/property-form';
import type { Property, CreatePropertyInput } from '@/types/property';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export default function LandlordPropertiesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const { data: propertiesResponse, isLoading, isError } = useGetMyProperties();
  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();
  const deleteMutation = useDeleteProperty();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailable, setFilterAvailable] = useState<boolean | null>(null);

  // Role guard — redirect if not landlord
  useEffect(() => {
    if (!isPending && session) {
      const role = (session.user as { role?: string }).role;
      if (role !== 'landlord') {
        router.replace('/dashboard');
      }
    }
  }, [session, isPending, router]);

  const allProperties = propertiesResponse?.data ?? [];

  const filteredProperties = allProperties.filter((p) => {
    const matchSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter =
      filterAvailable === null || p.available === filterAvailable;
    return matchSearch && matchFilter;
  });

  const handleOpenCreate = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleSubmit = async (data: CreatePropertyInput) => {
    try {
      if (editingProperty) {
        await updateMutation.mutateAsync({ id: editingProperty.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save property:', error);
    }
  };

  const isMutating = createMutation.isPending || updateMutation.isPending;

  const available = allProperties.filter((p) => p.available).length;
  const occupied = allProperties.filter((p) => !p.available).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── Page Header ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-2">
            Landlord Dashboard
          </p>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            My Properties
          </h1>
          <p className="text-zinc-400 mt-1.5 text-sm">
            Manage your listings and track availability in real-time.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-200 self-start sm:self-auto flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      {/* ── Stats Row ───────────────────────────────────── */}
      {!isLoading && !isError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            {
              label: 'Total',
              value: allProperties.length,
              accent: 'text-white',
              bg: 'bg-white/5',
            },
            {
              label: 'Available',
              value: available,
              accent: 'text-teal-400',
              bg: 'bg-teal-500/10',
            },
            {
              label: 'Occupied',
              value: occupied,
              accent: 'text-zinc-400',
              bg: 'bg-white/5',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-xl p-4 border border-white/5 text-center`}
            >
              <p className={`text-2xl font-bold ${stat.accent}`}>
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── Filters ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-teal-500/60 focus:border-teal-500/40 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-zinc-600 flex-shrink-0" />
          {(
            [
              { label: 'All', value: null },
              { label: 'Available', value: true },
              { label: 'Occupied', value: false },
            ] as const
          ).map((opt) => (
            <button
              key={opt.label}
              onClick={() => setFilterAvailable(opt.value)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                filterAvailable === opt.value
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'bg-white/5 text-zinc-400 border border-white/5 hover:bg-white/10'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-teal-500/20 animate-ping" />
            <div className="w-12 h-12 rounded-full border-2 border-t-teal-400 border-zinc-800 animate-spin" />
          </div>
          <p className="text-zinc-500 text-sm">Loading properties...</p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-red-900/30 bg-red-500/5">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-red-400" />
          </div>
          <p className="text-red-400 font-medium">Failed to load properties</p>
          <p className="text-zinc-600 text-sm mt-1">Try refreshing the page.</p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-2xl border border-dashed border-white/8 bg-white/2"
        >
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-5 border border-teal-500/20">
            <LayoutGrid className="w-8 h-8 text-teal-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {searchQuery || filterAvailable !== null
              ? 'No properties match your filter'
              : 'No properties yet'}
          </h3>
          <p className="text-zinc-500 text-sm max-w-xs mb-7">
            {searchQuery || filterAvailable !== null
              ? 'Try adjusting your search or filter.'
              : 'Add your first listing and start managing your rentals.'}
          </p>
          {!searchQuery && filterAvailable === null && (
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-teal-500/40 text-teal-400 text-sm font-medium hover:bg-teal-500/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add First Property
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {filteredProperties.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              index={i}
            />
          ))}
        </motion.div>
      )}

      {/* ── Modal ───────────────────────────────────────── */}
      <PropertyFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProperty}
        isLoading={isMutating}
      />
    </div>
  );
}
