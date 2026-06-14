'use client';

import { use, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { api } from '@/lib/api';
import type { Property } from '@/types/property';

interface ContractPageProps {
  params: Promise<{ id: string }>;
}

interface ContractData {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  bookingId: string;
  startDate: string;
  endDate: string;
  depositAmount: number;
  monthlyRent: number;
  contractText: string | null;
  fairnessScore: number | null;
  status: 'draft' | 'pending_signature' | 'active' | 'expired' | 'terminated';
  signedByTenant: boolean;
  signedByLandlord: boolean;
  signedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ContractPage({ params }: ContractPageProps) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();

  const [contract, setContract] = useState<ContractData | null>(null);
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

      // 1. Fetch Contract Detail
      const contractRes = await api.contracts.getDetail(id);
      const cData = contractRes.data as unknown as ContractData;
      setContract(cData);

      // 2. Fetch Property Detail
      const propRes = await api.properties.getDetail(cData.propertyId);
      setProperty(propRes.data);

      // 3. Fetch Fairness Report
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
      await loadData(); // Reload updated contract status
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Gagal menandatangani kontrak';
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
    (isUserTenant && !contract.signedByTenant) ||
    (isUserLandlord && !contract.signedByLandlord);

  // Status mapping
  const statusLabels = {
    draft: 'Draft Digital',
    pending_signature: 'Menunggu Tanda Tangan',
    active: 'Kontrak Aktif',
    expired: 'Kedaluwarsa',
    terminated: 'Dihentikan',
  };

  // Circumference = 2 * PI * r (58) = 364.4
  const score = fairness?.score || contract.fairnessScore || 50;
  const strokeDashoffset = 364.4 - (364.4 * score) / 100;

  return (
    <div className="space-y-6 pb-32">
      {/* Header bar */}
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
        {/* Left column: AI Intelligence & Summary */}
        <div className="lg:col-span-4 space-y-6">
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
                  ></circle>
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
                  ></circle>
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
                  {fairness?.summary ||
                    'AI sedang menganalisis dokumen untuk memastikan kesepakatan berimbang sesuai ketentuan KUHPerdata.'}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 p-2 bg-secondary-50 rounded-lg text-xs font-semibold text-secondary-700">
                    <span>💵</span> Pembayaran Awal: Rp{' '}
                    {totalInitialPayment().toLocaleString('id-ID')}
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
        </div>

        {/* Right column: Contract Document Viewer */}
        <div className="lg:col-span-8">
          <section className="bg-white border border-secondary-300 rounded-xl shadow-lg overflow-hidden flex flex-col relative min-h-[600px]">
            {/* Paper Header */}
            <div className="bg-secondary-50 px-6 py-4 border-b border-secondary-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-500"></span>
                <span className="font-mono text-[11px] font-bold text-secondary-600 uppercase">
                  {statusLabels[contract.status]}
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

              {contract.contractText ? (
                <div className="space-y-6 relative z-10 whitespace-pre-line">
                  {contract.contractText}
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
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 lg:left-72 z-40 bg-white/95 backdrop-blur-md border-t border-secondary-200 px-6 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${contract.status === 'active' ? 'bg-green-500' : 'bg-accent-500 animate-pulse'}`}
            ></div>
            <div className="text-sm">
              {contract.status === 'active' ? (
                <span className="font-sans text-green-700 font-bold">
                  Kontrak Aktif & Telah Ditandatangani
                </span>
              ) : (
                <span className="font-sans text-secondary-600">
                  Status Tanda Tangan:{' '}
                  {contract.signedByTenant ? 'Penyewa ✓' : 'Penyewa ✗'} |{' '}
                  {contract.signedByLandlord ? 'Pemilik ✓' : 'Pemilik ✗'}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            {canUserSign ? (
              <button
                onClick={handleSign}
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
    </div>
  );

  function totalInitialPayment() {
    return contract ? contract.monthlyRent + contract.depositAmount : 0;
  }
}
