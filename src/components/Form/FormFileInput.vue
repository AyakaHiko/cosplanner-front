<script setup>
import { ref } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

const props = defineProps({
  label: {
    type: String,
    default: 'Upload Image'
  },
  preview: {
    type: Boolean,
    default: true
  },
  roundedPreview: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [File, null],
    default: null
  },
  modalCrop: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);
const cropperRef = ref(null);
const imageInput = ref(null);
const imgSrc = ref('');
const cropImg = ref('');
const isModalOpen = ref(false);

const setImage = (e) => {
  const file = e.target.files[0];

  if (!file?.type?.includes('image/')) {
    alert('Please select an image file');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    imgSrc.value = event.target.result;
    if (props.modalCrop) {
      isModalOpen.value = true;
    }
  };
  reader.readAsDataURL(file);
};

const getCroppedImage = () => {
  if (!cropperRef.value) return;

  const canvas = cropperRef.value.getCroppedCanvas();
  if (!canvas) return;

  cropImg.value = canvas.toDataURL('image/jpeg');

  canvas.toBlob((blob) => {
    if (!blob) return;

    const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
    emit('update:modelValue', file);

    imgSrc.value = '';
    isModalOpen.value = false;
  }, 'image/jpeg');
};
</script>

<template>
  <div class="position-relative form-element mb-3">
    <label class="form-label">{{ label }}</label>
    <input
      @change="setImage"
      ref="imageInput"
      type="file"
      class="form-control"
      :accept="accept"
      :required="required"
    >

    <div v-if="cropImg && preview" class="img-preview mt-3">
      <img :src="cropImg" alt="Preview" class="img-thumbnail" :class="{ 'rounded-circle': roundedPreview }"/>
    </div>

    <div v-if="imgSrc && !modalCrop" class="img-cropper mt-3">
      <vue-cropper
        ref="cropperRef"
        :src="imgSrc"
        :aspect-ratio="1"
        :view-mode="1"
        :auto-crop-area="1"
        :movable="true"
        :rotatable="true"
        :scalable="true"
        :zoomable="true"
        :background="true"
        :responsive="true"
      />
      <div class="d-flex justify-content-end mt-3">
        <button type="button" class="btn btn-primary" @click="getCroppedImage">
          Save
        </button>
      </div>
    </div>

    <div v-if="imgSrc && modalCrop && isModalOpen" class="modal-backdrop-custom">
      <div class="modal-content-custom">
        <vue-cropper
          ref="cropperRef"
          :src="imgSrc"
          :aspect-ratio="1"
          :view-mode="1"
          :auto-crop-area="1"
          :movable="true"
          :rotatable="true"
          :scalable="true"
          :zoomable="true"
          :background="true"
          :responsive="true"
        />
        <div class="d-flex justify-content-end mt-3">
          <button type="button" class="btn btn-secondary me-2" @click="isModalOpen = false">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="getCroppedImage">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-preview img {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
}

.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  z-index: 1050;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content-custom {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
