'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePropertyDetail } from '@/hooks/use-property-discovery';
import { api } from '@/lib/api';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BookingDetailHero } from '@/components/properties/BookingDetailHero';
import { BookingForm } from '@/components/properties/BookingForm';

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
        <BookingDetailHero property={property} />

        <BookingForm
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          errorMessage={errorMessage}
          successMessage={successMessage}
          isSubmitting={isSubmitting}
          monthlyRent={monthlyRent}
          securityDeposit={securityDeposit}
          totalInitialPayment={totalInitialPayment}
          onSubmit={handleSubmit}
        />
      </main>

      <Footer />
    </div>
  );
}
