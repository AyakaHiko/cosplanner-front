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
  <div class="card mb-2 shadow-sm">
    <div class="card-body">
      <h5 class="card-title h6 mb-1 fw-medium text-dark">{{ item.title }}</h5>
      <p v-if="item.description" class="card-text small text-muted">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>
