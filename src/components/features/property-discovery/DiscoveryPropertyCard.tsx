import { motion } from 'framer-motion';
import Link from 'next/link';

interface PropertyItem {
  id: string;
  image?: string | null;
  name: string;
  address: string;
  price: number;
  available: boolean;
}

interface DiscoveryPropertyCardProps {
  property: PropertyItem;
}

export function DiscoveryPropertyCard({
  property,
}: DiscoveryPropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col items-start gap-6 border-t border-secondary-300 py-8 transition-colors duration-200 hover:bg-white md:flex-row md:items-center"
    >
      <div className="h-32 w-full shrink-0 overflow-hidden rounded bg-secondary-200 md:w-48">
        {property.image ? (
          <img
            src={property.image}
            alt={property.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-[10px] text-secondary-400">
            NO_IMAGE
          </div>
        )}
      </div>

      <div className="flex w-full flex-grow grid-cols-1 flex-col items-center gap-6 md:grid md:grid-cols-12">
        <div className="flex flex-col gap-2 md:col-span-5">
          <h3 className="font-display text-xl font-semibold text-primary-900 transition-colors group-hover:text-primary-700">
            {property.name}
          </h3>
          <p className="flex items-center gap-1 font-sans text-base text-secondary-600">
            <span className="text-[16px]">📍</span>
            {property.address}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:col-span-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[13px] font-semibold text-secondary-500 uppercase">
              ID:
            </span>
            <span
              className="font-mono text-[13px] text-primary-900 truncate max-w-[150px]"
              title={property.id}
            >
              {property.id.split('-')[0]}...
            </span>
          </div>
          <div>
            <span
              className={`inline-flex items-center rounded border px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                property.available
                  ? 'border-primary-200 bg-primary-50 text-primary-700'
                  : 'border-secondary-300 bg-secondary-100 text-secondary-500'
              }`}
            >
              {property.available ? 'Tersedia' : 'Disewa'}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:col-span-3 md:w-auto md:items-end">
          <div className="font-mono text-[13px] font-bold text-primary-900">
            Rp {property.price.toLocaleString('id-ID')}{' '}
            <span className="font-normal text-secondary-500">/ bln</span>
          </div>
          <Link
            href={`/properties/${property.id}`}
            className="w-full rounded border border-transparent bg-accent-500 px-6 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-600 md:w-auto"
          >
            Detail
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
