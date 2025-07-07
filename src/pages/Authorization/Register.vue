<script setup>
import {useAuthStore} from "@/stores/auth.js";
import FormControl from "@/components/Form/FormControl.vue";
import FormField from "@/components/Form/FormField.vue";
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
    <FormControl
      class="w-50"
      @submit="handleRegister"
      submitText="Register"
      :bordered="true"
    >
      <FormField
        required
        name="name"
        type="text"
        label="Account Name"
        placeholder="Account Name"
        :model-value="'admin'"
      />
      <FormField
        required
        name="email"
        type="email"
        label="Email Address"
        placeholder="Email Address"
        :model-value="'a@dmin.com'"
      />
      <FormField
        required
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        :model-value="'qwe.123rty'"
      />
      <FormField
        required
        name="password_confirmation"
        type="password"
        label="Confirm Password"
        placeholder="Confirm Password"
        :model-value="'qwe.123rty'"
      />
    </FormControl>

  </div>
</template>



<style scoped>

</style>
