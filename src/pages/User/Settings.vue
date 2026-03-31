<script setup lang="ts">
import { useUserSettings } from "@/composables/useUserSettings";
import ImageCropperModal from '@/components/ImageCropperModal.vue';
import {computed} from "vue";

const {
  form,
  profileLoading,
  avatarLoading,
  handleSubmit,
  updateAvatar,
  selectedFile,
  cropperRef,
  imageInput,
  imgSrc,
  isModalOpen,
  setImage,
  getCroppedImage,
  user
} = useUserSettings();

const onSaveCroppedImage = (cropperInstance: any) => {
  cropperRef.value = cropperInstance
  updateAvatar()
}
</script>

<template>
  <div class="container-fluid py-3">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card p-3 p-sm-4 d-flex flex-column align-items-center">
          <CForm
            @submit.prevent="imageInput.click()"
            class="w-100 mb-4 border-bottom pb-4"
          >
            <div class="mb-3">
              <CFormLabel>Update Profile Picture</CFormLabel>
              <input
                ref="imageInput"
                type="file"
                accept="image/*"
                @change="setImage"
                class="d-none"
              />
            </div>

            <div v-if="user?.avatar_url" class="mb-3 text-center">
              <img
                :src="user.avatar_url"
                alt="Avatar"
                class="img-thumbnail rounded-circle"
                style="width: 150px; height: 150px; object-fit: cover;"
              />
            </div>

            <CButton
              type="submit"
              color="secondary"
              variant="outline"
              :disabled="avatarLoading"
              class="w-100 w-sm-auto"
            >
              <CSpinner v-if="avatarLoading" component="span" size="sm" aria-hidden="true" class="me-2"/>
              Select New Picture
            </CButton>
          </CForm>

          <CForm
            @submit.prevent="handleSubmit"
            class="w-100"
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
              class="w-100 w-sm-auto"
            >
              <CSpinner v-if="profileLoading" component="span" size="sm" aria-hidden="true" class="me-2"/>
              Save
            </CButton>
          </CForm>

          <ImageCropperModal
            :visible="isModalOpen"
            :img-src="imgSrc"
            @close="isModalOpen = false"
            @save="onSaveCroppedImage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
