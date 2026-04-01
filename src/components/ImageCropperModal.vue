<script setup lang="ts">
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { ref } from 'vue'

defineProps<{
  visible: boolean
  imgSrc: string
}>()

const emit = defineEmits(['close', 'save'])
const cropperRef = ref(null)

const onSave = () => {
  emit('save', cropperRef.value)
}

defineExpose({
  cropperRef
})
</script>

<template>
  <CModal
    :visible="visible"
    @close="emit('close')"
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
          :img-style="{ maxWidth: '100%', maxHeight: '400px' }"
        />
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="emit('close')">
        Cancel
      </CButton>
      <CButton color="primary" @click="onSave">
        Save
      </CButton>
    </CModalFooter>
  </CModal>
</template>
