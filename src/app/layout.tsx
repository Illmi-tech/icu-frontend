import './globals.css';
import type { Metadata } from 'next';
import RootContent from './RootContent';
// import { usePathname } from "next/navigation";
//import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Illmi Children’s Fund',
  description: 'Empowering children and communities in Nigeria',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <RootContent>{children}</RootContent>
      </body>
    </html>
  );
}
