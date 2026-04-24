# GEMINI.MD — AI Assistant Guide untuk RentSafe AI Frontend

> **PENTING:** File ini adalah panduan personalisasi untuk GEMINI CLI (AI assistant) yang bekerja di repository ini. SELALU baca dan ikuti panduan ini sebelum memulai pekerjaan.

---

## 1. Project Context

**Nama Proyek:** RentSafe AI — Frontend Application
**Deskripsi:** Frontend untuk platform AI-powered dispute resolution sewa kos-kosan & apartemen di Indonesia. Mengatasi "justice gap" di mana biaya hukum (IDR 5-15 juta) > nilai deposit (IDR 1-3 juta).

**Solusi Utama:**

1. **AI Smart Contracts** — Generate kontrak sewa KUHPerdata-compliant dalam 5 menit
2. **AI Property Inspection** — Gemini Vision API untuk dokumentasi kondisi properti (check-in/check-out)
3. **Smart Escrow** — Deposit dipegang Midtrans, dirilis otomatis berdasarkan AI verdict
4. **Automated Dispute Resolution** — AI sebagai arbiter netral
5. **Two-way Reputation System** — Rating untuk tenant & landlord

**Target Users:**

- **Tenants:** Mahasiswa & young professionals (9.3 juta mahasiswa di Indonesia)
- **Landlords:** Pemilik kos-kosan & apartemen
- **Admin:** Platform moderator

**Dokumen Referensi:**

- `Geost_RentSafeAI.md` — Dokumen lengkap (background, solution, architecture, business model)
- `IMPLEMENTATION_PLAN.md` — Phase-by-phase implementation plan untuk frontend

---

## 2. Tech Stack (Strict)

| Layer          | Technology              | Keterangan                          |
| -------------- | ----------------------- | ----------------------------------- |
| **Framework**  | Next.js 15+             | App Router (bukan Pages Router)     |
| **UI Library** | React 19+               | Latest React with Server Components |
| **Styling**    | Tailwind CSS v4         | Import-based configuration          |
| **Language**   | TypeScript (strict)     | No `any`, strict mode enabled       |
| **Auth**       | Better Auth             | Client-side auth integration        |
| **State**      | React Context / Zustand | State management                    |
| **Forms**      | React Hook Form + Zod   | Form handling & validation          |
| **HTTP**       | Fetch / TanStack Query  | API communication                   |
| **AI**         | Vercel AI SDK           | AI streaming & chat UI              |
| **Linting**    | Oxlint & Oxfmt          | Fast lint & format                  |

> ⚠️ **Next.js App Router** menggunakan Server Components secara default. Gunakan `'use client'` directive hanya untuk Client Components yang membutuhkan interactivity.

---

## 3. Architecture Rules

