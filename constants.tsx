
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aura Wireless Headphones',
    description: 'Immerse yourself in pure sound with active noise cancellation and 40-hour battery life.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://picsum.photos/id/1/600/600',
    rating: 4.8,
    reviews: 124,
    featured: true
  },
  {
    id: '2',
    name: 'Vanguard Chronograph Watch',
    description: 'A masterpiece of engineering and style, featuring Swiss movement and sapphire crystal.',
    price: 549.00,
    category: 'Accessories',
    image: 'https://picsum.photos/id/175/600/600',
    rating: 4.9,
    reviews: 89,
    featured: true
  },
  {
    id: '3',
    name: 'Zenith Minimalist Lamp',
    description: 'Elegant warm lighting for your workspace with touch controls and adjustable brightness.',
    price: 89.50,
    category: 'Home',
    image: 'https://picsum.photos/id/201/600/600',
    rating: 4.5,
    reviews: 210
  },
  {
    id: '4',
    name: 'Nomad Leather Backpack',
    description: 'Durable full-grain leather companion for your daily adventures and tech essentials.',
    price: 185.00,
    category: 'Travel',
    image: 'https://picsum.photos/id/209/600/600',
    rating: 4.7,
    reviews: 56,
    featured: true
  },
  {
    id: '5',
    name: 'Pulse Fitness Tracker',
    description: 'Track your health metrics in real-time with heart rate monitoring and GPS tracking.',
    price: 129.00,
    category: 'Electronics',
    image: 'https://picsum.photos/id/180/600/600',
    rating: 4.3,
    reviews: 442
  },
  {
    id: '6',
    name: 'Lunar Ceramic Pour-over',
    description: 'Precision brewing for coffee enthusiasts who appreciate the finer details of craft.',
    price: 45.00,
    category: 'Home',
    image: 'https://picsum.photos/id/425/600/600',
    rating: 4.9,
    reviews: 320
  }
];

export const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Home', 'Travel'];
