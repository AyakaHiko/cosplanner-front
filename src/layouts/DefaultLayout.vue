<script setup lang="ts">
import Header from "@/components/default/Header.vue";
import Footer from "@/components/default/Footer.vue";

</script>

<template>
  <div class="main-layout">
    <div class="header">
      <Header/>
    </div>
    <main>
      <router-view/>
    </main>
    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>
<style src="@/assets/defaultLayout.scss"></style>
