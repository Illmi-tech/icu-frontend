import './globals.css';
import type { Metadata } from 'next';
import RootContent from './RootContent';

export const metadata: Metadata = {
  title: 'Illmi Children’s Foundation',
  description: 'Empowering children and communities in Nigeria',
  icons: {
    icon: '/logo/new-logo.png',
    apple: '/logo/new-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  return (
    <html lang="en">
      <body className="bg-white text-black">
        <RootContent hideChrome={maintenanceMode}>{children}</RootContent>
      </body>
    </html>
  );
}
