const API = import.meta.env.VITE_API_URL || "";

export const authService = {
  async login(credentials) {
    const response = await fetch(`${API}/api/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return response;
  },

  async register(credentials) {
    const response = await fetch(`${API}/api/register`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return response;
  },

  async logout(token) {
    const response = await fetch(`${API}/api/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  }
};
