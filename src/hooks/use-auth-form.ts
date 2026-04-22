"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import type { AuthErrorContext, AuthFormState } from "@/types/auth";

// ─── Login Hook ─────────────────────────────────────────────────────────────

interface UseLoginFormReturn extends AuthFormState {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSocialAuth: (provider: "google" | "github") => Promise<void>;
}

export function useLoginForm(): UseLoginFormReturn {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signIn.email(
        { email, password, callbackURL: `${window.location.origin}/` },
        {
          onError: (ctx: AuthErrorContext) => {
            setError(ctx.error.message ?? "Invalid email or password");
            setIsLoading(false);
          },
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn.social({
        provider,
        callbackURL: `${window.location.origin}/`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return { email, password, isLoading, error, setEmail, setPassword, handleSubmit, handleSocialAuth };
}

// ─── Register Hook ───────────────────────────────────────────────────────────

interface UseRegisterFormReturn extends AuthFormState {
  name: string;
  email: string;
  password: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSocialAuth: (provider: "google" | "github") => Promise<void>;
}

export function useRegisterForm(): UseRegisterFormReturn {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signUp.email(
        { name, email, password, callbackURL: `${window.location.origin}/` },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx: AuthErrorContext) => {
            setError(ctx.error.message ?? "Failed to create account");
            setIsLoading(false);
          },
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn.social({
        provider,
        callbackURL: `${window.location.origin}/`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return { name, email, password, isLoading, error, setName, setEmail, setPassword, handleSubmit, handleSocialAuth };
}
