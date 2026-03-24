<script setup lang="ts">
import { useCosplanDetail } from '@/composables/useCosplanDetail'
import { CSpinner, CButton, CFormInput, CFormTextarea, CFormSelect, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormLabel } from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { cilPencil, cilCheckAlt, cilX, cilArrowLeft, cilTrash, cilPlus, cilFolder, cilChevronLeft, cilChevronRight } from '@coreui/icons'
import { ref } from 'vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

const {
  cosplan,
  loading,
  error,
  editingField,
  editValue,
  statusOptions,
  startEditing,
  cancelEditing,
  saveField,
  uploadImage,
  deleteImage,
  deleteAlbum,
  router,
  cropperRef,
  imageInput,
  imgSrc,
  isModalOpen,
  handleFileUpload,
  triggerUpload,
  saveCroppedImage,
  mainImage,
  albums,
  isLightboxOpen,
  lightboxImages,
  currentImageIndex,
  openLightbox,
  nextImage,
  prevImage
} = useCosplanDetail()

const newAlbumName = ref('')

const createAlbum = () => {
  if (newAlbumName.value.trim()) {
    const name = newAlbumName.value.trim()
    triggerUpload('reference', null, name)
    newAlbumName.value = ''
  }
}

const removeDeadline = async () => {
  editValue.value = null
  await saveField('deadline')
}

