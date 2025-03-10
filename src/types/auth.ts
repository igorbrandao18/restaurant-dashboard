/**
 * Interface para os dados de login
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Interface para a resposta de autenticação
 */
export interface AuthResponse {
  status: number;
  token: string;
}

/**
 * Interface para o usuário autenticado
 */
export interface AuthUser {
  id?: number;
  name: string;
  username: string;
}

/**
 * Interface para o contexto de autenticação
 */
export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
} 