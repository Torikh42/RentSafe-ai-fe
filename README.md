# RentSafe AI — Frontend

> **AI-powered platform untuk menyelesaikan sengketa sewa kos-kosan & apartemen di Indonesia.**
> Mengatasi "justice gap" di mana biaya hukum (IDR 5-15 juta) > nilai deposit (IDR 1-3 juta).

[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)]()
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-black)]()
[![React](https://img.shields.io/badge/React-19-61DAFB)]()
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-38B2AC)]()

---

## 🎯 Problem & Solution

### The Problem

- **9.3 juta mahasiswa** di Indonesia, 50% tinggal di kos-kosan sewaan
- **IDR 4.6 Triliun** deposit beredar tanpa perlindungan
- **70-80% sengketa** terkait deposit yang tidak dikembalikan
- **Justice Gap:** Biaya pengacara (5-15 juta) > nilai deposit (1-3 juta)

### The Solution

1. **AI Smart Contracts** — Generate kontrak sewa KUHPerdata-compliant dalam 5 menit
2. **AI Property Inspection** — Gemini Vision API untuk dokumentasi kondisi properti
3. **Smart Escrow** — Deposit dipegang Midtrans, dirilis otomatis berdasarkan AI verdict
4. **Automated Dispute Resolution** — AI sebagai arbiter netral (95% lebih murah, 98% lebih cepat)
5. **Two-way Reputation System** — Rating untuk tenant & landlord

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | [Next.js 15](https://nextjs.org) | React framework dengan App Router |
| **UI Library** | [React 19](https://react.dev) | UI component library |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS |
| **Language** | TypeScript (strict) | Type safety |
| **Auth** | [Better Auth](https://www.better-auth.com) | Authentication client |
| **State** | React Context / Zustand | State management |
| **Forms** | React Hook Form + Zod | Form handling & validation |
| **HTTP** | Fetch / TanStack Query | API communication |
| **AI** | Vercel AI SDK | AI streaming & chat |
| **Linting** | Oxlint & Oxfmt | Fast lint & format |

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[QWEN.MD](./QWEN.MD)** | 🤖 AI Assistant Guide (lengkap dengan guidelines) |
| **[CLAUDE.MD](./CLAUDE.MD)** | 🤖 AI Assistant Guide (ringkasan rules & workflow) |
| **[AGENTS.MD](./AGENTS.MD)** | 📐 Architecture rules & Golden Rules (WAJIB dibaca) |
| **[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)** | 🗺️ Phase-by-phase implementation plan (pages & components) |
| **[Geost_RentSafeAI.md](./Geost_RentSafeAI.md)** | 📄 Product specification (background, solution, business model) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│           FRONTEND (Vercel)                 │
│  Next.js + React + Tailwind + Vercel AI SDK │
│  ↓ AI calls → Gemini/OpenRouter             │
│  ↓ API calls → Backend                      │
└──────────────┬──────────────────────────────┘
               │ REST API (CORS enabled)
               ↓
┌─────────────────────────────────────────────┐
│         BACKEND (Cloudflare Workers)        │
│  Hono + Better Auth + Hyperdrive            │
│  ↓ Database → Neon PostgreSQL               │
│  ↓ Storage → Cloudflare R2                  │
│  ↓ Payment → Midtrans                       │
│  ↓ AI → Gemini / OpenRouter                 │
└─────────────────────────────────────────────┘
```

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth group (login, register)
│   ├── (dashboard)/       # Dashboard group (tenant, landlord)
│   ├── (marketing)/       # Marketing pages (landing, about)
│   ├── api/               # API routes (if needed)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & configs
│   ├── api/              # API client
│   ├── auth/             # Auth utilities
│   ├── utils.ts          # General utilities
│   └── constants.ts      # Constants
├── types/                 # TypeScript types
└── styles/               # Additional styles
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.0+
- Backend API running (see `../RentSafe-ai-be/`)

### 1. Clone & Install

```bash
cd RentSafe-ai-fe
bun install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` dan isi dengan:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
bun dev              # Runs on http://localhost:3000
```

---

## 📝 Development Commands

```bash
bun dev              # Start development server (port 3000)
bun build            # Build for production
bun start            # Start production server
bun run fl           # Format & lint (oxfmt + oxlint)
bun run check        # TypeScript type check (tsc --noEmit)
```

### Adding New Features

1. Create page di `src/app/(group)/page.tsx`
2. Create components di `src/components/features/`
3. Create API hooks di `src/hooks/`
4. Run `bun run fl && bun run check`

---

## 🌍 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | ✅ | `http://localhost:8000` |
| `NEXT_PUBLIC_APP_URL` | Frontend URL | ✅ | `http://localhost:3000` |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Gemini API key (client) | ⏳ | `AIzaSy...` |

---

## 📊 Implementation Status

| Phase | Status | Features |
|-------|--------|----------|
| **Phase 1: Foundation** | 🔄 In Progress | Auth UI, Layout ⏳ |
| **Phase 2: Property** | ⏳ Pending | Property listing, detail, search |
| **Phase 3: Rental Flow** | ⏳ Pending | Booking, Contracts, Signing |
| **Phase 4: AI Features** | ⏳ Pending | Inspection upload, AI chat |
| **Phase 5: Dashboard** | ⏳ Pending | Tenant/Landlord dashboard |
| **Phase 6: Payments** | ⏳ Pending | Escrow UI, Midtrans integration |

**Detail lengkap:** [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)

---

## 📖 Pages & Routes

| Route | Page | Status |
|-------|------|--------|
| `/` | Landing page | ✅ |
| `/login` | Login | ⏳ |
| `/register` | Register | ⏳ |
| `/properties` | Property listing | ⏳ |
| `/properties/[id]` | Property detail | ⏳ |
| `/dashboard/tenant` | Tenant dashboard | ⏳ |
| `/dashboard/landlord` | Landlord dashboard | ⏳ |
| `/contracts/[id]` | Contract detail | ⏳ |
| `/inspections/[id]` | Inspection view | ⏳ |
| `/disputes/[id]` | Dispute resolution | ⏳ |

**Full list:** [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md#-pages--routes)

---

## 🤝 Contributing

1. Baca [AGENTS.MD](./AGENTS.MD) untuk architecture rules
2. Baca [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) untuk current priorities
3. Run `bun run fl && bun run check` sebelum commit
4. Buat pull request dengan deskripsi jelas

---

## 📄 License

Proprietary — RentSafe AI © 2026

---

**Built with:** Next.js · React · Tailwind CSS · TypeScript