### 3.1 Struktur: Next.js App Router

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route group: auth pages
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/       # Route group: dashboard
│   │   ├── tenant/
│   │   ├── landlord/
│   │   └── layout.tsx
│   ├── (marketing)/       # Route group: public pages
│   │   ├── page.tsx       # Landing page
│   │   ├── about/
│   │   └── layout.tsx
│   ├── api/               # API routes (if needed)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page (redirect dari marketing)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components (shadcn/ui style)
│   ├── forms/            # Form components
│   ├── layout/           # Layout components (header, footer, sidebar)
│   └── features/         # Feature-specific components
│       ├── properties/   # Property-related
│       ├── contracts/    # Contract-related
│       ├── inspections/  # Inspection-related
│       └── dashboard/    # Dashboard components
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── use...ts
├── lib/                   # Utilities & configs
│   ├── api/              # API client
│   │   ├── client.ts     # Base fetch wrapper
│   │   └── types.ts      # API types
│   ├── auth/             # Auth utilities
│   ├── utils.ts          # General utilities (cn helper)
│   └── constants.ts      # Constants
├── types/                 # TypeScript types
│   ├── auth.ts
│   ├── property.ts
│   └── index.ts
└── styles/               # Additional styles (jika perlu)
```

### 3.2 Golden Rules (WAJIB, pelanggaran = immediate rejection)

1. ✅ **SELALU** gunakan **App Router** — JANGAN Pages Router
2. ✅ **Server Components** secara default — gunakan `'use client'` hanya jika perlu
3. ✅ **Gunakan** `async/await` untuk data fetching di Server Components
4. ✅ **Gunakan** React Suspense untuk loading states
5. ✅ **JANGAN** fetch data di Client Components jika bisa di Server Component
6. ✅ **Gunakan** `Image` component dari Next.js untuk optimasi gambar
7. ✅ **Gunakan** `Link` component dari Next.js untuk navigasi client-side
8. ✅ **Tailwind** classes diurutkan: layout → sizing → spacing → colors → effects

### 3.3 Server vs Client Components

**Server Components (default):**

- Data fetching langsung ke backend
- Akses ke environment variables server-side
- Tidak bisa menggunakan hooks (`useState`, `useEffect`)
- Tidak bisa menggunakan event handlers (`onClick`)

**Client Components (`'use client'`):**

- Forms dengan interactivity
- Buttons dengan event handlers
- Components yang menggunakan browser APIs
- Animations & real-time updates

```typescript
// Server Component (default)
async function PropertyList() {
  const properties = await fetchApi('/properties');
  return <div>{properties.map(...)}</div>;
}

// Client Component
'use client';

function LikeButton({ propertyId }: { propertyId: string }) {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'}
    </button>
  );
}
```

### 3.4 Development Workflow (Tambah Fitur Baru)

```
Phase 1: Page   → Buat folder di app/(group)/nama-page/
Phase 2: Layout → Buat layout.tsx jika perlu nested layout
Phase 3: Components → Buat di components/features/
Phase 4: Hooks  → Buat custom hooks di hooks/
Phase 5: Verify → bun run fl && bun run check
```

---

## 4. Current Status & Implementation Plan

### Phase 1: Foundation & Auth (Week 1-2) — SEDANG DIKERJAKAN

- [x] Project setup (Next.js 15 + Tailwind 4)
- [x] Landing page
- [ ] Auth pages (login, register)
- [ ] Better Auth client integration
- [ ] Protected route middleware

### Phase 2: Property & Discovery (Week 3-4)

- [ ] Property listing page
- [ ] Property detail page
- [ ] Search & filter UI
- [ ] Property cards component
- [ ] Image gallery component

### Phase 3: Rental Flow (Week 5-6)

- [ ] Booking request form
- [ ] Contract generation UI
- [ ] Contract signing interface
- [ ] Contract detail view
- [ ] Booking management (tenant & landlord)

### Phase 4: AI Features (Week 7-8)

- [ ] Property inspection upload
- [ ] AI damage detection results display
- [ ] Before/after comparison view
- [ ] AI chat interface (Vercel AI SDK)

### Phase 5: Dashboard (Week 9-10)

- [ ] Tenant dashboard
- [ ] Landlord dashboard
- [ ] Analytics charts
- [ ] Reputation display

### Phase 6: Payments & Polish (Week 11-12)

- [ ] Escrow status UI
- [ ] Midtrans payment integration
- [ ] Dispute resolution interface
- [ ] Notification center
- [ ] Dark mode
- [ ] Mobile optimization

**Lihat detail lengkap di:** `IMPLEMENTATION_PLAN.md`

---

## 5. API Integration

### Base Configuration

```typescript
// src/lib/api/client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // Untuk cookies (Better Auth)
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
```

### Usage in Server Component

```typescript
// app/properties/page.tsx (Server Component)
import { fetchApi } from '@/lib/api/client';

export default async function PropertiesPage() {
  const properties = await fetchApi('/properties');

  return (
    <div>
      {properties.map((property) => (
        <PropertyCard key={property.id} data={property} />
      ))}
    </div>
  );
}
```

### Usage in Client Component

```typescript
'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';

