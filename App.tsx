
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import ProductCard from './components/ProductCard.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import { MOCK_PRODUCTS, CATEGORIES } from './constants.tsx';
import { Product, CartItem } from './types.ts';

const HomePage: React.FC<{ onAddToCart: (p: Product) => void }> = ({ onAddToCart }) => {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured);
  
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      
      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Featured Collection</h2>
          <a href="#/shop" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 md:block">
            Browse all collection<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.filter(c => c !== 'All').map((cat) => (
              <a 
                key={cat}
                href={`#/shop?category=${cat}`}
                className="relative h-40 rounded-xl overflow-hidden group shadow-md"
              >
                <img 
                  src={`https://picsum.photos/seed/${cat}/400/400`} 
                  alt={cat} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{cat}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ShopPage: React.FC<{ onAddToCart: (p: Product) => void }> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredProducts = selectedCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Our Catalog</h1>
          <p className="mt-2 text-sm text-gray-500">Showing {filteredProducts.length} results</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('lumina_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, q: number) => {
    if (q < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: q } : item
    ));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          onOpenCart={() => setIsCartOpen(true)} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
            <Route path="/shop" element={<ShopPage onAddToCart={addToCart} />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <span className="text-xl font-bold tracking-tighter text-indigo-600">LUMINA LUXE</span>
                <p className="mt-4 text-gray-500 max-w-xs">
                  Elevating everyday experiences through thoughtful design and intelligent technology.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#/shop" className="text-base text-gray-500 hover:text-indigo-600">Electronics</a></li>
                  <li><a href="#/shop" className="text-base text-gray-500 hover:text-indigo-600">Home Decor</a></li>
                  <li><a href="#/shop" className="text-base text-gray-500 hover:text-indigo-600">Accessories</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">About</a></li>
                  <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">Sustainability</a></li>
                  <li><a href="#" className="text-base text-gray-500 hover:text-indigo-600">Privacy</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-100 pt-8 flex items-center justify-between">
              <p className="text-base text-gray-400">&copy; 2024 Lumina Luxe. All rights reserved.</p>
              <div className="flex space-x-6">
              </div>
            </div>
          </div>
        </footer>

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />

        <AIAssistant />
      </div>
    </Router>
  );
};

export default App;
