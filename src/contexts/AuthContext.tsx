'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/api';
import { setAuthToken, initApiConfig } from '@/services/api-config';
import { AuthContextType, AuthUser, LoginCredentials } from '@/types/auth';

// Criando o contexto com valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Provedor do contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Inicializar a configuração da API
  useEffect(() => {
    initApiConfig();
  }, []);

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        
        if (storedToken) {
          // Configurar o token para as requisições
          setAuthToken(storedToken);
          setToken(storedToken);
          
          // Aqui você pode fazer uma chamada para obter os dados do usuário
          // Por enquanto, vamos apenas simular um usuário autenticado
          setUser({
            name: 'Restaurante Demo',
            username: 'demo',
          });
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
        localStorage.removeItem('auth_token');
        setAuthToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Função para fazer login
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Chamada para a API de login
      const response = await AuthService.authControllerLogin(credentials);
      
      // Armazenar o token
      const authToken = response.token;
      localStorage.setItem('auth_token', authToken);
      setToken(authToken);
      setAuthToken(authToken);
      
      // Definir o usuário
      setUser({
        name: 'Restaurante Demo', // Isso seria obtido de uma chamada à API
        username: credentials.username,
      });
      
      // Redirecionar para o dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Falha na autenticação. Verifique suas credenciais e tente novamente.');
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
      setAuthToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para fazer logout
  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    setAuthToken(null);
    router.push('/login');
  };

  // Valor do contexto
  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 