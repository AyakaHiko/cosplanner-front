import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from "@/router/middleware/authMiddleware.js";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/Home.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/Authorization/Login.vue'),
        meta: { requiresGuest: true }

      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/Authorization/Register.vue'),
        meta: { requiresGuest: true }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/pages/User/Profile.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/pages/User/Settings.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresGuest) {
    return authMiddleware(to, from, next)
  }
  next()
})
export default router
