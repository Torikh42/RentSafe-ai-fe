'use client';

import { Building2, FileText, Calendar, DollarSign, Clock } from 'lucide-react';
import { OverviewStatsCards } from './OverviewStatsCards';
import { AIRiskIntelligenceCard } from './AIRiskIntelligenceCard';
import { LiveActivityLogCard } from './LiveActivityLogCard';
import { QuickActionsCard } from './QuickActionsCard';

interface OverviewContentProps {
  userRole: string;
  properties: Array<{
    available: boolean;
    price: number;
    name?: string;
    address?: string;
  }>;
  bookings: Array<{
    status: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    property?: { name: string; price: number };
    tenant?: { name: string };
    landlord?: { name: string };
  }>;
  contracts: Array<{
    status: string;
    signedByTenant: boolean;
    createdAt: string;
    property?: { name: string };
  }>;
  onAddPropertyClick: () => void;
}

export function OverviewContent({
  userRole,
  properties,
  bookings,
  contracts,
  onAddPropertyClick,
}: OverviewContentProps) {
  const isL = userRole === 'landlord';

  // Landlord stats
  const totalProps = properties.length;
  const activeLeases = properties.filter((p) => !p.available).length;
  const pendingApprovals = bookings.filter(
    (b) => b.status === 'pending'
  ).length;
  const monthlyRevenue = properties
    .filter((p) => !p.available)
    .reduce((sum, p) => sum + p.price, 0);

  // Tenant stats
  const activeRentals = bookings.filter((b) => b.status === 'approved').length;
  const tenantPending = bookings.filter((b) => b.status === 'pending').length;
  const pendingSignatures = contracts.filter(
    (c) => c.status === 'pending_signature' && !c.signedByTenant
  ).length;
  const monthlySpent = bookings
    .filter((b) => b.status === 'approved')
    .reduce((sum, b) => sum + (b.property?.price || 0), 0);

  const stats = isL
    ? [
        {
          title: 'Total Properties',
          value: totalProps.toString(),
          label: 'Owned',
          icon: <Building2 className="h-5 w-5 text-primary-500" />,
        },
        {
          title: 'Active Leases',
          value: activeLeases.toString(),
          label: 'Occupied',
          icon: <FileText className="h-5 w-5 text-primary-500" />,
        },
        {
          title: 'Pending Bookings',
          value: pendingApprovals.toString(),
          label: 'Needs Action',
          icon: <Calendar className="h-5 w-5 text-primary-500" />,
          badge: pendingApprovals > 0 ? `${pendingApprovals} New` : undefined,
        },
        {
          title: 'Est. Monthly Revenue',
          value: `Rp ${monthlyRevenue.toLocaleString('id-ID')}`,
          label: 'Gross',
          icon: <DollarSign className="h-5 w-5 text-primary-500" />,
        },
      ]
    : [
        {
          title: 'Active Rentals',
          value: activeRentals.toString(),
          label: 'Properties Leased',
          icon: <Building2 className="h-5 w-5 text-primary-500" />,
        },
        {
          title: 'Pending Applications',
          value: tenantPending.toString(),
          label: 'Waiting Approval',
          icon: <Clock className="h-5 w-5 text-primary-500" />,
        },
        {
          title: 'Pending Signatures',
          value: pendingSignatures.toString(),
          label: 'Contracts to Sign',
          icon: <FileText className="h-5 w-5 text-primary-500" />,
          badge: pendingSignatures > 0 ? 'Action Required' : undefined,
        },
        {
          title: 'Monthly Rental Outlay',
          value: `Rp ${monthlySpent.toLocaleString('id-ID')}`,
          label: 'Total Rent',
          icon: <DollarSign className="h-5 w-5 text-primary-500" />,
        },
      ];

  // Live activities parsed from bookings and contracts
  const activities = [
    ...bookings.map((b) => ({
      title:
        b.status === 'pending'
          ? 'Booking Request Submitted'
          : b.status === 'approved'
            ? 'Booking Approved by Landlord'
            : `Booking ${b.status}`,
      detail: `${b.property?.name || 'Property'} — ${b.tenant?.name || 'Tenant'} requested period ${new Date(b.startDate).toLocaleDateString()} - ${new Date(b.endDate).toLocaleDateString()}`,
      time: new Date(b.createdAt),
      color:
        b.status === 'approved'
          ? 'bg-success-500'
          : b.status === 'pending'
            ? 'bg-warning-500'
            : 'bg-secondary-400',
    })),
    ...contracts.map((c) => ({
      title:
        c.status === 'active'
          ? 'AI Contract Signed & Active'
          : 'Contract Draft Generated',
      detail: `${c.property?.name || 'Property'} — status: ${c.status.replace('_', ' ')}`,
      time: new Date(c.createdAt),
      color: c.status === 'active' ? 'bg-success-500' : 'bg-primary-500',
    })),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <OverviewStatsCards stats={stats} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <AIRiskIntelligenceCard isLandlord={isL} />
        </div>

        <div className="space-y-8 lg:col-span-4">
          <LiveActivityLogCard activities={activities} />

          {isL && <QuickActionsCard onAddPropertyClick={onAddPropertyClick} />}
        </div>
      </div>
    </div>
  );
}
