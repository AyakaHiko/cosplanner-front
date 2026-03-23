<script setup lang="ts">
import PlannerItem from './PlannerItem.vue'
import { ref, computed } from 'vue'
import { usePlannerStore } from '@/stores/planner'
import {CButton} from "@coreui/vue";
import {cilPlus} from '@coreui/icons'

const plannerStore = usePlannerStore()

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

const activeColumn = computed(() => {
  return (columns as any)[plannerStore.activeColumnKey]
})
</script>

<template>
  <div class="container-fluid p-3 p-md-4">
    <!-- Mobile navigation (visible only on mobile) -->
    <div class="d-flex d-md-none align-items-center justify-content-between mb-4">
      <button class="btn btn-light shadow-sm planner-nav-btn" @click="plannerStore.prevColumn">&lsaquo;</button>
      <h2 class="h5 m-0 fw-bold">{{ activeColumn.title }}</h2>
      <button class="btn btn-light planner-nav-btn" @click="plannerStore.nextColumn">&rsaquo;</button>
    </div>

    <div class="row g-4 planner-columns-row">
      <div
        v-for="(column, key) in columns"
        :key="key"
        class="col-md-4 d-md-block"
        :class="plannerStore.activeColumnKey === key ? 'd-block' : 'd-none'"
      >
        <div class="rounded p-3 h-100 glass d-flex flex-column">
          <h2 class="h6 fw-bold mb-3 text-secondary d-none d-md-block border-bottom pb-2">{{ column.title }}</h2>
          <div class="planner-items-container flex-grow-1">
            <PlannerItem
              v-for="item in (column as any).items"
              :key="item.id"
              :item="item"
            />
          </div>
          <CButton class="btn btn-light d-block w-100"><CIcon :icon="cilPlus" />
          </CButton>
        </div>
      </div>
    </div>
  </div>
</template>
