<script setup>
import { CContainer, CRow, CCol, CCard, CCardBody, CButton } from '@coreui/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth.js"

const router = useRouter()
const authStore = useAuthStore()

const goToLogin = () => {
  router.push('/login')
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

              <div class="d-grid gap-2 d-md-block">
                <CButton color="primary" @click="goToLogin" class="me-md-2">Go to Login</CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
