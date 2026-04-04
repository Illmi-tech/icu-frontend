"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/client/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  { name: "Overview", href: "/admin/dashboard" },
  { name: "Blogs", href: "/admin/dashboard/blogs" },
  { name: "Scholarships", href: "/admin/dashboard/scholarships" },
  { name: "Careers", href: "/admin/dashboard/careers" },
  { name: "Volunteer Jobs", href: "/admin/dashboard/volunteer-jobs" },
  { name: "Reports", href: "/admin/dashboard/reports" },
  { name: "Newsletters", href: "/admin/dashboard/newsletter" },
  { name: "Press Release", href: "/admin/dashboard/press-releases" },
  { name: "Logout", href: "/admin/login" },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include", // ensures cookies are sent
      });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed top-0 left-0 h-full bg-gray-900 text-white z-50 w-64 overflow-y-auto md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="p-4 text-xl font-bold flex justify-between items-center">
              Admin
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>
            <nav className="flex flex-col space-y-2 p-2">
              {menuItems.map((item) => (
                item.name === "Logout" ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false); // also close sidebar after logout
                    }}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-700 transition-colors text-left"
                    )}
                  >
                    {item.name}
                  </button>
                ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-700 transition-colors",
                    pathname === item.href ? "bg-gray-700" : ""
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
                )
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0 bg-gray-900 text-white overflow-y-auto">
        <div className="p-4 text-xl font-bold md:pt-20">Admin</div>
        <nav className="flex flex-col space-y-2 p-2">
          {menuItems.map((item) => (
            item.name === "Logout" ? (
              <button
                key={item.name}
                onClick={handleLogout}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-700 transition-colors text-left"
                )}
              >
                {item.name}
              </button>
            ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-700 transition-colors",
                      pathname === item.href ? "bg-gray-700" : ""
                    )}
                  >
                    {item.name}
                  </Link>
                )
        ))}
        </nav>
      </aside>
    </>
  );
}
