export default function authMiddleware(to, from, next) {
  const isAuthenticated = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }
  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'home' });
  }

  next();
}
