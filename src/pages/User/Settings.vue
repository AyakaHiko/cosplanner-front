<script setup lang="ts">
import { useUserSettings } from "@/composables/useUserSettings";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
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
  getCroppedImage
} = useUserSettings();

const previewUrl = computed(() => {
  if (!selectedFile.value) return null
  return URL.createObjectURL(selectedFile.value)
})
</script>

<template>
  <div class="container-fluid py-3">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card p-3 p-sm-4 d-flex flex-column align-items-center">
          <CForm
            @submit.prevent="updateAvatar"
            class="w-100 mb-4 border-bottom pb-4"
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
                :src="previewUrl"
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
              class="w-100 w-sm-auto"
            >
              <CSpinner v-if="avatarLoading" component="span" size="sm" aria-hidden="true" class="me-2"/>
              Update Picture
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

          <CModal
            :visible="isModalOpen"
            @close="isModalOpen = false"
            size="lg"
            alignment="center"
          >
            <CModalHeader>
              <CModalTitle>Crop Image</CModalTitle>
            </CModalHeader>
            <CModalBody class="p-0">
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
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