export function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchApi('/properties').then(setProperties);
  }, []);

  return (...);
}
```

---

## 6. Styling Guidelines

### Tailwind CSS Best Practices

```tsx
// ✅ Good: Class ordering (layout → sizing → spacing → colors → effects)
<div className="flex h-full w-full flex-col gap-4 bg-white p-6 shadow-md hover:shadow-lg">
  ...
</div>

// ✅ Good: Using cn helper for conditional classes
import { cn } from '@/lib/utils';

<button
  className={cn(
    'rounded-lg px-4 py-2 font-medium',
    variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
    variant === 'secondary' && 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    className
  )}
>

// ✅ Good: Responsive design (mobile-first)
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  ...
</div>
```

### Component Structure

```typescript
// components/ui/Button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-colors',
        // Variants
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'border border-blue-600 text-blue-600 hover:bg-blue-50',
        variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
        // Sizes
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        className
      )}
      {...props}
    />
  );
}
```

---

## 7. Environment Variables

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Frontend URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI (Client-side - hanya jika perlu direct call)
NEXT_PUBLIC_GEMINI_API_KEY=...

# Midtrans (Client Key untuk Snap.js)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxx
NEXT_PUBLIC_MIDTRANS_ENVIRONMENT=sandbox
```

> **Note:** Environment variables dengan prefix `NEXT_PUBLIC_` tersedia di browser. Jangan expose secrets!

---

## 8. Code Quality Checklist

Sebelum commit, WAJIB jalankan:

```bash
bun run fl     # Format & lint (oxfmt + oxlint)
bun run check  # TypeScript type check (tsc --noEmit)
```

**Pre-commit Checklist:**

- ✅ Tidak ada `'use client'` yang tidak perlu (pertimbangkan Server Component)
- ✅ Data fetching di Server Component jika memungkinkan
- ✅ Menggunakan `Image` component untuk gambar (bukan `img`)
- ✅ Menggunakan `Link` component untuk navigasi (bukan `a` untuk internal links)
- ✅ Tailwind classes terurut dengan benar
- ✅ TypeScript strict mode (no `any`)
- ✅ Props menggunakan proper TypeScript interfaces

---

## 9. Important Notes

### 9.1 Route Groups

Gunakan route groups untuk organisasi tanpa mempengaruhi URL:

```
app/
├── (marketing)/          # Tidak muncul di URL
│   ├── page.tsx         # → /
│   └── about/
│       └── page.tsx     # → /about
├── (auth)/
│   └── login/
│       └── page.tsx     # → /login
└── (dashboard)/
    └── tenant/
        └── page.tsx     # → /dashboard/tenant
```

### 9.2 Loading States

Gunakan `loading.tsx` untuk automatic loading UI:

```typescript
// app/properties/loading.tsx
export default function Loading() {
  return <PropertyListSkeleton />;
}
```

### 9.3 Error Handling

Gunakan `error.tsx` untuk error boundaries:

```typescript
'use client';

// app/properties/error.tsx
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### 9.4 Metadata

Set metadata di setiap page atau layout:

```typescript
// app/(marketing)/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About RentSafe AI',
  description: 'Learn about our mission to solve rental disputes',
};
```

---

## 10. Quick Reference

### Useful Commands

```bash
bun dev              # Start dev server (localhost:3000)
bun run fl           # Format & lint
bun run check        # TypeScript type check
bun build            # Build for production
bun start            # Start production server
```

### External Services

- **Backend API:** http://localhost:8000
- **Google AI Studio:** https://aistudio.google.com
- **Midtrans Sandbox:** https://dashboard.sandbox.midtrans.com
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs

---

## 11. When in Doubt

1. **Cek AGENTS.MD** — Architecture rules & golden rules
2. **Cek IMPLEMENTATION_PLAN.md** — Fitur apa yang sedang dikerjakan
3. **Cek existing pages** — Ikuti pattern yang sudah ada
4. **Tanya user** — Jika ambiguous atau di luar scope plan

---

**Last Updated:** 18 April 2026
**Maintained By:** GEMINI CLI (AI Assistant)
