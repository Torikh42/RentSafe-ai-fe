/**
 * Shared auth layout for /login and /register pages.
 * Handles: full-screen centering, background mesh gradient, noise texture.
 * Each auth page just returns its Card — no background duplication needed.
 */
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Mesh gradient background */}
      <div className="bg-mesh absolute inset-0 z-0 opacity-30" aria-hidden="true" />
      {/* Noise texture overlay */}
      <div className="noise absolute inset-0 z-10" aria-hidden="true" />

      {/* Centered content column */}
      <div className="relative z-20 w-full max-w-md animate-fade-in">
        {children}
      </div>
    </div>
  );
}
