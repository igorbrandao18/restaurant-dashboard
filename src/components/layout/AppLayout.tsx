'use client';

import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import styled from 'styled-components';

const Main = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <Main>
        {children}
      </Main>
    </ThemeProvider>
  );
} 