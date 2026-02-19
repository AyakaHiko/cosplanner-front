import { TokenStorage } from '@/utils/tokenStorage.js';

export default function authMiddleware(to, from, next) {
  const isAuthenticated = Boolean(TokenStorage.getToken());

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }
  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'home' });
  }

  next();
}
