<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from "@/composables/useAuth";
import { CAlert, CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CSpinner } from '@coreui/vue'
import CIcon from '@coreui/icons-vue'

const route = useRoute()
const { resetPasswordForm: form, handleResetPassword, router } = useAuth();

const loading = ref(false)
const errorMessage = ref('')

onMounted(() => {
  form.token = route.params.token
  form.email = route.query.email || ''
})

const onSubmit = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    await handleResetPassword()
  } catch (e) {
    errorMessage.value = e.message || 'Something went wrong. Please try again later.'
    loading.value = false
  }
}
</script>

<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCard class="p-4">
            <CCardBody>
              <CForm @submit.prevent="onSubmit">
                <h1>Reset Password</h1>
                <p class="text-body-secondary">Enter your new password</p>

                <CAlert v-if="errorMessage" color="danger">
                  {{ errorMessage }}
                </CAlert>

                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-envelope-closed" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="form.email"
                    type="email"
                    placeholder="Email Address"
                    autocomplete="email"
                    required
                    readonly
                  />
                </CInputGroup>

                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="form.password"
                    type="password"
                    placeholder="New Password"
                    autocomplete="new-password"
                    required
                  />
                </CInputGroup>

                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="form.password_confirmation"
                    type="password"
                    placeholder="Confirm New Password"
                    autocomplete="new-password"
                    required
                  />
                </CInputGroup>

                <div class="d-grid gap-2">
                  <CButton type="submit" color="primary" :disabled="loading">
                    <CSpinner v-if="loading" component="span" size="sm" aria-hidden="true" class="me-2" />
                    Reset Password
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
