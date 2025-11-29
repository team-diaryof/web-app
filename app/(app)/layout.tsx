import MobileAppOpenBanner from "@/components/mobile-app-open-banner"
import AuthProvider from "@/components/auth-provider"
import AppNavbar from "@/components/app-navbar"
import { ReactNode } from "react"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider allowedRoles={["USER", "GUEST"]}>
      <div className="">
        <AppNavbar />
        {children}
        <MobileAppOpenBanner />
      </div>
    </AuthProvider>
  )
}