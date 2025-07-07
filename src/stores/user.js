import { defineStore } from 'pinia';
import {useAuthStore} from "@/stores/auth.js";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      name: null,
      email: null,
      avatar_path: null,
    }
  }),

  actions: {
    async fetchProfile() {
      try {
        const response = await fetch('/api/profile', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
          }
        });
        if (response.status === 401) {
          const authStore = useAuthStore();
          await authStore.logout();
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        this.user = data.user;
        return data;
      } catch (e) {
        console.error('Fetch profile error:', e);
        throw e;
      }
    },

    async updateProfile(profileData) {
      try {
        const response = await fetch('/api/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
          },
          body: JSON.stringify(profileData)
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to update profile');
        }

        const data = await response.json();
        this.user = data.user;
        return data;
      } catch (e) {
        console.error('Update profile error:', e);
        throw e;
      }
    },
    async updateAvatar(avatarData) {
      const formData = new FormData();
      formData.append('image', avatarData);

      try {
        const response = await fetch('/api/update-avatar', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
          },
          body: formData
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to upload avatar');
        }

        if (data.user?.avatar_path) {
          this.user = {
            ...this.user,
            avatar_path: data.user.avatar_path
          };
        }

        return data;
      } catch (e) {
        console.error('Update avatar error:', e);
        throw e;
      }
    },

    async deleteAccount(password) {
      try {
        const response = await fetch('/api/profile', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
          },
          body: JSON.stringify({ password })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to delete account');
        }

        this.user = {
          id: null,
          name: null,
          email: null
        };

        return true;
      } catch (e) {
        console.error('Delete account error:', e);
        throw e;
      }
    }
  }
});
