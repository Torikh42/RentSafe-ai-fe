'use client';

import { use, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { api } from '@/lib/api';
import type { Property } from '@/types/property';
import type { Contract } from '@/types/contract';
import { PaymentCheckout } from '@/components/features/escrows/PaymentCheckout';

interface PayContractPageProps {
  params: Promise<{ id: string }>;
}

export default function PayContractPage({ params }: PayContractPageProps) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();

  const [contract, setContract] = useState<Contract | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      const contractRes = await api.contracts.getDetail(id);
      const cData = contractRes.data as unknown as Contract;
      setContract(cData);

      const propRes = await api.properties.getDetail(cData.propertyId);
      setProperty(propRes.data);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Gagal memuat detail kontrak';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session, loadData]);

  if (isPending || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent-500 border-t-transparent"></div>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-secondary-500">
          Memuat Detail Pembayaran...
        </p>
      </div>
    );
  }

  if (errorMessage || !contract || !property) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <h2 className="text-2xl font-display font-bold text-primary mb-4">
          Kontrak Tidak Ditemukan
        </h2>
        <p className="text-secondary-600 mb-8">
          {errorMessage || 'Kontrak atau properti tidak terdaftar.'}
        </p>
        <Link
          href={`/contracts/${id}`}
          className="inline-block bg-primary px-6 py-3 text-sm font-bold text-white rounded-lg"
        >
          Kembali ke Kontrak
        </Link>
      </div>
    );
  }

  // Only the tenant should be able to pay.
  // Wait, if it's already active, no need to pay.
  if (contract.status === 'active') {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <h2 className="text-2xl font-display font-bold text-green-600 mb-4">
          Kontrak Sudah Aktif
        </h2>
        <p className="text-secondary-600 mb-8">
          Pembayaran untuk kontrak ini telah berhasil diproses.
        </p>
        <Link
          href={`/contracts/${id}`}
          className="inline-block bg-primary px-6 py-3 text-sm font-bold text-white rounded-lg"
        >
          Lihat Kontrak
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="flex items-center justify-between border-b border-secondary-200 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-1 font-mono text-[11px] font-semibold text-secondary-500 uppercase tracking-wide">
            <Link href="/dashboard" className="hover:text-primary-700">
              Dashboard
            </Link>
            <span>➔</span>
            <Link href={`/contracts/${id}`} className="hover:text-primary-700">
              Kontrak
            </Link>
            <span>➔</span>
            <span>Pembayaran</span>
          </div>
        </div>
        <Link
          href={`/contracts/${id}`}
          className="text-sm font-semibold text-primary-600 hover:text-primary-800"
        >
          Kembali ke Kontrak
        </Link>
      </div>

      <PaymentCheckout
        contract={contract}
        property={property}
        tenantName={session?.user?.name || 'Penyewa'}
        tenantEmail={session?.user?.email || ''}
      />
    </div>
  );
}
