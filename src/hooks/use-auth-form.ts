'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth-client';
import type { AuthErrorContext, AuthFormState } from '@/types/auth';

// ─── Shared Social Auth Hook ─────────────────────────────────────────────────

interface UseSocialAuthReturn extends AuthFormState {
  handleSocialAuth: (provider: 'google') => Promise<void>;
}

function useSocialAuth(): UseSocialAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSocialAuth = async (provider: 'google') => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn.social({
        provider,
        callbackURL: `${window.location.origin}/dashboard`,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleSocialAuth };
}

// ─── Login Hook ─────────────────────────────────────────────────────────────

export interface UseLoginFormReturn extends AuthFormState {
  handleSocialAuth: (provider: 'google') => Promise<void>;
}

export function useLoginForm(): UseLoginFormReturn {
  return useSocialAuth();
}

// ─── Register Hook ───────────────────────────────────────────────────────────

export interface UseRegisterFormReturn extends AuthFormState {
  handleSocialAuth: (provider: 'google') => Promise<void>;
}

export function useRegisterForm(): UseRegisterFormReturn {
  return useSocialAuth();
}

// ─── Error Context re-export (kept for compatibility) ────────────────────────
export type { AuthErrorContext };
