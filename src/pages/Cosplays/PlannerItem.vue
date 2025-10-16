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
  <div class="planner-item">
    <h3 class="item-title">{{ item.title }}</h3>
    <p v-if="item.description" class="item-description">
      {{ item.description }}
    </p>
  </div>
</template>

<style scoped>
.planner-item {
  background-color: white;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.item-description {
  font-size: 0.9rem;
  color: #666;
}
</style>
