'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UploadZone } from '@/components/features/inspections/components/UploadZone';
import type { CreatePropertyInput, Property } from '@/types/property';

interface PropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePropertyInput) => Promise<void>;
  initialData?: Property | null;
  isLoading?: boolean;
}

export function PropertyFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: PropertyFormModalProps) {
  const [formData, setFormData] = useState<CreatePropertyInput>({
    name: '',
    address: '',
    price: 0,
    description: '',
    available: true,
    image: null,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        address: initialData.address,
        price: initialData.price,
        description: initialData.description || '',
        available: initialData.available,
        image: initialData.image,
      });
      setPreviewUrl(initialData.image || null);
      setSelectedFiles([]);
    } else {
      setFormData({
        name: '',
        address: '',
        price: 0,
        description: '',
        available: true,
        image: null,
      });
      setPreviewUrl(null);
      setSelectedFiles([]);
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFiles([file]);
      setFormData({ ...formData, image: file });
      setPreviewUrl(null); // Clear preview of existing image if a new one is selected
    }
  };

  const handleRemoveFile = () => {
    setSelectedFiles([]);
    setFormData({ ...formData, image: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] border border-primary-100 bg-white shadow-premium sm:rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-primary-50 flex items-center justify-between bg-white shrink-0">
              <h2 className="text-lg font-bold tracking-tight text-primary-900 font-display">
                {initialData ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-secondary-400 hover:bg-primary-50 hover:text-primary-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 pt-2">
              <form onSubmit={handleSubmit} className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm font-bold text-primary-900 uppercase tracking-wider">
                  Property Name
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Cyberpunk Loft 2077"
                  className="bg-primary-50/30 border-primary-100 text-primary-900 focus-visible:ring-primary-500 h-12 rounded-xl"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address" className="text-sm font-bold text-primary-900 uppercase tracking-wider">
                  Address
                </Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="e.g. 123 Neon Ave, Sector 4"
                  className="bg-primary-50/30 border-primary-100 text-primary-900 focus-visible:ring-primary-500 h-12 rounded-xl"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price" className="text-sm font-bold text-primary-900 uppercase tracking-wider">
                  Monthly Rent (Rp)
                </Label>
                <Input
                  id="price"
                  type="number"
                  required
                  min={0}
                  value={formData.price || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="5000000"
                  className="bg-primary-50/30 border-primary-100 text-primary-900 focus-visible:ring-primary-500 h-12 rounded-xl"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm font-bold text-primary-900 uppercase tracking-wider">
                  Description
                </Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Detailed description of the property..."
                  className="flex min-h-[100px] w-full rounded-xl border border-primary-100 bg-primary-50/30 px-3 py-2 text-sm text-primary-900 shadow-sm placeholder:text-secondary-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={formData.available}
                  onClick={() =>
                    setFormData({ ...formData, available: !formData.available })
                  }
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    formData.available ? 'bg-accent-500' : 'bg-secondary-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                      formData.available ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <Label
                  className="text-sm font-semibold cursor-pointer text-primary-900"
                  onClick={() =>
                    setFormData({ ...formData, available: !formData.available })
                  }
                >
                  Available for rent
                </Label>
              </div>

              <div className="grid gap-2 mt-2">
                <Label className="text-sm font-bold text-primary-900 uppercase tracking-wider">
                  Property Image
                </Label>
                {previewUrl && selectedFiles.length === 0 && (
                  <div className="relative group aspect-video overflow-hidden rounded-xl border border-primary-100 mb-4">
                    <img
                      src={previewUrl}
                      alt="Property"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <p className="text-white text-sm font-medium">Click below to change image</p>
                    </div>
                  </div>
                )}
                <UploadZone
                  files={selectedFiles}
                  onFileChange={handleFileChange}
                  onRemoveFile={handleRemoveFile}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-primary-50 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="text-secondary-500 hover:text-primary-900 hover:bg-primary-50 h-10 px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary-900 hover:bg-primary-800 text-white border-transparent px-8 h-10 rounded-xl font-bold"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {initialData ? 'Save Changes' : 'Create Property'}
                </Button>
              </div>
            </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
