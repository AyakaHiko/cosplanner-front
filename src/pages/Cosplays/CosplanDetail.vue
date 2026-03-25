<script setup lang="ts">
import { useCosplanDetail } from '@/composables/useCosplanDetail'
import { cilArrowLeft } from '@coreui/icons'

import CosplanMainHeader from '@/components/CosplanDetail/CosplanMainHeader.vue'
import CosplanDescription from '@/components/CosplanDetail/CosplanDescription.vue'
import CosplanInfo from '@/components/CosplanDetail/CosplanInfo.vue'
import CosplanAlbums from '@/components/CosplanDetail/CosplanAlbums.vue'
import CosplanCropperModal from '@/components/CosplanDetail/CosplanCropperModal.vue'

const {
  state: { cosplan, loading, error, statusOptions, router },
  editing,
  images: { main: mainImage, albums, deleteImage, deleteAlbum },
  cropper
} = useCosplanDetail()

const createAlbum = (name: string) => {
  cropper.triggerUpload('reference', null, name)
}

const removeDeadline = async () => {
  editing.value.value = null
  await editing.save('deadline')
}

const onSaveCroppedImage = (cropperInstance: any) => {
  cropper.cropperRef.value = cropperInstance
  cropper.saveCroppedImage()
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
        <CosplanMainHeader
          :title="cosplan.title"
          :main-image="mainImage"
          :editing-field="editing.field.value"
          v-model:edit-value="editing.value.value"
          @start-editing="editing.start"
          @cancel-editing="editing.cancel"
          @save-field="editing.save"
          @trigger-upload="cropper.triggerUpload"
        />

        <input
          type="file"
          :ref="(el) => { if (el) cropper.imageInput.value = el as HTMLInputElement }"
          class="d-none"
          accept="image/*"
          multiple
          @change="cropper.handleFileUpload"
        />

        <CosplanDescription
          :description="cosplan.description"
          :editing-field="editing.field.value"
          v-model:edit-value="editing.value.value"
          @start-editing="editing.start"
          @cancel-editing="editing.cancel"
          @save-field="editing.save"
        />

        <CosplanInfo
          :deadline="cosplan.deadline"
          :status="cosplan.status"
          :status-options="statusOptions"
          :editing-field="editing.field.value"
          v-model:edit-value="editing.value.value"
          @start-editing="editing.start"
          @cancel-editing="editing.cancel"
          @save-field="editing.save"
          @remove-deadline="removeDeadline"
        />

        <hr class="my-5" />

        <CosplanAlbums
          :albums="albums"
          @create-album="createAlbum"
          @delete-album="deleteAlbum"
          @trigger-upload="cropper.triggerUpload"
          @delete-image="deleteImage"
        />
      </div>
    </div>

    <CosplanCropperModal
      :visible="cropper.isModalOpen.value"
      :img-src="cropper.imgSrc.value"
      @close="cropper.isModalOpen.value = false"
      @save="onSaveCroppedImage"
    />
  </div>
</template>

