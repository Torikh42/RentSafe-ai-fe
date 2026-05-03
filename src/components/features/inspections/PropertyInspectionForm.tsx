'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import type { InspectionResponse } from '@/types/inspection';
import { UploadZone } from './components/UploadZone';
import { InspectionContextSidebar } from './components/InspectionContextSidebar';
import { InspectionResults } from './components/InspectionResults';

interface PropertyInspectionFormProps {
  propertyId: string;
}

export function PropertyInspectionForm({
  propertyId,
}: PropertyInspectionFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [type, setType] = useState<'pre' | 'post'>('pre');
  const [status, setStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const [result, setResult] = useState<InspectionResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [hasBaseline, setHasBaseline] = useState<boolean>(false);
  const [checkingBaseline, setCheckingBaseline] = useState<boolean>(true);

  useEffect(() => {
    async function checkBaseline() {
      try {
        const inspections = await api.inspections.getByProperty(propertyId);
        const baselineExists = inspections.some(
          (insp) => insp.type === 'pre' && insp.status === 'completed'
        );
        setHasBaseline(baselineExists);
      } catch (err) {
        console.error('Failed to check baseline:', err);
      } finally {
        setCheckingBaseline(false);
      }
    }

    checkBaseline();
  }, [propertyId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please upload at least one image.');
      return;
    }

    setStatus('uploading');
    setError('');

    try {
      const formData = new FormData();
      formData.append('propertyId', propertyId);
      formData.append('type', type);
      files.forEach((file) => formData.append('images', file));

      const res = await api.inspections.analyze(formData);

      if (type === 'post') {
        try {
          const comparisonRes = await api.inspections.compare(res.id);
          setResult(comparisonRes);
        } catch (compareErr) {
          console.error('Comparison failed:', compareErr);
          // Fallback to normal analysis if baseline not found
          setResult(res);
        }
      } else {
        setResult(res);
      }

      setStatus('success');
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to analyze inspection.'
      );
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setStatus('idle');
    setResult(null);
  };

  return (
    <div className="mx-auto max-w-6xl w-full">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-accent-500/10 text-accent-500">
              <Camera className="h-3.5 w-3.5" />
            </span>
            <span className="text-[11px] font-semibold tracking-widest text-accent-500 uppercase">
              AI Vision Analysis
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Property <span className="text-accent-500 italic">Inspection</span>
          </h1>
        </div>
        <p className="max-w-md text-sm text-foreground-muted">
          Upload clear photos of the property. Our Gemini Vision model will
          analyze the conditions, detect damages, and calculate estimated repair
          costs automatically.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' || status === 'error' ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]"
            onSubmit={handleSubmit}
          >
            <UploadZone
              files={files}
              onFileChange={handleFileChange}
              onRemoveFile={removeFile}
            />

            <InspectionContextSidebar
              type={type}
              setType={setType}
              hasBaseline={hasBaseline}
              checkingBaseline={checkingBaseline}
              filesLength={files.length}
              error={error}
            />
          </motion.form>
        ) : status === 'uploading' ? (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-12 text-center shadow-sm"
          >
            <div className="relative mb-10 flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full border-2 border-accent-500/30" />
              <div className="absolute inset-2 animate-pulse rounded-full bg-accent-500/20" />
              <Loader2 className="relative h-10 w-10 animate-spin text-accent-500" />
            </div>
            <h2 className="font-display text-3xl font-semibold text-foreground">
              Processing Vision Data
            </h2>
            <p className="mt-3 max-w-sm text-sm text-foreground-muted leading-relaxed">
              Gemini AI is analyzing {files.length} image
              {files.length !== 1 && 's'} to detect material damages, assess
              severity, and calculate standardized repair costs.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {result && (
              <InspectionResults result={result} onReset={handleReset} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
