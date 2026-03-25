import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cosplanService } from '@/services/api/cosplanService'
import { useToast } from 'vue-toastification'
import { useImageCropper } from '@/composables/useImageCropper'

export function useCosplanDetail() {
  const route = useRoute()
  const router = useRouter()
  const toast = useToast()

  const {
    selectedFile,
    cropperRef,
    imageInput,
    imgSrc,
    isModalOpen,
    setImage,
    getCroppedImage,
    resetImageInput
  } = useImageCropper()

  const id = route.params.id as string
  const cosplan = ref<any>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const editingField = ref<string | null>(null)
  const editValue = ref<any>(null)

  const uploadType = ref<'main' | 'reference' | 'progress'>('main')
  const selectedAlbumId = ref<number | null>(null)
  const selectedAlbumTitle = ref<string | null>(null)

  const statusOptions = [
    { label: 'Future', value: 'future' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Ready', value: 'ready' }
  ]

  const mainImage = computed(() => cosplan.value?.main_image_url)
  const albums = computed(() => cosplan.value?.albums || [])

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

  const triggerUpload = (type: 'main' | 'reference' | 'progress', albumId: number | null = null, albumTitle: string | null = null) => {
    uploadType.value = type
    selectedAlbumId.value = albumId
    selectedAlbumTitle.value = albumTitle
    imageInput.value?.click()
  }

  const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files || target.files.length === 0) return

    if (uploadType.value === 'main') {
      setImage(event)
    } else {
      const files = Array.from(target.files)
      let uploadCount = 0

      for (const file of files) {
        const success = await uploadImage(file, uploadType.value, selectedAlbumId.value, selectedAlbumTitle.value, true)
        if (success) {
          uploadCount++
        }
      }

      if (uploadCount > 0) {
        toast.success(`${uploadCount} ${uploadCount === 1 ? 'image' : 'images'} uploaded successfully`)
        await fetchCosplan()
      }
      target.value = ''
    }
  }

  const uploadImage = async (file: File, type: string, albumId: number | null = null, albumTitle: string | null = null, silent: boolean = false) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', type)
    if (albumId) {
      formData.append('album_id', albumId.toString())
    }
    if (albumTitle) {
      formData.append('album_title', albumTitle)
    }

    try {
      const response = await cosplanService.uploadImage(id, formData)
      if (response.ok) {
        const result = await response.json()
        if (type === 'main') {
          cosplan.value.main_image_path = result.main_image_path
          cosplan.value.main_image_url = result.main_image_url
          if (!silent) toast.success('Image uploaded successfully')
        }
        return true
      } else {
        const data = await response.json()
        if (!silent) toast.error(data.message || 'Failed to upload image')
      }
    } catch (e) {
      console.error(e)
      if (!silent) toast.error('Error uploading image')
    }
    return false
  }

  const saveCroppedImage = async () => {
    if (!cropperRef.value) return
    const canvas = (cropperRef.value as any).getCroppedCanvas()
    if (!canvas) return

    canvas.toBlob(async (blob: any) => {
      if (!blob) return
      const file = new File([blob], 'main_image.jpg', { type: 'image/jpeg' })
      const success = await uploadImage(file, 'main')
      if (success) {
        isModalOpen.value = false
        imgSrc.value = ''
        resetImageInput()
      }
    }, 'image/jpeg')
  }

  const deleteAlbum = async (albumId: number) => {
    try {
      const response = await cosplanService.deleteAlbum(id, albumId)
      if (response.ok) {
        cosplan.value.albums = cosplan.value.albums.filter((album: any) => album.id !== albumId)
        toast.success('Album deleted')
      } else {
        toast.error('Failed to delete album')
      }
    } catch (e) {
      console.error(e)
      toast.error('Error deleting album')
    }
  }

  const deleteImage = async (imageId: number) => {
    try {
      const response = await cosplanService.deleteImage(id, imageId)
      if (response.ok) {
        // Find the image in any of the albums and remove it
        if (cosplan.value.albums) {
            cosplan.value.albums.forEach((album: any) => {
                if (album.images) {
                    album.images = album.images.filter((img: any) => img.id !== imageId)
                }
            })
        }
        toast.success('Image deleted')
      } else {
        toast.error('Failed to delete image')
      }
    } catch (e) {
      console.error(e)
      toast.error('Error deleting image')
    }
  }

  onMounted(() => {
    fetchCosplan()
  })

  return {
    state: {
      cosplan,
      loading,
      error,
      statusOptions,
      router,
    },
    editing: {
      field: editingField,
      value: editValue,
      start: startEditing,
      cancel: cancelEditing,
      save: saveField,
    },
    images: {
      main: mainImage,
      albums,
      upload: uploadImage,
      deleteImage,
      deleteAlbum,
    },
    cropper: {
      selectedFile,
      cropperRef,
      imageInput,
      imgSrc,
      isModalOpen,
      handleFileUpload,
      triggerUpload,
      saveCroppedImage,
    },
  }
}
