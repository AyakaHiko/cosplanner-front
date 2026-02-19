<script setup>
import { reactive } from 'vue';
import { useAuthStore } from "@/stores/auth.js";
import FormControl from "@/components/Form/FormControl.vue";
import FormField from "@/components/Form/FormField.vue";

const authStore = useAuthStore();

// Reactive form state
const form = reactive({
  name: 'admin',
  email: 'a@dmin.com',
  password: 'qwe.123rty',
  password_confirmation: 'qwe.123rty',
});

const handleRegister = async () => {
  try {
    await authStore.register({ ...form });
  } catch (e) {
    console.error('Register failed:', e);
  }
};
</script>
<template>
  <div class="auth-container">
    <FormControl
      class="w-50"
      @submit.prevent="handleRegister"
      submitText="Register"
      :bordered="true"
    >
      <FormField
        v-model="form.name"
        required
        name="name"
        type="text"
        label="Account Name"
        placeholder="Account Name"
      />
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
      <FormField
        v-model="form.password_confirmation"
        required
        name="password_confirmation"
        type="password"
        label="Confirm Password"
        placeholder="Confirm Password"
      />
    </FormControl>

  </div>
</template>

<style scoped>
</style>
