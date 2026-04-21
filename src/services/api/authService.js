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
  },

  async resendVerificationEmail(token) {
    const response = await fetch(`${API}/api/email/verification-notification`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  },

  async forgotPassword(email) {
    const response = await fetch(`${API}/api/forgot-password`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  },

  async resetPassword(data) {
    const response = await fetch(`${API}/api/reset-password`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }
};
