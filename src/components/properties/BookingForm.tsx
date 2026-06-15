import { FormEvent } from 'react';

interface BookingFormProps {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  errorMessage: string;
  successMessage: string;
  isSubmitting: boolean;
  monthlyRent: number;
  securityDeposit: number;
  totalInitialPayment: number;
  onSubmit: (e: FormEvent) => void;
}

export function BookingForm({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  errorMessage,
  successMessage,
  isSubmitting,
  monthlyRent,
  securityDeposit,
  totalInitialPayment,
  onSubmit,
}: BookingFormProps) {
  return (
    <section className="px-4 -mt-8 relative z-10 pb-24 max-w-xl mx-auto">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-xl border border-secondary-200 p-6 mb-6"
      >
        <div className="mb-6">
          <h3 className="font-display text-xl font-bold text-primary-900 mb-2">
            Informasi Sewa
          </h3>
          <p className="text-sm text-secondary-500 mb-6">
            Silakan pilih durasi sewa Anda. Kontrak sewa dan verifikasi
            background akan diproses secara otomatis oleh RentSafe AI.
          </p>

          {errorMessage && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label
                htmlFor="startDate"
                className="block font-mono text-[11px] font-semibold uppercase text-secondary-500"
              >
                Tanggal Mulai
              </label>
              <input
                id="startDate"
                className="w-full h-12 bg-secondary-50 border border-secondary-300 rounded-lg px-4 font-mono text-sm text-primary-900 focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="endDate"
                className="block font-mono text-[11px] font-semibold uppercase text-secondary-500"
              >
                Tanggal Berakhir
              </label>
              <input
                id="endDate"
                className="w-full h-12 bg-secondary-50 border border-secondary-300 rounded-lg px-4 font-mono text-sm text-primary-900 focus:ring-2 focus:ring-accent-500 outline-none transition-all"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-secondary-50 rounded-lg p-4 space-y-3 border border-secondary-200">
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-secondary-600">
                Sewa Bulanan
              </span>
              <span className="font-mono text-sm text-primary-900 font-bold">
                Rp {monthlyRent.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-secondary-600">
                Deposit Keamanan
              </span>
              <span className="font-mono text-sm text-primary-900 font-bold">
                Rp {securityDeposit.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="pt-3 border-t border-secondary-200 flex justify-between items-center">
              <span className="font-sans text-sm font-bold text-primary-900">
                Total Pembayaran Awal
              </span>
              <span className="font-mono text-lg text-accent-500 font-extrabold">
                Rp {totalInitialPayment.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Policy Badges */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 p-3 bg-accent-50 rounded-lg border border-accent-100">
            <span className="text-accent-600 text-[20px]">⚖️</span>
            <span className="text-[11px] font-bold text-accent-800 leading-tight">
              AI-Generated Contract
            </span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-primary-50 rounded-lg border border-primary-100">
            <span className="text-primary-600 text-[20px]">🛡️</span>
            <span className="text-[11px] font-bold text-primary-800 leading-tight">
              Smart Escrow Protection
            </span>
          </div>
        </div>

        <p className="text-center font-sans text-xs text-secondary-500 mb-6 px-2">
          Dengan menekan tombol di bawah, Anda menyetujui pemeriksaan latar
          belakang otomatis oleh RentSafe AI.
        </p>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-accent-500 disabled:bg-secondary-300 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-accent-500/20 transition-transform active:scale-[0.98]"
        >
          {isSubmitting ? 'Mengirim permohonan...' : 'Kirim Permohonan Sewa'}
          <span>➔</span>
        </button>
      </form>
    </section>
  );
}
