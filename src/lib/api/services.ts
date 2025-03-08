import axios from 'axios';
import { LoginCredentials, LoginResponse, Restaurant, Menu, Order, Address } from '@/types/api';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Auth Service
export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

// Restaurant Service
export const restaurantService = {
  create: async (restaurant: Restaurant): Promise<Restaurant> => {
    const response = await api.post('/restaurants', restaurant);
    return response.data;
  },

  getProfile: async (): Promise<Restaurant> => {
    const response = await api.get('/restaurants/profile');
    return response.data;
  },

  update: async (id: number, restaurant: Restaurant): Promise<Restaurant> => {
    const response = await api.put(`/restaurants/${id}`, restaurant);
    return response.data;
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