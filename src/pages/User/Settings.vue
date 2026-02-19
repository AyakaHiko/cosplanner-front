<script setup lang="ts">
import FormControl from "@/components/Form/FormControl.vue";
import FormField from "@/components/Form/FormField.vue";
import { useUserStore } from "@/stores/user";
import { computed, ref, reactive, watch } from "vue";
import FormFileInput from "@/components/Form/FormFileInput.vue";

const userStore = useUserStore();
const user = computed(() => userStore.user);

// Reactive form populated from store
const form = reactive({
  name: "",
  email: "",
});

watch(user, (val) => {
  if (val) {
    form.name = (val as any).name ?? "";
    form.email = (val as any).email ?? "";
  }
}, { immediate: true });

const selectedFile = ref<File | null>(null);

const handleSubmit = () => {
  userStore.updateProfile({
    name: form.name,
    email: form.email,
    avatar: selectedFile.value
  });
};

const updateAvatar = () => {
  userStore.updateAvatar(selectedFile.value);
}

</script>

<template>
  <div class="card justify-content-center align-items-center m-3">
<FormControl
    :inline="true"
    submit-text="Update Picture"
    @submit.prevent="updateAvatar">
    <FormFileInput
      label="Upload Image"
      accept="image/*"
      :rounded-preview = "true"
      :modal-crop = "true"
      required
      v-model="selectedFile"
    />
</FormControl>
  <FormControl @submit.prevent="handleSubmit" :inline="true"  class="w-50">

    <FormField
      v-model="form.name"
      required
      name="name"
      label="Username"
    />
    <FormField
      v-model="form.email"
      required
      name="email"
      type="email"
      label="Email"
    />
  </FormControl>
  </div>
</template>

<style scoped>

</style>
