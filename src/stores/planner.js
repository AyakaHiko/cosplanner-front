import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlannerStore = defineStore('planner', () => {
  const STORAGE_KEY = 'planner-active-column'
  const columnKeys = ['future', 'inProgress', 'complete']

  const activeColumnIndex = ref(0)

  // Initialize from localStorage
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && columnKeys.includes(saved)) {
    activeColumnIndex.value = columnKeys.indexOf(saved)
  }

  const activeColumnKey = computed(() => columnKeys[activeColumnIndex.value])

  const nextColumn = () => {
    activeColumnIndex.value = (activeColumnIndex.value + 1) % columnKeys.length
    saveActiveColumn()
  }

  const prevColumn = () => {
    activeColumnIndex.value = (activeColumnIndex.value - 1 + columnKeys.length) % columnKeys.length
    saveActiveColumn()
  }

  const saveActiveColumn = () => {
    localStorage.setItem(STORAGE_KEY, columnKeys[activeColumnIndex.value])
  }

  return {
    activeColumnIndex,
    columnKeys,
    activeColumnKey,
    nextColumn,
    prevColumn
  }
})
