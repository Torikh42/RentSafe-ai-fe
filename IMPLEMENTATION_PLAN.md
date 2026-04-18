# 🚀 RentSafe AI — Frontend Implementation Plan

> **Stack:** Next.js 15 + React 19 + Tailwind CSS v4 + Better Auth
> **Dokumen Referensi:** `Geost_RentSafeAI.md`
> **Last Updated:** 18 April 2026

---

## 📋 Daftar Fitur (Berdasarkan Dokumen)

| # | Fitur | Status | Priority |
|---|-------|--------|----------|
| 1 | **Landing Page & Marketing** | ✅ Ada | P0 |
| 2 | **Authentication UI** (Login, Register, OAuth) | ❌ Belum | P0 |
| 3 | **Property Discovery** (Search, Filter, Listing) | ❌ Belum | P0 |
| 4 | **Property Detail View** | ❌ Belum | P0 |
| 5 | **Booking System UI** | ❌ Belum | P0 |
| 6 | **Smart Contract Interface** | ❌ Belum | P0 |
| 7 | **AI Property Inspection Upload** | ❌ Belum | P1 |
| 8 | **Dashboard (Tenant & Landlord)** | ❌ Belum | P1 |
| 9 | **Escrow & Payment UI** | ❌ Belum | P1 |
| 10 | **Dispute Resolution Interface** | ❌ Belum | P2 |
| 11 | **AI Chat Interface** | ❌ Belum | P2 |
| 12 | **Reputation & Reviews** | ❌ Belum | P2 |

---

## 🗺️ Phase-by-Phase Implementation

### **PHASE 1: Foundation & Auth (Week 1-2)**

**Goal:** Authentication, Layout System, Navigation

#### **1.1 Project Setup** ✅ Done

- [x] Next.js 15 + React 19 + Tailwind CSS v4
- [x] TypeScript strict mode
- [x] Folder structure setup
- [x] Environment configuration

#### **1.2 Auth Pages** 🔲 TODO

**Files:**

```
app/(auth)/
├── layout.tsx           # Auth layout (centered card)
├── login/
│   └── page.tsx        # Login form
├── register/
│   └── page.tsx        # Register form
└── forgot-password/
    └── page.tsx        # Password reset request
```

**Components:**

```
components/
├── forms/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── ForgotPasswordForm.tsx
└── ui/
    ├── AuthCard.tsx
    ├── Input.tsx
    └── Button.tsx
```

**Tasks:**

- [ ] Install dependencies: `react-hook-form`, `@hookform/resolvers`, `zod`
- [ ] Create base UI components (Button, Input, Card)
- [ ] Create `LoginForm` dengan email/password + Google OAuth button
- [ ] Create `RegisterForm` dengan role selection (tenant/landlord)
- [ ] Create `ForgotPasswordForm`
- [ ] Implement Better Auth client integration
- [ ] Add form validation dengan Zod
- [ ] Add loading states dan error handling

**Better Auth Integration:**

```typescript
// lib/auth/client.ts
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Usage
const { data, error } = await authClient.signIn.social({
  provider: 'google',
  callbackURL: '/dashboard',
});
```

---

#### **1.3 Protected Layout & Navigation** 🔲 TODO

**Files:**

```
app/(dashboard)/
├── layout.tsx           # Dashboard layout (sidebar + header)
├── tenant/
│   └── page.tsx        # Tenant dashboard
├── landlord/
│   └── page.tsx        # Landlord dashboard
└── settings/
    └── page.tsx        # User settings
```

**Components:**

```
components/layout/
├── DashboardLayout.tsx
├── Sidebar.tsx
├── Header.tsx
├── NavLink.tsx
└── UserMenu.tsx
```

**Tasks:**

- [ ] Create `middleware.ts` untuk protected routes
- [ ] Create `DashboardLayout` dengan responsive sidebar
- [ ] Create `Header` dengan user menu (profile, logout)
- [ ] Create `Sidebar` dengan navigation links
- [ ] Add role-based navigation (tenant vs landlord links)
- [ ] Add mobile responsive menu (hamburger)

---

### **PHASE 2: Property Discovery (Week 3-4)**

**Goal:** Property Listing, Search, Filter, Detail View

#### **2.1 Property Listing Page** 🔲 TODO

**Files:**

```
app/(marketing)/
└── properties/
    ├── page.tsx          # Property listing
    ├── loading.tsx       # Loading skeleton
    └── error.tsx         # Error boundary
```

**Components:**

```
components/features/properties/
├── PropertyList.tsx
├── PropertyCard.tsx
├── PropertyFilter.tsx
├── PropertySearch.tsx
├── PropertySort.tsx
└── PropertyPagination.tsx
```

