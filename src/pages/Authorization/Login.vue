<script setup>

import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";
import FormControl from "@/components/Form/FormControl.vue";
import FormField from "@/components/Form/FormField.vue";
import FormCheckRadio from "@/components/Form/FormCheckRadio.vue";

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
    <FormControl
      class="w-50"
      @submit="handleLogin"
      submitText="Log In"
      :bordered="true"
    >
      <FormField
        required
        name="email"
        type="email"
        label="Email Address"
        placeholder="Email Address"
      />
      <FormField
        required
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
      />
      <FormCheckRadio
        :input-value="true"
        name="remember"
        label="Remember Me"
      />
    </FormControl>

  </div>
</template>
