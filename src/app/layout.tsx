// Arquivo principal do layout
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import StyledThemeProvider from '@/components/StyledThemeProvider';

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
          <StyledThemeProvider>
            {children}
          </StyledThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 