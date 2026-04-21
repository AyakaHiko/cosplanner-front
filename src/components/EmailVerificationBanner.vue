<script setup>
import { CAlert, CButton, CSpinner } from '@coreui/vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useUiStore } from '@/stores/ui.js'

const authStore = useAuthStore()
const uiStore = useUiStore()

const loading = ref(false)
const message = ref('')
const color = ref('warning')

const resendEmail = async () => {
  loading.value = true
  message.value = ''
  try {
    await authStore.resendVerificationEmail()
    message.value = 'Verification email sent!'
    color.value = 'success'
    setTimeout(() => {
        uiStore.dismissEmailBanner()
    }, 5000)
  } catch (e) {
    message.value = e.message || 'Failed to resend email'
    color.value = 'danger'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <CAlert
    v-if="uiStore.shouldShowEmailBanner"
    :color="color"
    dismissible
    class="d-flex align-items-center mb-0 border-0 rounded-0"
    @dismiss="uiStore.dismissEmailBanner"
  >
    <div class="flex-grow-1">
      <span v-if="!message">Please verify your email address. Check your inbox for a confirmation link.</span>
      <span v-else>{{ message }}</span>
    </div>
    <CButton
      v-if="!message"
      color="primary"
      size="sm"
      class="ms-3"
      :disabled="loading"
      @click="resendEmail"
    >
      <CSpinner v-if="loading" component="span" size="sm" aria-hidden="true" />
      Resend
    </CButton>
  </CAlert>
</template>

<style scoped>
.alert {
  z-index: 1010;
}
</style>
