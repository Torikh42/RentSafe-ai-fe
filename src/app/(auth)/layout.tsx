'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Shared auth layout for /login and /register pages.
 * Handles: split-screen premium design with immersive image and text overlays.
 */
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background selection:bg-accent-500/30">
      {/* Left Panel - Immersive Hero Illustration */}
      <div className="hidden lg:block lg:w-1/2 relative bg-primary-950">
        {/* Full Bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/auth.png"
            alt="RentSafe AI Security Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Gradients for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/20 to-primary-950/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/40 to-transparent z-10" />
        </div>

        {/* Brand Overlay (Top Left) */}
        <div className="absolute top-0 left-0 z-20 p-12 w-full">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="relative w-10 h-10 rounded-xl bg-white overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-500">
              <Image
                src="/images/logo.jpg"
                alt="RentSafe AI Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight tracking-tight text-white">
                RentSafe <span className="text-accent-500">AI</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary-300 font-semibold">
                Security Protocol
              </span>
            </div>
          </Link>
        </div>

        {/* Marketing Overlay (Bottom Left) */}
        <div className="absolute bottom-0 left-0 z-20 p-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-accent-500 shadow-[0_0_8px_#e38b29]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-500">
                AI Powered Assurance
              </span>
            </div>
            <h2 className="text-4xl font-display font-medium text-white leading-tight mb-4 drop-shadow-lg">
              Protecting your assets with <br />
              <span className="italic text-accent-500">AI Intelligence.</span>
            </h2>
            <p className="text-primary-100 text-sm leading-relaxed font-medium max-w-sm drop-shadow">
              Join thousands of landlords and tenants using our Smart Escrow and
              Gemini Vision technology to eliminate rental disputes.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Auth Content */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center relative bg-surface overflow-y-auto">
        <div className="w-full max-w-md px-8 py-12 relative z-10 flex flex-col min-h-fit">
          {/* Mobile Logo Only */}
          <div className="lg:hidden flex justify-center mb-12">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-white overflow-hidden shadow-lg">
                <Image
                  src="/images/logo.jpg"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-xl text-foreground">
                RentSafe <span className="text-accent-500">AI</span>
              </span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
