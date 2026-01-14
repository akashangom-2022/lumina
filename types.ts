
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AppRoute {
  HOME = '/',
  SHOP = '/shop',
  PRODUCT = '/product/:id',
  CART = '/cart',
  CHECKOUT = '/checkout'
}
