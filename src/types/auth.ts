/**
 * Shared TypeScript types for Better Auth integration.
 * Defines proper types to replace inline 'any' usage.
 */

/**
 * The error context object passed to Better Auth's onError callback.
 * Matches the shape of better-auth's internal BetterFetchError.
 */
export interface AuthErrorContext {
  error: {
    message?: string;
    code?: string;
    status?: number;
    statusText?: string;
  };
}

/** Union type for auth form modes */
export type AuthFormMode = 'login' | 'register';

/** Shape of auth form state managed in hooks/pages */
export interface AuthFormState {
  isLoading: boolean;
  error: string | null;
}
