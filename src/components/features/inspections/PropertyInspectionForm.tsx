'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle2, AlertTriangle, Loader2, X, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import type { InspectionResponse } from '@/types/inspection';

interface PropertyInspectionFormProps {
  propertyId: string;
}

export function PropertyInspectionForm({ propertyId }: PropertyInspectionFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [type, setType] = useState<'pre' | 'post'>('pre');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<InspectionResponse | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
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
      setError(err instanceof Error ? err.message : 'Failed to analyze inspection.');
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-extrabold tracking-tight text-secondary-900 dark:text-white sm:text-5xl">
          AI Inspection
        </h1>
        <p className="mt-4 text-lg text-secondary-800/70 dark:text-gray-400">
          Capture property conditions precisely. Our Gemini AI automatically detects and logs damages, ensuring fair disputes.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' || status === 'error' ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]"
            onSubmit={handleSubmit}
          >
            {/* Upload Area */}
            <div className="flex flex-col gap-6">
              <div
                className="group relative flex min-h-[320px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-primary-500/30 bg-primary-50/50 transition-all hover:border-primary-500 hover:bg-primary-50 dark:border-primary-500/20 dark:bg-secondary-900/50 dark:hover:border-primary-500/50"
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                />
                <div className="pointer-events-none flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-secondary-800 dark:ring-white/10">
                    <UploadCloud className="size-8 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-secondary-900 dark:text-white">
                      Drop photos here
                    </p>
                    <p className="mt-1 text-sm text-secondary-800/60 dark:text-gray-400">
                      Support for JPG, PNG, WEBP (Max 5MB each)
                    </p>
                  </div>
                </div>

                {/* Decorative background element */}
                <div className="absolute -bottom-24 -right-24 size-64 rounded-full bg-primary-500/10 blur-3xl group-hover:bg-primary-500/20" />
              </div>

              {files.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {files.map((file, i) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={i}
                      className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-secondary-800"
                    >
                      {/* Using object URL for preview */}
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-md transition-colors hover:bg-red-500"
                      >
                        <X className="size-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Settings & Submit */}
            <div className="flex h-fit flex-col gap-6 rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-secondary-800">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-secondary-900 dark:text-white">
                Inspection Details
              </h3>

              <div className="space-y-4">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition-colors has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 dark:border-secondary-700 dark:has-[:checked]:border-primary-500 dark:has-[:checked]:bg-primary-500/10">
                  <div>
                    <p className="font-semibold text-secondary-900 dark:text-white">Check-in</p>
                    <p className="text-sm text-gray-500">Before tenant moves in</p>
                  </div>
                  <input
                    type="radio"
                    name="type"
                    value="pre"
                    checked={type === 'pre'}
                    onChange={(e) => setType(e.target.value as 'pre')}
                    className="size-5 accent-primary-500"
                  />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition-colors has-[:checked]:border-accent-500 has-[:checked]:bg-accent-500/10 dark:border-secondary-700">
                  <div>
                    <p className="font-semibold text-secondary-900 dark:text-white">Check-out</p>
                    <p className="text-sm text-gray-500">After tenant moves out</p>
                  </div>
                  <input
                    type="radio"
                    name="type"
                    value="post"
                    checked={type === 'post'}
                    onChange={(e) => setType(e.target.value as 'post')}
                    className="size-5 accent-accent-500"
                  />
                </label>
              </div>

              {error && (
                <div className="flex items-start gap-3 rounded-xl bg-error-500/10 p-4 text-error-500">
                  <AlertCircle className="mt-0.5 size-5 shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={files.length === 0}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 py-4 font-semibold text-white transition-all hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Start AI Analysis
              </button>
            </div>
          </motion.form>
        ) : status === 'uploading' ? (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-secondary-900 py-12 text-white shadow-xl"
          >
            <div className="relative mb-8 flex size-24 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary-500/50" />
              <div className="absolute inset-2 animate-pulse rounded-full bg-primary-500/30" />
              <Loader2 className="relative size-10 animate-spin text-primary-500" />
            </div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold">
              Gemini is analyzing...
            </h2>
            <p className="mt-2 text-secondary-800/60 text-gray-400">
              Scanning for damages, assessing severity, and calculating costs.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between rounded-3xl bg-success-500/10 p-8">
              <div>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-success-500">
                  Inspection Complete
                </h2>
                <p className="mt-1 text-secondary-900 dark:text-gray-300">
                  {result?.summary}
                </p>
              </div>
              <CheckCircle2 className="size-12 text-success-500" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {result?.images.map((img) => {
                const analysis = img.aiAnalysis;
                const hasIssues = analysis?.detectedIssues && analysis.detectedIssues.length > 0;

                return (
                  <div
                    key={img.id}
                    className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-secondary-800 dark:bg-secondary-900"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={img.url}
                        alt="Scanned area"
                        className="size-full object-cover"
                      />
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-secondary-900 backdrop-blur-md">
                        {analysis?.roomType || 'Unknown Room'}
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {analysis?.overallCondition || 'No description provided.'}
                      </p>

                      {hasIssues ? (
                        <div className="space-y-3">
                          <h4 className="flex items-center gap-2 text-sm font-bold text-secondary-900 dark:text-white">
                            <AlertTriangle className="size-4 text-warning-500" />
                            Detected Issues
                          </h4>
                          {analysis.detectedIssues.map((issue, i) => (
                            <div
                              key={i}
                              className="rounded-xl bg-gray-50 p-3 dark:bg-secondary-800/50"
                            >
                              <p className="text-sm font-medium text-secondary-900 dark:text-gray-200">
                                {issue.description}
                              </p>
                              <div className="mt-2 flex items-center justify-between text-xs">
                                <span
                                  className={`rounded-md px-2 py-0.5 font-semibold ${
                                    issue.severity === 'high'
                                      ? 'bg-error-500/10 text-error-500'
                                      : issue.severity === 'medium'
                                        ? 'bg-warning-500/10 text-warning-500'
                                        : 'bg-primary-500/10 text-primary-500'
                                  }`}
                                >
                                  {issue.severity.toUpperCase()}
                                </span>
                                {issue.estimatedRepairCost && (
                                  <span className="font-bold text-gray-500">
                                    IDR {issue.estimatedRepairCost.toLocaleString('id-ID')}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 rounded-xl bg-success-500/5 p-4 text-success-500">
                          <CheckCircle2 className="size-5" />
                          <span className="text-sm font-medium">No damages detected. Looks great!</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setFiles([]);
                  setStatus('idle');
                  setResult(null);
                }}
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-secondary-900 transition-colors hover:bg-gray-50 dark:border-secondary-700 dark:bg-secondary-900 dark:text-white dark:hover:bg-secondary-800"
              >
                Inspect Another Property
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
