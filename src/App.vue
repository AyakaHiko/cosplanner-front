<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { useColorModes } from '@coreui/vue'

import { useAuthStore } from '@/stores/auth.js'
import { useThemeStore } from '@/stores/theme.js'

const authStore = useAuthStore()

const { isColorModeSet, setColorMode } = useColorModes(
  'coreui-free-vue-admin-template-theme',
)
const currentTheme = useThemeStore()

onBeforeMount(() => {
  const urlParams = new URLSearchParams(window.location.href.split('?')[1])
  let theme = urlParams.get('theme')

  if (theme !== null && theme.match(/^[A-Za-z0-9\s]+/)) {
    theme = theme.match(/^[A-Za-z0-9\s]+/)[0]
  }

  if (theme) {
    setColorMode(theme)
    return
  }

  if (isColorModeSet()) {
    return
  }

  setColorMode(currentTheme.theme)
})

onMounted(async () => {
  await authStore.init()
})
</script>

<template>
  <RouterView/>
</template>
<style lang="scss">
@use 'styles/style';
@use 'styles/_main';
</style>
