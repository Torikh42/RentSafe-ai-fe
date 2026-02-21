# RentSafe-ai Frontend

Next.js 15 + React 19 + Tailwind CSS 4 frontend for RentSafe-ai.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed

### 1. Setup Environment

```bash
cp .env.example .env
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Start Dev Server

```bash
bun dev
```

App runs on `http://localhost:3000`.

## Scripts

```bash
bun dev     # Start development server
bun build   # Build for production
bun start   # Start production server
bun lint    # Run ESLint
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |
