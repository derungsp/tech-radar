import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from './_components/layout/header';
import { getServerAuthSession } from '@/utils/auth';
import { AuthProvider } from '@/context/auth-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | WEBLAB HS24 Pascal Derungs',
    default: 'Home | WEBLAB HS24 Pascal Derungs',
  },
  authors: [
    {
      name: 'Pascal Derungs',
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();
  const user = session?.user ?? null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-100 antialiased`}
      >
        <AuthProvider user={user}>
          <Header />
          <div className="px-5">{children}</div>
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
