<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CContainer, CRow, CCol, CCard, CCardBody, CButton } from '@coreui/vue'

const route = useRoute()
const router = useRouter()

const isVerified = computed(() => route.query.verified === '1')
const message = computed(() => route.query.message)
const goToProfile = () => {
  router.push('/profile')
}

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
            <CCardBody v-if="isVerified">
              <h1 class="text-success mb-4">Email Verified!</h1>
              <p class="text-body-secondary lead mb-4">
                Your email address has been successfully verified. Now you can use all the features of the service.
              </p>
              <div class="d-grid gap-2 d-md-block">
                <CButton color="success" @click="goToProfile">Go to Profile</CButton>
              </div>
            </CCardBody>
            <CCardBody v-else>
              <h1 class="text-danger mb-4">Verification Error</h1>
              <p v-if="message" class="text-body-secondary lead mb-4">{{ message }}</p>
              <p v-else class="text-body-secondary lead mb-4">
                Unfortunately, we couldn't verify your email address. The link may be invalid or expired.
              </p>
              <div class="d-grid gap-2 d-md-block">
                <CButton color="primary" @click="goToLogin">Go to Login</CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
