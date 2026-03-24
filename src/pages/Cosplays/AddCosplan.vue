<script setup lang="ts">
import { useAddCosplan } from '@/composables/useAddCosplan'
import { CButton, CForm, CFormInput, CFormTextarea, CFormSelect, CFormLabel } from '@coreui/vue'
import CIcon from '@coreui/icons-vue'

const {
  form,
  loading,
  error,
  statusOptions,
  handleSubmit,
  router
} = useAddCosplan()
</script>

<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card p-4 shadow-sm glass">
          <h2 class="h4 mb-4 fw-bold">Add New Cosplan</h2>

          <div v-if="error" class="alert alert-danger mb-3">{{ error }}</div>

          <CForm @submit.prevent="handleSubmit">
            <div class="mb-3">
              <CFormLabel for="title">Title</CFormLabel>
              <CFormInput
                id="title"
                v-model="form.title"
                placeholder="Enter cosplan title"
                required
              />
            </div>

            <div class="mb-3">
              <CFormLabel for="description">Description</CFormLabel>
              <CFormTextarea
                id="description"
                v-model="form.description"
                rows="3"
                placeholder="Describe your cosplan"
              ></CFormTextarea>
            </div>

            <div class="mb-3">
              <CFormLabel for="deadline">Deadline</CFormLabel>
              <CFormInput
                id="deadline"
                v-model="form.deadline"
                type="date"
              />
            </div>

            <div class="mb-4">
              <CFormLabel for="status">Status</CFormLabel>
              <CFormSelect
                id="status"
                v-model="form.status"
                :options="statusOptions"
                required
              />
            </div>

            <div class="d-flex gap-2">
              <CButton color="primary" type="submit" :disabled="loading" class="flex-grow-1">
                {{ loading ? 'Creating...' : 'Create Cosplan' }}
              </CButton>
              <CButton color="secondary" variant="outline" @click="router.back()" class="flex-grow-1">
                Cancel
              </CButton>
            </div>
          </CForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
