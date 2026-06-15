interface PropertyItem {
  id: string;
  name: string;
}

interface AIAnalysisSummaryProps {
  score: number;
  strokeDashoffset: number;
  summary: string;
  initialPayment: number;
  property: PropertyItem | null;
}

export function AIAnalysisSummary({
  score,
  strokeDashoffset,
  summary,
  initialPayment,
  property,
}: AIAnalysisSummaryProps) {
  return (
    <section className="bg-white border border-secondary-200 rounded-xl p-6 shadow-md relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <span className="text-6xl">🧠</span>
      </div>
      <div className="flex flex-col items-center text-center">
        {/* Fairness Score Gauge */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-secondary-100"
              cx="64"
              cy="64"
              fill="transparent"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
            />
            <circle
              className="text-accent-500 transition-all duration-1000"
              cx="64"
              cy="64"
              fill="transparent"
              r="58"
              stroke="currentColor"
              strokeDasharray="364.4"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="8"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-3xl font-extrabold text-primary-900">
              {score}
            </span>
            <span className="font-mono text-[10px] text-secondary-400 -mt-1">
              / 100
            </span>
          </div>
        </div>
        <span className="mt-3 font-mono text-[11px] font-bold text-accent-600 uppercase tracking-widest">
          Fairness Score
        </span>

        {/* AI Report Summary */}
        <div className="mt-6 border-t border-secondary-200 pt-6 text-left w-full space-y-4">
          <h2 className="font-display text-lg font-bold text-primary-900 flex items-center gap-2">
            <span>✨</span> AI Analysis
          </h2>
          <p className="text-sm text-secondary-600 leading-relaxed">
            {summary}
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 p-2 bg-secondary-50 rounded-lg text-xs font-semibold text-secondary-700">
              <span>💵</span> Pembayaran Awal: Rp{' '}
              {initialPayment.toLocaleString('id-ID')}
            </div>
            {property && (
              <div className="flex items-center gap-2 p-2 bg-secondary-50 rounded-lg text-xs font-semibold text-secondary-700">
                <span>🏠</span> Properti: {property.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
