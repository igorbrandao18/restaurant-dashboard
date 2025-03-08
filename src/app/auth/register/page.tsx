'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { authService } from '@/lib/api/services';
import type { Restaurant } from '@/types/api';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
`;

const FormContainer = styled.div`
  max-width: 500px;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
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
  transition: all 0.2s;

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
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Restaurant>({
    name: '',
    username: '',
    password: '',
    address: '',
    city: '',
    country: '',
    webSettings: {
      bannerImage: 'https://example.com/banner.jpg',
      backgroundColour: '#ffffff',
      primaryColour: '#4F46E5',
      primaryColourHover: '#4338CA',
      navBackgroundColour: '#4F46E5'
    }
  });

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
      console.log('Enviando dados para registro:', formData);
      const response = await authService.register(formData);
      console.log('Resposta do registro:', response);
      router.push('/auth/login?registered=true');
    } catch (err: any) {
      console.error('Erro no registro:', err);
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Criar Conta do Restaurante</Title>
        <Form onSubmit={handleSubmit} data-testid="register-form">
          <FormGroup>
            <Label htmlFor="name">Nome do Restaurante</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Digite o nome do restaurante"
              data-testid="name-input"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="username">Nome de Usuário</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Digite o nome de usuário"
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
              data-testid="password-input"
              minLength={6}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Digite o endereço completo"
              data-testid="address-input"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Digite a cidade"
              data-testid="city-input"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              name="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Digite o país"
              data-testid="country-input"
            />
          </FormGroup>

          {error && <Error data-testid="error-message">{error}</Error>}

          <Button type="submit" disabled={loading} data-testid="submit-button">
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
        </Form>

        <LoginLink>
          Já tem uma conta? <Link href="/auth/login">Faça login</Link>
        </LoginLink>
      </FormContainer>
    </Container>
  );
} 