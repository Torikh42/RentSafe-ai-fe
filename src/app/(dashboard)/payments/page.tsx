'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { useSession } from '@/lib/auth-client';
import { Loader2, CreditCard, ExternalLink, Receipt, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { PaymentWithEscrow } from '@/types/payment';
import Link from 'next/link';

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


export default function PaymentsPage() {
  const { data: session, isPending: sessionPending } = useSession();
  const [payments, setPayments] = useState<PaymentWithEscrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.payments.listMy();
      setPayments(res); // The backend returns the array directly
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      loadPayments();
    }
  }, [session, loadPayments]);

  if (sessionPending || loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600 max-w-3xl mx-auto mt-8">
        <p className="font-semibold">{error}</p>
        <button
          onClick={loadPayments}
          className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium hover:bg-red-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-8 px-4">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Payment History</h1>
        <p className="text-secondary-500 text-sm mt-1">
          View all your transactions and their status
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-2xl border border-secondary-100 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary-50">
            <Receipt className="h-6 w-6 text-secondary-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-secondary-900">
            No payments found
          </h3>
          <p className="mt-2 text-sm text-secondary-500">
            Your transaction history will appear here once you make or receive payments.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="group rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary-100"
            >
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${payment.status === 'success' ? 'bg-success-50 text-success-600' : payment.status === 'pending' ? 'bg-warning-50 text-warning-600' : 'bg-red-50 text-red-600'}`}>
                    {payment.status === 'success' ? <CheckCircle2 className="w-6 h-6" /> : payment.status === 'pending' ? <Clock className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-secondary-900 flex items-center gap-2 capitalize">
                      {payment.type} Payment
                    </h3>
                    <p className="text-sm text-secondary-500 mt-0.5 flex items-center gap-2">
                      <CreditCard className="w-3.5 h-3.5" />
                      {payment.paymentMethod || 'Midtrans'} • {formatDate(payment.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end w-full md:w-auto gap-2 border-t md:border-t-0 border-secondary-100 pt-4 md:pt-0">
                  <span className={`text-lg font-bold ${payment.status === 'success' ? 'text-success-600' : 'text-secondary-900'}`}>
                    {formatCurrency(payment.amount)}
                  </span>
                  
                  {payment.escrowId && (
                    <Link
                      href={`/payments/escrow/${payment.escrowId}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      View Escrow Detail <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
