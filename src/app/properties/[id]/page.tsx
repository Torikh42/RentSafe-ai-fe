'use client';

import { use } from 'react';

import { usePropertyDetail } from '@/hooks/use-property-discovery';
import {
  Loader2,
  MapPin,
  BadgeDollarSign,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { LandlordCard } from '@/components/features/property-discovery/LandlordCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-accent-500" />
          <p className="text-foreground-muted">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Property Not Found
          </h2>
          <p className="text-foreground-muted mb-6">
            The property you are looking for does not exist.
          </p>
          <Link href="/properties">
            <Button>Back to Listings</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Background decor */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="bg-mesh absolute inset-0" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl pb-20">
        {/* Header Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/properties"
            className="text-accent-500 hover:text-accent-400 font-medium"
          >
            ← Back to Listings
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-white/5 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="rounded-2xl overflow-hidden border border-primary-100 bg-white shadow-premium">
            {property.image ? (
              <div className="relative w-full h-80 md:h-[500px]">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="w-full h-80 md:h-96 bg-primary-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 border border-accent-500/20">
                    <MapPin className="w-10 h-10" />
                  </div>
                  <p className="text-secondary-400 font-medium">No property image available</p>
                </div>
              </div>
            )}

            {/* Status Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-accent-500 via-amber-400 to-accent-600" />
          </div>

          {/* Title & Basic Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {property.available && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-500/10 text-success-500 text-xs font-bold uppercase">
                    <CheckCircle2 className="w-3 h-3" />
                    Available
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {property.name}
              </h1>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-lg">
                  <MapPin className="w-5 h-5 text-accent-500" />
                  <span className="text-foreground">{property.address}</span>
                </div>

                <div className="flex items-center gap-3 text-2xl font-bold">
                  <div className="p-2 rounded-lg bg-accent-500/10">
                    <BadgeDollarSign className="w-6 h-6 text-accent-500" />
                  </div>
                  <span className="text-primary-900">
                    Rp {property.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-sm text-secondary-500 font-normal">
                    / month
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="rounded-xl border border-primary-100 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-bold text-primary-900 mb-4 font-display">
                  About This Property
                </h2>
                <p className="text-secondary-600 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>
            )}
          </div>

          {/* Landlord Info */}
          {property.landlord && (
            <LandlordCard
              name={property.landlord.name}
              image={property.landlord.image}
              verified
            />
          )}

          {/* CTA Section */}
          <div className="rounded-3xl border border-primary-100 bg-primary-50/50 p-8 md:p-12 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold text-primary-900 mb-3 font-display">
                  Interested in this property?
                </h2>
                <p className="text-secondary-600 text-lg">
                  Send a booking request to the landlord. They will respond
                  shortly with more details.
                </p>
              </div>
              <Link href={`/properties/${property.id}/book`}>
                <Button className="bg-primary-900 hover:bg-primary-800 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary-900/10 transition-all">
                  Request Booking
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
