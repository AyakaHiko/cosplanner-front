<script setup>
import { CContainer, CRow, CCol, CCard, CCardBody, CButton } from '@coreui/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth.js"
import { ref } from 'vue'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const message = ref('')
const error = ref('')

const goToLogin = () => {
  router.push('/login')
}

const resendEmail = async () => {
  loading.value = true
  message.value = ''
  error.value = ''
  try {
    const data = await authStore.resendVerificationEmail()
    message.value = data.message || 'The email has been resent.'
  } catch (e) {
    error.value = e.message || 'An error occurred while sending the email.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCard class="p-4 text-center">
            <CCardBody>
              <h1 class="mb-4">Email Sent!</h1>
              <p class="text-body-secondary lead mb-4">
                We have sent a confirmation link to your email address.
                Please check your inbox and click the link to complete your registration.
              </p>

              <div v-if="message" class="alert alert-success mb-4">
                {{ message }}
              </div>
              <div v-if="error" class="alert alert-danger mb-4">
                {{ error }}
              </div>

              <div class="d-grid gap-2 d-md-block">
                <CButton color="primary" @click="goToLogin" class="me-md-2">Go to Login</CButton>
                <CButton color="secondary" @click="resendEmail" :disabled="loading">
                  {{ loading ? 'Sending...' : 'Resend Email' }}
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
