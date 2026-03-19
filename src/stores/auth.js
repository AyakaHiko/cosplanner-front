import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { TokenStorage } from '@/utils/tokenStorage.js';
import { authService } from '@/services/api/authService.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false
  }),

  actions: {
    async init() {
      const savedToken = TokenStorage.getToken();
      if (savedToken) {
        this.token = savedToken;
        this.isAuthenticated = true;
        const userStore = useUserStore();
        await userStore.fetchProfile();
      }
    },

    async login(credentials) {
      try {
        const response = await authService.login(credentials);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        this.token = data.access_token;
        TokenStorage.setToken(this.token, Boolean(credentials.remember));
        this.isAuthenticated = true;

        const userStore = useUserStore();
        await userStore.fetchProfile();
        return data;
      } catch (e) {
        console.error('Login error:', e.message);
        this.token = null;
        TokenStorage.removeToken();
        this.isAuthenticated = false;
        throw e;
      }
    },

    async register(credentials) {
      try {
        const response = await authService.register(credentials);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        this.token = data.access_token;
        TokenStorage.setToken(this.token, false);
        this.isAuthenticated = true;

        const userStore = useUserStore();
        await userStore.fetchProfile();
        return data;
      } catch (e) {
        console.error('Registration error:', e.message);
        this.token = null;
        TokenStorage.removeToken();
        this.isAuthenticated = false;
        throw e;
      }
    },

    async logout() {
      try {
        const response = await authService.logout(this.token);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Logout failed');
        }
      } catch (e) {
        console.warn('Logout error (ignored):', e.message);
      } finally {
        const userStore = useUserStore();
        userStore.user = {
          id: null,
          name: null,
          email: null
        };
        this.token = null;
        TokenStorage.removeToken();
        this.isAuthenticated = false;
      }
    }
  }
});
