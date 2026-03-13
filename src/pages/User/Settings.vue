<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { computed, ref, reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

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

const cropperRef = ref(null);
const imageInput = ref(null);
const imgSrc = ref('');
const isModalOpen = ref(false);

const setImage = (e: any) => {
  const file = e.target.files[0];
  if (!file?.type?.includes('image/')) {
    toast.error('Please select an image file');
    return;
  }
  const reader = new FileReader();
  reader.onload = (event: any) => {
    imgSrc.value = event.target.result;
    isModalOpen.value = true;
  };
  reader.readAsDataURL(file);
};

const getCroppedImage = () => {
  if (!cropperRef.value) return;
  const canvas = (cropperRef.value as any).getCroppedCanvas();
  if (!canvas) return;
  canvas.toBlob((blob: any) => {
    if (!blob) return;
    selectedFile.value = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
    imgSrc.value = '';
    isModalOpen.value = false;
    toast.success("Image cropped successfully");
  }, 'image/jpeg');
};

const handleSubmit = async () => {
  profileLoading.value = true;
  try {
    const response = await userStore.updateProfile({
      name: form.name,
      email: form.email,
    });
    toast.success(response.message || "Profile updated successfully");
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
    const response = await userStore.updateAvatar(selectedFile.value);
    selectedFile.value = null;
    if (imageInput.value) {
      (imageInput.value as any).value = '';
    }
    toast.success(response.message || "Avatar updated successfully");
  } catch (error: any) {
    toast.error(error.message || "Failed to update avatar");
  } finally {
    avatarLoading.value = false;
  }
}

</script>

<template>
  <div class="card justify-content-center align-items-center m-3 p-4">
    <CForm
      @submit.prevent="updateAvatar"
      class="w-50 mb-4 border-bottom pb-4"
    >
      <div class="mb-3">
        <CFormLabel>Upload Image</CFormLabel>
        <CFormInput
          ref="imageInput"
          type="file"
          accept="image/*"
          @change="setImage"
          required
        />
      </div>

      <div v-if="selectedFile" class="mb-3 text-center">
        <img
          :src="URL.createObjectURL(selectedFile)"
          alt="Preview"
          class="img-thumbnail rounded-circle"
          style="width: 150px; height: 150px; object-fit: cover;"
        />
      </div>

      <CButton
        type="submit"
        color="secondary"
        variant="outline"
        :disabled="avatarLoading"
      >
        <CSpinner v-if="avatarLoading" component="span" size="sm" aria-hidden="true" class="me-2"/>
        Update Picture
      </CButton>
    </CForm>

    <CForm
      @submit.prevent="handleSubmit"
      class="w-50"
    >
      <div class="mb-3">
        <CFormLabel for="name">Username</CFormLabel>
        <CFormInput
          v-model="form.name"
          id="name"
          required
        />
      </div>

      <div class="mb-3">
        <CFormLabel for="email">Email</CFormLabel>
        <CFormInput
          v-model="form.email"
          id="email"
          type="email"
          required
        />
      </div>

      <CButton
        type="submit"
        color="secondary"
        variant="outline"
        :disabled="profileLoading"
      >
        <CSpinner v-if="profileLoading" component="span" size="sm" aria-hidden="true" class="me-2"/>
        Save
      </CButton>
    </CForm>

    <CModal
      :visible="isModalOpen"
      @close="isModalOpen = false"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Crop Image</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div style="height: 400px; max-width: 100%; overflow: hidden;">
          <vue-cropper
            ref="cropperRef"
            :src="imgSrc"
            :aspect-ratio="1"
            :view-mode="1"
            :auto-crop-area="1"
            :movable="true"
            :rotatable="true"
            :scalable="true"
            :zoomable="true"
            :background="true"
            :responsive="true"
            img-style="max-width: 100%; max-height: 400px;"
          />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="isModalOpen = false">
          Cancel
        </CButton>
        <CButton color="primary" @click="getCroppedImage">
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<style scoped>

</style>
