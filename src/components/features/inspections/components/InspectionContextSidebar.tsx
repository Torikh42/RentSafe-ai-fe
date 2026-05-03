import { AlertTriangle, ArrowRight, AlertCircle } from 'lucide-react';

interface InspectionContextSidebarProps {
  type: 'pre' | 'post';
  setType: (type: 'pre' | 'post') => void;
  hasBaseline: boolean;
  checkingBaseline: boolean;
  filesLength: number;
  error: string;
}

export function InspectionContextSidebar({
  type,
  setType,
  hasBaseline,
  checkingBaseline,
  filesLength,
  error,
}: InspectionContextSidebarProps) {
  return (
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
            <p className="font-semibold text-foreground text-sm">Check-in</p>
            <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
              Document the initial state of the property before the tenant
              occupies it.
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

        <label
          className={`group flex items-start gap-4 rounded-xl border border-border p-4 transition-all ${
            hasBaseline
              ? 'cursor-pointer hover:border-primary-400 has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50/50 dark:has-[:checked]:bg-accent-500/10'
              : 'cursor-not-allowed opacity-60 bg-surface-hover grayscale'
          }`}
        >
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border mt-0.5 ${hasBaseline ? 'group-has-[:checked]:border-accent-500' : ''}`}
          >
            <div className="h-2.5 w-2.5 rounded-full bg-accent-500 opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground text-sm flex items-center gap-2">
              Check-out
              {!checkingBaseline && !hasBaseline && (
                <span className="text-[9px] font-bold uppercase tracking-wider bg-error-500/10 text-error-600 dark:text-error-400 px-2 py-0.5 rounded">
                  Locked
                </span>
              )}
            </p>
            <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
              Final assessment to verify condition and determine escrow release.
            </p>
            {!checkingBaseline && !hasBaseline && (
              <p className="mt-2 text-[10px] font-medium text-error-600 dark:text-error-400 flex items-start gap-1">
                <AlertTriangle className="h-3 w-3 shrink-0" />
                Baseline check-in required. You must complete a Check-in
                inspection first before performing a Check-out.
              </p>
            )}
          </div>
          <input
            type="radio"
            name="type"
            value="post"
            disabled={!hasBaseline}
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
          <span>Images ready: {filesLength}</span>
          {filesLength > 0 && (
            <span className="text-accent-500">Ready to scan</span>
          )}
        </div>
        <button
          type="submit"
          disabled={filesLength === 0}
          className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-accent-500 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-accent-500 active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Execute AI Scan <ArrowRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </div>
  );
}
