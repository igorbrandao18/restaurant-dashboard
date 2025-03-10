import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Restaurant Dashboard',
  description: 'Dashboard para gerenciamento de restaurantes, menus e pedidos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          {/* O ThemeProvider do MUI precisa estar no lado do cliente */}
          <ClientThemeProvider>
            {children}
          </ClientThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

// Componente cliente para o ThemeProvider
'use client';
import { ReactNode } from 'react';

function ClientThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 