import { Sparkles, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AIRiskIntelligenceCardProps {
  isLandlord: boolean;
}

export function AIRiskIntelligenceCard({
  isLandlord,
}: AIRiskIntelligenceCardProps) {
  return (
    <Card className="rounded-xl border border-secondary-100 bg-white p-6 shadow-sm">
      <h3 className="flex items-center gap-2 text-base font-bold tracking-tight text-primary-900 mb-6">
        <Sparkles className="h-4.5 w-4.5 text-accent-500" />
        AI Risk Intelligence
      </h3>
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-xl bg-primary-900 p-6 text-white">
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-accent-500">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent-400">
                  Security Notification
                </span>
                <h4 className="text-sm font-bold tracking-tight">
                  KUHPerdata Compliance Evaluator
                </h4>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-primary-200">
              {isLandlord
                ? 'AI automatically scans new bookings and flags high-risk clauses in draft contracts to ensure legal protection under KUHPerdata.'
                : 'All contracts are generated dynamically with Google Gemini using KUHPerdata standard clauses for fair landlord-tenant relationships.'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
