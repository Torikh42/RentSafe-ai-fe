'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  usePropertyDetail,
  usePropertyInspections,
} from '@/hooks/use-property-discovery';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PropertyDetailLoading } from '@/components/properties/PropertyDetailLoading';
import { PropertyNotFound } from '@/components/properties/PropertyNotFound';
import { PropertySidebar } from '@/components/properties/PropertySidebar';
import { InspectionHistoryTable } from '@/components/properties/InspectionHistoryTable';

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = usePropertyDetail(id);
  const property = data?.data;

  const { data: inspectionsData } = usePropertyInspections(id);
  const inspections = inspectionsData || [];

  if (isLoading) {
    return <PropertyDetailLoading />;
  }

  if (error || !property) {
    return <PropertyNotFound />;
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
                  {property.description.split('\n').map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
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
            <PropertySidebar property={property} inspections={inspections} />
          </div>
        </motion.div>

        <InspectionHistoryTable inspections={inspections} />
      </main>

      <Footer />
    </div>
  );
}
