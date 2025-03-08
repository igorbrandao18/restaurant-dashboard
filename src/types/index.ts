export interface Restaurant {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: Address;
  menus: Menu[];
  orders: Order[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: number;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  menuId: number;
  quantity: number;
  price: number;
  orderId: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}