"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootContent({
  children,
  hideChrome = false,
}: {
  children: React.ReactNode;
  hideChrome?: boolean;
}) {
  const pathname = usePathname();
  const isAdminDashboard = pathname?.startsWith("/admin/dashboard");
  const isMaintenance = pathname === "/maintenance" || hideChrome;

  if (isMaintenance) {
    return <main>{children}</main>;
  }

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