**Tasks:**

- [ ] Create `PropertyList` Server Component dengan data fetching
- [ ] Create `PropertyCard` component dengan image, title, price, location
- [ ] Create `PropertyFilter` (price range, property type, facilities)
- [ ] Create `PropertySearch` dengan debounced input
- [ ] Create `PropertySort` (price, rating, newest)
- [ ] Add `loading.tsx` skeleton UI
- [ ] Implement pagination

**API Integration:**

```typescript
// Server Component fetch
async function getProperties(searchParams: SearchParams) {
  const query = new URLSearchParams(searchParams);
  return fetchApi(`/properties?${query}`);
}
```

---

#### **2.2 Property Detail Page** 🔲 TODO

**Files:**

```
app/(marketing)/properties/
└── [id]/
    ├── page.tsx          # Property detail
    ├── loading.tsx
    └── not-found.tsx     # 404 jika property tidak ada
```

**Components:**

```
components/features/properties/
├── PropertyDetail.tsx
├── PropertyImageGallery.tsx
├── PropertyInfo.tsx
├── PropertyFacilities.tsx
├── PropertyLocation.tsx
├── PropertyReviews.tsx
├── PropertyHost.tsx
└── BookingWidget.tsx
```

**Tasks:**

- [ ] Create `PropertyImageGallery` dengan Next.js Image
- [ ] Create `PropertyInfo` (name, address, price, description)
- [ ] Create `PropertyFacilities` grid
- [ ] Create `PropertyLocation` (static map atau embed)
- [ ] Create `PropertyReviews` list
- [ ] Create `BookingWidget` (date picker, request booking)
- [ ] Add `not-found.tsx` untuk invalid property ID

---

### **PHASE 3: Rental Flow (Week 5-6)**

**Goal:** Booking, Contracts, Signing

#### **3.1 Booking System** 🔲 TODO

**Files:**

```
app/(dashboard)/
└── bookings/
    ├── page.tsx          # My bookings list
    └── [id]/
        └── page.tsx      # Booking detail
```

**Components:**

```
components/features/bookings/
├── BookingList.tsx
├── BookingCard.tsx
├── BookingStatus.tsx
├── BookingActions.tsx
├── BookingTimeline.tsx
└── CreateBookingForm.tsx
```

**Tasks:**

- [ ] Tenant: Create booking request form
- [ ] Tenant: View my bookings list
- [ ] Tenant: Cancel booking
- [ ] Landlord: View booking requests
- [ ] Landlord: Accept/reject booking
- [ ] Booking status timeline (pending → approved → active → completed)

---

#### **3.2 Contract Interface** 🔲 TODO

**Files:**

```
app/(dashboard)/
└── contracts/
    ├── page.tsx          # Contracts list
    └── [id]/
        ├── page.tsx      # Contract detail
        └── sign/
            └── page.tsx  # Contract signing page
```

**Components:**

```
components/features/contracts/
├── ContractList.tsx
├── ContractDetail.tsx
├── ContractViewer.tsx
├── ContractSignForm.tsx
├── FairnessScore.tsx
└── ContractActions.tsx
```

**Tasks:**

- [ ] Create contract list view
- [ ] Create contract detail viewer (plain text atau PDF viewer)
- [ ] Create fairness score display
- [ ] Create contract signing interface (digital signature simulation)
- [ ] Show contract status (draft → pending_signature → active → expired)

---

### **PHASE 4: AI Features (Week 7-8)**

**Goal:** AI Property Inspection, Damage Detection UI

#### **4.1 Property Inspection Upload** 🔲 TODO

**Files:**

```
app/(dashboard)/
└── inspections/
    ├── page.tsx          # Inspections list
    └── [id]/
        ├── page.tsx      # Inspection detail
        └── upload/
            └── page.tsx  # Photo upload page
```

**Components:**

```
components/features/inspections/
├── InspectionList.tsx
├── InspectionDetail.tsx
├── PhotoUploader.tsx
├── PhotoGrid.tsx
├── DamageReport.tsx
├── SeverityBadge.tsx
├── ComparisonView.tsx
└── InspectionTimeline.tsx
```

**Tasks:**

- [ ] Create photo uploader (drag & drop, multiple files)
- [ ] Create photo gallery grid
- [ ] Create damage report view (AI-generated)
- [ ] Create severity badge component (good/minor/major)
- [ ] Create before/after comparison view
- [ ] Integrate dengan Gemini Vision API

---

#### **4.2 AI Chat Interface** 🔲 TODO

