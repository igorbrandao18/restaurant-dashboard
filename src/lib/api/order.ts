'use client';

import api from './config';
import { Order } from '@/types';

export const orderService = {
  async getAll(): Promise<Order[]> {
    const { data } = await api.get<{ status: number; orders: Order[] }>('/orders');
    return data.orders;
  },

  async update(id: number, orderData: Partial<Order>): Promise<Order> {
    const { data } = await api.put<{ status: number; order: Order }>(`/orders/${id}`, orderData);
    return data.order;
  }
};