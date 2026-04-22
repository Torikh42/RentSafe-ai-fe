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
          className="h-11 w-full bg-white/5 border-white/10 hover:bg-white/10 transition-all font-medium text-foreground"
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
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
