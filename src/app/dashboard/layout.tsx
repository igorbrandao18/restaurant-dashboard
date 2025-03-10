'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);
  
  // Verificar se estamos no cliente para renderização
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (isClient && !isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isClient, isLoading, isAuthenticated, router]);

  // Links de navegação
  const navLinks = [
    { href: '/dashboard', label: 'Visão Geral', icon: '📊' },
    { href: '/dashboard/restaurants', label: 'Restaurantes', icon: '🍽️' },
    { href: '/dashboard/menus', label: 'Menus', icon: '📋' },
    { href: '/dashboard/orders', label: 'Pedidos', icon: '🛒' },
    { href: '/dashboard/settings', label: 'Configurações', icon: '⚙️' },
  ];

  // Se não estamos no cliente ou está carregando, mostramos um indicador de carregamento
  if (!isClient || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se não está autenticado, não renderizamos nada (o redirecionamento acontecerá no useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background-dark">
      {/* Sidebar para navegação */}
      <aside className="w-full md:w-64 bg-primary text-white">
        {/* Logo/Título */}
        <div className="p-4 border-b border-primary-hover">
          <h1 className="text-xl font-bold">Restaurant Dashboard</h1>
          {user && (
            <p className="text-sm mt-1 text-white/80">{user.name}</p>
          )}
        </div>
        
        {/* Links de navegação */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={`flex items-center p-2 rounded hover:bg-primary-hover transition-colors ${
                    pathname === link.href ? 'bg-primary-hover' : ''
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Botão de logout */}
        <div className="mt-auto p-4 border-t border-primary-hover">
          <button 
            onClick={logout}
            className="flex items-center p-2 w-full text-left rounded hover:bg-primary-hover transition-colors"
          >
            <span className="mr-3">🚪</span>
            Sair
          </button>
        </div>
      </aside>
      
      {/* Conteúdo principal */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
} 