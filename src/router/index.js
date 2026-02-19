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
        component: () => import('@/pages/User/Profile.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'cosplans',
        name: 'cosplans',
        component: () => import('@/pages/Cosplays/Planner.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/pages/User/Settings.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
    return authMiddleware(to, from, next)
})
export default router
