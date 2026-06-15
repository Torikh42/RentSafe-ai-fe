'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { useSession } from '@/lib/auth-client';
import {
  Loader2,
  FileText,
  Home,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

type Contract = {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'pending_signature' | 'active' | 'expired' | 'terminated';
  fairnessScore?: number | null;
  createdAt: string;
  property?: { id: string; name: string; address: string };
  tenant?: { id: string; name: string; email: string };
  landlord?: { id: string; name: string; email: string };
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function ContractsPage() {
  const { data: session, isPending: sessionPending } = useSession();
  const userRole = (session?.user as { role?: string })?.role ?? 'tenant';

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContracts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.contracts.listMy();
      setContracts(res.data as unknown as Contract[]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      loadContracts();
    }
  }, [session, loadContracts]);

  if (sessionPending || loading)
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );

  if (error)
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        <p className="font-semibold">{error}</p>
        <button
          onClick={loadContracts}
          className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium hover:bg-red-200"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-8 px-4">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">
          Rental Contracts
        </h1>
        <p className="text-secondary-500 text-sm mt-1">
          {userRole === 'landlord'
            ? 'Manage your AI-generated smart contracts'
            : 'View and sign your rental agreements'}
        </p>
      </div>

      {contracts.length === 0 ? (
        <div className="rounded-2xl border border-secondary-100 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary-50">
            <FileText className="h-6 w-6 text-secondary-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-secondary-900">
            No contracts found
          </h3>
          <p className="mt-2 text-sm text-secondary-500">
            {userRole === 'landlord'
              ? 'Contracts will appear here once bookings are approved.'
              : 'Approved booking contracts will appear here for you to sign.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row gap-6 justify-between">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        contract.status === 'active'
                          ? 'bg-success-50 text-success-700'
                          : contract.status === 'pending_signature' ||
                              contract.status === 'draft'
                            ? 'bg-warning-50 text-warning-700'
                            : 'bg-secondary-100 text-secondary-700'
                      }`}
                    >
                      {contract.status === 'active' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : contract.status === 'pending_signature' ? (
                        <Clock className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                      <span className="capitalize">
                        {contract.status.replace('_', ' ')}
                      </span>
                    </span>
                    <span className="text-xs text-secondary-500">
                      Generated {formatDate(contract.createdAt)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-secondary-900 flex items-center gap-2">
                      <Home className="w-5 h-5 text-secondary-400" />
                      {contract.property?.name || 'Unknown Property'}
                    </h3>
                    <p className="text-sm text-secondary-500 mt-1 pl-7">
                      {contract.property?.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-secondary-100">
                    <div>
                      {(() => {
                        const isL = userRole === 'landlord';
                        const party = isL ? contract.tenant : contract.landlord;
                        return (
                          <>
                            <p className="text-xs font-semibold uppercase text-secondary-500 mb-1">
                              {isL ? 'Tenant' : 'Landlord'} Details
                            </p>
                            <div className="flex items-center gap-2 text-sm text-secondary-900">
                              <User className="w-4 h-4 text-secondary-400" />
                              <span className="font-medium">
                                {party?.name ||
                                  (isL ? 'Unknown Tenant' : 'Unknown Landlord')}
                              </span>
                            </div>
                            <p className="text-sm text-secondary-500 pl-6 mt-0.5">
                              {party?.email}
                            </p>
                          </>
                        );
                      })()}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-secondary-500 mb-1">
                        Contract Period
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-secondary-900">
                        <Clock className="w-4 h-4 text-secondary-400" />
                        {formatDate(contract.startDate)} -{' '}
                        {formatDate(contract.endDate)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center border-t md:border-t-0 md:border-l border-secondary-100 pt-4 md:pt-0 md:pl-6 min-w-[160px]">
                  <Link
                    href={`/contracts/${contract.id}`}
                    className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-primary-50 px-4 py-2.5 text-sm font-semibold text-primary-700 transition-all hover:bg-primary-100"
                  >
                    <FileText className="h-4 w-4" /> View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
