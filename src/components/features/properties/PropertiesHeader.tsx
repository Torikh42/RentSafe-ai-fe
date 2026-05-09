import { Plus } from 'lucide-react';

interface PropertiesHeaderProps {
  onAddProperty: () => void;
}

export function PropertiesHeader({ onAddProperty }: PropertiesHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-white p-8 sm:p-12 border border-primary-100 shadow-premium">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 blur-[120px] -mr-48 -mt-48 rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/5 blur-[100px] -ml-32 -mb-32 rounded-full" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-[10px] font-bold uppercase tracking-widest text-accent-600">
              Landlord Dashboard
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-secondary-400 text-[10px] uppercase tracking-widest font-medium">
              Live Status
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-primary-900 tracking-tight mb-4 font-display">
            Portfolio <span className="italic text-accent-500">Overview</span>
          </h1>
          <p className="text-secondary-500 max-w-xl text-lg leading-relaxed">
            Maintain full control over your rental assets. Monitor real-time
            availability and manage high-performance listings.
          </p>
        </div>

        <button
          onClick={onAddProperty}
          className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary-900 hover:bg-primary-800 text-white text-base font-bold shadow-xl shadow-primary-900/10 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 text-accent-500" />
          Add Property
        </button>
      </div>
    </div>
  );
}
