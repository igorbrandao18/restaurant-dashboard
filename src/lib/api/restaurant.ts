'use client';

import api from './config';
import { Restaurant } from '@/types';

export const restaurantService = {
  async getProfile(): Promise<Restaurant> {
    const { data } = await api.get<{ status: number; restaurant: Restaurant }>('/restaurants/profile');
    return data.restaurant;
  },

  async update(id: number, restaurantData: Partial<Restaurant>): Promise<Restaurant> {
    const { data } = await api.put<{ status: number; restaurant: Restaurant }>(`/restaurants/${id}`, restaurantData);
    return data.restaurant;
  }
};