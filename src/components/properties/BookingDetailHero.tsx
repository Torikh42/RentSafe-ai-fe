interface BookingDetailHeroProps {
  property: {
    image?: string | null;
    name: string;
    address: string;
    price: number;
  };
}

export function BookingDetailHero({ property }: BookingDetailHeroProps) {
  return (
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
  );
}
