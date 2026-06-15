'use client';

import { motion } from 'framer-motion';
import {
  Building2,
  FileText,
  Calendar,
  DollarSign,
  Sparkles,
  AlertCircle,
  Clock,
  Plus,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      {/* 4 Dynamic Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="rounded-xl border border-secondary-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-50">
                  {card.icon}
                </div>
                {card.badge && (
                  <Badge
                    variant="outline"
                    className="rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider border-accent-200 bg-accent-50 text-accent-700"
                  >
                    {card.badge}
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-400">
                  {card.title}
                </p>
                <p className="mt-1 font-mono text-xl font-bold tracking-tight text-primary-900 truncate">
                  {card.value}
                </p>
                <p className="text-[9px] text-secondary-400 mt-0.5">
                  {card.label}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column - Live Alerts */}
        <div className="space-y-8 lg:col-span-8">
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
                    {isL
                      ? 'AI automatically scans new bookings and flags high-risk clauses in draft contracts to ensure legal protection underKUHPerdata.'
                      : 'All contracts are generated dynamically with Google Gemini using KUHPerdata standard clauses for fair landlord-tenant relationships.'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Live Recent Activity */}
        <div className="space-y-8 lg:col-span-4">
          <Card className="rounded-xl border border-secondary-100 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-base font-bold tracking-tight text-primary-900 mb-6">
              Live Activity Log
            </h3>
            {activities.length === 0 ? (
              <p className="text-xs text-secondary-400 text-center py-6">
                No recent transactions or bookings recorded yet.
              </p>
            ) : (
              <div className="relative space-y-6 before:absolute before:left-2 before:top-2 before:h-[80%] before:w-0.5 before:bg-secondary-100">
                {activities.map((activity, idx) => (
                  <div
                    key={`${activity.title}-${activity.time.getTime()}-${idx}`}
                    className="relative pl-6 flex flex-col gap-0.5"
                  >
                    <span
                      className={`absolute left-0.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white ${activity.color} shadow-sm`}
                    />
                    <p className="text-xs font-bold text-primary-900 leading-tight truncate">
                      {activity.title}
                    </p>
                    <p className="text-[10px] text-secondary-500 leading-normal">
                      {activity.detail}
                    </p>
                    <span className="font-mono text-[9px] text-secondary-400">
                      {activity.time.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {isL && (
            <Card className="relative overflow-hidden rounded-xl border border-accent-100 bg-[#fffbeb] p-6 shadow-sm">
              <button
                onClick={onAddPropertyClick}
                className="absolute right-6 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-white shadow-md hover:bg-accent-600 transition-all"
              >
                <Plus className="h-5 w-5" />
              </button>
              <h3 className="text-base font-bold tracking-tight text-accent-700 mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={onAddPropertyClick}
                  className="flex flex-col items-center gap-3 rounded-lg border border-secondary-100 bg-white p-4 text-center hover:border-accent-200 transition-all group"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600 group-hover:scale-110 transition-transform">
                    <Building2 className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-secondary-600 group-hover:text-primary-900">
                    Add Property
                  </span>
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
