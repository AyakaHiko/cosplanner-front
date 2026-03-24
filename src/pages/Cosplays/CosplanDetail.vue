<script setup lang="ts">
import { useCosplanDetail } from '@/composables/useCosplanDetail'
import { CSpinner, CButton, CFormInput, CFormTextarea, CFormSelect } from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { cilPencil, cilCheckAlt, cilX, cilArrowLeft, cilTrash } from '@coreui/icons'

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
  router
} = useCosplanDetail()

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
        <!-- Title Field -->
        <div class="mb-4">
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
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
