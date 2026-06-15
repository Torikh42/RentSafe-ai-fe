import Link from 'next/link';
import type { InspectionResponse } from '@/types/inspection';

interface PropertySidebarProps {
  property: {
    id: string;
    price: number;
    available: boolean;
    landlordId: string;
  };
  inspections: InspectionResponse[];
}

export function PropertySidebar({
  property,
  inspections,
}: PropertySidebarProps) {
  return (
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
        {inspections.length > 0 ? (
          <div className="mb-8 space-y-4">
            {inspections.slice(0, 3).map((insp: InspectionResponse) => (
              <div
                key={insp.id}
                className="flex items-center justify-between border-b border-secondary-200 pb-2"
              >
                <span className="font-mono text-[13px] text-secondary-700">
                  {insp.type === 'pre' ? 'Pre-Lease' : 'Post-Lease'}
                </span>
                <span className="font-mono text-[13px] text-secondary-400">
                  {new Date(insp.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-8 text-sm text-secondary-500">
            Belum ada riwayat inspeksi.
          </div>
        )}

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
  );
}
