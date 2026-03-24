<script setup lang="ts">
import PlannerItem from './PlannerItem.vue'
import { computed, onMounted } from 'vue'
import { usePlannerStore } from '@/stores/planner'
import {CButton, CSpinner} from "@coreui/vue";
import {cilPlus} from '@coreui/icons'
import { useRouter } from 'vue-router'
import CIcon from '@coreui/icons-vue'
import draggable from 'vuedraggable'

const plannerStore = usePlannerStore()
const router = useRouter()

const columns = computed(() => ({
  future: {
    title: 'Future',
    status: 'future'
  },
  inProgress: {
    title: 'In Progress',
    status: 'in_progress'
  },
  complete: {
    title: 'Complete',
    status: 'ready'
  }
}))

const activeColumn = computed(() => {
  return (columns.value as any)[plannerStore.activeColumnKey]
})

const onDragEnd = async (evt: any, newStatus: string) => {
  if (evt.added) {
    const item = evt.added.element
    await plannerStore.updateCosplanStatus(item.id, newStatus)
  }
}

onMounted(() => {
  plannerStore.fetchCosplans()
})
</script>

<template>
  <div class="container-fluid p-3 p-md-4">
    <div v-if="plannerStore.loading" class="text-center py-5">
      <CSpinner color="primary" />
    </div>
    <template v-else>
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
              <draggable
                :list="plannerStore.groupedCosplans[key]"
                group="cosplans"
                item-key="id"
                class="h-100"
                @change="(evt: any) => onDragEnd(evt, (column as any).status)"
              >
                <template #item="{ element }">
                  <PlannerItem :item="element" />
                </template>
              </draggable>
            </div>
            <CButton class="btn btn-outline d-block w-100 mt-2" @click="router.push({ name: 'add-cosplan', query: { status: key } })">
              <CIcon :icon="cilPlus" />
            </CButton>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.planner-items-container {
  min-height: 100px;
}
</style>
