import { defineStore } from 'pinia';
import {useAuthStore} from "@/stores/auth.js";
import { userService } from "@/services/api/userService.js";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      name: null,
      email: null,
      avatar: null,
      future_count: null,
      in_progress_count: null,
      ready_count: null,
      registration_date: null
    }
  }),

  actions: {
    async fetchProfile() {
      try {
        const response = await userService.fetchProfile();
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
        const response = await userService.updateProfile(profileData);

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
      try {
        const response = await userService.updateAvatar(avatarData);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to upload avatar');
        }

        if (data.user?.avatar) {
          this.user = {
            ...this.user,
            avatar: data.user.avatar
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
        const response = await userService.deleteAccount(password);

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
