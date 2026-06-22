'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import type { Contract } from '@/types/contract';
import type { Property } from '@/types/property';

// Snap.js interface
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

interface PaymentCheckoutProps {
  contract: Contract;
  property: Property;
  tenantName: string;
  tenantEmail: string;
}

export function PaymentCheckout({
  contract,
  property,
  tenantName,
  tenantEmail,
}: PaymentCheckoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalAmount = contract.depositAmount + contract.monthlyRent;

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Call backend to initiate payment and get snap token
      const res = await api.escrows.pay(contract.id);
      const { token } = res;

      // 2. Open Snap popup
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log('Payment success:', result);
          // Midtrans webhook handles the actual status update.
          // Wait a second and redirect to contract page.
          setTimeout(() => {
            router.push(`/contracts/${contract.id}`);
            router.refresh();
          }, 2000);
        },
        onPending: function (result) {
          console.log('Payment pending:', result);
          router.push(`/contracts/${contract.id}`);
        },
        onError: function (result) {
          console.error('Payment error:', result);
          setError('Terjadi kesalahan pada pembayaran.');
        },
        onClose: function () {
          console.log('User closed the popup without finishing the payment');
          setLoading(false);
        },
      });
    } catch (err: unknown) {
      console.error(err);
      const msg =
        err instanceof Error ? err.message : 'Gagal memulai pembayaran.';
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Load Snap.js */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold text-primary-900 mb-4">
          Selesaikan Pembayaran Anda
        </h1>
        <p className="text-secondary-600 max-w-2xl mx-auto">
          Dana Anda akan disimpan dengan aman di escrow kami hingga Anda
          mengonfirmasi check-in di properti.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
            <h2 className="text-lg font-bold text-primary-900 mb-4 border-b border-secondary-100 pb-2">
              Informasi Penyewa
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-secondary-500 uppercase tracking-wide font-semibold mb-1">
                  Nama
                </p>
                <p className="text-secondary-900">{tenantName}</p>
              </div>
              <div>
                <p className="text-xs text-secondary-500 uppercase tracking-wide font-semibold mb-1">
                  Email
                </p>
                <p className="text-secondary-900">{tenantEmail}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
            <h2 className="text-lg font-bold text-primary-900 mb-4 border-b border-secondary-100 pb-2">
              Detail Properti
            </h2>
            <div>
              <p className="text-xs text-secondary-500 uppercase tracking-wide font-semibold mb-1">
                Properti
              </p>
              <p className="text-secondary-900 font-medium mb-1">
                {property.name}
              </p>
              <p className="text-secondary-600 text-sm">{property.address}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 sticky top-24">
          <h2 className="text-lg font-bold text-primary-900 mb-6 border-b border-secondary-100 pb-2">
            Ringkasan Pembayaran
          </h2>

          <div className="space-y-4 mb-6 text-sm">
            <div className="flex justify-between items-center text-secondary-700">
              <span>Deposit Keamanan</span>
              <span className="font-mono">
                Rp {contract.depositAmount.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between items-center text-secondary-700">
              <span>Sewa Bulan Pertama</span>
              <span className="font-mono">
                Rp {contract.monthlyRent.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between items-center text-secondary-700">
              <span>Biaya Admin</span>
              <span className="font-mono">Rp 0</span>
            </div>
          </div>

          <div className="border-t border-secondary-200 pt-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary-900">
                Total Pembayaran
              </span>
              <span className="font-mono font-bold text-lg text-primary-900">
                Rp {totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>💳 Bayar dengan Midtrans</>
            )}
          </button>

          <p className="text-xs text-center text-secondary-500 mt-4">
            Pembayaran diproses dengan aman oleh Midtrans
          </p>
        </div>
      </div>
    </div>
  );
}
