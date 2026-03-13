<script setup>
import { computed } from 'vue'
import { useColorModes } from '@coreui/vue'
import AppHeaderDropdownAccnt from '@/components/AppHeaderDropdownAccnt.vue'
import { useAuthStore } from '@/stores/auth.js'

const { colorMode, setColorMode } = useColorModes('coreui-free-vue-admin-template-theme')
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>

<template>
  <CHeader position="sticky" class="mb-4 p-0">
    <CContainer class="border-bottom px-4" fluid>
      <CHeaderNav class="d-none d-md-flex">
        <CNavItem>
          <CNavLink href="/"> Cosplanner </CNavLink>
        </CNavItem>
      </CHeaderNav>

      <CHeaderNav class="ms-auto">
        <CDropdown variant="nav-item" placement="bottom-end">
          <CDropdownToggle :caret="false">
            <CIcon v-if="colorMode === 'dark'" icon="cil-moon" size="lg" />
            <CIcon v-else-if="colorMode === 'light'" icon="cil-sun" size="lg" />
            <CIcon v-else icon="cil-contrast" size="lg" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              :active="colorMode === 'light'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('light')"
            >
              <CIcon class="me-2" icon="cil-sun" size="lg" /> Light
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'dark'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('dark')"
            >
              <CIcon class="me-2" icon="cil-moon" size="lg" /> Dark
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'auto'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('auto')"
            >
              <CIcon class="me-2" icon="cil-contrast" size="lg" /> Auto
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

        <template v-if="isAuthenticated">
          <li class="nav-item py-1">
            <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdownAccnt />
        </template>
        <template v-else>
          <CNavItem>
            <CNavLink href="/login"> Log In </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/register"> Sign Up </CNavLink>
          </CNavItem>
        </template>
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>
