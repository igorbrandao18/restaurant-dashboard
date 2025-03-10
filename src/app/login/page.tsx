'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styled from 'styled-components';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { Container, Flex } from '@/components/ui/Grid';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing(4)};
  background-color: ${props => props.theme.colors.background.default};
`;

const LoginCard = styled(Card)`
  max-width: 450px;
  width: 100%;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing(4)};
`;

const LoginTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.h4};
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: ${props => props.theme.spacing(1)};
`;

const LoginSubtitle = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0;
`;

const ErrorMessage = styled.div`
  background-color: ${props => `${props.theme.colors.error.light}33`};
  border: 1px solid ${props => props.theme.colors.error.light};
  color: ${props => props.theme.colors.error.main};
  padding: ${props => props.theme.spacing(2)};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing(3)};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing(2)};
`;

const LoginFooter = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing(3)};
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.primary.main};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function Login() {
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <LoginContainer>
      <Container>
        <LoginCard padding>
          <LoginHeader>
            <LoginTitle>Login</LoginTitle>
            <LoginSubtitle>Entre com suas credenciais para acessar o dashboard</LoginSubtitle>
          </LoginHeader>
          
          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}
          
          <LoginForm onSubmit={handleSubmit}>
            <Input
              label="Nome de Usuário"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              autoFocus
            />
            
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            
            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              variant="primary"
              size="large"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </LoginForm>
          
          <LoginFooter>
            <StyledLink href="/">
              Voltar para a página inicial
            </StyledLink>
          </LoginFooter>
        </LoginCard>
      </Container>
    </LoginContainer>
  );
} 