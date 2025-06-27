export default function authMiddleware(to, from, next) {
  const isAuthenticated = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'home' })
  }

  next()
}
