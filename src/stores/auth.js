import {ref} from "vue";
import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(null);
  const isAuthenticated = ref(false);

  function init() {
    const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (savedToken) {
      token.value = savedToken;
      isAuthenticated.value = true;
    }
  }

  async function login(credentials) {
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

      token.value = data.access_token;
      if(credentials.remember){
        localStorage.setItem('token', token.value)
      } else {
        sessionStorage.setItem('token', token.value);
      }
      isAuthenticated.value = true;

      return data;
    } catch (e) {
      console.error('Login error:', e.message);
      token.value = null;
      sessionStorage.removeItem('token');
      isAuthenticated.value = false;
      throw e;
    }
  }

  async function logout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Logout failed');
      }
    } catch (e) {
      console.warn('Logout error (ignored):', e.message);
    } finally {
      user.value = null;
      token.value = null;
      sessionStorage.removeItem('token');
      isAuthenticated.value = false;
    }
  }

  async function register(formData) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (e) {
      console.error('Register error:', e.message);
      throw e;
    }
  }

  init();
  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    register,
  };
});
