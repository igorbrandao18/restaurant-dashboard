'use client';

import api from './config';
import Cookies from 'js-cookie';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  restaurant: {
    id: number;
    name: string;
    email: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    Cookies.set('token', data.token, { expires: 7 }); // expira em 7 dias
    return data;
  },

  async logout(): Promise<void> {
    Cookies.remove('token');
  },

  isAuthenticated(): boolean {
    return !!Cookies.get('token');
  }
};