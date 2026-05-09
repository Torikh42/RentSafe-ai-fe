import { UploadCloud, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadZoneProps {
  files: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

export function UploadZone({
  files,
  onFileChange,
  onRemoveFile,
}: UploadZoneProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="group relative flex min-h-[140px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary-100 bg-primary-50/20 hover:border-accent-500/50 hover:bg-primary-50/50 transition-all duration-300">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
        />

        <div className="pointer-events-none flex flex-col items-center text-center z-20 p-4">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary-600 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-white transition-all duration-500 shadow-sm border border-primary-100">
            <UploadCloud className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-primary-900">
            Upload Property Photos
          </h3>
          <p className="mt-1 text-[10px] text-secondary-500 font-medium">
            JPG, PNG or WEBP (Max 5MB)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {files.map((file, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-surface"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${i}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
              <button
                type="button"
                onClick={() => onRemoveFile(i)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 transition-all hover:bg-error-500 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
