'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePropertyDetail } from '@/hooks/use-property-discovery';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = usePropertyDetail(id);
  const property = data?.data;

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

  return (
    <div className="flex min-h-screen flex-col bg-secondary-50 font-sans text-primary-900 selection:bg-primary-500 selection:text-white antialiased">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-32 pt-12 md:px-12 xl:px-16">
        <div className="mb-12 flex items-center justify-between border-b border-secondary-300 pb-4">
          <Link
            href="/properties"
            className="font-mono text-[13px] font-semibold tracking-wide text-secondary-500 hover:text-primary-700 transition-colors"
          >
            ← Properti / Detail
          </Link>
          <div className="font-mono text-[13px] tracking-wider text-secondary-500">
            ID: {property.id}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12"
        >
          <div className="space-y-8 md:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-secondary-300 bg-secondary-100">
              {property.image ? (
                <img
                  src={property.image}
                  alt={property.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-mono text-xs text-secondary-400">
                  TIDAK ADA GAMBAR
                </div>
              )}
            </div>

            <div className="pr-0 md:pr-12">
              <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-primary-900 lg:text-5xl">
                {property.name}
              </h1>
              <p className="mb-8 border-l-2 border-primary-500 pl-4 font-mono text-[13px] uppercase tracking-widest text-secondary-600">
                {property.address}
              </p>

              {property.description ? (
                <div className="space-y-6 font-sans text-lg text-secondary-700 leading-relaxed">
                  {property.description.split('\\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="font-sans text-lg text-secondary-700 leading-relaxed">
                  Tidak ada deskripsi tersedia untuk properti ini.
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="sticky top-24 flex h-full flex-col border border-secondary-300 bg-white p-8">
              <div className="mb-12 border-b border-secondary-200 pb-8">
                <div className="mb-2 font-mono text-[11px] font-semibold uppercase text-secondary-500">
                  HARGA SEWA / BULAN
                </div>
                <div className="mb-6 font-mono text-3xl font-bold leading-tight text-primary-900">
                  Rp {property.price.toLocaleString('id-ID')}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1 font-mono text-[11px] font-semibold uppercase text-secondary-500">
                      STATUS
                    </div>
                    <div
                      className={`font-mono text-[13px] font-bold ${property.available ? 'text-accent-600' : 'text-secondary-500'}`}
                    >
                      {property.available ? 'Tersedia' : 'Disewa'}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 font-mono text-[11px] font-semibold uppercase text-secondary-500">
                      LANDLORD ID
                    </div>
                    <div
                      className="font-mono text-[13px] text-primary-900 truncate"
                      title={property.landlordId}
                    >
                      {property.landlordId.split('-')[0]}...
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12 flex-grow">
                <h3 className="mb-6 flex items-center font-display text-xl font-medium text-primary-900">
                  <span className="mr-2 text-[20px]">👁️</span>
                  Riwayat Gemini Vision
                </h3>
                <div className="mb-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-secondary-200 pb-2">
                    <span className="font-mono text-[13px] text-secondary-700">
                      Skor Integritas: 0.98
                    </span>
                    <span className="font-mono text-[13px] text-secondary-400">
                      {new Date().toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-secondary-200 pb-2">
                    <span className="font-mono text-[13px] text-secondary-700">
                      Skor Integritas: 0.95
                    </span>
                    <span className="font-mono text-[13px] text-secondary-400">
                      Riwayat Sebelumnya
                    </span>
                  </div>
                </div>

                <h4 className="mb-4 font-mono text-[11px] font-semibold uppercase text-secondary-500">
                  STATUS SMART ESCROW
                </h4>
                <div className="relative ml-2 space-y-6 border-l border-secondary-300 pb-2">
                  <div className="relative pl-6">
                    <div className="absolute left-[-5px] top-1.5 h-2 w-2 rounded-full bg-secondary-400"></div>
                    <div className="font-mono text-[13px] text-secondary-500">
                      Diinisialisasi
                    </div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-[-5px] top-1.5 h-2 w-2 rounded-full bg-secondary-400"></div>
                    <div className="font-mono text-[13px] text-secondary-500">
                      Terverifikasi
                    </div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-[-5px] top-1.5 h-2 w-2 rounded-full bg-accent-500 ring-4 ring-white"></div>
                    <div className="font-mono text-[13px] font-bold text-primary-900">
                      Aktif & Aman
                    </div>
                  </div>
                </div>
              </div>

              {property.available ? (
                <Link
                  href={`/properties/${property.id}/book`}
                  className="flex w-full items-center justify-center bg-accent-500 px-6 py-4 font-sans text-base font-bold text-white transition-colors hover:bg-accent-600"
                >
                  Ajukan Sewa
                  <span className="ml-2">→</span>
                </Link>
              ) : (
                <button
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-center bg-secondary-200 px-6 py-4 font-sans text-base font-bold text-secondary-500"
                >
                  Tidak Tersedia
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <section className="mt-24 border-t border-secondary-300 pt-16">
          <h2 className="mb-8 font-display text-3xl font-semibold text-primary-900">
            Log Inspeksi AI
          </h2>
          <div className="w-full overflow-x-auto bg-white border border-secondary-200 p-4">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-secondary-300">
                  <th className="px-4 py-4 font-mono text-[11px] font-semibold uppercase text-secondary-500">
                    TANGGAL
                  </th>
                  <th className="px-4 py-4 font-mono text-[11px] font-semibold uppercase text-secondary-500">
                    ID BOT INSPEKTUR
                  </th>
                  <th className="px-4 py-4 text-right font-mono text-[11px] font-semibold uppercase text-secondary-500">
                    SKOR INTEGRITAS
                  </th>
                  <th className="px-4 py-4 text-right font-mono text-[11px] font-semibold uppercase text-secondary-500">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-[13px] text-primary-900">
                <tr className="border-b border-secondary-200 transition-colors hover:bg-secondary-50">
                  <td className="px-4 py-4 text-secondary-500">
                    {new Date().toISOString().split('T')[0]} 08:45
                  </td>
                  <td className="px-4 py-4">BOT-VX-991A</td>
                  <td className="px-4 py-4 text-right font-bold text-primary-900">
                    0.98
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="bg-success-50 px-2 py-1 text-success-700">
                      TERVERIFIKASI
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-secondary-200 transition-colors hover:bg-secondary-50">
                  <td className="px-4 py-4 text-secondary-500">
                    2024-04-10 14:22
                  </td>
                  <td className="px-4 py-4">BOT-VX-991A</td>
                  <td className="px-4 py-4 text-right font-bold text-primary-900">
                    0.95
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="bg-success-50 px-2 py-1 text-success-700">
                      TERVERIFIKASI
                    </span>
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-secondary-50">
                  <td className="px-4 py-4 text-secondary-500">
                    2024-03-01 09:15
                  </td>
                  <td className="px-4 py-4">BOT-VX-882C</td>
                  <td className="px-4 py-4 text-right font-bold text-primary-900">
                    0.92
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="bg-secondary-100 px-2 py-1 text-secondary-600">
                      DIARSIPKAN
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
