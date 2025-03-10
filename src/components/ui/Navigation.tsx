'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { ReactNode } from 'react';

// Tipos
type NavItemProps = {
  active?: boolean;
  children: ReactNode;
};

// Componentes de navegação estilizados
export const Sidebar = styled.aside`
  width: 280px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${props => props.theme.colors.background.paper};
  border-right: 1px solid ${props => props.theme.colors.background.dark};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: ${props => props.theme.shadows.small};
  z-index: 1200;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    
    &.open {
      transform: translateX(0);
    }
  }
`;

export const SidebarHeader = styled.div`
  padding: ${props => props.theme.spacing(3)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${props => props.theme.colors.background.dark};
`;

export const SidebarTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.h5};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li<NavItemProps>`
  a {
    display: flex;
    align-items: center;
    padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(3)};
    color: ${props => props.active 
      ? props.theme.colors.primary.main 
      : props.theme.colors.text.primary};
    background-color: ${props => props.active 
      ? `${props.theme.colors.primary.main}15` 
      : 'transparent'};
    border-left: 3px solid ${props => props.active 
      ? props.theme.colors.primary.main 
      : 'transparent'};
    transition: all ${props => props.theme.transitions.fast};
    
    &:hover {
      background-color: ${props => props.active 
        ? `${props.theme.colors.primary.main}15` 
        : `${props.theme.colors.background.dark}`};
      color: ${props => props.active 
        ? props.theme.colors.primary.main 
        : props.theme.colors.text.primary};
      text-decoration: none;
    }
    
    .icon {
      margin-right: ${props => props.theme.spacing(2)};
      color: ${props => props.active 
        ? props.theme.colors.primary.main 
        : props.theme.colors.text.secondary};
    }
  }
`;

export const NavDivider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.colors.background.dark};
  margin: ${props => props.theme.spacing(2)} 0;
`;

export const TopBar = styled.header`
  height: 64px;
  background-color: ${props => props.theme.colors.background.paper};
  border-bottom: 1px solid ${props => props.theme.colors.background.dark};
  display: flex;
  align-items: center;
  padding: 0 ${props => props.theme.spacing(3)};
  position: fixed;
  top: 0;
  right: 0;
  left: 280px;
  z-index: 1100;
  box-shadow: ${props => props.theme.shadows.small};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    left: 0;
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  margin-right: ${props => props.theme.spacing(2)};
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
  }
`;

export const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.h6};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  flex-grow: 1;
`;

export const UserMenu = styled.div`
  position: relative;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary.main};
  color: ${props => props.theme.colors.primary.contrastText};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
`;

export const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${props => props.theme.spacing(1)};
  background-color: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  min-width: 200px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1300;
  overflow: hidden;
`;

export const DropdownItem = styled.div`
  padding: ${props => props.theme.spacing(1.5)} ${props => props.theme.spacing(2)};
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.background.dark};
  }
  
  .icon {
    margin-right: ${props => props.theme.spacing(2)};
    color: ${props => props.theme.colors.text.secondary};
  }
`;

export const MainContent = styled.main`
  margin-left: 280px;
  padding: ${props => props.theme.spacing(3)};
  padding-top: calc(64px + ${props => props.theme.spacing(3)});
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background.default};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 0;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme.colors.background.default};
`;

export const LoadingText = styled.p`
  font-size: ${props => props.theme.typography.fontSize.h6};
  color: ${props => props.theme.colors.text.secondary};
`; 