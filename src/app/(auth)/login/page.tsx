'use client';

import Link from 'next/link';
import { ArrowRight, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { useLoginForm } from '@/hooks/use-auth-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * Login page — /login
 * Layout (background, centering) is handled by src/app/(auth)/layout.tsx
 * Animations: CSS-only (animate-fade-in, animate-slide-up from globals.css)
 */
export default function LoginPage() {
  const {
    email,
    password,
    isLoading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
    handleSocialAuth,
  } = useLoginForm();

  return (
    <Card className="overflow-hidden border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl dark:border-white/10">
      <CardHeader className="space-y-1 pb-6 pt-8 text-center">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Link
            href="/"
            className="font-display text-4xl font-bold tracking-tight text-primary-500 drop-shadow-sm transition-opacity hover:opacity-80"
          >
            RentSafe
          </Link>
        </div>
        <CardTitle className="font-display text-2xl font-medium tracking-tight">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Securely access your rental dashboard
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5 px-8">
        {/* Error Banner */}
        {error && (
          <div
            role="alert"
            className="flex animate-slide-up items-center gap-2 rounded-lg border border-error-200 bg-error-50/60 px-3 py-2.5 text-sm font-medium text-error-600 dark:border-error-700/30 dark:bg-error-950/30 dark:text-error-400"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email Field */}
          <div className="grid gap-1.5">
            <Label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-white/10 bg-white/5 pl-10 transition-all focus-visible:border-primary-500/50 focus-visible:ring-primary-500/20"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-primary-500 transition-colors hover:text-primary-400"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 border-white/10 bg-white/5 pl-10 transition-all focus-visible:border-primary-500/50 focus-visible:ring-primary-500/20"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="group mt-2 h-11 w-full bg-primary-600 font-semibold text-white transition-all hover:bg-primary-700 active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In…
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialAuth('google')}
          disabled={isLoading}
          className="h-11 w-full cursor-pointer bg-white/5 border-white/10 hover:bg-white/10 transition-all font-medium text-foreground"
        >
          <svg
            className="mr-2 h-4 w-4 filter drop-shadow-[0_0_1px_rgba(255,255,255,0.5)]"
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Google
        </Button>
      </CardContent>

      <CardFooter className="flex justify-center pb-8 pt-2 text-sm text-muted-foreground">
        <p>
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-semibold text-primary-500 transition-colors hover:text-primary-400"
          >
            Create one now
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
