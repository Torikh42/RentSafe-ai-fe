'use client';

import Image from 'next/image';
import { MessageSquare, Shield } from 'lucide-react';

interface LandlordCardProps {
  name: string;
  image?: string | null;
  verified?: boolean;
}

export function LandlordCard({ name, image, verified }: LandlordCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
      <h3 className="font-bold text-white mb-6 text-lg">
        Landlord Information
      </h3>

      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="shrink-0">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-2xl object-cover border border-border"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white font-bold text-lg">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-white text-lg truncate">
              {name}
            </h4>
            {verified && (
              <Shield className="w-5 h-5 text-accent-500 shrink-0" />
            )}
          </div>
          <p className="text-sm text-zinc-400 mb-6">
            Active landlord with proven track record
          </p>

          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-surface-hover hover:bg-white/5 text-white font-medium transition-all">
            <MessageSquare className="w-4 h-4" />
            Contact Landlord
          </button>
        </div>
      </div>
    </div>
  );
}
