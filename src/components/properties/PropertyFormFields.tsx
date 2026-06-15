import { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadZone } from '@/components/features/inspections/components/UploadZone';
import type { CreatePropertyInput } from '@/types/property';

interface PropertyFormFieldsProps {
  formData: CreatePropertyInput;
  setFormData: (data: CreatePropertyInput) => void;
  selectedFiles: File[];
  previewUrl: string | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: () => void;
}

export function PropertyFormFields({
  formData,
  setFormData,
  selectedFiles,
  previewUrl,
  handleFileChange,
  handleRemoveFile,
}: PropertyFormFieldsProps) {
  return (
    <>
      <div className="grid gap-2">
        <Label
          htmlFor="name"
          className="text-sm font-bold text-primary-900 uppercase tracking-wider"
        >
          Property Name
        </Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Cyberpunk Loft 2077"
          className="bg-primary-50/30 border-primary-100 text-primary-900 focus-visible:ring-primary-500 h-12 rounded-xl"
        />
      </div>

      <div className="grid gap-2">
        <Label
          htmlFor="address"
          className="text-sm font-bold text-primary-900 uppercase tracking-wider"
        >
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
        <Label
          htmlFor="price"
          className="text-sm font-bold text-primary-900 uppercase tracking-wider"
        >
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
        <Label
          htmlFor="description"
          className="text-sm font-bold text-primary-900 uppercase tracking-wider"
        >
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
            setFormData({
              ...formData,
              available: !formData.available,
            })
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
            setFormData({
              ...formData,
              available: !formData.available,
            })
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
              <p className="text-white text-sm font-medium">
                Click below to change image
              </p>
            </div>
          </div>
        )}
        <UploadZone
          files={selectedFiles}
          onFileChange={handleFileChange}
          onRemoveFile={handleRemoveFile}
        />
      </div>
    </>
  );
}
