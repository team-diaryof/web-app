// components/auth-provider.tsx
"use client";

import { useAuthStore } from "@/store/auth";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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

  const [ready, setReady] = useState(false);
  const didRunCheck = useRef(false);
  const cookieLoaded = useRef(false);

  const redirectTo = (user?.role == "ADMIN" ? "/admin" : "/app") + "/dashboard";

  useEffect(() => {
    if (_hasHydrated && !cookieLoaded.current) {
      cookieLoaded.current = true;
      loadFromCookie();
    }
  }, [_hasHydrated]);

  useEffect(() => {
    if (!_hasHydrated) return;

    if (!didRunCheck.current) {
      didRunCheck.current = true;

      setTimeout(() => {
        // Block authenticated users from auth pages
        if (blockAuthenticated && isAuthenticated) {
          toast.error("You are already logged in");
          setReady(true);
          return;
        }

        if (allowedRoles?.length) {
          if (!isAuthenticated || !user) {
            toast.error("Please login to access this page");
            setReady(true);
            return;
          }
          if (!allowedRoles.includes(user.role)) {
            toast.error("You don't have permission to access this page");
            setReady(true);
            return;
          }
        }

        setReady(true);
      }, 1000);
    }
  }, [_hasHydrated, blockAuthenticated, allowedRoles, isAuthenticated, user]);

  if (!ready) return <LoadingScreen />;

  // Show error if authenticated user tries to access auth page
  if (blockAuthenticated && isAuthenticated) {
    redirect((user?.role == "ADMIN" ? "/admin" : "/app") + "/dashboard");
    return <UnifiedErrorPage forbidden message="Already logged in" />;
  }

  // Wrong role after checks → show error page
  if (allowedRoles?.length && (!user || !allowedRoles.includes(user.role))) {
    return <UnifiedErrorPage actionLabel="Dashboard" actionLink={redirectTo} forbidden />;
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
