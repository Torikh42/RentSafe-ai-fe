'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { useSession } from '@/lib/auth-client';
import { Loader2, ArrowLeft, Home, User, FileText } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { EscrowStatusCard } from '@/components/features/escrows/EscrowStatusCard';
import { EscrowTimeline } from '@/components/features/escrows/EscrowTimeline';
import { EscrowDetail } from '@/types/escrow';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function EscrowDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: session, isPending: sessionPending } = useSession();
  
  const [escrow, setEscrow] = useState<EscrowDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEscrow = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.escrows.getDetail(id);
      setEscrow(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load escrow details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (session && id) {
      loadEscrow();
    }
  }, [session, id, loadEscrow]);

  if (sessionPending || loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error || !escrow) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600 max-w-3xl mx-auto mt-8">
        <p className="font-semibold">{error || 'Escrow not found'}</p>
        <Link
          href="/payments"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline text-red-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Payments
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-8 px-4">
      <div>
        <Link href="/payments" className="inline-flex items-center gap-2 text-sm font-medium text-secondary-500 hover:text-secondary-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Payments
        </Link>
        <h1 className="text-2xl font-bold text-secondary-900">Escrow Details</h1>
        <p className="text-secondary-500 text-sm mt-1">
          ID: {escrow.id}
        </p>
      </div>

      <EscrowStatusCard escrow={escrow} formatCurrency={formatCurrency} />
      
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <EscrowTimeline escrow={escrow} formatDate={formatDate} />
        
        {/* Contract Info Summary */}
        <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm mt-6">
          <h3 className="text-lg font-bold text-secondary-900 mb-4">Related Contract</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-secondary-100 pb-3">
              <div className="flex items-center gap-2 text-secondary-600">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-semibold">Contract Status</span>
              </div>
              <span className="text-sm font-bold text-secondary-900 capitalize">{escrow.contract.status.replace('_', ' ')}</span>
            </div>
            
            <div className="flex items-center justify-between border-b border-secondary-100 pb-3">
              <div className="flex items-center gap-2 text-secondary-600">
                <Home className="w-4 h-4" />
                <span className="text-sm font-semibold">Monthly Rent</span>
              </div>
              <span className="text-sm font-bold text-secondary-900">{formatCurrency(escrow.contract.monthlyRent)}</span>
            </div>
            
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2 text-secondary-600">
                <User className="w-4 h-4" />
                <span className="text-sm font-semibold">Deposit Amount</span>
              </div>
              <span className="text-sm font-bold text-secondary-900">{formatCurrency(escrow.contract.depositAmount)}</span>
            </div>
          </div>
          
          <Link
            href={`/contracts/${escrow.contractId}`}
            className="mt-6 w-full inline-flex justify-center items-center gap-2 rounded-xl bg-secondary-50 px-4 py-2.5 text-sm font-semibold text-secondary-700 transition-all hover:bg-secondary-100"
          >
            View Full Contract <FileText className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
