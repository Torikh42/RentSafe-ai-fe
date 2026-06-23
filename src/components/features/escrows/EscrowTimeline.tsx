import { CheckCircle2, Circle } from 'lucide-react';
import { EscrowDetail } from '@/types/escrow';

interface EscrowTimelineProps {
  escrow: EscrowDetail;
  formatDate: (date: string) => string;
}

export function EscrowTimeline({ escrow, formatDate }: EscrowTimelineProps) {
  const steps = [
    {
      label: 'Escrow Created',
      description: 'Waiting for tenant to make payment.',
      completed: true,
      date: escrow.createdAt,
    },
    {
      label: 'Payment Secured',
      description: 'Funds are securely held by Midtrans in the escrow account.',
      completed: escrow.status !== 'pending',
      date: escrow.paidAt,
    },
    {
      label: 'Property Inspection',
      description: 'Check-in and check-out inspections.',
      completed: ['released', 'refunded'].includes(escrow.status),
      date: null,
    },
    {
      label: 'Funds Distributed',
      description:
        escrow.status === 'refunded'
          ? 'Funds refunded to tenant.'
          : 'Funds released to landlord.',
      completed: ['released', 'refunded'].includes(escrow.status),
      date: escrow.releasedAt,
    },
  ];

  return (
    <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-secondary-900 mb-6">
        Escrow Timeline
      </h3>
      <div className="relative border-l-2 border-secondary-100 ml-3 space-y-8 pb-4">
        {steps.map((step) => {
          return (
            <div key={step.label} className="relative pl-8">
              <div className="absolute -left-[11px] top-1">
                {step.completed ? (
                  <div className="bg-white rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 bg-white" />
                  </div>
                ) : (
                  <div className="bg-white rounded-full">
                    <Circle className="w-5 h-5 text-secondary-300 fill-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <h4
                  className={`text-sm font-bold ${step.completed ? 'text-secondary-900' : 'text-secondary-400'}`}
                >
                  {step.label}
                </h4>
                <p className="text-sm text-secondary-500 mt-1">
                  {step.description}
                </p>
                {step.date && (
                  <p className="text-xs font-semibold text-secondary-400 mt-2">
                    {formatDate(step.date)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
