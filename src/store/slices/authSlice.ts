import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '@/services/api';
import type { AuthState, User } from '@/types';

const loadAuthFromStorage = (): User | null => {
  try {
    const authData = localStorage.getItem('auth');
    return authData ? JSON.parse(authData) : null;
  } catch {
    return null;
  }
};

const saveAuthToStorage = (user: User | null) => {
  try {
    if (user) {
      localStorage.setItem('auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth');
    }
  } catch (error) {
    console.error('Failed to save auth to localStorage:', error);
  }
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    const response = await authAPI.login(username, password);
    // Fake Store API returns a token, we'll create a user object
    const user: User = {
      username,
      token: response.token,
      name: {
        firstname: username,
        lastname: '',
      },
    };
    return user;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; email: string; password: string }) => {
    const response = await authAPI.register(userData);
    // Fake Store API returns user data with id, we'll create a user object
    const user: User = {
      id: response.id,
      username: response.username,
      email: response.email,
      name: {
        firstname: response.name?.firstname || response.username,
        lastname: response.name?.lastname || '',
      },
    };
    return user;
  }
);

const initialState: AuthState = {
  user: loadAuthFromStorage(),
  isAuthenticated: !!loadAuthFromStorage(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      saveAuthToStorage(null);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        saveAuthToStorage(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        saveAuthToStorage(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
