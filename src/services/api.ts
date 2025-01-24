import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },
  
  create: async (product: {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }) => {
    const response = await api.post('/products', product);
    return response.data;
  },
};

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  },
  register: async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
};

export default api;
