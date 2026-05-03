'use client';

import { useState, useEffect } from 'react';
import {
  useGetMyProperties,
  useCreateProperty,
  useUpdateProperty,
  useDeleteProperty,
} from '@/hooks/use-properties';
import { PropertyFormModal } from '@/components/properties/property-form';
import type { Property, CreatePropertyInput } from '@/types/property';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

import { PropertiesHeader } from '@/components/features/properties/PropertiesHeader';
import { PropertiesStats } from '@/components/features/properties/PropertiesStats';
import { PropertiesFilter } from '@/components/features/properties/PropertiesFilter';
import { PropertiesGrid } from '@/components/features/properties/PropertiesGrid';

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
      <PropertiesHeader onAddProperty={handleOpenCreate} />

      {!isLoading && !isError && (
        <PropertiesStats
          total={allProperties.length}
          available={available}
          occupied={occupied}
        />
      )}

      <PropertiesFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterAvailable={filterAvailable}
        setFilterAvailable={setFilterAvailable}
      />

      <PropertiesGrid
        isLoading={isLoading}
        isError={isError}
        properties={filteredProperties}
        searchQuery={searchQuery}
        filterAvailable={filterAvailable}
        onAddProperty={handleOpenCreate}
        onEditProperty={handleOpenEdit}
        onDeleteProperty={handleDelete}
      />

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
