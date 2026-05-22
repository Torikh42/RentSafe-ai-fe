'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Loader2,
  Plus,
  Sparkles,
  Building2,
  Users,
  Wrench,
  DollarSign,
  Settings,
} from 'lucide-react';
import { useSession } from '@/lib/auth-client';

import {
  useGetMyProperties,
  useCreateProperty,
  useUpdateProperty,
  useDeleteProperty,
} from '@/hooks/use-properties';
import type { Property, CreatePropertyInput } from '@/types/property';

import { DashboardTopBar } from '@/components/dashboard/DashboardTopBar';
import { OverviewContent } from '@/components/dashboard/OverviewContent';
import { PropertiesFilter } from '@/components/features/properties/PropertiesFilter';
import { PropertiesGrid } from '@/components/features/properties/PropertiesGrid';
import { PropertyFormModal } from '@/components/properties/property-form';
import { Button } from '@/components/ui/button';

function DashboardLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-accent-500" />
      <p className="font-mono text-xs uppercase tracking-widest text-secondary-400 animate-pulse">
        Loading Overview...
      </p>
    </div>
  );
}

function TenantsView() {
  const [search, setSearch] = useState('');
  const tenants = [
    {
      id: 1,
      name: 'Budi Santoso',
      email: 'budi.santoso@gmail.com',
      phone: '+62 812-3456-7890',
      property: 'Menteng Kost Room 102',
      rent: 'IDR 2,500,000 / mo',
      status: 'Paid',
      period: 'Jan 2026 - Dec 2026',
    },
    {
      id: 2,
      name: 'Siti Rahma',
      email: 'siti.rahma@outlook.com',
      phone: '+62 821-9876-5432',
      property: 'Salemba Residence Appt 4B',
      rent: 'IDR 5,200,000 / mo',
      status: 'Pending',
      period: 'Mar 2026 - Mar 2027',
    },
    {
      id: 3,
      name: 'Andi Wijaya',
      email: 'andi.wijaya@yahoo.com',
      phone: '+62 857-1122-3344',
      property: 'Menteng Kost Room 105',
      rent: 'IDR 2,500,000 / mo',
      status: 'Paid',
      period: 'Feb 2026 - Feb 2027',
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      email: 'dewi.lestari@gmail.com',
      phone: '+62 819-5566-7788',
      property: 'Sudirman Suites Room 12A',
      rent: 'IDR 8,500,000 / mo',
      status: 'Paid',
      period: 'Nov 2025 - Nov 2026',
    },
  ];

  const filtered = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.property.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search tenants or properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-primary-950 font-medium"
          />
          <div className="absolute left-3.5 top-3.5 text-secondary-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-secondary-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary-50 border-b border-secondary-100">
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Tenant
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Property
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Rent
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Period
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Payment Status
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-secondary-50/50 transition-colors"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center font-bold text-primary-600 text-sm">
                        {t.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-primary-900 leading-tight">
                          {t.name}
                        </h3>
                        <p className="text-xs text-secondary-500 mt-0.5">
                          {t.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-primary-900 font-medium">
                    {t.property}
                  </td>
                  <td className="p-5 text-sm text-primary-900 font-bold">
                    {t.rent}
                  </td>
                  <td className="p-5 text-xs text-secondary-500 font-medium">
                    {t.period}
                  </td>
                  <td className="p-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold leading-none ${
                        t.status === 'Paid'
                          ? 'bg-success-500/10 text-success-600 border border-success-500/20'
                          : 'bg-warning-500/10 text-warning-600 border border-warning-500/20'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${t.status === 'Paid' ? 'bg-success-500' : 'bg-warning-500'}`}
                      />
                      {t.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                        title="Message"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                        title="View Lease"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MaintenanceView() {
  const tickets = [
    {
      id: 'MNT-101',
      title: 'Water heater not working',
      property: 'Menteng Kost Room 102',
      priority: 'High',
      status: 'Open',
      date: 'May 20, 2026',
    },
    {
      id: 'MNT-102',
      title: 'AC remote broken',
      property: 'Salemba Residence Appt 4B',
      priority: 'Low',
      status: 'In Progress',
      date: 'May 18, 2026',
    },
    {
      id: 'MNT-103',
      title: 'Sink pipe leakage',
      property: 'Menteng Kost Room 105',
      priority: 'Medium',
      status: 'Open',
      date: 'May 22, 2026',
    },
    {
      id: 'MNT-104',
      title: 'Power outlet loose',
      property: 'Sudirman Suites Room 12A',
      priority: 'Medium',
      status: 'Resolved',
      date: 'May 15, 2026',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
            <span className="font-bold text-sm">Open</span>
          </div>
          <div>
            <p className="text-xs text-secondary-500 font-semibold uppercase tracking-wider">
              Open Tickets
            </p>
            <h3 className="font-bold text-2xl text-primary-900 mt-0.5">2</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <span className="font-bold text-sm">Active</span>
          </div>
          <div>
            <p className="text-xs text-secondary-500 font-semibold uppercase tracking-wider">
              In Progress
            </p>
            <h3 className="font-bold text-2xl text-primary-900 mt-0.5">1</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <span className="font-bold text-sm">Done</span>
          </div>
          <div>
            <p className="text-xs text-secondary-500 font-semibold uppercase tracking-wider">
              Resolved
            </p>
            <h3 className="font-bold text-2xl text-primary-900 mt-0.5">1</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-secondary-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary-50 border-b border-secondary-100">
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Ticket ID
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Issue
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Property
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Priority
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Status
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Date Reported
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {tickets.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-secondary-50/50 transition-colors"
                >
                  <td className="p-5 text-sm font-mono text-primary-950 font-semibold">
                    {t.id}
                  </td>
                  <td className="p-5 text-sm text-primary-900 font-bold">
                    {t.title}
                  </td>
                  <td className="p-5 text-sm text-secondary-600 font-medium">
                    {t.property}
                  </td>
                  <td className="p-5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        t.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : t.priority === 'Medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="p-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold leading-none ${
                        t.status === 'Open'
                          ? 'bg-red-500/10 text-red-655 text-red-600'
                          : t.status === 'In Progress'
                            ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                            : 'bg-success-500/10 text-success-600 border border-success-500/20'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-5 text-xs text-secondary-500 font-semibold">
                    {t.date}
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-xs font-bold text-accent-600 hover:text-accent-700 hover:underline">
                      Update status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FinancialsView() {
  const transactions = [
    {
      id: 'TX-2029',
      date: 'May 10, 2026',
      desc: 'Rent Payment - Room 102 Budi',
      type: 'Credit',
      amount: '+IDR 2,500,000',
      status: 'Settled',
    },
    {
      id: 'TX-2028',
      date: 'May 08, 2026',
      desc: 'Security Deposit - Room 4B Siti',
      type: 'Credit',
      amount: '+IDR 5,200,000',
      status: 'Settled',
    },
    {
      id: 'TX-2027',
      date: 'May 05, 2026',
      desc: 'Maintenance Payout - Water Heater Fix',
      type: 'Debit',
      amount: '-IDR 350,000',
      status: 'Settled',
    },
    {
      id: 'TX-2026',
      date: 'May 01, 2026',
      desc: 'Rent Payment - Suite 12A Dewi',
      type: 'Credit',
      amount: '+IDR 8,500,000',
      status: 'Pending',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm">
          <p className="text-xs text-secondary-500 font-bold uppercase tracking-wider">
            Monthly Gross Revenue
          </p>
          <h3 className="font-bold text-2xl text-primary-900 mt-2">
            IDR 45,200,000
          </h3>
          <span className="inline-flex items-center text-xs text-success-600 font-semibold mt-1">
            ↑ +12.4% vs last month
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm">
          <p className="text-xs text-secondary-500 font-bold uppercase tracking-wider">
            Smart Escrow Balance
          </p>
          <h3 className="font-bold text-2xl text-primary-900 mt-2">
            IDR 15,000,000
          </h3>
          <span className="inline-flex items-center text-xs text-secondary-500 font-medium mt-1">
            Held securely in Midtrans
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm">
          <p className="text-xs text-secondary-500 font-bold uppercase tracking-wider">
            Payout Account
          </p>
          <h3 className="font-bold text-lg text-primary-900 mt-2">
            Bank Central Asia (BCA)
          </h3>
          <span className="inline-flex items-center text-xs text-success-600 font-semibold mt-1">
            ● Connected & Verified
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-secondary-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-secondary-100 flex items-center justify-between">
          <h3 className="font-bold text-base text-primary-900">
            Recent Transactions
          </h3>
          <button className="text-xs font-bold text-accent-600 hover:text-accent-700 hover:underline">
            Export Statement
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary-50 border-b border-secondary-100">
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Transaction ID
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Date
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Description
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Type
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500">
                  Status
                </th>
                <th className="p-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-500 text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-secondary-50/50 transition-colors"
                >
                  <td className="p-5 text-sm font-mono text-primary-950 font-semibold">
                    {t.id}
                  </td>
                  <td className="p-5 text-xs text-secondary-500 font-semibold">
                    {t.date}
                  </td>
                  <td className="p-5 text-sm text-primary-900 font-bold">
                    {t.desc}
                  </td>
                  <td className="p-5 text-sm text-secondary-600 font-medium">
                    {t.type}
                  </td>
                  <td className="p-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold leading-none ${
                        t.status === 'Settled'
                          ? 'bg-success-500/10 text-success-600 border border-success-500/20'
                          : 'bg-warning-500/10 text-warning-600 border border-warning-500/20'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td
                    className={`p-5 text-sm font-bold text-right ${
                      t.type === 'Credit' ? 'text-success-600' : 'text-red-500'
                    }`}
                  >
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  const { data: session } = useSession();
  const name = session?.user?.name ?? 'User Name';
  const email = session?.user?.email ?? 'user@rentsafe.ai';
  const role = (session?.user as { role?: string })?.role ?? 'landlord';

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white p-8 rounded-2xl border border-secondary-100 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-lg text-primary-900">
            Profile Settings
          </h3>
          <p className="text-xs text-secondary-500 mt-1">
            Manage your public information and credential preferences.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="settings-name"
              className="block text-xs font-bold uppercase tracking-wider text-secondary-500 mb-2"
            >
              Full Name
            </label>
            <input
              id="settings-name"
              type="text"
              defaultValue={name}
              disabled
              className="w-full p-3 text-sm rounded-xl border border-secondary-200 bg-secondary-50 text-secondary-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label
              htmlFor="settings-email"
              className="block text-xs font-bold uppercase tracking-wider text-secondary-500 mb-2"
            >
              Email Address
            </label>
            <input
              id="settings-email"
              type="text"
              defaultValue={email}
              disabled
              className="w-full p-3 text-sm rounded-xl border border-secondary-200 bg-secondary-50 text-secondary-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label
              htmlFor="settings-role"
              className="block text-xs font-bold uppercase tracking-wider text-secondary-500 mb-2"
            >
              Role Type
            </label>
            <input
              id="settings-role"
              type="text"
              defaultValue={role.toUpperCase()}
              disabled
              className="w-full p-3 text-sm rounded-xl border border-secondary-200 bg-secondary-50 text-secondary-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-secondary-100 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-lg text-primary-900">
            Security & Authentication
          </h3>
          <p className="text-xs text-secondary-500 mt-1">
            Configure MFA, connected accounts, and Google authentication
            settings.
          </p>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-bold text-primary-900">
              Google Connected Account
            </p>
            <p className="text-xs text-secondary-500 mt-0.5">
              Used for signing in to the RentSafe portal instantly.
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-success-500/10 text-success-600 border border-success-500/20">
            Connected
          </span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-secondary-100 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-lg text-primary-900">
            Notifications Preference
          </h3>
          <p className="text-xs text-secondary-500 mt-1">
            Decide how you receive alerts and reports from the RentSafe AI
            mediator.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-primary-900 font-semibold">
              Email notifications on lease updates
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-primary-900 font-semibold">
              AI Risk alerts for tenant activity
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-primary-900 font-semibold">
              Weekly financial breakdown report
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const userRole = (session?.user as { role?: string })?.role ?? 'tenant';

  type DashboardTab =
    | 'overview'
    | 'properties'
    | 'tenants'
    | 'maintenance'
    | 'financials'
    | 'settings';

  // Active tab state
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  // Properties state and hooks
  const { data: propertiesResponse, isLoading, isError } = useGetMyProperties();
  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();
  const deleteMutation = useDeleteProperty();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailable, setFilterAvailable] = useState<boolean | null>(null);

  // Sync tab state with query parameters
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const validTabs: DashboardTab[] = [
      'properties',
      'tenants',
      'maintenance',
      'financials',
      'settings',
    ];
    if (tabParam && validTabs.includes(tabParam as DashboardTab)) {
      setActiveTab(tabParam as DashboardTab);
    } else {
      setActiveTab('overview');
    }
  }, [searchParams]);

  const allProperties = propertiesResponse?.data ?? [];
  const totalProperties = allProperties.length;
  const activeLeases = allProperties.filter((p) => !p.available).length;

  const filteredProperties = allProperties.filter((p) => {
    const matchSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter =
      filterAvailable === null || p.available === filterAvailable;
    return matchSearch && matchFilter;
  });

  const handleOpenCreate = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleSubmit = async (data: CreatePropertyInput) => {
    try {
      if (editingProperty) {
        await updateMutation.mutateAsync({ id: editingProperty.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save property:', error);
    }
  };

  const isMutating = createMutation.isPending || updateMutation.isPending;

  const allTabs: {
    id: DashboardTab;
    label: string;
    icon: React.ReactNode;
    roles: string[];
  }[] = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: <Sparkles className="h-3.5 w-3.5" />,
      roles: ['landlord', 'tenant', 'admin'],
    },
    {
      id: 'properties',
      label: 'Properties',
      icon: <Building2 className="h-3.5 w-3.5" />,
      roles: ['landlord', 'admin'],
    },
    {
      id: 'tenants',
      label: 'Tenants',
      icon: <Users className="h-3.5 w-3.5" />,
      roles: ['landlord', 'admin'],
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      icon: <Wrench className="h-3.5 w-3.5" />,
      roles: ['landlord', 'tenant', 'admin'],
    },
    {
      id: 'financials',
      label: 'Financials',
      icon: <DollarSign className="h-3.5 w-3.5" />,
      roles: ['landlord', 'admin'],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-3.5 w-3.5" />,
      roles: ['landlord', 'tenant', 'admin'],
    },
  ];

  const tabsList = allTabs.filter((t) => t.roles.includes(userRole));

  return (
    <div className="w-full">
      {/* Top Bar inside Content Area */}
      <div className="-mx-6 -mt-6 mb-8 lg:-mx-12 lg:-mt-12">
        <DashboardTopBar />
      </div>

      {/* Header and Title */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-primary-900 capitalize">
            {activeTab === 'overview' ? 'Portfolio Overview' : activeTab}
          </h1>
          <p className="mt-1 text-sm text-secondary-500">
            Good morning. Here is what requires your attention today.
          </p>
        </div>

        {/* Tab-specific actions */}
        {activeTab === 'properties' && (
          <Button
            onClick={handleOpenCreate}
            className="rounded-lg bg-primary-500 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-sm hover:bg-primary-600"
          >
            <Plus className="mr-1 h-3.5 w-3.5" /> Add Property
          </Button>
        )}
      </div>

      {/* Tabs Switcher */}
      <div className="mb-8 flex gap-8 border-b border-secondary-100 overflow-x-auto scrollbar-none">
        {tabsList.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTab(t.id);
              router.push(
                t.id === 'overview' ? '/dashboard' : `/dashboard?tab=${t.id}`
              );
            }}
            className={`pb-4 font-mono text-[10px] font-bold uppercase tracking-widest transition-all relative shrink-0 ${
              activeTab === t.id
                ? 'text-primary-900'
                : 'text-secondary-400 hover:text-primary-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              {t.icon} {t.label}
            </span>
            {activeTab === t.id && (
              <motion.div
                layoutId="dashboardTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Panels */}
      {activeTab === 'overview' && (
        <OverviewContent
          totalProperties={totalProperties}
          activeLeases={activeLeases}
          onAddPropertyClick={handleOpenCreate}
        />
      )}

      {activeTab === 'properties' && (
        <div className="space-y-6">
          <PropertiesFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterAvailable={filterAvailable}
            setFilterAvailable={setFilterAvailable}
          />

          <PropertiesGrid
            isLoading={isLoading}
            isError={isError}
            properties={filteredProperties}
            searchQuery={searchQuery}
            filterAvailable={filterAvailable}
            onAddProperty={handleOpenCreate}
            onEditProperty={handleOpenEdit}
            onDeleteProperty={handleDelete}
          />
        </div>
      )}

      {activeTab === 'tenants' && <TenantsView />}

      {activeTab === 'maintenance' && <MaintenanceView />}

      {activeTab === 'financials' && <FinancialsView />}

      {activeTab === 'settings' && <SettingsView />}

      {/* Property Create/Edit Modal */}
      <PropertyFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProperty}
        isLoading={isMutating}
      />
    </div>
  );
}
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
