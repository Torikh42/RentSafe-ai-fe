'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus } from 'lucide-react';
import {
  useGetMyProperties,
  useCreateProperty,
  useUpdateProperty,
  useDeleteProperty,
} from '@/hooks/use-properties';
import type { Property, CreatePropertyInput } from '@/types/property';
import { PropertiesFilter } from '@/components/features/properties/PropertiesFilter';
import { PropertiesGrid } from '@/components/features/properties/PropertiesGrid';
import { PropertyFormModal } from '@/components/properties/property-form';
import { Button } from '@/components/ui/button';

export default function LandlordPropertiesPage() {
  const searchParams = useSearchParams();
  const { data: propertiesResponse, isLoading, isError } = useGetMyProperties();
  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();
  const deleteMutation = useDeleteProperty();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailable, setFilterAvailable] = useState<boolean | null>(null);

  // Automatically open create modal if redirect query has ?add=true
  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      handleOpenCreate();
    }
  }, [searchParams]);

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

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-primary-900">
            Properties
          </h1>
          <p className="mt-1 text-sm text-secondary-500">
            Manage your rental listings and track their availability status.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="rounded-lg bg-primary-500 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-sm hover:bg-primary-600"
        >
          <Plus className="mr-1 h-3.5 w-3.5" /> Add Property
        </Button>
      </div>

      <div className="space-y-6">
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
      </div>

      {/* Property Create/Edit Modal */}
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
