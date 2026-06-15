interface ContractStickyActionsProps {
  status: string;
  signedByTenant: boolean;
  signedByLandlord: boolean;
  isUserLandlord: boolean;
  hasContractText: boolean;
  canUserSign: boolean;
  hasUserSigned: boolean;
  actionLoading: boolean;
  onGenerate: () => Promise<void>;
  onSign: () => Promise<void>;
}

export function ContractStickyActions({
  status,
  signedByTenant,
  signedByLandlord,
  isUserLandlord,
  hasContractText,
  canUserSign,
  hasUserSigned,
  actionLoading,
  onGenerate,
  onSign,
}: ContractStickyActionsProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 lg:left-72 z-40 bg-white/95 backdrop-blur-md border-t border-secondary-200 px-6 py-4 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-accent-500 animate-pulse'}`}
          />
          <div className="text-sm">
            {status === 'active' ? (
              <span className="font-sans text-green-700 font-bold">
                Kontrak Aktif & Telah Ditandatangani
              </span>
            ) : (
              <span className="font-sans text-secondary-600">
                Status Tanda Tangan:{' '}
                {signedByTenant ? 'Penyewa ✓' : 'Penyewa ✗'} |{' '}
                {signedByLandlord ? 'Pemilik ✓' : 'Pemilik ✗'}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          {isUserLandlord && !hasContractText && (
            <button
              onClick={onGenerate}
              disabled={actionLoading}
              className="w-full sm:w-auto px-8 py-3.5 bg-primary-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              {actionLoading ? (
                'Menghasilkan...'
              ) : (
                <>
                  <span>🤖</span> Buat Kontrak dengan AI
                </>
              )}
            </button>
          )}

          {canUserSign ? (
            <button
              onClick={onSign}
              disabled={actionLoading}
              className="w-full sm:w-auto px-8 py-3.5 bg-accent-500 text-white rounded-xl font-bold text-sm shadow-md hover:bg-accent-600 transition-colors flex items-center justify-center gap-2"
            >
              {actionLoading ? (
                'Memproses...'
              ) : (
                <>
                  <span>✍️</span> Tandatangani Kontrak
                </>
              )}
            </button>
          ) : hasUserSigned ? (
            <div className="px-6 py-3 bg-secondary-100 text-secondary-600 font-bold text-sm rounded-xl">
              Telah Anda Tandatangani ✓
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
