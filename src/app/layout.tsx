import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/shared/Navbar';

const outfit = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MentorConnect | Bridging the Gap Between Mentors & Mentees',
  description: 'Connect with industry experts, schedule 1:1 sessions, track your goals, and unlock your career potential with MentorConnect.',
  keywords: ['mentoring', 'career growth', '1:1 sessions', 'software mentoring', 'networking'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col selection:bg-primary/30 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
