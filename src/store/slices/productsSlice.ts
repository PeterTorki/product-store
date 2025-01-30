import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { productsAPI } from '@/services/api';
import type { Product, ProductState } from '@/types';

const PRODUCTS_PER_PAGE = 10;

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await productsAPI.getAll();
    return response;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await productsAPI.getCategories();
    return response;
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (product: {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }) => {
    const response = await productsAPI.create(product);
    return response;
  }
);

const initialState: ProductState = {
  products: [],
  categories: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  sortBy: 'none',
  selectedCategory: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'price-asc' | 'price-desc' | 'category' | 'none'>) => {
      state.sortBy = action.payload;
      state.currentPage = 1; // Reset to first page when sorting changes
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Reset to first page when category changes
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.totalPages = Math.ceil(action.payload.length / PRODUCTS_PER_PAGE);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = [action.payload, ...state.products];
      });
  },
});

export const { setCurrentPage, setSortBy, setSelectedCategory } = productsSlice.actions;

// Selectors
export const selectFilteredAndSortedProducts = (state: { products: ProductState }): Product[] => {
  const { products, sortBy, selectedCategory } = state.products;
  
  let filtered = products;
  
  // Filter by category
  if (selectedCategory) {
    filtered = products.filter((p) => p.category === selectedCategory);
  }
  
  // Sort products
  let sorted = [...filtered];
  switch (sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'category':
      sorted.sort((a, b) => a.category.localeCompare(b.category));
      break;
    default:
      break;
  }
  
  return sorted;
};

export const selectPaginatedProducts = (state: { products: ProductState }): Product[] => {
  const filtered = selectFilteredAndSortedProducts(state);
  const { currentPage } = state.products;
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  return filtered.slice(startIndex, endIndex);
};

export const selectTotalPages = (state: { products: ProductState }): number => {
  const filtered = selectFilteredAndSortedProducts(state);
  return Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
};

export default productsSlice.reducer;
