<script setup lang="ts">
import FormControl from "@/components/Form/FormControl.vue";
import FormField from "@/components/Form/FormField.vue";
import { useUserStore } from "@/stores/user";
import { computed, ref, reactive, watch } from "vue";
import FormFileInput from "@/components/Form/FormFileInput.vue";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const toast = useToast();
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
const profileLoading = ref(false);
const avatarLoading = ref(false);

const handleSubmit = async () => {
  profileLoading.value = true;
  try {
    await userStore.updateProfile({
      name: form.name,
      email: form.email,
    });
    toast.success("Profile updated successfully");
  } catch (error: any) {
    toast.error(error.message || "Failed to update profile");
  } finally {
    profileLoading.value = false;
  }
};

const updateAvatar = async () => {
  if (!selectedFile.value) {
    toast.warning("Please select an image first");
    return;
  }

  avatarLoading.value = true;
  try {
    await userStore.updateAvatar(selectedFile.value);
    selectedFile.value = null;
    toast.success("Avatar updated successfully");
  } catch (error: any) {
    toast.error(error.message || "Failed to update avatar");
  } finally {
    avatarLoading.value = false;
  }
}

</script>

<template>
  <div class="card justify-content-center align-items-center m-3">
<FormControl
    :inline="true"
    submit-text="Update Picture"
    :loading="avatarLoading"
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
  <FormControl @submit.prevent="handleSubmit" :inline="true" :loading="profileLoading" class="w-50">

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
