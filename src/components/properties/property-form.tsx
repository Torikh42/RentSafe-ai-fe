'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
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
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        address: initialData.address,
        price: initialData.price,
        description: initialData.description || '',
        available: initialData.available,
      });
    } else {
      setFormData({
        name: '',
        address: '',
        price: 0,
        description: '',
        available: true,
      });
    }
  }, [initialData, isOpen]);

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
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-teal-900/50 bg-zinc-950 p-6 shadow-2xl shadow-teal-500/10 sm:rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight text-white">
                {initialData ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-zinc-300">
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
                  className="bg-zinc-900 border-white/10 text-white focus-visible:ring-teal-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address" className="text-zinc-300">
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
                  className="bg-zinc-900 border-white/10 text-white focus-visible:ring-teal-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price" className="text-zinc-300">
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
                  className="bg-zinc-900 border-white/10 text-white focus-visible:ring-teal-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-zinc-300">
                  Description
                </Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Detailed description of the property..."
                  className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
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
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                    formData.available ? 'bg-teal-500' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                      formData.available ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <Label
                  className="text-sm cursor-pointer text-zinc-300"
                  onClick={() =>
                    setFormData({ ...formData, available: !formData.available })
                  }
                >
                  Available for rent
                </Label>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="text-zinc-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-teal-500 hover:bg-teal-600 text-white border-transparent"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {initialData ? 'Save Changes' : 'Create Property'}
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
