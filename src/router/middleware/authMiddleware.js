import { TokenStorage } from '@/utils/tokenStorage.js';
import { useUserStore } from "@/stores/user.js";

export default async function authMiddleware(to, from, next) {
  const isAuthenticated = Boolean(TokenStorage.getToken());

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }
  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'home' });
  }

  if (to.meta.requiresAdmin) {
    const userStore = useUserStore();
    // Ensure user data is loaded
    if (!userStore.user.id) {
      await userStore.fetchProfile();
    }

    if (userStore.user.role !== 'admin') {
      return next({ name: 'home' });
    }
  }

  next();
}
