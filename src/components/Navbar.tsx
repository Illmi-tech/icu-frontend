"use client";

import { useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/who-we-are/about-us",
    children: [                               
      { label: "About Us", href: "/who-we-are/about-us" },
      { label: "Team", href: "/who-we-are/team" },
    ]

  },
  { label: "Our Projects", href: "/our-projects/cclm",
    children: [                               
      { label: "CCLM", href: "/our-projects/cclm" },
      { label: "Walk in Their Shoes", href: "/our-projects/wits" },
      { label: "TARM", href: "/our-projects/tarm" },
      { label: "Digitgals", href: "/our-projects/digitgals" },
      { label: "RUGA", href: "/our-projects/assh" },
      { label: "ASIS", href: "/our-projects/asis" }
    ]

  },
  {
    label: "Our Stories",
    href: "/stories",
    children: [
     // { label: "Children’s Day", href: "/our-stories/childrens-day" },
      { label: "16 Days of Activism", href: "/our-stories/16-days-of-activism" },
     // { label: "World Happiness Day", href: "/our-stories/world-happiness-day" },
      { label: "IWD", href: "/our-stories/iwd" },
      { label: "IDGC", href: "/our-stories/idgc" },
     // { label: "Impact Reports", href: "/our-stories/impact-reports" },
     // { label: "SRHR", href: "/our-stories/srhr" }
    ],
  },
  { label: "Scholarships", href: "/scholarships" },
  {
    label: "Opportunities",
    href: "/opportunities/careers",
    children: [
      { label: "Careers", href: "/opportunities/careers" },
      { label: "Become Our Volunteer", href: "/opportunities/volunteer-jobs" },
    ],
  },
  {
    label: "Resources",
    href: "/Resources/blogs",
    children: [
      { label: "Blog Posts", href: "/resources/blogs" },
      { label: "Reports", href: "/resources/reports" },
      { label: "Press Releases", href: "/resources/press-releases" }
    ],
  },
  
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // function to handle hover (desktop only)
  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredMenu(menu);
    setSubmenuOpen(true);
  };

  const toggleSubmenu = (href: string) => {
    setOpenSubmenu(openSubmenu === href ? null : href);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSubmenuOpen(false);
      setHoveredMenu(null);
    }, 500); // 2 seconds delay
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <img src="/logo/new-logo.jpg" alt="ICF Logo" className="h-10 w-auto" />
        </Link>

        {/* ===== Desktop Navigation ===== */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.href)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center text-black font-medium hover:text-[#53CAE9] transition">
                  {link.label}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                {/* Submenu with delayed close */}
                <AnimatePresence>
                  {submenuOpen && hoveredMenu === link.href && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 flex flex-col bg-white shadow-lg rounded-lg w-max"
                    >
                      {link.children.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className="px-4 py-2 text-black hover:text-[#53CAE9] transition"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-black font-medium hover:text-[#53CAE9] transition"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* ===== Mobile Menu Toggle ===== */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ===== Mobile Menu ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md px-4 py-3 space-y-3 
                       max-h-[80vh] overflow-y-auto"
          >
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="space-y-2">
                  {/* ✅ CHANGED: button toggles submenu */}
                  <button
                    className="w-full flex justify-between items-center font-medium"
                    onClick={() => toggleSubmenu(link.href)}
                  >
                    {link.label}
                    <ChevronDown
                      className={`ml-1 w-4 h-4 transition-transform ${
                        openSubmenu === link.href ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* ✅ Show submenu only if open */}
                  <AnimatePresence>
                    {openSubmenu === link.href && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 space-y-2"
                      >
                        {link.children.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className="block text-black hover:text-[#53CAE9] transition"
                            onClick={() => setIsOpen(false)}
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-black font-medium hover:text-[#53CAE9] transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
