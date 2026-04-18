# AGENTS.MD — Architecture Rules & Golden Rules

> **PENTING:** Dokumen ini adalah panduan arsitektur WAJIB untuk semua AI agents yang bekerja di frontend RentSafe AI.

---

## 📋 Overview

RentSafe AI Frontend adalah aplikasi **Next.js 15** dengan **App Router**, menggunakan **React Server Components** secara default dan **Client Components** hanya untuk interactivity.

---

## 🏗️ Architecture Principles

### 1. App Router Structure

```
app/
├── (marketing)/       # Public pages (no auth required)
│   ├── page.tsx      # Landing page
│   ├── about/
│   └── contact/
├── (auth)/            # Auth pages
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── (dashboard)/       # Protected dashboard
│   ├── tenant/
│   ├── landlord/
│   └── admin/
└── api/              # API routes (if needed)
```

### 2. Component Architecture

```
components/
├── ui/               # Base UI components (Button, Input, Card)
├── forms/            # Form-specific components
├── layout/           # Layout parts (Header, Footer, Sidebar)
└── features/         # Feature components
    ├── properties/   # Property-related
    ├── contracts/    # Contract-related
    ├── inspections/  # Inspection-related
    └── dashboard/    # Dashboard-specific
```

### 3. Server vs Client Components Decision Tree

```
Need browser APIs? ──YES──► 'use client'
     │ NO
     ▼
Need React hooks? ──YES──► 'use client'
     │ NO
     ▼
Need event handlers? ──YES──► 'use client'
     │ NO
     ▼
Use Server Component (default)
```

---

## ⚡ Golden Rules

### Rule 1: App Router Only
- ✅ SELALU gunakan `app/` directory
- ❌ JANGAN gunakan `pages/` directory

### Rule 2: Server Components Default
- ✅ Default export = Server Component
- ✅ Gunakan `'use client'` hanya jika diperlukan
- ❌ JANGAN gunakan `'use client'` untuk data fetching

### Rule 3: Data Fetching Pattern

```typescript
// ✅ CORRECT: Server Component fetches data
// app/properties/page.tsx
export default async function PropertiesPage() {
  const properties = await fetchApi('/properties');
  return <PropertyList data={properties} />;
}

// ❌ WRONG: Client Component fetching on mount
'use client';
function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetch('/api/properties').then(r => r.json()).then(setProperties);
  }, []);
  // ...
}
```

### Rule 4: Image Optimization

```tsx
// ✅ CORRECT: Next.js Image component
import Image from 'next/image';

<Image
  src="/property.jpg"
  alt="Property"
  width={800}
  height={600}
  priority
/>

// ❌ WRONG: Native img tag
<img src="/property.jpg" alt="Property" />
```

### Rule 5: Navigation

```tsx
// ✅ CORRECT: Next.js Link component
import Link from 'next/link';

<Link href="/properties">View Properties</Link>

// ❌ WRONG: Native a tag for internal navigation
<a href="/properties">View Properties</a>
```

### Rule 6: Tailwind Class Ordering

```
Layout & Display
  ↓
Sizing (w-, h-)
  ↓
Spacing (p-, m-, gap-)
  ↓
Typography (text-, font-)
  ↓
Colors (bg-, text-, border-)
  ↓
Effects (shadow-, rounded-, opacity-)
  ↓
Modifiers (hover:, focus:, dark:)
```

```tsx
// ✅ CORRECT: Ordered classes
<div className="flex h-full w-full flex-col gap-4 bg-white p-6 text-gray-900 shadow-md hover:shadow-lg">

// ❌ WRONG: Random order
<div className="bg-white p-6 shadow-md hover:shadow-lg text-gray-900 flex flex-col gap-4 h-full w-full">
```

### Rule 7: Props Interface

```typescript
// ✅ CORRECT: Explicit interface
interface PropertyCardProps {
  property: Property;
  variant?: 'compact' | 'full';
  onSelect?: (id: string) => void;
}

export function PropertyCard({
  property,
  variant = 'full',
  onSelect,
}: PropertyCardProps) {
  // ...
}

// ❌ WRONG: Inline type atau any
export function PropertyCard(props: any) {
  // ...
}
```

### Rule 8: API Client Pattern

```typescript
// ✅ CORRECT: Centralized API client with types
// lib/api/client.ts
export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ✅ CORRECT: Type-safe usage
const properties = await fetchApi<Property[]>('/properties');
```

### Rule 9: Error Boundaries

```typescript
// ✅ CORRECT: Error boundary per segment
// app/properties/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Failed to load properties</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Rule 10: Loading States

```typescript
// ✅ CORRECT: Loading.tsx for automatic suspense
// app/properties/loading.tsx
export default function Loading() {
  return <PropertyListSkeleton />;
}

// ✅ CORRECT: Suspense boundary
import { Suspense } from 'react';

<Suspense fallback={<PropertyListSkeleton />}>
  <PropertyList />
</Suspense>
```

---

## 📁 File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Pages | `page.tsx` | `app/properties/page.tsx` |
| Layouts | `layout.tsx` | `app/(dashboard)/layout.tsx` |
| Loading | `loading.tsx` | `app/properties/loading.tsx` |
| Error | `error.tsx` | `app/properties/error.tsx` |
| Not Found | `not-found.tsx` | `app/[id]/not-found.tsx` |
| Components | `PascalCase.tsx` | `PropertyCard.tsx` |
| Hooks | `useCamelCase.ts` | `useAuth.ts` |
| Utils | `camelCase.ts` | `formatDate.ts` |
| Constants | `SCREAMING_SNAKE` | `API_URL` |

---

## 🔒 Auth Pattern

### Protected Route Pattern

```typescript
// ✅ CORRECT: Middleware for protected routes
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

### Auth Hook Pattern

```typescript
// ✅ CORRECT: useAuth hook for client components
// hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/me')
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
```

---

## 🧪 Form Pattern

```typescript
// ✅ CORRECT: React Hook Form + Zod
// components/forms/PropertyForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const propertySchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  address: z.string().min(10),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export function PropertyForm({ onSubmit }: { onSubmit: (data: PropertyFormData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 📝 Code Quality Standards

### TypeScript
- ✅ Strict mode enabled
- ✅ No `any` types
- ✅ Explicit return types untuk exported functions
- ✅ Interface untuk object shapes
- ✅ Type untuk unions/intersections

### React
- ✅ Functional components only
- ✅ Hooks rules followed (no conditional hooks)
- ✅ Proper dependency arrays di useEffect
- ✅ Cleanup functions untuk subscriptions

### Performance
- ✅ React.memo untuk expensive renders
- ✅ useMemo untuk expensive calculations
- ✅ useCallback untuk stable function references
- ✅ Image optimization dengan next/image
- ✅ Code splitting dengan dynamic imports

---

## 🚀 Deployment Checklist

- [ ] `bun run build` berhasil tanpa error
- [ ] `bun run fl` (lint & format) clean
- [ ] `bun run check` (TypeScript) clean
- [ ] Environment variables sudah di-set di Vercel
- [ ] NEXT_PUBLIC_API_URL pointing ke production backend
- [ ] Images optimized dan menggunakan next/image

---

**Last Updated:** 18 April 2026
