'use client';

import styled from 'styled-components';
import { Navbar } from '@/components/layout/Navbar';

const Main = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Main>
        <Container>
          {children}
        </Container>
      </Main>
    </>
  );
}