import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { EscrowDetail } from '@/types/escrow';

interface EscrowStatusCardProps {
  escrow: EscrowDetail;
  formatCurrency: (amount: number) => string;
}

export function EscrowStatusCard({ escrow, formatCurrency }: EscrowStatusCardProps) {
  const isPending = escrow.status === 'pending';
  const isHeld = escrow.status === 'held';
  const isReleased = escrow.status === 'released';
  const isRefunded = escrow.status === 'refunded';

  return (
    <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full opacity-50 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary-50 text-primary-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-secondary-900">Escrow Security</h2>
              <p className="text-sm text-secondary-500">Funds are held safely by Midtrans</p>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold border bg-white">
            {isPending && <><Clock className="w-4 h-4 text-warning-500" /> <span className="text-warning-700">Waiting for Payment</span></>}
            {isHeld && <><ShieldCheck className="w-4 h-4 text-primary-500" /> <span className="text-primary-700">Funds Secured</span></>}
            {isReleased && <><CheckCircle2 className="w-4 h-4 text-success-500" /> <span className="text-success-700">Funds Released to Landlord</span></>}
            {isRefunded && <><CheckCircle2 className="w-4 h-4 text-success-500" /> <span className="text-success-700">Funds Refunded to Tenant</span></>}
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1 min-w-[200px] bg-secondary-50 p-4 rounded-xl">
          <p className="text-xs font-bold uppercase tracking-wider text-secondary-500">Secured Amount</p>
          <p className="text-3xl font-black text-secondary-900">{formatCurrency(escrow.amount)}</p>
          {escrow.fee > 0 && (
            <p className="text-xs font-semibold text-secondary-500">Including {formatCurrency(escrow.fee)} platform fee</p>
          )}
        </div>
      </div>
    </div>
  );
}
