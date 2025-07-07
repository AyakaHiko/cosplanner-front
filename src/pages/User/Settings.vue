<script setup lang="ts">
import FormControl from "@/components/Form/FormControl.vue";
import FormField from "@/components/Form/FormField.vue";
import { useUserStore } from "@/stores/user";
import {computed, ref} from "vue";
import FormFileInput from "@/components/Form/FormFileInput.vue";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const selectedFile = ref<File|null>(null);
const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.target;

  userStore.updateProfile({
    name: form.name.value,
    email: form.email.value,
    avatar: selectedFile.value
  });
};
const updateAvatar = (event) => {
  event.preventDefault();
  userStore.updateAvatar(selectedFile.value);
}

</script>

<template>
  <div class="card justify-content-center align-items-center m-3">
<FormControl
    :inline="true"
    submit-text="Update Picture"
    @submit="updateAvatar">
    <FormFileInput
      label="Upload Image"
      accept="image/*"
      :rounded-preview = "true"
      :modal-crop = "true"
      required
      v-model="selectedFile"
    />
</FormControl>
  <FormControl @submit="handleSubmit" :inline="true"  class="w-50">

    <FormField
      required
      :model-value=user.name
      name="name"
      label="Username"
    />
    <FormField
      required
      :model-value=user.email
      name="email"
      type="email"
      label="Email"
    />
  </FormControl>
  </div>
</template>

<style scoped>

</style>
