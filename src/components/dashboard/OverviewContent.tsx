'use client';

import { motion } from 'framer-motion';
import {
  Building2,
  FileText,
  Wrench,
  DollarSign,
  Sparkles,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  History,
  Zap,
  Plus,
  UserPlus,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OverviewContentProps {
  totalProperties: number;
  activeLeases: number;
  onAddPropertyClick: () => void;
}

export function OverviewContent({
  totalProperties,
  activeLeases,
  onAddPropertyClick,
}: OverviewContentProps) {
  // Hardcoded values from the design reference to make it look premium
  const totalPropertiesVal = totalProperties > 0 ? totalProperties : 128;
  const activeLeasesVal = activeLeases > 0 ? activeLeases : 1042;
  const maintenanceCount = 48;
  const monthlyRevenue = 'Rp 412.800.000';

  // Occupancy trend data for rendering custom animated bars
  const trendData = [
    { month: 'JAN', occupied: 65, target: 85 },
    { month: 'FEB', occupied: 72, target: 85 },
    { month: 'MAR', occupied: 78, target: 90 },
    { month: 'APR', occupied: 92, target: 90 }, // Higher than target
    { month: 'MAY', occupied: 82, target: 92 },
    { month: 'JUN', occupied: 80, target: 92 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Total Properties',
            value: totalPropertiesVal.toLocaleString(),
            badge: '+4%',
            badgeType: 'success',
            icon: <Building2 className="h-5 w-5 text-primary-500" />,
          },
          {
            title: 'Active Leases',
            value: activeLeasesVal.toLocaleString(),
            badge: 'Stable',
            badgeType: 'neutral',
            icon: <FileText className="h-5 w-5 text-primary-500" />,
          },
          {
            title: 'Maintenance Tickets',
            value: maintenanceCount.toString(),
            badge: '12 High Priority',
            badgeType: 'error',
            icon: <Wrench className="h-5 w-5 text-primary-500" />,
          },
          {
            title: 'Monthly Revenue',
            value: monthlyRevenue,
            badge: '+12.5%',
            badgeType: 'success',
            icon: <DollarSign className="h-5 w-5 text-primary-500" />,
          },
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card className="rounded-xl border border-secondary-100 bg-white p-6 shadow-sm/5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-50">
                  {card.icon}
                </div>
                <Badge
                  variant="outline"
                  className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                    card.badgeType === 'success'
                      ? 'border-success-200 bg-success-50 text-success-700'
                      : card.badgeType === 'error'
                        ? 'border-error-200 bg-error-50 text-error-700 animate-pulse'
                        : 'border-secondary-200 bg-secondary-100 text-secondary-600'
                  }`}
                >
                  {card.badge}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-400">
                  {card.title}
                </p>
                <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-primary-900">
                  {card.value}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column - Stats, Alerts, Chart */}
        <div className="space-y-8 lg:col-span-8">
          {/* AI Risk Intelligence */}
          <Card className="rounded-xl border border-secondary-100 bg-white p-6 shadow-sm/5">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-bold tracking-tight text-primary-900">
                <Sparkles className="h-4.5 w-4.5 text-accent-500" />
                AI Risk Intelligence
              </h3>
              <button className="text-xs font-bold text-accent-500 transition-colors hover:text-accent-600">
                View All Insights
              </button>
            </div>

            <div className="space-y-4">
              {/* Primary Alert (Dark Navy) */}
              <div className="relative overflow-hidden rounded-xl bg-primary-900 p-6 text-white">
                {/* Background mesh decor */}
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-accent-500/10 blur-2xl" />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-accent-500">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent-400">
                        Vacancy Alert
                      </span>
                      <h4 className="text-sm font-bold tracking-tight">
                        Unusual Vacancy Risk Detected
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-primary-200">
                    Predictive modeling indicates a 78% probability of lease
                    non-renewal for the Westview Lofts complex based on recent
                    local market shifts and tenant sentiment analysis.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      size="sm"
                      className="rounded-lg bg-accent-500 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-sm hover:bg-accent-600"
                    >
                      Review Impact Report
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-white/20 bg-transparent font-mono text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>

              {/* Opportunity Card (White, left border) */}
              <div className="flex items-center justify-between rounded-xl border border-secondary-100 border-l-4 border-l-accent-500 bg-white p-4 shadow-sm/2 hover:bg-secondary-50/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                    <TrendingUp className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-accent-600">
                      Market Opportunity
                    </span>
                    <p className="text-xs font-bold text-primary-900 group-hover:text-accent-600 transition-colors">
                      Rental yields in &apos;The Heights&apos; district are
                      projected to rise 15% next quarter.
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-secondary-300 group-hover:text-accent-500 transition-colors group-hover:translate-x-0.5" />
              </div>
            </div>
          </Card>

          {/* Portfolio Occupancy Trends */}
          <Card className="rounded-xl border border-secondary-100 bg-white p-6 shadow-sm/5">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-base font-bold tracking-tight text-primary-900">
                Portfolio Occupancy Trends
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary-500" />
                  <span className="font-mono text-[9px] font-bold text-secondary-500">
                    Current Year
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary-200" />
                  <span className="font-mono text-[9px] font-bold text-secondary-500">
                    Target
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Bar Chart using Tailwind Grid */}
            <div className="flex h-56 items-end justify-between px-2 pt-4">
              {trendData.map((item) => (
                <div
                  key={item.month}
                  className="flex flex-col items-center gap-3 w-full"
                >
                  <div className="relative flex h-40 w-12 items-end justify-center rounded-md bg-secondary-50">
                    {/* Target Bar (Background shadow style) */}
                    <div
                      style={{ height: `${item.target}%` }}
                      className="absolute bottom-0 w-full rounded-md bg-primary-100 opacity-50"
                    />
                    {/* Occupied Bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${item.occupied}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`relative z-10 w-8 rounded-md ${
                        item.occupied >= item.target
                          ? 'bg-primary-900'
                          : 'bg-primary-400'
                      } shadow-sm/10`}
                    />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-secondary-400">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Activity & Quick Actions */}
        <div className="space-y-8 lg:col-span-4">
          {/* Recent Activity */}
          <Card className="rounded-xl border border-secondary-100 bg-white p-6 shadow-sm/5">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-bold tracking-tight text-primary-900">
                <History className="h-4.5 w-4.5 text-secondary-400" />
                Recent Activity
              </h3>
              <button className="h-7 w-7 flex items-center justify-center rounded-lg border border-secondary-100 text-secondary-500 transition-colors hover:bg-secondary-50">
                <History className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="relative space-y-6 before:absolute before:left-2 before:top-2 before:h-[80%] before:w-0.5 before:bg-secondary-100">
              {[
                {
                  title: 'Rent Payment Received',
                  detail: 'Unit 402 — Skyline Apartments',
                  time: '2 minutes ago',
                  dotColor: 'bg-success-500',
                },
                {
                  title: 'New Maintenance Request',
                  detail: 'Unit 12B — HVAC Inspection Required',
                  time: '45 minutes ago',
                  dotColor: 'bg-accent-500',
                },
                {
                  title: 'Lease Document Signed',
                  detail: 'James Miller — Parkview Estate',
                  time: '2 hours ago',
                  dotColor: 'bg-primary-500',
                },
                {
                  title: 'Inspection Failed',
                  detail: 'Unit 801 — Fire Safety Violation',
                  time: '5 hours ago',
                  dotColor: 'bg-error-500',
                },
                {
                  title: 'Batch Payments Processed',
                  detail: '32 Transactions — North Shore Portfolio',
                  time: 'Today, 9:00 AM',
                  dotColor: 'bg-success-500',
                },
              ].map((activity) => (
                <div
                  key={activity.title}
                  className="relative pl-6 flex flex-col gap-0.5"
                >
                  {/* Timeline point */}
                  <span
                    className={`absolute left-0.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white ${activity.dotColor} shadow-sm`}
                  />
                  <p className="text-xs font-bold text-primary-900 leading-tight">
                    {activity.title}
                  </p>
                  <p className="text-[10px] text-secondary-500">
                    {activity.detail}
                  </p>
                  <span className="font-mono text-[9px] text-secondary-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="mt-6 w-full rounded-lg border-secondary-200 bg-secondary-50 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-600 hover:bg-secondary-100 hover:text-primary-900"
            >
              View Full Audit Log
            </Button>
          </Card>

          {/* Quick Actions Panel */}
          <Card className="relative overflow-hidden rounded-xl border border-accent-100 bg-[#fffbeb] p-6 shadow-sm/5">
            {/* FAB overlay icon inside Quick Actions */}
            <button
              onClick={onAddPropertyClick}
              className="absolute right-6 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-white shadow-md hover:bg-accent-600 hover:scale-105 transition-all"
            >
              <Plus className="h-5 w-5" />
            </button>

            <h3 className="flex items-center gap-2 text-base font-bold tracking-tight text-accent-700">
              <Zap className="h-4.5 w-4.5" />
              Quick Actions
            </h3>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button
                onClick={onAddPropertyClick}
                className="flex flex-col items-center gap-3 rounded-lg border border-secondary-100 bg-white p-4 text-center transition-all hover:border-accent-200 hover:shadow-sm group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600 group-hover:scale-110 transition-transform">
                  <Building2 className="h-4.5 w-4.5" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-secondary-600 group-hover:text-primary-900 transition-colors">
                  Add Property
                </span>
              </button>

              <button className="flex flex-col items-center gap-3 rounded-lg border border-secondary-100 bg-white p-4 text-center transition-all hover:border-accent-200 hover:shadow-sm group">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600 group-hover:scale-110 transition-transform">
                  <UserPlus className="h-4.5 w-4.5" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-secondary-600 group-hover:text-primary-900 transition-colors">
                  Add Tenant
                </span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
