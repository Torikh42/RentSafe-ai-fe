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
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* ── Page Header ─────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-primary-950 p-8 sm:p-12 border border-white/10 shadow-2xl">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 blur-[100px] -mr-48 -mt-48 rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/20 blur-[80px] -ml-32 -mb-32 rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-[10px] font-bold uppercase tracking-widest text-accent-400">
                Landlord Dashboard
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-medium">
                Live Status
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Portfolio <span className="text-accent-500">Overview</span>
            </h1>
            <p className="text-zinc-400 max-w-xl text-lg leading-relaxed">
              Maintain full control over your rental assets. Monitor real-time
              availability and manage high-performance listings.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-accent-500 hover:bg-accent-400 text-primary-950 text-base font-bold shadow-2xl shadow-accent-500/20 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          >
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            Add Property
          </button>
        </div>
      </div>

      {/* ── Stats Section ─────────────────────────────────── */}
      {!isLoading && !isError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            {
              label: 'Total Assets',
              value: allProperties.length,
              icon: Building2,
              accent: 'text-white',
              bg: 'bg-primary-900/40',
              border: 'border-white/5',
            },
            {
              label: 'Available Units',
              value: available,
              icon: LayoutGrid,
              accent: 'text-accent-400',
              bg: 'bg-accent-500/5',
              border: 'border-accent-500/10',
            },
            {
              label: 'Active Tenancies',
              value: occupied,
              icon: SlidersHorizontal,
              accent: 'text-zinc-300',
              bg: 'bg-white/2',
              border: 'border-white/5',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} ${stat.border} relative group rounded-3xl p-8 border flex items-center justify-between overflow-hidden transition-all hover:bg-opacity-60`}
            >
              <div>
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <p
                  className={`text-4xl font-bold ${stat.accent} tracking-tight`}
                >
                  {stat.value}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-accent-500/10 transition-colors">
                <stat.icon className={`w-8 h-8 ${stat.accent}`} />
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── Filters & Search ─────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between p-2 rounded-[28px] bg-primary-950/50 border border-white/5 backdrop-blur-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-accent-500 transition-colors" />
          <input
            type="text"
            placeholder="Filter by name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-transparent border-none text-base text-white placeholder:text-zinc-600 focus:outline-none focus:ring-0 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 p-2 bg-white/5 rounded-2xl">
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
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                filterAvailable === opt.value
                  ? 'bg-accent-500 text-primary-950 shadow-lg shadow-accent-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content Grid ─────────────────────────────────── */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-accent-500/20 animate-pulse" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-t-2 border-accent-500 animate-spin" />
          </div>
          <p className="text-zinc-500 font-medium tracking-wide animate-pulse uppercase text-xs">
            Synchronizing your assets...
          </p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
            <Building2 className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Sync Error</h3>
          <p className="text-zinc-500 max-w-sm mb-8">
            We encountered a problem retrieving your portfolio. Please check
            your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredProperties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-32 px-8 text-center rounded-[40px] border-2 border-dashed border-white/5 bg-primary-950/20"
        >
          <div className="w-24 h-24 rounded-[32px] bg-accent-500/10 flex items-center justify-center mb-8 border border-accent-500/20">
            <LayoutGrid className="w-10 h-10 text-accent-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            {searchQuery || filterAvailable !== null
              ? 'No Results Found'
              : 'Portfolio is Empty'}
          </h3>
          <p className="text-zinc-500 text-lg max-w-md mb-10">
            {searchQuery || filterAvailable !== null
              ? 'Try refining your search parameters or clearing filters to find what you are looking for.'
              : 'Ready to scale? Add your first high-yield rental property and start managing with RentSafe AI.'}
          </p>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-accent-500 hover:bg-accent-400 text-primary-950 font-bold shadow-xl shadow-accent-500/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add First Asset
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
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
