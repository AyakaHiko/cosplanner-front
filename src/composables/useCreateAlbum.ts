import { ref } from 'vue'

export function useCreateAlbum() {
  const albumTitle = ref('')
  const files = ref<File[]>([])
  const isDragging = ref(false)
  const fileInput = ref<HTMLInputElement | null>(null)

  const reset = () => {
    albumTitle.value = ''
    files.value = []
    isDragging.value = false
  }

  const addFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter((file) => file.type.startsWith('image/'))
    files.value = [...files.value, ...imageFiles]
  }

  const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files) {
      addFiles(Array.from(target.files))
    }
  }

  const onDrop = (e: DragEvent) => {
    isDragging.value = false
    if (e.dataTransfer?.files) {
      addFiles(Array.from(e.dataTransfer.files))
    }
  }

  const removeFile = (index: number) => {
    files.value.splice(index, 1)
  }

  const triggerFileInput = () => {
    fileInput.value?.click()
  }

  return {
    albumTitle,
    files,
    isDragging,
    fileInput,
    reset,
    onFileChange,
    onDrop,
    removeFile,
    triggerFileInput,
  }
}
