import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/lib/redux/provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query/query-client';
import { TooltipProvider } from '@/components/ui/tooltip';

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
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