**Files:**

```
components/features/ai/
├── AIChat.tsx
├── AIChatInput.tsx
├── AIChatMessage.tsx
├── AIChatSidebar.tsx
└── ContractSummary.tsx
```

**Tasks:**

- [ ] Create chat interface using Vercel AI SDK
- [ ] Integrate dengan backend AI endpoints
- [ ] Add contract summary generation
- [ ] Add plain language explanation feature

---

### **PHASE 5: Dashboard & Analytics (Week 9-10)**

**Goal:** Dashboard UI, Analytics, Reputation System

#### **5.1 Tenant Dashboard** 🔲 TODO

**Files:**

```
app/(dashboard)/tenant/
├── page.tsx              # Tenant dashboard
├── contracts/
├── bookings/
└── inspections/
```

**Components:**

```
components/features/dashboard/
├── TenantDashboard.tsx
├── ActiveContracts.tsx
├── UpcomingInspections.tsx
├── PaymentReminders.tsx
└── ActivityFeed.tsx
```

**Tasks:**

- [ ] Active contracts summary
- [ ] Upcoming payments/reminders
- [ ] Inspection status
- [ ] Recent activity feed
- [ ] Quick actions (find property, view history)

---

#### **5.2 Landlord Dashboard** 🔲 TODO

**Files:**

```
app/(dashboard)/landlord/
├── page.tsx              # Landlord dashboard
├── properties/
├── bookings/
├── contracts/
└── analytics/
    └── page.tsx          # Property analytics
```

**Components:**

```
components/features/dashboard/
├── LandlordDashboard.tsx
├── PropertyOverview.tsx
├── OccupancyRate.tsx
├── RevenueSummary.tsx
├── PendingApprovals.tsx
├── PropertyPerformance.tsx
└── SubscriptionStatus.tsx
```

**Tasks:**

- [ ] Property overview cards
- [ ] Occupancy rate charts
- [ ] Revenue summary
- [ ] Pending booking approvals
- [ ] Property performance analytics
- [ ] Subscription status (Free/Pro)

---

#### **5.3 Reputation System UI** 🔲 TODO

**Components:**

```
components/features/reviews/
├── UserRating.tsx
├── ReviewCard.tsx
├── ReviewList.tsx
├── StarRating.tsx
├── ReviewForm.tsx
└── ReputationBadge.tsx
```

**Tasks:**

- [ ] Create star rating component
- [ ] Create review card
- [ ] Create review form (post-contract)
- [ ] Create reputation badge (verified, top rated)
- [ ] Display reputation di profile

---

### **PHASE 6: Payments & Polish (Week 11-12)**

**Goal:** Escrow UI, Midtrans Integration, Notifications, Polish

#### **6.1 Escrow & Payment UI** 🔲 TODO

**Files:**

```
app/(dashboard)/
└── payments/
    ├── page.tsx          # Payment history
    └── escrow/
        └── [id]/
            └── page.tsx  # Escrow detail
```

**Components:**

```
components/features/payments/
├── EscrowStatus.tsx
├── PaymentHistory.tsx
├── PaymentMethodSelector.tsx
├── MidtransSnap.tsx
├── EscrowTimeline.tsx
└── PaymentConfirmation.tsx
```

**Tasks:**

- [ ] Create escrow status display
- [ ] Integrate Midtrans Snap.js
- [ ] Create payment history list
- [ ] Create payment confirmation page
- [ ] Escrow timeline visualization

---

#### **6.2 Notification System** 🔲 TODO

**Components:**

```
components/features/notifications/
├── NotificationBell.tsx
├── NotificationList.tsx
├── NotificationItem.tsx
└── NotificationPreferences.tsx
```

**Tasks:**

- [ ] Notification bell dengan unread count
- [ ] Notification dropdown/panel
- [ ] Mark as read functionality
- [ ] Notification preferences settings

---

#### **6.3 Polish & Performance** 🔲 TODO

**Tasks:**

- [ ] Dark mode support
- [ ] Mobile responsiveness audit
- [ ] Loading states optimization
- [ ] Error handling improvement
- [ ] SEO optimization (metadata)
- [ ] Performance optimization (image sizes, code splitting)

---

## 🗃️ Component Inventory

### UI Components (Base)

