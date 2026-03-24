<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  item: {
    id: number;
    title: string;
    description?: string;
    main_image_url?: string;
    images?: Array<{
      id: number;
      path: string;
      type: string;
    }>;
  }
}>()

const mainImage = computed(() => {
  return props.item.main_image_url
})
</script>

<template>
  <div
    class="card mb-2 shadow-sm cosplan-planner-item"
    @click="$router.push({ name: 'cosplan-detail', params: { id: item.id } })"
  >
    <div class="card-body d-flex align-items-center justify-content-between p-3">
      <div class="text-truncate me-2">
        <h5 class="card-title h6 mb-1 fw-medium text-truncate">{{ item.title }}</h5>
        <p v-if="item.description" class="card-text small text-muted text-truncate mb-0">
          {{ item.description }}
        </p>
      </div>
      <div v-if="mainImage" class="flex-shrink-0 ms-2">
        <img
          :src="mainImage"
          alt="Avatar"
          class="rounded-circle cosplan-avatar"
        />
      </div>
      <div v-else class="flex-shrink-0 ms-2">
        <div
          class="rounded-circle bg-light d-flex align-items-center justify-content-center cosplan-avatar-placeholder"
        >
          <span class="text-muted">No pic</span>
        </div>
      </div>
    </div>
  </div>
</template>

