import lightGallery from 'lightgallery'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'

export function useLightGallery(albums: Ref<any[]>) {
  const lightGalleryRef = ref<HTMLElement | null>(null)
  let lightGalleryInstance: any = null

  const initLightGallery = () => {
    if (lightGalleryRef.value) {
      if (lightGalleryInstance) {
        lightGalleryInstance.destroy()
      }
      lightGalleryInstance = lightGallery(lightGalleryRef.value, {
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
        selector: '.lightgallery-item',
      })
    }
  }

  onMounted(() => {
    initLightGallery()
  })

  onUnmounted(() => {
    if (lightGalleryInstance) {
      lightGalleryInstance.destroy()
    }
  })

  watch(albums, () => {
    setTimeout(() => {
      initLightGallery()
    }, 100)
  }, { deep: true })

  return {
    lightGalleryRef,
    initLightGallery
  }
}
