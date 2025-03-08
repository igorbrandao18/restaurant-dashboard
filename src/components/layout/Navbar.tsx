'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

interface NavLinkProps {
  active?: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ theme, active }) => active ? theme.colors.text.primary : theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 2px solid ${({ theme, active }) => active ? theme.colors.primary : 'transparent'};
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    border-bottom-color: ${({ theme }) => theme.colors.border.light};
  }
`;

export function Navbar() {
  const pathname = usePathname();

  return (
    <Nav>
      <Container>
        <Brand href="/dashboard">Dashboard</Brand>
        <NavLinks>
          <NavLink href="/dashboard" active={pathname === '/dashboard'}>
            Início
          </NavLink>
          <NavLink 
            href="/dashboard/menus" 
            active={pathname.startsWith('/dashboard/menus')}
          >
            Menus
          </NavLink>
          <NavLink 
            href="/dashboard/orders"
            active={pathname.startsWith('/dashboard/orders')}
          >
            Pedidos
          </NavLink>
        </NavLinks>
      </Container>
    </Nav>
  );
} 