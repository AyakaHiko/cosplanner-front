import { TokenStorage } from "@/utils/tokenStorage.js";

const API = import.meta.env.VITE_API_URL || "";

export const userService = {
  async fetchProfile() {
    const response = await fetch(`${API}/api/profile`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      }
    });
    return response;
  },

  async updateProfile(profileData) {
    const response = await fetch(`${API}/api/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      },
      body: JSON.stringify(profileData)
    });
    return response;
  },

  async updateAvatar(avatarData) {
    const formData = new FormData();
    formData.append('image', avatarData);
    const response = await fetch(`${API}/api/update-avatar`, {
      method: 'POST',
      headers: {
        'Authorization': TokenStorage.getAuthHeader() || ''
      },
      body: formData
    });
    return response;
  },

  async deleteAccount(password) {
    const response = await fetch(`${API}/api/profile`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      },
      body: JSON.stringify({ password })
    });
    return response;
  }
};
