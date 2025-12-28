import AdminSidebar from "@/components/admin/admin-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Diaryof",
  robots: "noindex, nofollow"
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AdminSidebar />
      <main className="pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-8 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}