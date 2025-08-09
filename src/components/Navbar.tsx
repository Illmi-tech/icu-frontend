"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Our Stories", href: "/stories" },
  //{  label: "Reports", href: "#reports" },
  //{ label: "Opportunities", href: "#opportunities" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <img src="/logo/new-logo.jpg" alt="ICF Logo" className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-black font-medium hover:text-[#53CAE9] transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white overflow-hidden px-4 pb-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-black font-medium hover:text-[#53CAE9] transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
