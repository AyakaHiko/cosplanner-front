import { defineStore } from 'pinia';
import { useUserStore } from './user';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false
  }),

  actions: {
    async init() {
      const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (savedToken) {
        this.token = savedToken;
        this.isAuthenticated = true;
        const userStore = useUserStore();
        await userStore.fetchProfile();
      }
    },

    async login(credentials) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        this.token = data.access_token;
        if (credentials.remember) {
          localStorage.setItem('token', this.token);
        } else {
          sessionStorage.setItem('token', this.token);
        }
        this.isAuthenticated = true;

        const userStore = useUserStore();
        await userStore.fetchProfile();
        return data;
      } catch (e) {
        console.error('Login error:', e.message);
        this.token = null;
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        this.isAuthenticated = false;
        throw e;
      }
    },

    async logout() {
      try {
        const response = await fetch('/api/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

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
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        this.isAuthenticated = false;
      }
    }
  }
});
