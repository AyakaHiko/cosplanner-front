<script setup lang="ts">
const props = defineProps({
  count: {
    type: Number, required: true
  },
  name: {
    type: String, required: true
  },
  link: {
    type: String, required: false
  }
})
</script>

<template>
  <component :is="link ? 'router-link' : 'div'"
             :to="link"
             class="statistic"
  >
    <div class="stat-count">{{ count }}</div>
    <div class="stat-name">{{ name }}</div>
  </component>
</template>

<style scoped>

</style>
