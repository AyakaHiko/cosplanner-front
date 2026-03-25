<script setup lang="ts">
import { cilPencil, cilCheckAlt, cilX } from '@coreui/icons'

defineProps<{
  description: string | null
  editingField: string | null
  editValue: any
}>()

const emit = defineEmits(['start-editing', 'cancel-editing', 'save-field', 'update:editValue'])
</script>

<template>
  <div class="mb-4">
    <label class="text-secondary small fw-bold text-uppercase mb-1 d-block">Description</label>
    <div v-if="editingField === 'description'">
      <CFormTextarea
        :model-value="editValue"
        @update:model-value="emit('update:editValue', $event)"
        rows="4"
        class="mb-2"
      />
      <div class="d-flex gap-2">
        <CButton color="success" size="sm" variant="outline" @click="emit('save-field', 'description')">
          <CIcon :icon="cilCheckAlt" class="me-1" /> Save
        </CButton>
        <CButton color="danger" size="sm" variant="outline" @click="emit('cancel-editing')">
          <CIcon :icon="cilX" class="me-1" /> Cancel
        </CButton>
      </div>
    </div>
    <div v-else class="d-flex align-items-start gap-2">
      <p class="mb-0 text-muted" v-if="description">{{ description }}</p>
      <p class="mb-0 text-muted fst-italic" v-else>No description provided.</p>
      <CButton variant="ghost" size="sm" @click="emit('start-editing', 'description')" class="text-secondary p-0 ms-1">
        <CIcon :icon="cilPencil" />
      </CButton>
    </div>
  </div>
</template>
