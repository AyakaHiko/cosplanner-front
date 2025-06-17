import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Home from '@/pages/Home.vue'
import Login from "@/pages/Authorization/Login.vue";
import Register from "@/pages/Authorization/Register.vue";
import Profile from "@/pages/User/Profile.vue";

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: Home },
      { path: '/login', component: Login },
      { path: '/register', component: Register },
      { path: '/profile', component: Profile},
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
