'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styled from 'styled-components';
import {
  Sidebar,
  SidebarHeader,
  SidebarTitle,
  NavList,
  NavItem,
  NavDivider,
  TopBar,
  MenuButton,
  PageTitle,
  UserMenu,
  Avatar,
  Dropdown,
  DropdownItem,
  MainContent,
  LoadingContainer,
  LoadingText
} from '@/components/ui/Navigation';
import {
  MenuIcon,
  DashboardIcon,
  RestaurantIcon,
  MenuBookIcon,
  OrdersIcon,
  SettingsIcon,
  ApiDocsIcon,
  LogoutIcon,
  PersonIcon
} from '@/components/ui/Icons';

// Overlay para o menu mobile
const MobileOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

// Sidebar com classe para mobile
const MobileSidebar = styled(Sidebar)<{ isOpen: boolean }>`
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    transform: translateX(0);
  }
`;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
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
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
    router.push('/login');
  };
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon className="icon" />, path: '/dashboard' },
    { text: 'Restaurantes', icon: <RestaurantIcon className="icon" />, path: '/dashboard/restaurants' },
    { text: 'Menus', icon: <MenuBookIcon className="icon" />, path: '/dashboard/menus' },
    { text: 'Pedidos', icon: <OrdersIcon className="icon" />, path: '/dashboard/orders' },
    { text: 'Configurações', icon: <SettingsIcon className="icon" />, path: '/dashboard/settings' },
  ];
  
  // Mostrar tela de carregamento ou redirecionamento
  if (isLoading || !isClient || !isAuthenticated) {
    return (
      <LoadingContainer>
        <LoadingText>Carregando...</LoadingText>
      </LoadingContainer>
    );
  }
  
  return (
    <>
      {/* Overlay para fechar o menu no mobile */}
      <MobileOverlay isOpen={mobileOpen} onClick={handleDrawerToggle} />
      
      {/* Sidebar */}
      <MobileSidebar isOpen={mobileOpen}>
        <SidebarHeader>
          <SidebarTitle>Restaurant Dashboard</SidebarTitle>
        </SidebarHeader>
        
        <NavList>
          {menuItems.map((item) => (
            <NavItem key={item.text} active={pathname === item.path}>
              <Link href={item.path}>
                {item.icon}
                {item.text}
              </Link>
            </NavItem>
          ))}
        </NavList>
        
        <NavDivider />
        
        <NavList>
          <NavItem active={pathname === '/api-docs'}>
            <Link href="/api-docs">
              <ApiDocsIcon className="icon" />
              Documentação API
            </Link>
          </NavItem>
        </NavList>
      </MobileSidebar>
      
      {/* Barra superior */}
      <TopBar>
        <MenuButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </MenuButton>
        
        <PageTitle>{user?.name || 'Dashboard'}</PageTitle>
        
        <UserMenu>
          <Avatar onClick={handleUserMenuToggle}>
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          
          <Dropdown isOpen={userMenuOpen}>
            <DropdownItem onClick={() => {
              setUserMenuOpen(false);
              router.push('/dashboard/settings');
            }}>
              <PersonIcon className="icon" />
              Perfil
            </DropdownItem>
            
            <DropdownItem onClick={handleLogout}>
              <LogoutIcon className="icon" />
              Sair
            </DropdownItem>
          </Dropdown>
        </UserMenu>
      </TopBar>
      
      {/* Conteúdo principal */}
      <MainContent>
        {children}
      </MainContent>
    </>
  );
} 