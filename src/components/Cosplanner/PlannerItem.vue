<script setup lang="ts">
defineProps<{
  item: {
    id: number;
    title: string;
    description?: string;
  }
}>()
</script>

<template>
  <div
    class="card mb-2 shadow-sm cursor-pointer hover-card"
    @click="$router.push({ name: 'cosplan-detail', params: { id: item.id } })"
  >
    <div class="card-body">
      <h5 class="card-title h6 mb-1 fw-medium">{{ item.title }}</h5>
      <p v-if="item.description" class="card-text small text-muted text-truncate">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.hover-card:hover {
  background-color: rgba(0, 0, 0, 0.02);
  transform: translateY(-2px);
  transition: all 0.2s ease-in-out;
}
</style>
