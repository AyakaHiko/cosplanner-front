<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useUserStore } from '@/stores/user.js'

const authStore = useAuthStore()
const userStore = useUserStore()
const user = computed(() => userStore.user)

const logout = () => {
  authStore.logout()
}
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <div v-if="user" class="d-flex align-items-center">
        <span class="me-2 d-none d-md-inline">{{ user.name }}</span>
      </div>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >
        Account
      </CDropdownHeader>
      <CDropdownItem href="/profile">
        <CIcon icon="cil-user" class="me-2" /> Profile
      </CDropdownItem>
      <CDropdownItem href="/cosplays">
        <CIcon icon="cil-list" class="me-2" /> Cosplays
      </CDropdownItem>
      <CDropdownItem href="/settings">
        <CIcon icon="cil-settings" class="me-2" /> Settings
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="logout" component="button">
        <CIcon icon="cil-lock-locked" class="me-2" /> Log out
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
