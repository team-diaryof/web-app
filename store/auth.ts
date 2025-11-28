// store/auth.ts
import { User } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  status: "unauthenticated" | "loading" | "authenticated";
  _hasHydrated: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  setHasHydrated: (state: boolean) => void;
  loadFromCookie: () => void;
}

const tokenUtils = {
  getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  },
  setCookie(name: string, value: string, maxAgeSeconds: number): void {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}`;
  },
  deleteCookie(name: string): void {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },
  isExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  },
  decodeUser(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        id: payload.id,
        email: payload.email || "",
        name: payload.name || null,
        role: payload.role || "USER",
        createdAt: payload.iat
          ? new Date(payload.iat * 1000).toISOString()
          : new Date().toISOString(),
      };
    } catch {
      return null;
    }
  },
};

const COOKIE_NAME = "auth-token";
const COOKIE_MAX_AGE = 60 * 60; // 1 hour

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      status: "loading",
      isAuthenticated: false,
      _hasHydrated: false,

      setAuth: (token: string, user: User) => {
        tokenUtils.setCookie(COOKIE_NAME, token, COOKIE_MAX_AGE);
        set({ token, user, isAuthenticated: true, status: "authenticated" });
      },

      clearAuth: () => {
        tokenUtils.deleteCookie(COOKIE_NAME);
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          status: "unauthenticated",
        });
      },

      loadFromCookie: () => {
        console.log("Loading auth from cookie...");
        set({ status: "loading" });
        const token = tokenUtils.getCookie(COOKIE_NAME);
        setTimeout(() => {
          if (!token) {
            console.log("No auth token found in cookies.");
            get().clearAuth();
            return;
          }
          
          if (tokenUtils.isExpired(token)) {
            tokenUtils.deleteCookie(COOKIE_NAME);
            console.log("Auth token expired.");
            get().clearAuth();
            return;
          }

          const user = tokenUtils.decodeUser(token);
          if (user) {
            console.log("Auth token valid. User loaded from token:", user);
            set({
              token,
              user,
              isAuthenticated: true,
              status: "authenticated",
            });
          }
        }, 5000);
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
        if (state && !get().token) {
          get().loadFromCookie();
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
