import api from './config';
import { LoginCredentials, LoginResponse, Restaurant, Menu, Order, Address } from '@/types/api';

interface RegisterResponse {
  status: number;
  restaurant: Restaurant;
}

// Auth Service
export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  register: async (restaurant: Restaurant): Promise<Restaurant> => {
    try {
      console.log('Dados enviados para registro:', restaurant);
      const response = await api.post<RegisterResponse>('/restaurants', restaurant);
      console.log('Resposta do registro:', response.data);
      return response.data.restaurant;
    } catch (error: any) {
      console.error('Erro detalhado:', error.response?.data);
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao criar conta';
      console.error('Mensagem de erro:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};

// Restaurant Service
export const restaurantService = {
  getProfile: async (): Promise<Restaurant> => {
    const response = await api.get<{ status: number; restaurant: Restaurant }>('/restaurants/profile');
    return response.data.restaurant;
  },

  update: async (id: number, restaurant: Restaurant): Promise<Restaurant> => {
    const response = await api.put<{ status: number; restaurant: Restaurant }>(`/restaurants/${id}`, restaurant);
    return response.data.restaurant;
  },

  getMenus: async (id: number): Promise<Menu[]> => {
    const response = await api.get(`/restaurants/${id}/menus`);
    return response.data;
  },
};

// Menu Service
export const menuService = {
  create: async (menu: Menu): Promise<Menu> => {
    const response = await api.post('/menus', menu);
    return response.data;
  },

  getAll: async (): Promise<Menu[]> => {
    const response = await api.get('/menus');
    return response.data;
  },

  update: async (id: number, menu: Menu): Promise<Menu> => {
    const response = await api.put(`/menus/${id}`, menu);
    return response.data;
  },
};

// Order Service
export const orderService = {
  create: async (order: Order): Promise<Order> => {
    const response = await api.post('/orders', order);
    return response.data;
  },

  getAll: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  },

  update: async (id: number, order: Order): Promise<Order> => {
    const response = await api.put(`/orders/${id}`, order);
    return response.data;
  },
};

// Address Service
export const addressService = {
  create: async (address: Address): Promise<Address> => {
    const response = await api.post('/addresses', address);
    return response.data;
  },

  getAll: async (): Promise<Address[]> => {
    const response = await api.get('/addresses');
    return response.data;
  },

  update: async (id: number, address: Address): Promise<Address> => {
    const response = await api.put(`/addresses/${id}`, address);
    return response.data;
  },
};

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirecionar para login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
); 