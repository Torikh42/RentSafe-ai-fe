'use client';

import { use, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { api } from '@/lib/api';
import type { Property } from '@/types/property';
import { AIAnalysisSummary } from '@/components/contracts/AIAnalysisSummary';
import { ContractPaperViewer } from '@/components/contracts/ContractPaperViewer';
import { ContractStickyActions } from '@/components/contracts/ContractStickyActions';
import type { Contract } from '@/types/contract';

interface ContractPageProps {
  params: Promise<{ id: string }>;
}

export default function ContractPage({ params }: ContractPageProps) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();

  const [contract, setContract] = useState<Contract | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [fairness, setFairness] = useState<{
    score: number;
    summary: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
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

      try {
        const fairnessRes = await api.contracts.getFairness(id);
        setFairness(fairnessRes.data);
      } catch (err) {
        console.warn('Failed to fetch fairness score, using fallback', err);
        setFairness({
          score: cData.fairnessScore || 50,
          summary: `Evaluasi AI menunjukkan kesepakatan berimbang dengan nilai keadilan ${cData.fairnessScore || 50}/100.`,
        });
      }
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

  const handleSign = async () => {
    if (!contract) return;
    setActionLoading(true);
    setErrorMessage('');
    try {
      await api.contracts.sign(contract.id);
      await loadData();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Gagal menandatangani kontrak';
      setErrorMessage(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!contract) return;
    setActionLoading(true);
    setErrorMessage('');
    try {
      await api.contracts.generate(contract.bookingId);
      await loadData();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Gagal menghasilkan kontrak';
      setErrorMessage(msg);
    } finally {
      setActionLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent-500 border-t-transparent"></div>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-secondary-500">
          Memuat Kontrak...
        </p>
      </div>
    );
  }

  if (errorMessage || !contract) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <h2 className="text-2xl font-display font-bold text-primary mb-4">
          Kontrak Tidak Ditemukan
        </h2>
        <p className="text-secondary-600 mb-8">
          {errorMessage || 'Kontrak tidak terdaftar.'}
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-primary px-6 py-3 text-sm font-bold text-white rounded-lg"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  const isUserTenant = contract.tenantId === session?.user?.id;
  const isUserLandlord = contract.landlordId === session?.user?.id;

  const hasUserSigned = isUserTenant
    ? contract.signedByTenant
    : isUserLandlord
      ? contract.signedByLandlord
      : false;
  const canUserSign =
    !!contract.contractText &&
    ((isUserTenant && !contract.signedByTenant) ||
      (isUserLandlord && !contract.signedByLandlord));

  const statusLabels = {
    draft: 'Draft Digital',
    pending_signature: 'Menunggu Tanda Tangan',
    active: 'Kontrak Aktif',
    expired: 'Kedaluwarsa',
    terminated: 'Dihentikan',
  };

  const score = fairness?.score || contract.fairnessScore || 50;
  const strokeDashoffset = 364.4 - (364.4 * score) / 100;
  const initialPayment = contract.monthlyRent + contract.depositAmount;

  return (
    <div className="space-y-6 pb-32">
      <div className="flex items-center justify-between border-b border-secondary-200 pb-4">
        <div>
          <div className="flex items-center gap-1 font-mono text-[11px] font-semibold text-secondary-500 uppercase tracking-wide">
            <Link href="/dashboard" className="hover:text-primary-700">
              Dashboard
            </Link>
            <span>➔</span>
            <span>Kontrak</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-primary-900 mt-1">
            Kontrak Sewa #{contract.id.substring(9, 14).toUpperCase()}
          </h1>
        </div>
        <div className="font-mono text-xs text-secondary-500">
          ID: {contract.id}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-6">
          <AIAnalysisSummary
            score={score}
            strokeDashoffset={strokeDashoffset}
            summary={
              fairness?.summary ||
              'AI sedang menganalisis dokumen untuk memastikan kesepakatan berimbang sesuai ketentuan KUHPerdata.'
            }
            initialPayment={initialPayment}
            property={property}
          />
        </div>

        <div className="lg:col-span-8">
          <ContractPaperViewer
            statusLabel={statusLabels[contract.status]}
            contractText={contract.contractText}
          />
        </div>
      </div>

      <ContractStickyActions
        status={contract.status}
        signedByTenant={contract.signedByTenant}
        signedByLandlord={contract.signedByLandlord}
        isUserLandlord={isUserLandlord}
        hasContractText={!!contract.contractText}
        canUserSign={canUserSign}
        hasUserSigned={hasUserSigned}
        actionLoading={actionLoading}
        onGenerate={handleGenerate}
        onSign={handleSign}
      />
    </div>
  );
}