| Component | Location | Status |
|-----------|----------|--------|
| Button | `components/ui/Button.tsx` | ⏳ |
| Input | `components/ui/Input.tsx` | ⏳ |
| Card | `components/ui/Card.tsx` | ⏳ |
| Modal | `components/ui/Modal.tsx` | ⏳ |
| Select | `components/ui/Select.tsx` | ⏳ |
| DatePicker | `components/ui/DatePicker.tsx` | ⏳ |
| Avatar | `components/ui/Avatar.tsx` | ⏳ |
| Badge | `components/ui/Badge.tsx` | ⏳ |
| Skeleton | `components/ui/Skeleton.tsx` | ⏳ |
| Toast | `components/ui/Toast.tsx` | ⏳ |

### Feature Components

| Component | Location | Status |
|-----------|----------|--------|
| PropertyCard | `components/features/properties/PropertyCard.tsx` | ⏳ |
| PropertyFilter | `components/features/properties/PropertyFilter.tsx` | ⏳ |
| BookingWidget | `components/features/bookings/BookingWidget.tsx` | ⏳ |
| ContractViewer | `components/features/contracts/ContractViewer.tsx` | ⏳ |
| PhotoUploader | `components/features/inspections/PhotoUploader.tsx` | ⏳ |
| DamageReport | `components/features/inspections/DamageReport.tsx` | ⏳ |
| DashboardLayout | `components/layout/DashboardLayout.tsx` | ⏳ |
| Sidebar | `components/layout/Sidebar.tsx` | ⏳ |

---

## 📝 Pages Summary

| Route | Group | Access | Status |
|-------|-------|--------|--------|
| `/` | marketing | Public | ✅ |
| `/about` | marketing | Public | ⏳ |
| `/properties` | marketing | Public | ⏳ |
| `/properties/[id]` | marketing | Public | ⏳ |
| `/login` | auth | Public | ⏳ |
| `/register` | auth | Public | ⏳ |
| `/forgot-password` | auth | Public | ⏳ |
| `/dashboard/tenant` | dashboard | Tenant | ⏳ |
| `/dashboard/landlord` | dashboard | Landlord | ⏳ |
| `/dashboard/settings` | dashboard | Authenticated | ⏳ |
| `/bookings` | dashboard | Authenticated | ⏳ |
| `/bookings/[id]` | dashboard | Authenticated | ⏳ |
| `/contracts` | dashboard | Authenticated | ⏳ |
| `/contracts/[id]` | dashboard | Authenticated | ⏳ |
| `/inspections` | dashboard | Authenticated | ⏳ |
| `/inspections/[id]` | dashboard | Authenticated | ⏳ |
| `/payments` | dashboard | Authenticated | ⏳ |

---

## 🛠️ Dependencies Timeline

### Phase 1

```bash
bun add react-hook-form @hookform/resolvers zod
bun add @better-auth/react
bun add clsx tailwind-merge
```

### Phase 2

```bash
bun add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
bun add @radix-ui/react-select @radix-ui/react-popover
bun add date-fns
```

### Phase 3

```bash
bun add @react-pdf/renderer  # Untuk PDF contract viewer (optional)
bun add react-signature-canvas  # Untuk digital signature (optional)
```

### Phase 4

```bash
bun add ai  # Vercel AI SDK
bun add react-dropzone  # Untuk file upload
```

### Phase 5

```bash
bun add recharts  # Untuk charts
bun add @tanstack/react-query  # Untuk client-side data fetching (optional)
```

### Phase 6

```bash
# Midtrans Snap.js (load dari CDN)
# No additional deps
```

---

## 📅 Timeline Summary

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1: Foundation** | Week 1-2 | Auth UI, Layout, Navigation |
| **Phase 2: Discovery** | Week 3-4 | Property listing, detail, search |
| **Phase 3: Rental Flow** | Week 5-6 | Booking, Contracts, Signing |
| **Phase 4: AI Features** | Week 7-8 | Inspection upload, AI chat |
| **Phase 5: Dashboard** | Week 9-10 | Tenant/Landlord dashboard, analytics |
| **Phase 6: Payments** | Week 11-12 | Escrow UI, Midtrans, polish |

---

## 🎯 Priority Legend

| Priority | Meaning | Action |
|----------|---------|--------|
| **P0** | Critical — MVP harus ada | Kerjain dulu |
| **P1** | Important — Perlu untuk production | Phase berikutnya |
| **P2** | Nice to have — Bisa ditunda | Nanti saja |

---

## ✅ Next Steps (Mulai Sekarang)

1. **[P0] Install form dependencies** — `react-hook-form`, `zod`
2. **[P0] Create base UI components** — Button, Input, Card
3. **[P0] Start Auth pages** — Login, Register
4. **[P0] Setup Protected routes** — Middleware + Dashboard layout

**Mau saya mulai implement Phase 1 sekarang?**

---

**Last Updated:** 18 April 2026
