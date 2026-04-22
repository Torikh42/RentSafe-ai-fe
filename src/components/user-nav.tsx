'use client';

import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, LayoutDashboard, Settings, Loader2 } from 'lucide-react';

export function UserNav() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <Loader2 className="h-5 w-5 animate-spin text-foreground-muted" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button
            variant="ghost"
            className="text-sm font-medium hover:bg-white/10"
          >
            Sign In
          </Button>
        </Link>
        <Link href="/register">
          <Button className="bg-primary-600 text-white hover:bg-primary-700">
            Get Started
          </Button>
        </Link>
      </div>
    );
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 ring-offset-background transition-all hover:ring-2 hover:ring-primary-500/20"
        >
          <Avatar className="h-10 w-10 border border-white/10 shadow-sm">
            <AvatarImage src={user.image || ''} alt={user.name || 'User'} />
            <AvatarFallback className="bg-primary-500/10 text-primary-600">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 glass border-white/10 bg-white/5 p-2 backdrop-blur-xl"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none text-foreground">
              {user.name}
            </p>
            <p className="text-xs leading-none text-foreground-muted">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg transition-colors hover:bg-white/10 focus:bg-white/10">
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg transition-colors hover:bg-white/10 focus:bg-white/10">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg transition-colors hover:bg-white/10 focus:bg-white/10">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex cursor-pointer items-center gap-2 rounded-lg text-error-500 transition-colors hover:bg-error-500/10 focus:bg-error-500/10"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
