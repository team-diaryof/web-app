"use client"

import { useAuthStore } from "@/store/user"
import { useRouter } from "next/navigation"
import { useEffect, ReactNode } from "react"

interface RouteGuardProps {
  children: ReactNode
  requireAuth?: boolean // true = protected, false = guest-only, undefined = public
  allowedRoles?: string[]
}

/**
 * Unified route guard component
 * - requireAuth=true: Protected routes (redirects guests to /login)
 * - requireAuth=false: Guest-only routes (redirects authenticated users to /dashboard)
 * - requireAuth=undefined: Public routes (no authentication check)
 * - allowedRoles: Optional role-based access control
 */
export default function RouteGuard({ 
  children, 
  requireAuth, 
  allowedRoles 
}: RouteGuardProps) {
  const { isAuthenticated, user, _hasHydrated } = useAuthStore()
  const router = useRouter()
  useEffect(() => {
    if (!_hasHydrated) return

    // Guest-only routes (login/register pages)
    if (requireAuth === false && isAuthenticated) {
      router.push("/dashboard")
      return
    }

    // Protected routes
    if (requireAuth === true && !isAuthenticated) {
      router.push("/login")
      return
    }

    // Role-based access control
    if (requireAuth === true && allowedRoles && allowedRoles.length > 0 && user) {
      if (!allowedRoles.includes(user.role)) {
        router.push("/dashboard")
      }
    }
  }, [_hasHydrated, isAuthenticated, user, router, requireAuth, allowedRoles])

  // Wait for hydration
  if (!_hasHydrated) {
    return null
  }

  // Guest-only: hide if authenticated
  if (requireAuth === false && isAuthenticated) {
    return null
  }

  // Protected: hide if not authenticated
  if (requireAuth === true && !isAuthenticated) {
    return null
  }

  // Role-based: hide if user doesn't have required role
  if (requireAuth === true && allowedRoles && allowedRoles.length > 0 && user) {
    if (!allowedRoles.includes(user.role)) {
      return null
    }
  }

  return <>{children}</>
}