import { CheckCircle2, AlertTriangle, ImageIcon } from 'lucide-react';
import type { InspectionResponse } from '@/types/inspection';

interface InspectionResultsProps {
  result: InspectionResponse;
  onReset: () => void;
}

export function InspectionResults({ result, onReset }: InspectionResultsProps) {
  return (
    <div className="space-y-8">
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
              {result.summary ||
                'The visual inspection has been processed successfully and appended to the property record.'}
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="shrink-0 rounded-xl border border-border bg-surface-hover px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary-100 dark:hover:bg-primary-900"
        >
          Scan New Area
        </button>
      </div>

      {/* Comparison Report Section */}
      {result.comparisonReport && (
        <div className="overflow-hidden rounded-2xl border border-accent-500/30 bg-surface shadow-sm">
          <div className="bg-accent-500/10 p-6 border-b border-accent-500/20">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-accent-600 dark:text-accent-400" />
              <h3 className="font-display text-xl font-bold text-foreground">
                Check-out vs Check-in Delta
              </h3>
            </div>
            <p className="text-sm text-foreground-muted">
              {result.comparisonReport.summary}
            </p>
          </div>
          <div className="p-6 space-y-6">
            {result.comparisonReport.newDamages?.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                  New Material Damages
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {result.comparisonReport.newDamages.map((damage, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-error-500/20 bg-error-500/5 p-4"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {damage.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex rounded text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-error-500/10 text-error-600 dark:text-error-400">
                          {damage.severity} Risk
                        </span>
                        {damage.estimatedRepairCost && (
                          <span className="text-xs font-bold text-error-600 dark:text-error-400">
                            Rp{' '}
                            {damage.estimatedRepairCost.toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-xl bg-surface-hover p-4 border border-border">
                  <span className="text-sm font-semibold text-foreground">
                    Total Deductible Damages
                  </span>
                  <span className="text-lg font-bold text-error-600 dark:text-error-400">
                    Rp{' '}
                    {result.comparisonReport.totalEstimatedCost?.toLocaleString(
                      'id-ID'
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-xl border border-success-500/20 bg-success-500/5 p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                <p className="text-sm font-medium text-success-700 dark:text-success-400">
                  No new damages detected compared to the baseline check-in.
                  Full deposit is eligible for release.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.images.map((img) => {
          const analysis = img.aiAnalysis;
          const hasIssues =
            analysis?.detectedIssues && analysis.detectedIssues.length > 0;

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
    </div>
  );
}
