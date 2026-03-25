<script setup lang="ts">
import { cilPlus, cilFolder, cilTrash, cilX } from '@coreui/icons'
import { ref, toRefs } from 'vue'
import { useLightGallery } from '@/composables/useLightGallery'

const props = defineProps<{
  albums: any[]
}>()

const { albums } = toRefs(props)
const { lightGalleryRef } = useLightGallery(albums)

const emit = defineEmits(['create-album', 'delete-album', 'trigger-upload', 'delete-image'])

const newAlbumName = ref('')

const onCreateAlbum = () => {
  if (newAlbumName.value.trim()) {
    emit('create-album', newAlbumName.value.trim())
    newAlbumName.value = ''
  }
}
</script>

<template>
  <div class="mb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="h5 fw-bold mb-0">Photo Albums</h3>
      <div class="d-flex gap-2">
        <CFormInput
          v-model="newAlbumName"
          placeholder="New Album Name"
          size="sm"
          style="width: 200px;"
          @keyup.enter="onCreateAlbum"
        />
        <CButton color="primary" size="sm" @click="onCreateAlbum">
          <CIcon :icon="cilPlus" class="me-1" /> Create
        </CButton>
      </div>
    </div>

    <div v-if="albums.length === 0" class="text-center py-4 bg-light rounded glass">
      <CIcon :icon="cilFolder" size="xl" class="text-secondary mb-2" />
      <p class="text-muted mb-0">No albums yet. Create one to organize your photos.</p>
    </div>

    <div v-else class="row g-4" ref="lightGalleryRef">
      <div v-for="album in albums" :key="album.id" class="col-12">
        <div class="d-flex align-items-center justify-content-between mb-2 border-bottom pb-2">
          <div class="d-flex align-items-center gap-2">
            <h4 class="h6 fw-bold mb-0 text-secondary">{{ album.title }} ({{ album.images?.length || 0 }})</h4>
            <CButton color="danger" variant="ghost" size="sm" @click="emit('delete-album', album.id)" title="Delete album">
              <CIcon :icon="cilTrash" size="sm" />
            </CButton>
          </div>
          <CButton color="primary" variant="ghost" size="sm" @click="emit('trigger-upload', 'reference', album.id)">
            <CIcon :icon="cilPlus" class="me-1" /> Add Photo
          </CButton>
        </div>
        <div class="d-flex flex-wrap gap-3">
          <div
            v-for="image in album.images"
            :key="image.id"
            class="position-relative rounded overflow-hidden shadow-sm cosplan-hover-container cursor-pointer lightgallery-item"
            style="width: 120px; height: 120px;"
            :data-src="image.url"
          >
            <img :src="image.url" class="w-100 h-100 object-fit-cover" alt="Album" />
            <div class="position-absolute top-0 end-0 p-1 cosplan-hover-visible">
              <CButton
                color="danger"
                size="sm"
                class="p-1"
                @click.stop="emit('delete-image', image.id)"
              >
                <CIcon :icon="cilX" size="sm" />
              </CButton>
            </div>
          </div>
          <!-- Quick add tile -->
          <div
            class="rounded bg-light border d-flex align-items-center justify-content-center cursor-pointer cosplan-hover-bg-light shadow-sm"
            style="width: 120px; height: 120px; border-style: dashed !important;"
            @click="emit('trigger-upload', 'reference', album.id)"
          >
            <CIcon :icon="cilPlus" class="text-secondary" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
