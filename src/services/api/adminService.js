import { TokenStorage } from "@/utils/tokenStorage.js";

const API = import.meta.env.VITE_API_URL || "";

export const adminService = {
  async fetchUsers(page = 1, search = '') {
    let url = `${API}/api/admin/users?page=${page}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      }
    });
    return response;
  },

  async updateUser(id, userData) {
    const response = await fetch(`${API}/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      },
      body: JSON.stringify(userData)
    });
    return response;
  },

  async deleteUser(id) {
    const response = await fetch(`${API}/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      }
    });
    return response;
  }
};
