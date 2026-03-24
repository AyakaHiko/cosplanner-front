import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { cosplanService } from "@/services/api/cosplanService.js"

export const usePlannerStore = defineStore('planner', () => {
  const STORAGE_KEY = 'planner-active-column'
  const columnKeys = ['future', 'inProgress', 'complete']

  const activeColumnIndex = ref(0)
  const cosplans = ref([])
  const loading = ref(false)

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

  const fetchCosplans = async () => {
    loading.value = true
    try {
      const response = await cosplanService.fetchCosplans()
      if (response.ok) {
        cosplans.value = await response.json()
      }
    } catch (e) {
      console.error('Failed to fetch cosplans:', e)
    } finally {
      loading.value = false
    }
  }

  const updateCosplanStatus = async (id, status) => {
    try {
      const response = await cosplanService.updateCosplan(id, { status })
      if (response.ok) {
        const updatedItem = await response.json()
        const index = cosplans.value.findIndex(item => item.id === id)
        if (index !== -1) {
          cosplans.value[index] = updatedItem
        }
      }
    } catch (e) {
      console.error('Failed to update cosplan status:', e)
    }
  }

  const groupedCosplans = computed(() => {
    const groups = {
      future: [],
      inProgress: [],
      complete: []
    }

    cosplans.value.forEach(item => {
      if (item.status === 'future') {
        groups.future.push(item)
      } else if (item.status === 'in_progress') {
        groups.inProgress.push(item)
      } else if (item.status === 'ready') {
        groups.complete.push(item)
      }
    })

    return groups
  })

  return {
    activeColumnIndex,
    columnKeys,
    activeColumnKey,
    cosplans,
    loading,
    nextColumn,
    prevColumn,
    fetchCosplans,
    updateCosplanStatus,
    groupedCosplans
  }
})
