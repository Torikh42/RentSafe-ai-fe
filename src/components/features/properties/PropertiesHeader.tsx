import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PropertiesHeaderProps {
  onAddProperty: () => void;
}

export function PropertiesHeader({ onAddProperty }: PropertiesHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-md bg-white p-8 border-b border-border/40 shadow-none sm:p-12">
      <div className="pointer-events-none absolute right-0 top-0 -mr-48 -mt-48 h-96 w-96 rounded-full bg-[#e38b29]/5 blur-[120px]" />

      <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="rounded-sm border-[#e38b29]/20 bg-[#e38b29]/5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#e38b29]"
            >
              Landlord Dashboard
            </Badge>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Live Status
            </span>
          </div>
          <h1 className="font-sans text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            Portfolio{' '}
            <span className="font-serif italic text-[#e38b29]">Overview</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Maintain full control over your rental assets. Monitor real-time
            availability and manage high-performance listings.
          </p>
        </div>

        <Button
          onClick={onAddProperty}
          size="lg"
          className="group rounded-sm bg-primary font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
        >
          <Plus
            data-icon="inline-start"
            className="text-[#e38b29] transition-transform group-hover:rotate-90"
          />
          Add Property
        </Button>
      </div>
    </div>
  );
}