const getStatusLabel = (val: string) => {
  return statusOptions.find(opt => opt.value === val)?.label || val
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'No deadline'
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div class="container py-4">
    <div class="mb-4">
      <CButton color="secondary" variant="ghost" @click="router.back()" class="ps-0">
        <CIcon :icon="cilArrowLeft" class="me-2" />
        Back to Planner
      </CButton>
    </div>

    <div v-if="loading" class="text-center py-5">
      <CSpinner color="primary" />
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else-if="cosplan" class="card shadow-sm glass overflow-hidden">
      <div class="card-body p-4">
        <!-- Main Image Header -->
        <div class="row mb-4 align-items-center">
          <div class="col-auto">
            <div
              class="rounded-circle bg-light d-flex align-items-center justify-content-center overflow-hidden cosplan-main-image hover-opacity shadow-sm"
              style="width: 100px; height: 100px; border: 2px solid #fff;"
              @click="triggerUpload('main')"
            >
              <img v-if="mainImage" :src="mainImage" class="w-100 h-100 object-fit-cover" />
              <div v-else class="text-center">
                <CIcon :icon="cilPlus" size="lg" class="text-secondary" />
                <div class="small text-secondary mt-1">Main Pic</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div v-if="editingField === 'title'" class="d-flex gap-2">
              <CFormInput v-model="editValue" size="lg" />
              <CButton color="success" variant="outline" @click="saveField('title')">
                <CIcon :icon="cilCheckAlt" />
              </CButton>
              <CButton color="danger" variant="outline" @click="cancelEditing">
                <CIcon :icon="cilX" />
              </CButton>
            </div>
            <h2 v-else class="h3 fw-bold d-flex align-items-center gap-2 mb-0">
              {{ cosplan.title }}
              <CButton variant="ghost" size="sm" @click="startEditing('title')" class="text-secondary">
                <CIcon :icon="cilPencil" />
              </CButton>
            </h2>
          </div>
        </div>

        <input
          type="file"
          ref="imageInput"
          class="d-none"
          accept="image/*"
          @change="handleFileUpload"
        />

        <!-- Description Field -->
        <div class="mb-4">
          <label class="text-secondary small fw-bold text-uppercase mb-1 d-block">Description</label>
          <div v-if="editingField === 'description'">
            <CFormTextarea v-model="editValue" rows="4" class="mb-2" />
            <div class="d-flex gap-2">
              <CButton color="success" size="sm" variant="outline" @click="saveField('description')">
                <CIcon :icon="cilCheckAlt" class="me-1" /> Save
              </CButton>
              <CButton color="danger" size="sm" variant="outline" @click="cancelEditing">
                <CIcon :icon="cilX" class="me-1" /> Cancel
              </CButton>
            </div>
          </div>
          <div v-else class="d-flex align-items-start gap-2">
            <p class="mb-0 text-muted" v-if="cosplan.description">{{ cosplan.description }}</p>
            <p class="mb-0 text-muted fst-italic" v-else>No description provided.</p>
            <CButton variant="ghost" size="sm" @click="startEditing('description')" class="text-secondary p-0 ms-1">
              <CIcon :icon="cilPencil" />
            </CButton>
          </div>
        </div>

        <div class="row g-4">
          <!-- Deadline Field -->
          <div class="col-md-6">
            <label class="text-secondary small fw-bold text-uppercase mb-1 d-block">Deadline</label>
            <div v-if="editingField === 'deadline'" class="d-flex gap-2">
              <CFormInput type="date" v-model="editValue" />
              <CButton color="success" variant="outline" @click="saveField('deadline')">
                <CIcon :icon="cilCheckAlt" />
              </CButton>
              <CButton color="danger" variant="outline" @click="cancelEditing">
                <CIcon :icon="cilX" />
              </CButton>
            </div>
            <div v-else class="d-flex align-items-center gap-2">
              <span class="fw-medium">{{ formatDate(cosplan.deadline) }}</span>
              <CButton variant="ghost" size="sm" @click="startEditing('deadline')" class="text-secondary">
                <CIcon :icon="cilPencil" />
              </CButton>
              <CButton v-if="cosplan.deadline" variant="ghost" size="sm" @click="removeDeadline" class="text-danger">
                <CIcon :icon="cilTrash" />
              </CButton>
            </div>
          </div>

          <!-- Status Field -->
          <div class="col-md-6">
            <label class="text-secondary small fw-bold text-uppercase mb-1 d-block">Status</label>
            <div v-if="editingField === 'status'" class="d-flex gap-2">
              <CFormSelect v-model="editValue" :options="statusOptions" />
              <CButton color="success" variant="outline" @click="saveField('status')">
                <CIcon :icon="cilCheckAlt" />
              </CButton>
              <CButton color="danger" variant="outline" @click="cancelEditing">
                <CIcon :icon="cilX" />
              </CButton>
            </div>
            <div v-else class="d-flex align-items-center gap-2">
              <span class="badge" :class="{
                'bg-info': cosplan.status === 'future',
                'bg-warning': cosplan.status === 'in_progress',
                'bg-success': cosplan.status === 'ready'
              }">
                {{ getStatusLabel(cosplan.status) }}
              </span>
              <CButton variant="ghost" size="sm" @click="startEditing('status')" class="text-secondary">
                <CIcon :icon="cilPencil" />
              </CButton>
            </div>
          </div>
        </div>

        <hr class="my-5" />

        <!-- Photo Albums Section -->
        <div class="mb-5">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="h5 fw-bold mb-0">Photo Albums</h3>
            <div class="d-flex gap-2">
              <CFormInput
                v-model="newAlbumName"
                placeholder="New Album Name"
                size="sm"
                style="width: 200px;"
                @keyup.enter="createAlbum"
              />
              <CButton color="primary" size="sm" @click="createAlbum">
                <CIcon :icon="cilPlus" class="me-1" /> Create
              </CButton>
            </div>
          </div>

          <div v-if="albums.length === 0" class="text-center py-4 bg-light rounded glass">
            <CIcon :icon="cilFolder" size="xl" class="text-secondary mb-2" />
            <p class="text-muted mb-0">No albums yet. Create one to organize your photos.</p>
          </div>

          <div v-else class="row g-4">
            <div v-for="album in albums" :key="album.id" class="col-12">
              <div class="d-flex align-items-center justify-content-between mb-2 border-bottom pb-2">
                <div class="d-flex align-items-center gap-2">
                   <h4 class="h6 fw-bold mb-0 text-secondary">{{ album.title }} ({{ album.images?.length || 0 }})</h4>
                   <CButton color="danger" variant="ghost" size="sm" @click="deleteAlbum(album.id)" title="Delete album">
                      <CIcon :icon="cilTrash" size="sm" />
                   </CButton>
                </div>
                <CButton color="primary" variant="ghost" size="sm" @click="triggerUpload('reference', album.id)">
                  <CIcon :icon="cilPlus" class="me-1" /> Add Photo
                </CButton>
              </div>
              <div class="d-flex flex-wrap gap-3">
                <div
                  v-for="image in album.images"
                  :key="image.id"
                  class="position-relative rounded overflow-hidden shadow-sm cosplan-hover-container cursor-pointer"
                  style="width: 120px; height: 120px;"
                  @click="openLightbox(album.images, image.id)"
                >
                  <img :src="image.url" class="w-100 h-100 object-fit-cover" />
                  <div class="position-absolute top-0 end-0 p-1 cosplan-hover-visible">
                    <CButton
                      color="danger"
                      size="sm"
                      class="p-1"
                      @click.stop="deleteImage(image.id)"
                    >
                      <CIcon :icon="cilX" size="sm" />
                    </CButton>
                  </div>
                </div>
                <!-- Quick add tile -->
                <div
                  class="rounded bg-light border d-flex align-items-center justify-content-center cursor-pointer cosplan-hover-bg-light shadow-sm"
                  style="width: 120px; height: 120px; border-style: dashed !important;"
                  @click="triggerUpload('reference', album.id)"
                >
                  <CIcon :icon="cilPlus" class="text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cropper Modal -->
    <CModal
      :visible="isModalOpen"
      @close="isModalOpen = false"
      size="lg"
      alignment="center"
    >
      <CModalHeader>
        <CModalTitle>Crop Main Image</CModalTitle>
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
        <CButton color="primary" @click="saveCroppedImage">
          Save
        </CButton>
      </CModalFooter>
    </CModal>

    <!-- Lightbox Modal -->
    <div v-if="isLightboxOpen" class="cosplan-lightbox-overlay" @click="isLightboxOpen = false">
      <div class="cosplan-lightbox-content" @click.stop>
        <img :src="lightboxImages[currentImageIndex]" class="cosplan-lightbox-image" />

        <button class="cosplan-lightbox-nav cosplan-lightbox-prev" @click="prevImage" v-if="lightboxImages.length > 1">
          <CIcon :icon="cilChevronLeft" size="xl" />
        </button>

        <button class="cosplan-lightbox-nav cosplan-lightbox-next" @click="nextImage" v-if="lightboxImages.length > 1">
          <CIcon :icon="cilChevronRight" size="xl" />
        </button>

        <button class="cosplan-lightbox-close" @click="isLightboxOpen = false">
          <CIcon :icon="cilX" size="xl" />
        </button>

        <div class="cosplan-lightbox-counter text-white small">
          {{ currentImageIndex + 1 }} / {{ lightboxImages.length }}
        </div>
      </div>
    </div>
  </div>
</template>

