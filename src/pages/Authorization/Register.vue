<script setup>
import {useAuthStore} from "@/stores/auth.js";
const authStore = useAuthStore();
const handleRegister = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  authStore.register(data);
};

</script>
<template>
  <div class="auth-container">
    <form class="w-50" @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="register-name" class="form-label">Account Name</label>
        <input
          name="name"
          value="admin"
          class="form-control"
          id="register-name"
          type="text"
          placeholder="Account Name"
        >
      </div>
      <div class="form-group">
        <label for="register-email" class="form-label">Email Address</label>
        <input
          name="email"
          value="a@dmin.com"
          class="form-control"
          id="register-email"
          type="email"
          placeholder="Email Address"
        >
      </div>
      <div class="form-group">
        <label for="register-password" class="form-label">Password</label>
        <input
          name="password"
          value="qwe.123rty"
          class="form-control"
          id="register-password"
          type="password"
          placeholder="Password"
        >
      </div>
      <div class="form-group">
        <label for="register-password-confirmation" class="form-label">Confirm Password</label>
        <input
          name="password_confirmation"
          value="qwe.123rty"
          class="form-control"
          id="register-password-confirmation"
          type="password"
          placeholder="Confirm Password"
        >
      </div>
      <input type="submit" class="btn btn-light mt-2" value="Register">
    </form>
  </div>
</template>



<style scoped>

</style>
