<script setup>
import {useAuthStore} from "@/stores/auth.js";
import {onMounted} from "vue";

const authStore = useAuthStore();
onMounted(async () => {
  await authStore.init();
})
</script>

<template>
  <RouterView/>
</template>
