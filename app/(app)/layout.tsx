import AdminNavbar from "@/components/sections/(app)/navbar"
import AppOpenBanner from "@/components/sections/app-open-banner"
import RouteGuard from "@/components/wrapper/role-based-access"
import { ReactNode } from "react"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <RouteGuard requireAuth={true} allowedRoles={["USER", "GUEST"]}>
      <AdminNavbar />

      {children}
      <AppOpenBanner />
    </RouteGuard>
  )
}
