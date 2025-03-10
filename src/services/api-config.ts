import { OpenAPI } from './api';

/**
 * Configura o token de autenticação para as requisições da API
 * @param token Token de autenticação
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    OpenAPI.TOKEN = token;
  } else {
    OpenAPI.TOKEN = undefined;
  }
};

/**
 * Configura a URL base da API
 * @param baseUrl URL base da API
 */
export const setBaseUrl = (baseUrl: string) => {
  OpenAPI.BASE = baseUrl;
};

/**
 * Inicializa a configuração da API
 */
export const initApiConfig = () => {
  // Configurar a URL base
  setBaseUrl('http://192.168.0.127:3001');
  
  // Verificar se há um token armazenado
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setAuthToken(token);
    }
  }
}; 