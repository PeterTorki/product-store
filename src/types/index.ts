export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id?: number;
  username: string;
  email?: string;
  name?: {
    firstname: string;
    lastname: string;
  };
  token?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  sortBy: 'price-asc' | 'price-desc' | 'category' | 'none';
  selectedCategory: string | null;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface CreateProductForm {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}
