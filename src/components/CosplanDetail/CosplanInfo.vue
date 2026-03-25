<script setup lang="ts">
import { cilPencil, cilCheckAlt, cilX, cilTrash } from '@coreui/icons'

const props = defineProps<{
  deadline: string | null
  status: string
  statusOptions: Array<{ label: string, value: string }>
  editingField: string | null
  editValue: any
}>()

const emit = defineEmits(['start-editing', 'cancel-editing', 'save-field', 'remove-deadline', 'update:editValue'])

const getStatusLabel = (val: string) => {
  return props.statusOptions.find(opt => opt.value === val)?.label || val
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'No deadline'
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div class="row g-4">
    <!-- Deadline Field -->
    <div class="col-md-6">
      <label class="text-secondary small fw-bold text-uppercase mb-1 d-block">Deadline</label>
      <div v-if="editingField === 'deadline'" class="d-flex gap-2">
        <CFormInput
          type="date"
          :model-value="editValue"
          @update:model-value="emit('update:editValue', $event)"
        />
        <CButton color="success" variant="outline" @click="emit('save-field', 'deadline')">
          <CIcon :icon="cilCheckAlt" />
        </CButton>
        <CButton color="danger" variant="outline" @click="emit('cancel-editing')">
          <CIcon :icon="cilX" />
        </CButton>
      </div>
      <div v-else class="d-flex align-items-center gap-2">
        <span class="fw-medium">{{ formatDate(deadline) }}</span>
        <CButton variant="ghost" size="sm" @click="emit('start-editing', 'deadline')" class="text-secondary">
          <CIcon :icon="cilPencil" />
        </CButton>
        <CButton v-if="deadline" variant="ghost" size="sm" @click="emit('remove-deadline')" class="text-danger">
          <CIcon :icon="cilTrash" />
        </CButton>
      </div>
    </div>

    <!-- Status Field -->
    <div class="col-md-6">
      <label class="text-secondary small fw-bold text-uppercase mb-1 d-block">Status</label>
      <div v-if="editingField === 'status'" class="d-flex gap-2">
        <CFormSelect
          :model-value="editValue"
          @update:model-value="emit('update:editValue', $event)"
          :options="statusOptions"
        />
        <CButton color="success" variant="outline" @click="emit('save-field', 'status')">
          <CIcon :icon="cilCheckAlt" />
        </CButton>
        <CButton color="danger" variant="outline" @click="emit('cancel-editing')">
          <CIcon :icon="cilX" />
        </CButton>
      </div>
      <div v-else class="d-flex align-items-center gap-2">
        <span class="badge" :class="{
          'bg-info': status === 'future',
          'bg-warning': status === 'in_progress',
          'bg-success': status === 'ready'
        }">
          {{ getStatusLabel(status) }}
        </span>
        <CButton variant="ghost" size="sm" @click="emit('start-editing', 'status')" class="text-secondary">
          <CIcon :icon="cilPencil" />
        </CButton>
      </div>
    </div>
  </div>
</template>
