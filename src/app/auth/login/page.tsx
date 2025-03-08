'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { authService } from '@/lib/api/services';
import type { LoginCredentials } from '@/types/api';

// Componentes estilizados
export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.colors.background};
`;

export const ImageSection = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.primary};
  display: none;
  position: relative;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }
`;

const ImageContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: white;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const WelcomeText = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const WelcomeDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  opacity: 0.9;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.5;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
`;

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Input = styled.input`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => `${theme.colors.danger}10`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => `${theme.colors.danger}20`};
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    margin-left: ${({ theme }) => theme.spacing.xs};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer data-testid="page-container">
      <ImageSection data-testid="image-section">
        <Image
          src="/images/restaurant-bg.jpg"
          alt="Restaurant background"
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={100}
        />
        <ImageContent>
          <WelcomeText>Bem-vindo ao QikServe</WelcomeText>
          <WelcomeDescription>
            Gerencie seu restaurante de forma eficiente e profissional
          </WelcomeDescription>
        </ImageContent>
      </ImageSection>

      <FormSection>
        <FormContainer>
          <LogoContainer>
            <Logo>
              <LogoIcon>Q</LogoIcon>
              <span>QikServe</span>
            </Logo>
            <Subtitle>Faça login para acessar sua conta</Subtitle>
          </LogoContainer>

          <Form onSubmit={handleSubmit} data-testid="login-form">
            <FormGroup>
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Digite seu nome de usuário"
                autoComplete="username"
                data-testid="username-input"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Digite sua senha"
                autoComplete="current-password"
                data-testid="password-input"
              />
            </FormGroup>

            {error && <Error data-testid="error-message">{error}</Error>}

            <Button type="submit" disabled={loading} data-testid="submit-button">
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </Form>

          <RegisterLink>
            Não tem uma conta?<Link href="/auth/register">Cadastre-se</Link>
          </RegisterLink>
        </FormContainer>
      </FormSection>
    </PageContainer>
  );
}