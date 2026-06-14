'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePropertyDetail } from '@/hooks/use-property-discovery';
import { api } from '@/lib/api';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

interface BookingPageProps {
  params: Promise<{ id: string }>;
}

export default function BookingPage({ params }: BookingPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = usePropertyDetail(id);
  const property = data?.data;

  // Initialize dates: start is today, end is 1 year from now
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setStartDate(todayStr);

    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    const nextYearStr = nextYear.toISOString().split('T')[0];
    setEndDate(nextYearStr);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setErrorMessage('Tanggal Mulai dan Tanggal Berakhir wajib diisi');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // API expects ISO Date string format
      const isoStartDate = new Date(startDate).toISOString();
      const isoEndDate = new Date(endDate).toISOString();

      await api.bookings.create({
        propertyId: id,
        startDate: isoStartDate,
        endDate: isoEndDate,
      });

      setSuccessMessage('Permohonan sewa Anda berhasil dikirim!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Gagal mengirim permohonan sewa';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-secondary-50 font-sans text-primary-900 selection:bg-primary-500 selection:text-white antialiased">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <div className="font-mono text-sm text-secondary-500">
            MEMUAT DATA...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex min-h-screen flex-col bg-secondary-50 font-sans text-primary-900 selection:bg-primary-500 selection:text-white antialiased">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <div className="text-center">
            <h2 className="mb-2 font-display text-2xl font-bold text-primary-900">
              Properti Tidak Ditemukan
            </h2>
            <Link
              href="/properties"
              className="mt-4 inline-block font-mono text-xs font-bold uppercase tracking-widest text-accent-500 hover:text-accent-600"
            >
              ← Kembali ke Daftar Properti
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const monthlyRent = property.price;
  const securityDeposit = property.price; // default to 1 month rent
  const totalInitialPayment = monthlyRent + securityDeposit;

  return (
    <div className="flex min-h-screen flex-col bg-secondary-50 font-sans text-primary-900 selection:bg-primary-500 selection:text-white antialiased">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full aspect-[4/3] max-h-[400px] bg-secondary-900 overflow-hidden">
          {property.image ? (
            <img
              className="w-full h-full object-cover opacity-80"
              src={property.image}
              alt={property.name}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs text-secondary-400">
              TIDAK ADA GAMBAR
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 max-w-5xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold mb-1">
              {property.name}
            </h2>
            <div className="flex items-center gap-2 text-secondary-300 mb-2">
              <span className="text-[18px]">📍</span>
              <p className="font-mono text-xs uppercase tracking-wider">
                {property.address}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 inline-block">
              <p className="font-mono text-sm text-accent-400 font-bold">
                Rp {property.price.toLocaleString('id-ID')}{' '}
                <span className="text-white/60 font-normal">/ bulan</span>
              </p>
            </div>
          </div>
        </section>

        {/* Booking Form Card */}
        <section className="px-4 -mt-8 relative z-10 pb-24 max-w-xl mx-auto">
          <form
            onSubmit={handleSubmit}
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
              {isSubmitting
                ? 'Mengirim permohonan...'
                : 'Kirim Permohonan Sewa'}
              <span>➔</span>
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
