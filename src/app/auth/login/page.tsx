'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { authService } from '@/lib/api/services';
import type { LoginCredentials } from '@/types/api';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.colors.background};
`;

const ImageSection = styled.div`
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
  animation: ${fadeIn} 0.6s ease-out;
`;

const WelcomeText = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const WelcomeDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => `${theme.colors.background}CC`} 100%
  );
`;

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};

  span {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryHover});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryHover});
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-right: ${({ theme }) => theme.spacing.xs};
  box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.primary}40`};
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
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  outline: none;
  transition: all 0.2s;
  background: ${({ theme }) => theme.colors.background};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => `${theme.colors.primary}20`};
    background: ${({ theme }) => theme.colors.white};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

interface ButtonProps {
  $loading?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ $loading }) =>
    $loading
      ? `linear-gradient(90deg, 
          ${({ theme }) => theme.colors.primary}, 
          ${({ theme }) => theme.colors.primaryHover},
          ${({ theme }) => theme.colors.primary})`
      : `linear-gradient(135deg, 
          ${({ theme }) => theme.colors.primary}, 
          ${({ theme }) => theme.colors.primaryHover})`};
  background-size: ${({ $loading }) => ($loading ? '200% 100%' : '100% 100%')};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  animation: ${({ $loading }) => ($loading ? shimmer : 'none')} 2s linear infinite;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.primary}40`};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
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
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => `${theme.colors.danger}20`};
  animation: ${fadeIn} 0.3s ease-out;
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
    transition: all 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
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
      const response = await authService.login(formData);
      localStorage.setItem('token', response.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <ImageSection>
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
            Transforme a gestão do seu restaurante com nossa plataforma intuitiva e moderna
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

          <Form onSubmit={handleSubmit}>
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
              />
            </FormGroup>

            {error && <Error>{error}</Error>}

            <Button type="submit" disabled={loading} $loading={loading}>
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