'use client';

import Link from 'next/link';
import { Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useRegisterForm } from '@/hooks/use-auth-form';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function RegisterPage() {
  const { isLoading, error, handleSocialAuth } = useRegisterForm();
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isPending && session) {
      router.push('/dashboard');
    }
  }, [session, isPending, mounted, router]);

  if (!mounted || isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <Card className="overflow-hidden border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl dark:border-white/10">
      <CardHeader className="space-y-1 pb-6 pt-8 text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500 ring-1 ring-primary-500/20">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <CardTitle className="font-display text-2xl font-medium tracking-tight">
          Create Account
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Join the future of secure property rental
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5 px-8 pb-6">
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

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialAuth('google')}
          disabled={isLoading}
          className="h-12 w-full cursor-pointer border-white/10 bg-white/5 font-medium text-foreground transition-all hover:bg-white/10"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <svg
              className="mr-2 h-5 w-5 filter drop-shadow-[0_0_1px_rgba(255,255,255,0.5)]"
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
          )}
          Continue with Google
        </Button>
      </CardContent>

      <CardFooter className="flex justify-center pb-8 pt-2 text-sm text-muted-foreground">
        <p>
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-primary-500 transition-colors hover:text-primary-400"
          >
            Sign in instead
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
