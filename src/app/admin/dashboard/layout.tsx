"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile menu toggle */}
        { !sidebarOpen && (   // <-- Added this conditional
          <div className="md:hidden fixed top-[65px] left-4 z-50"> {/* <-- Changed top to be under navbar */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-gray-900 text-white rounded-md shadow-md"
            >
              <Menu />
            </button>
          </div>
        )}

        {/* Scrollable content under navbar */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 pt-24 md:pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
