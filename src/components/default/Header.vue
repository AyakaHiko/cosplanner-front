<script setup>
import {useAuthStore} from "@/stores/auth.js";
import {computed} from "vue";
import { useUiStore } from "@/stores/ui";
import {useUserStore} from "@/stores/user.js";

const uiStore = useUiStore();
const authStore = useAuthStore();
const userStore = useUserStore();
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => userStore.user);

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light px-2">
      <router-link to="/" class="navbar-brand">
        Cospalnner

      </router-link>

    <nav class="navbar-nav w-100 d-flex justify-content-end">
      <button @click="uiStore.toggleTheme()" class="btn">
        <i v-if="uiStore.theme === 'dark'" class="bi-moon"/>
        <i v-else class="bi-brightness-high"/>
      </button>
      <div class="nav-auth dropdown nav-item" v-if="isAuthenticated">
        <button
          class="nav-link dropdown-toggle"
          role="button"
          id="dropdownMenuButton"
          aria-expanded="false"
          data-bs-toggle="dropdown"
        >
          {{ user?.name || 'My Profile' }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="/profile">Profile</a></li>
          <li><a class="dropdown-item" href="/settings">Settings</a></li>
          <li><a class="dropdown-item" href="#" @click="authStore.logout">Log Out</a></li>
        </ul>
      </div>

      <div class="nav-auth nav-item" v-else>
        <a href="/login" class="nav-link">Log In</a>
        <a href="/register" class="nav-link">Sign Up</a>
      </div>
    </nav>
  </nav>
</template>
