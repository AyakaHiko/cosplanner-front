<script setup>
import { ref } from 'vue'
import { useAuth } from "@/composables/useAuth";
import { CAlert, CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CSpinner } from '@coreui/vue'
import CIcon from '@coreui/icons-vue'

const { forgotPasswordForm: form, handleForgotPassword, router } = useAuth();

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const onSubmit = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''
  try {
    await handleForgotPassword()
    successMessage.value = 'We have emailed your password reset link!'
  } catch (e) {
    errorMessage.value = e.message || 'Something went wrong. Please try again later.'
  } finally {
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
                <h1>Forgot Password</h1>
                <p class="text-body-secondary">Enter your email to receive a password reset link</p>

                <CAlert v-if="successMessage" color="success">
                  {{ successMessage }}
                </CAlert>

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
                    :disabled="loading || !!successMessage"
                  />
                </CInputGroup>

                <div class="d-grid gap-2">
                  <CButton type="submit" color="primary" :disabled="loading || !!successMessage">
                    <CSpinner v-if="loading" component="span" size="sm" aria-hidden="true" class="me-2" />
                    Send Password Reset Link
                  </CButton>
                  <CButton color="link" @click="router.push('/login')">
                    Back to Login
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
