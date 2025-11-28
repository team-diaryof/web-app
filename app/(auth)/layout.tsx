// app/(auth)/layout.tsx
import AuthProvider from "@/components/auth-provider";
import BackHeader from "@/components/back-header";
import Navbar from "@/components/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <AuthProvider blockAuthenticated>
      <div className="max-w-lg mx-auto min-h-screen flex flex-col items-center justify-start bg-white">
        <BackHeader />
        <Navbar />
        <div
          className="w-full p-6 py-16"
        >
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
