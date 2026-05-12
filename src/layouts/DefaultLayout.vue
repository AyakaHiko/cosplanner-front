<script setup>
import { CContainer } from '@coreui/vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import EmailVerificationBanner from '@/components/EmailVerificationBanner.vue'
</script>

<template>
  <div>
    <div class="wrapper d-flex flex-column min-vh-100">
      <AppHeader />
      <EmailVerificationBanner />
      <div class="body flex-grow-1">
        <CContainer class="px-4" lg>
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
</template>
