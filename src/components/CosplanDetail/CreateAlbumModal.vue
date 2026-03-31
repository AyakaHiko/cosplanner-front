<script setup lang="ts">
import { cilCloudUpload, cilX, cilFile } from '@coreui/icons'
import { useCreateAlbum } from '@/composables/useCreateAlbum'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close', 'create'])

const {
  albumTitle,
  files,
  isDragging,
  fileInput,
  reset,
  onFileChange,
  onDrop,
  removeFile,
  triggerFileInput
} = useCreateAlbum()

const handleClose = () => {
  reset()
  emit('close')
}

const onCreate = () => {
  if (!albumTitle.value.trim()) return
  emit('create', { title: albumTitle.value.trim(), files: files.value })
  handleClose()
}
</script>

<template>
  <CModal :visible="visible" @close="handleClose" size="lg" alignment="center">
    <CModalHeader>
      <CModalTitle>Create New Album</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="mb-3">
        <CFormLabel for="albumTitle">Album Title</CFormLabel>
        <CFormInput
          id="albumTitle"
          v-model="albumTitle"
          placeholder="Enter album title"
          @keyup.enter="onCreate"
        />
      </div>

      <div class="mb-3">
        <CFormLabel>Photos</CFormLabel>
        <div
          class="drop-zone p-5 border rounded text-center cursor-pointer mb-3"
          :class="{ 'drop-zone--dragging': isDragging, 'border-primary': isDragging }"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="onDrop"
          @click="triggerFileInput"
        >
          <input
            type="file"
            ref="fileInput"
            multiple
            accept="image/*"
            class="d-none"
            @change="onFileChange"
          />
          <CIcon :icon="cilCloudUpload" size="xl" class="text-secondary mb-2" />
          <p class="mb-0">Drag and drop images here or click to select</p>
          <small class="text-muted">Only image files are allowed</small>
        </div>

        <div v-if="files.length > 0" class="file-list row g-2 mt-3">
          <div v-for="(file, index) in files" :key="index" class="col-6 col-md-4 col-lg-3">
            <div class="file-item position-relative border rounded p-2 d-flex align-items-center  shadow-sm overflow-hidden h-100">
               <div class="me-2 text-primary d-flex align-items-center">
                  <CIcon :icon="cilFile" />
               </div>
               <div class="flex-grow-1 text-truncate" :title="file.name">
                 <small>{{ file.name }}</small>
               </div>
               <CButton
                 color="danger"
                 variant="ghost"
                 size="sm"
                 class="p-0 ms-1"
                 @click.stop="removeFile(index)"
               >
                 <CIcon :icon="cilX" size="sm" />
               </CButton>
            </div>
          </div>
        </div>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="handleClose">Cancel</CButton>
      <CButton
        color="primary"
        @click="onCreate"
        :disabled="!albumTitle.trim()"
      >
        Create Album
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<style scoped>
.drop-zone {
  border-style: dashed !important;
  transition: all 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.02);
}

.drop-zone--dragging {
  background-color: rgba(var(--cui-primary-rgb), 0.1);
  border-color: var(--cui-primary) !important;
}

.drop-zone:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.file-item {
  min-height: 40px;
}
</style>
