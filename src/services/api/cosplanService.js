import { TokenStorage } from "@/utils/tokenStorage.js";

const API = import.meta.env.VITE_API_URL || "";

export const cosplanService = {
  async fetchCosplans() {
    const response = await fetch(`${API}/api/cosplans`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      }
    });
    return response;
  },

  async createCosplan(cosplanData) {
    const response = await fetch(`${API}/api/cosplans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      },
      body: JSON.stringify(cosplanData)
    });
    return response;
  },

  async fetchCosplan(id) {
    const response = await fetch(`${API}/api/cosplans/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      }
    });
    return response;
  },

  async updateCosplan(id, cosplanData) {
    const response = await fetch(`${API}/api/cosplans/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      },
      body: JSON.stringify(cosplanData)
    });
    return response;
  },

  async uploadImage(cosplanId, formData) {
    const response = await fetch(`${API}/api/cosplans/${cosplanId}/images`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      },
      body: formData
    });
    return response;
  },

  async createAlbum(cosplanId, albumData) {
    const response = await fetch(`${API}/api/cosplans/${cosplanId}/albums`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      },
      body: JSON.stringify(albumData)
    });
    return response;
  },

  async createAlbumWithImages(cosplanId, formData) {
    const response = await fetch(`${API}/api/cosplans/${cosplanId}/albums/create-and-upload`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      },
      body: formData
    });
    return response;
  },

  async deleteAlbum(cosplanId, albumId) {
    const response = await fetch(`${API}/api/cosplans/${cosplanId}/albums/${albumId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      }
    });
    return response;
  },

  async deleteImage(cosplanId, imageId) {
    const response = await fetch(`${API}/api/cosplans/${cosplanId}/images/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': TokenStorage.getAuthHeader() || ''
      }
    });
    return response;
  }
};
