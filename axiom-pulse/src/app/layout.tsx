import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/lib/redux/provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query/query-client';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Axiom Pulse - Token Discovery',
  description: 'Real-time token discovery and trading platform',
  keywords: ['crypto', 'trading', 'tokens', 'defi', 'solana'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider>
            <TooltipProvider delayDuration={300}>
              {children}
            </TooltipProvider>
          </ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}