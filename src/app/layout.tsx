// Arquivo principal do layout
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import ClientThemeProvider from '@/components/ClientThemeProvider';

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
          <ClientThemeProvider>
            {children}
          </ClientThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 