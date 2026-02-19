<script setup>
import { reactive } from 'vue';
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import FormControl from "@/components/Form/FormControl.vue";
import FormField from "@/components/Form/FormField.vue";
import FormCheckRadio from "@/components/Form/FormCheckRadio.vue";

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  email: '',
  password: '',
  remember: true,
});

const handleLogin = async () => {
  try {
    const success = await authStore.login({ ...form });
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
      @submit.prevent="handleLogin"
      submitText="Log In"
      :bordered="true"
    >
      <FormField
        v-model="form.email"
        required
        name="email"
        type="email"
        label="Email Address"
        placeholder="Email Address"
      />
      <FormField
        v-model="form.password"
        required
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
      />
      <FormCheckRadio
        v-model="form.remember"
        :input-value="true"
        name="remember"
        label="Remember Me"
      />
    </FormControl>
  </div>
</template>
