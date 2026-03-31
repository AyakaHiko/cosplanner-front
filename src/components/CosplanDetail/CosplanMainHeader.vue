<script setup lang="ts">
import { cilPencil, cilCheckAlt, cilX, cilPlus } from '@coreui/icons'

defineProps<{
  title: string
  mainImage: string | null
  editingField: string | null
  editValue: any
}>()

const emit = defineEmits(['start-editing', 'cancel-editing', 'save-field', 'trigger-upload', 'update:editValue'])

const onUpdateEditValue = (val: string) => {
  emit('update:editValue', val)
}
</script>

<template>
  <div class="row mb-4 align-items-center">
    <div class="col-auto">
      <div
        class="cosplan-main-image"
        style="width: 100px; height: 100px; border: 2px solid #fff;"
        @click="emit('trigger-upload', 'main')"
      >
        <img v-if="mainImage" :src="mainImage" class="w-100 h-100 object-fit-cover" alt="Main" />
        <div v-else class="text-center">
          <CIcon :icon="cilPlus" size="lg" class="text-secondary" />
          <div class="small text-secondary mt-1">Main Pic</div>
        </div>
      </div>
    </div>
    <div class="col">
      <div v-if="editingField === 'title'" class="d-flex gap-2">
        <CFormInput :model-value="editValue" @update:model-value="onUpdateEditValue" size="lg" />
        <CButton color="success" variant="outline" @click="emit('save-field', 'title')">
          <CIcon :icon="cilCheckAlt" />
        </CButton>
        <CButton color="danger" variant="outline" @click="emit('cancel-editing')">
          <CIcon :icon="cilX" />
        </CButton>
      </div>
      <h2 v-else class="h3 fw-bold d-flex align-items-center gap-2 mb-0">
        {{ title }}
        <CButton variant="ghost" size="sm" @click="emit('start-editing', 'title')" class="text-secondary">
          <CIcon :icon="cilPencil" />
        </CButton>
      </h2>
    </div>
  </div>
</template>
