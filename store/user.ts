import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string | null
  role: string
  createdAt: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  _hasHydrated: boolean
  setAuth: (token: string, user: User) => void
  clearAuth: () => void
  setHasHydrated: (state: boolean) => void
  loadFromCookie: () => void
}

// Helper to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

// Helper to check if token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentTime
  } catch {
    return true
  }
}

// Helper to decode user from token
const getUserFromToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {
      id: payload.id,
      email: payload.email || '',
      name: payload.name || null,
      role: payload.role || 'USER',
      createdAt: payload.iat ? new Date(payload.iat * 1000).toISOString() : new Date().toISOString()
    }
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,

      setAuth: (token: string, user: User) => {
        // Save to cookie
        document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60}` // 1 hour
        set({ token, user, isAuthenticated: true })
      },
      
      clearAuth: () => {
        // Clear cookie
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        set({ token: null, user: null, isAuthenticated: false })
      },

      loadFromCookie: () => {
        const token = getCookie('auth-token')
        if (token && !isTokenExpired(token)) {
          const user = getUserFromToken(token)
          if (user) {
            set({ token, user, isAuthenticated: true })
          }
        } else if (token) {
          // Token expired, clear it
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state })
        // After hydration, try to load from cookie
        if (state && !get().token) {
          get().loadFromCookie()
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
