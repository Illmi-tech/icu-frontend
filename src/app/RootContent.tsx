"use client";

import { usePathname } from "next/navigation";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminDashboard = pathname?.startsWith("/admin/dashboard");

  return (
    <>
        <Navbar />
      <main className={isAdminDashboard ? "h-screen overflow-hidden" : "pt-20"}>
        {children}
      </main>
      {!isAdminDashboard && <Footer />}
    </>
  );
}
