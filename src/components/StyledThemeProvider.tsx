'use client';

import { ReactNode } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '@/theme/theme';

// Estilos globais
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.primary};
    line-height: 1.5;
  }
  
  a {
    color: ${props => props.theme.colors.primary.main};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.primary.dark};
    }
  }
  
  button {
    cursor: pointer;
    font-family: ${props => props.theme.typography.fontFamily};
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${props => props.theme.spacing(2)};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
  }
  
  h1 {
    font-size: ${props => props.theme.typography.fontSize.h1};
  }
  
  h2 {
    font-size: ${props => props.theme.typography.fontSize.h2};
  }
  
  h3 {
    font-size: ${props => props.theme.typography.fontSize.h3};
  }
  
  h4 {
    font-size: ${props => props.theme.typography.fontSize.h4};
  }
  
  h5 {
    font-size: ${props => props.theme.typography.fontSize.h5};
  }
  
  h6 {
    font-size: ${props => props.theme.typography.fontSize.h6};
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing(2)};
  }
`;

export default function StyledThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
} 