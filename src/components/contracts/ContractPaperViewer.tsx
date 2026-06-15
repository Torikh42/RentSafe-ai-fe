interface ContractPaperViewerProps {
  statusLabel: string;
  contractText: string | null | undefined;
}

export function ContractPaperViewer({
  statusLabel,
  contractText,
}: ContractPaperViewerProps) {
  return (
    <section className="bg-white border border-secondary-300 rounded-xl shadow-lg overflow-hidden flex flex-col relative min-h-[600px]">
      {/* Paper Header */}
      <div className="bg-secondary-50 px-6 py-4 border-b border-secondary-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-500 text-accent-500"></span>
          <span className="font-mono text-[11px] font-bold text-secondary-600 uppercase">
            {statusLabel}
          </span>
        </div>
        <div className="px-3 py-1 bg-primary-900 text-white rounded-full font-mono text-[9px] font-bold uppercase tracking-wider">
          KUHPerdata Compliant
        </div>
      </div>

      {/* Contract Content */}
      <div className="p-8 md:p-12 font-mono text-xs text-primary-900 leading-[1.8] relative overflow-y-auto max-h-[600px] bg-white">
        {/* secured watermark background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
          <span className="text-7xl font-bold -rotate-45">
            RENTSAFE AI SECURED
          </span>
        </div>

        {contractText ? (
          <div className="space-y-6 relative z-10 whitespace-pre-line">
            {contractText}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-secondary-400 font-sans">
            <span>📝</span>
            <span className="mt-2 text-sm">
              Dokumen kontrak sewa sedang diproses oleh AI...
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
