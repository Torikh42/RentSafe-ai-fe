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
    <div className="flex flex-col gap-6">
      <div className="group relative flex min-h-[360px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-surface hover:border-accent-500/50 hover:bg-surface-hover transition-colors duration-300">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
        />

        <div className="pointer-events-none flex flex-col items-center text-center z-20">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-white transition-all duration-500">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Click or drag photos to upload
          </h3>
          <p className="mt-2 text-sm text-foreground-muted max-w-xs mx-auto">
            Supported formats: JPG, PNG, WEBP. Maximum file size: 5MB per image.
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {files.map((file, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={i}
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
