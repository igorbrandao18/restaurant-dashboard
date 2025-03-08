export interface WebSettings {
  bannerImage: string;
  backgroundColour: string;
  primaryColour: string;
  primaryColourHover: string;
  navBackgroundColour: string;
}

export interface Restaurant {
  id?: number;
  name: string;
  address: string;
  city: string;
  country: string;
  username: string;
  password?: string;
  webSettings: WebSettings;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

export interface MenuSection {
  id: number;
  name: string;
  description: string;
  position: number;
  visible: number;
  items: MenuItem[];
}

export interface Menu {
  id?: number;
  restaurantId: number;
  name: string;
  type: string;
  collapse: number;
  sections: {
    sections: MenuSection[];
  };
}

export interface OrderItem {
  menuItemId: number;
  quantity: number;
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED' | 'ACCEPTED' | 'DELIVERED';

export interface Order {
  id?: number;
  restaurantId: number;
  customerId: number;
  items: {
    items: OrderItem[];
  };
  total: number;
  status: OrderStatus;
}

export interface Address {
  id?: number;
  customerId: number;
  addressLine: string;
  city: string;
  postalCode: string;
}

export interface LoginResponse {
  status: number;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
} 