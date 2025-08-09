'use client';

import Link from 'next/link';
import { FacebookLogoIcon, XLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, EnvelopeIcon } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Logo / About */}
        <div>
          <h3 className="text-xl font-bold">Illmi Children’s Fund (ICF)</h3>
          <p className="mt-3 text-gray-200 text-sm">
            Empowering marginalized communities through education, entrepreneurship, 
            and policy advocacy for a brighter future.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/" className="hover:text-[#FDBB3E] transition">Home</Link>
          <Link href="/who-we-are" className="hover:text-[#FDBB3E] transition">Who We Are</Link>
          <Link href="/our-stories" className="hover:text-[#FDBB3E] transition">Our Stories</Link>
          <Link href="/reports" className="hover:text-[#FDBB3E] transition">Reports</Link>
          <Link href="/opportunities" className="hover:text-[#FDBB3E] transition">Opportunities</Link>
          <Link href="/donate" className="hover:text-[#FDBB3E] transition">Donate</Link>
          <Link href="/contact" className="hover:text-[#FDBB3E] transition">Contact</Link>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/16eGV6FYiy/?mibextid=wwXIfr" className="hover:text-[#FDBB3E]">
              <FacebookLogoIcon size={20} />
            </a>
            <a href="https://x.com/illmifund?s=21" className="hover:text-[#FDBB3E]">
              <XLogoIcon size={20} />
            </a>
            <a href="https://www.instagram.com/illmichildrensfund?igsh=MWFqOWd4djQ4cHA0MQ%3D%3D&utm_source=qr" className="hover:text-[#FDBB3E]">
              <InstagramLogoIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/company/illmi-children-s-fund-icf/" aria-label="LinkedIn" className="hover:text-[#FDBB3E]">
              <LinkedinLogoIcon size={20} />
            </a>
            <a href="mailto:info@illmichildrenfund.org" className="hover:text-[#FDBB3E]">
              <EnvelopeIcon size={20} />
            </a>
          </div>
          <p className="text-gray-200 text-sm">
            © {new Date().getFullYear()} Illmi Children’s Fund. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
