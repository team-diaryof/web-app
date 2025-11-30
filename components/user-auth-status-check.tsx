"use client"
import { useAuthStore } from '@/store'
import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'

const UserAuthStatusCheck = () => {
    const { loadFromCookie, setAuthFromSession, user } = useAuthStore()
    const { data: session, status: sessionStatus } = useSession()
    const syncedRef = useRef(false)

    useEffect(() => {
        // First, check for custom auth token
        loadFromCookie()
    }, [loadFromCookie])

    useEffect(() => {
        // Sync NextAuth session to auth store when authenticated
        if (sessionStatus === "authenticated" && session?.user) {
            type NextAuthUser = {
                id?: string;
                email?: string | null;
                name?: string | null;
                role?: string;
            };
            const nextAuthUser = session.user as NextAuthUser
            
            // Only sync if not already synced or if user changed
            const currentUserId = user?.id || ""
            const nextAuthUserId = nextAuthUser.id || ""
            
            if (!syncedRef.current || currentUserId !== nextAuthUserId) {
                // Convert NextAuth session user to our User type
                // Map role from database enum (USER, ADMIN, GUEST, TEMP) to string
                const role = nextAuthUser.role || "USER"
                const userData = {
                    id: nextAuthUserId,
                    email: nextAuthUser.email || "",
                    name: nextAuthUser.name || null,
                    role: role,
                    createdAt: new Date().toISOString(),
                }
                // Always sync NextAuth session to auth store immediately
                // This ensures the user stays authenticated after Google login
                setAuthFromSession(userData)
                syncedRef.current = true
            }
        } else if (sessionStatus === "unauthenticated") {
            // Reset sync flag when session becomes unauthenticated
            syncedRef.current = false
        }
    }, [sessionStatus, session, setAuthFromSession, user])

    return null
}

export default UserAuthStatusCheck