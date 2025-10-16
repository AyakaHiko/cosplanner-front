<script setup lang="ts">
import PlannerItem from './PlannerItem.vue'
import { ref } from 'vue'

const columns = {
  future: {
    title: 'Future',
    items: ref([])
  },
  inProgress: {
    title: 'In Progress',
    items: ref([])
  },
  complete: {
    title: 'Complete',
    items: ref([])
  }
}
</script>

<template>
  <div class="planner-container">
    <div class="planner-columns">
      <div v-for="(column, key) in columns" :key="key" class="planner-column">
        <h2 class="column-title">{{ column.title }}</h2>
        <div class="items-container">
          <PlannerItem
            v-for="item in column.items"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.planner-container {
  padding: 20px;
}

.planner-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  min-height: 500px;
}

.planner-column {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
}

.column-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.items-container {
  min-height: 100px;
}
</style>
