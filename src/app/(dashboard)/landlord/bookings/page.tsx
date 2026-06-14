'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import type { Booking } from '@/types/booking';
import {
  Loader2,
  Calendar,
  User,
  Home,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function LandlordBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.bookings.listMy();
      setBookings(res.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleAction = async (id: string, action: 'accept' | 'reject') => {
    if (action === 'reject' && !confirm('Reject this booking?')) return;
    try {
      setProcessingId(id);
      await (action === 'accept'
        ? api.bookings.accept(id)
        : api.bookings.reject(id));
      await loadBookings();
    } catch (err) {
      console.error(err);
      alert(`Failed to ${action} booking`);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading)
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
          onClick={loadBookings}
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
          Booking Requests
        </h1>
        <p className="text-secondary-500 text-sm mt-1">
          Manage booking requests from potential tenants
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-secondary-100 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary-50">
            <Calendar className="h-6 w-6 text-secondary-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-secondary-900">
            No bookings found
          </h3>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6 justify-between">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        booking.status === 'pending'
                          ? 'bg-warning-50 text-warning-700'
                          : booking.status === 'approved'
                            ? 'bg-success-50 text-success-700'
                            : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {booking.status === 'pending' ? (
                        <Clock className="w-3.5 h-3.5" />
                      ) : booking.status === 'approved' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      <span className="capitalize">{booking.status}</span>
                    </span>
                    <span className="text-xs text-secondary-500">
                      Requested {formatDate(booking.createdAt)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-secondary-900 flex items-center gap-2">
                      <Home className="w-5 h-5 text-secondary-400" />
                      {booking.property?.name || 'Unknown Property'}
                    </h3>
                    <p className="text-sm text-secondary-500 mt-1 pl-7">
                      {booking.property?.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-secondary-100">
                    <div>
                      <p className="text-xs font-semibold uppercase text-secondary-500 mb-1">
                        Tenant Details
                      </p>
                      <div className="flex items-center gap-2 text-sm text-secondary-900">
                        <User className="w-4 h-4 text-secondary-400" />
                        <span className="font-medium">
                          {booking.tenant?.name}
                        </span>
                      </div>
                      <p className="text-sm text-secondary-500 pl-6 mt-0.5">
                        {booking.tenant?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-secondary-500 mb-1">
                        Rental Period
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-secondary-900">
                        <Calendar className="w-4 h-4 text-secondary-400" />
                        {formatDate(booking.startDate)} -{' '}
                        {formatDate(booking.endDate)}
                      </div>
                    </div>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="flex md:flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-secondary-100 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                    <button
                      onClick={() => handleAction(booking.id, 'accept')}
                      disabled={processingId === booking.id}
                      className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-600 disabled:opacity-50"
                    >
                      {processingId === booking.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}{' '}
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(booking.id, 'reject')}
                      disabled={processingId === booking.id}
                      className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-white border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 disabled:opacity-50"
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
