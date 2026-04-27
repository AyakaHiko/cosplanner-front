<script setup>
import { onMounted } from "vue";
import { useGoogleAuth } from "@/composables/useGoogleAuth.js";

const { initializeGoogleAuth, initializeButton } = useGoogleAuth();

onMounted(async () => {
  await initializeGoogleAuth();
  initializeButton("google-button");
});
</script>

<template>
  <div class="login-provider-google">
    <div id="google-button"></div>
  </div>
</template>


<style scoped>

</style>
