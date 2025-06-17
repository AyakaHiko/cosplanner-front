<script setup>

import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const handleLogin = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const success = await authStore.login(data);
    if (success) {
      await router.push('/profile');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

</script>
<template>
  <div class="auth-container">
    <form class="w-50" @submit="handleLogin">
      <div class="form-group">
        <label for="login-email" class="form-label">Email Address</label>
        <input
          class="form-control"
          id="login-email"
          name="email"
          type="email"
          placeholder="Email Address"
        >
      </div>
      <div class="form-group">
        <label for="login-password" class="form-label">Password</label>
        <input
          class="form-control"
          id="login-password"
          name="password"
          type="password"
          placeholder="Password"
        >
      </div>
      <div class="form-group form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="login-remember"
          name="remember"
        >
        <label for="login-remember" class="form-check-label">Remember Me</label>
      </div>
      <input type="submit" class="btn btn-light" value="Log In">
    </form>
  </div>
</template>
