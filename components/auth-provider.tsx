// components/auth-provider.tsx
"use client";

import { useAuthStore } from "@/store/auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useRef, useMemo } from "react";
import UnifiedErrorPage from "./ui/error-page";
import Loading from "./ui/loading";
import AnimatePageWrapper from "./animations/animate-page-wrapper";

interface AuthProviderProps {
  children: ReactNode;
  allowedRoles?: string[];
  blockAuthenticated?: boolean; // <-- Add this prop
}

export default function AuthProvider({
  children,
  allowedRoles,
  blockAuthenticated,
}: AuthProviderProps) {
  const { _hasHydrated, loadFromCookie, user, isAuthenticated } = useAuthStore();
  const { data: session, status: sessionStatus } = useSession();

  const cookieLoaded = useRef(false);

  // Get user from NextAuth session if available
  type NextAuthUser = {
    id?: string;
    email?: string | null;
    name?: string | null;
    role?: string;
  };
  const nextAuthUser = session?.user as NextAuthUser | undefined;
  const nextAuthRole = nextAuthUser?.role || "USER";

  // Memoize authentication state
  const authState = useMemo(() => {
    if (sessionStatus === "loading" || !_hasHydrated) {
      return { isReady: false, isAuthenticated: false, currentUser: null };
    }

    const isNextAuthAuthenticated = sessionStatus === "authenticated" && session?.user;
    const isCustomAuthenticated = isAuthenticated;
    const userIsAuthenticated = isNextAuthAuthenticated || isCustomAuthenticated;

    // Determine which user to use (NextAuth takes priority for session-based auth)
    const currentUser = (isNextAuthAuthenticated && nextAuthUser) ? {
      id: nextAuthUser.id || "",
      email: nextAuthUser.email || "",
      name: nextAuthUser.name || null,
      role: nextAuthRole,
      createdAt: new Date().toISOString(),
    } : user;

    return {
      isReady: true,
      isAuthenticated: userIsAuthenticated,
      currentUser,
      isNextAuthAuthenticated,
      isCustomAuthenticated,
    };
  }, [_hasHydrated, sessionStatus, session, isAuthenticated, user, nextAuthUser, nextAuthRole]);

  useEffect(() => {
    if (_hasHydrated && !cookieLoaded.current) {
      cookieLoaded.current = true;
      loadFromCookie();
    }
  }, [_hasHydrated, loadFromCookie]);

  // Wait for NextAuth session check to complete and auth store to be ready
  if (!authState.isReady) return <LoadingScreen />;

  const { isAuthenticated: userIsAuthenticated, currentUser } = authState;

  // Show error if authenticated user tries to access auth page
  if (blockAuthenticated && userIsAuthenticated) {
    redirect(currentUser?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
  }
  if (!userIsAuthenticated && !blockAuthenticated) {
    redirect("/login");
  }

  // Wrong role after checks → show error page
  if (allowedRoles?.length && (!userIsAuthenticated || !currentUser || !allowedRoles.includes(currentUser.role))) {
    return <UnifiedErrorPage badRequest title="Login to acccess" message="You should login/register to get the access of dashboard page." actionLabel="Login" actionLink="/login" />;
  }

  return <>{children}</>;
}

const LoadingScreen = () => (
  <AnimatePageWrapper className="flex items-center justify-center h-screen">
    <div className="text-center">
      <Loading />
      <p>Loading...</p>
    </div>
  </AnimatePageWrapper>
);
