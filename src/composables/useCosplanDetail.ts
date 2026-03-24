import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cosplanService } from '@/services/api/cosplanService'
import { useToast } from 'vue-toastification'

export function useCosplanDetail() {
  const route = useRoute()
  const router = useRouter()
  const toast = useToast()

  const id = route.params.id as string
  const cosplan = ref<any>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const editingField = ref<string | null>(null)
  const editValue = ref<any>(null)

  const statusOptions = [
    { label: 'Future', value: 'future' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Ready', value: 'ready' }
  ]

  const fetchCosplan = async () => {
    loading.value = true
    try {
      const response = await cosplanService.fetchCosplan(id)
      if (response.ok) {
        cosplan.value = await response.json()
      } else {
        error.value = 'Failed to load cosplan'
      }
    } catch (e) {
      console.error(e)
      error.value = 'An error occurred while fetching cosplan'
    } finally {
      loading.value = false
    }
  }

  const startEditing = (field: string) => {
    editingField.value = field
    editValue.value = cosplan.value[field]
    if (field === 'deadline' && cosplan.value[field]) {
      editValue.value = new Date(cosplan.value[field]).toISOString().split('T')[0]
    }
  }

  const cancelEditing = () => {
    editingField.value = null
    editValue.value = null
  }

  const saveField = async (field: string) => {
    try {
      const response = await cosplanService.updateCosplan(id, { [field]: editValue.value })
      if (response.ok) {
        cosplan.value[field] = editValue.value
        editingField.value = null
        toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated`)
      } else {
        toast.error('Failed to update field')
      }
    } catch (e) {
      console.error(e)
      toast.error('Error updating field')
    }
  }

  onMounted(() => {
    fetchCosplan()
  })

  return {
    cosplan,
    loading,
    error,
    editingField,
    editValue,
    statusOptions,
    startEditing,
    cancelEditing,
    saveField,
    router
  }
}
