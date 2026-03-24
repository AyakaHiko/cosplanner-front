import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cosplanService } from '@/services/api/cosplanService'

export function useAddCosplan() {
  const route = useRoute()
  const router = useRouter()

  const form = ref({
    title: '',
    description: '',
    deadline: '',
    status: 'future'
  })

  const loading = ref(false)
  const error = ref('')

  const statusOptions = [
    { label: 'Future', value: 'future' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Ready', value: 'ready' }
  ]

  onMounted(() => {
    const queryStatus = route.query.status as string
    if (queryStatus) {
      // Map frontend column keys to backend status values
      const statusMap: Record<string, string> = {
        'future': 'future',
        'inProgress': 'in_progress',
        'complete': 'ready'
      }
      if (statusMap[queryStatus]) {
        form.value.status = statusMap[queryStatus]
      }
    }
  })

  const handleSubmit = async () => {
    loading.value = true
    error.value = ''
    try {
      const response = await cosplanService.createCosplan(form.value)
      if (response.ok) {
        router.push('/cosplans')
      } else {
        const data = await response.json()
        error.value = data.message || 'Failed to create cosplan'
      }
    } catch (e) {
      error.value = 'An error occurred while creating the cosplan'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    loading,
    error,
    statusOptions,
    handleSubmit,
    router
  }
}
