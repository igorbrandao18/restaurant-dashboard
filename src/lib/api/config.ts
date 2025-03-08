'use client';

import axios from 'axios';

// Usando o proxy do Next.js para evitar problemas de CORS
const API_URL = '/api';
console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL || API_URL}${config.url || ''}`;
    console.log('Fazendo requisição para:', fullUrl, 'com dados:', config.data);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => {
    console.log('Resposta recebida:', response.data);
    return response;
  },
  (error) => {
    console.error('Erro na resposta:', {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject({
      message: error.response?.data?.message || 'Ocorreu um erro na requisição',
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

export default api;