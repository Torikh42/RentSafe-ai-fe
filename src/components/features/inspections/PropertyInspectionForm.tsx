'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  X,
  AlertCircle,
  ImageIcon,
  Camera,
} from 'lucide-react';
import { api } from '@/lib/api';
import type { InspectionResponse } from '@/types/inspection';

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
      setResult(res);
      setStatus('success');
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to analyze inspection.'
      );
      setStatus('error');
    }
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
            {/* Upload Area */}
            <div className="flex flex-col gap-6">
              <div className="group relative flex min-h-[360px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-surface hover:border-accent-500/50 hover:bg-surface-hover transition-colors duration-300">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
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
                    Supported formats: JPG, PNG, WEBP. Maximum file size: 5MB
                    per image.
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
                        onClick={() => removeFile(i)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 transition-all hover:bg-error-500 group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Settings & Submit */}
            <div className="flex h-fit flex-col gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Inspection Context
                </h3>
                <p className="text-xs text-foreground-muted">
                  Define the phase of the rental lifecycle.
                </p>
              </div>

              <div className="space-y-3">
                <label className="group flex cursor-pointer items-start gap-4 rounded-xl border border-border p-4 transition-all hover:border-primary-400 has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50/50 dark:has-[:checked]:bg-accent-500/10">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border group-has-[:checked]:border-accent-500 mt-0.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-accent-500 opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">
                      Check-in
                    </p>
                    <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                      Document the initial state of the property before the
                      tenant occupies it.
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="type"
                    value="pre"
                    checked={type === 'pre'}
                    onChange={(e) => setType(e.target.value as 'pre')}
                    className="hidden"
                  />
                </label>

                <label className="group flex cursor-pointer items-start gap-4 rounded-xl border border-border p-4 transition-all hover:border-primary-400 has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50/50 dark:has-[:checked]:bg-accent-500/10">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border group-has-[:checked]:border-accent-500 mt-0.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-accent-500 opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">
                      Check-out
                    </p>
                    <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                      Final assessment to verify condition and determine escrow
                      release.
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="type"
                    value="post"
                    checked={type === 'post'}
                    onChange={(e) => setType(e.target.value as 'post')}
                    className="hidden"
                  />
                </label>
              </div>

              {error && (
                <div className="flex items-start gap-3 rounded-lg bg-error-500/10 p-3 text-error-600 dark:text-error-400 border border-error-500/20">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-xs font-medium leading-relaxed">{error}</p>
                </div>
              )}

              <div className="mt-4 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-xs font-medium text-foreground-muted mb-4">
                  <span>Images ready: {files.length}</span>
                  {files.length > 0 && (
                    <span className="text-accent-500">Ready to scan</span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={files.length === 0}
                  className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-accent-500 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-accent-500 active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Execute AI Scan
                  </span>
                </button>
              </div>
            </div>
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
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <div className="flex items-start sm:items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-success-500/10 text-success-600 border border-success-500/20">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Analysis Completed
                  </h2>
                  <p className="mt-1 text-sm text-foreground-muted max-w-xl">
                    {result?.summary ||
                      'The visual inspection has been processed successfully and appended to the property record.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setFiles([]);
                  setStatus('idle');
                  setResult(null);
                }}
                className="shrink-0 rounded-xl border border-border bg-surface-hover px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary-100 dark:hover:bg-primary-900"
              >
                Scan New Area
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {result?.images.map((img) => {
                const analysis = img.aiAnalysis;
                const hasIssues =
                  analysis?.detectedIssues &&
                  analysis.detectedIssues.length > 0;

                return (
                  <div
                    key={img.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:border-accent-500/30"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-primary-50 dark:bg-primary-950">
                      <img
                        src={img.url}
                        alt="Scanned area"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-background/90 px-3 py-1.5 text-[10px] font-bold tracking-widest text-foreground uppercase backdrop-blur-md shadow-sm border border-border">
                        <ImageIcon className="h-3 w-3" />
                        {analysis?.roomType || 'Room View'}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-sm font-medium text-foreground leading-relaxed mb-6">
                        "
                        {analysis?.overallCondition ||
                          'No condition description generated.'}
                        "
                      </p>

                      <div className="mt-auto">
                        {hasIssues ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-warning-500/10 text-warning-600">
                                <AlertTriangle className="h-3 w-3" />
                              </span>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                                Findings
                              </h4>
                            </div>

                            <div className="space-y-2">
                              {analysis.detectedIssues.map((issue, i) => (
                                <div
                                  key={i}
                                  className="rounded-xl border border-border bg-surface-hover p-4"
                                >
                                  <p className="text-sm font-medium text-foreground">
                                    {issue.description}
                                  </p>
                                  <div className="mt-3 flex items-center justify-between">
                                    <span
                                      className={`inline-flex rounded text-[10px] font-bold uppercase tracking-wider px-2 py-1 ${
                                        issue.severity === 'high'
                                          ? 'bg-error-500/10 text-error-600 dark:text-error-400'
                                          : issue.severity === 'medium'
                                            ? 'bg-warning-500/10 text-warning-600 dark:text-warning-400'
                                            : 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                                      }`}
                                    >
                                      {issue.severity} Risk
                                    </span>
                                    {issue.estimatedRepairCost && (
                                      <span className="text-xs font-semibold text-foreground">
                                        Rp{' '}
                                        {issue.estimatedRepairCost.toLocaleString(
                                          'id-ID'
                                        )}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-3 rounded-xl border border-success-500/20 bg-success-500/5 p-4">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                            <p className="text-sm font-medium text-success-700 dark:text-success-400">
                              System verified: Clean state. No material damages
                              identified.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
