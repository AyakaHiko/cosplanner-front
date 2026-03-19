import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export function useImageCropper() {
  const toast = useToast();

  const selectedFile = ref<File | null>(null);
  const cropperRef = ref(null);
  const imageInput = ref(null);
  const imgSrc = ref('');
  const isModalOpen = ref(false);

  const setImage = (e: any) => {
    const file = e.target.files[0];
    if (!file?.type?.includes('image/')) {
      toast.error('Please select an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event: any) => {
      imgSrc.value = event.target.result;
      isModalOpen.value = true;
    };
    reader.readAsDataURL(file);
  };

  const getCroppedImage = () => {
    if (!cropperRef.value) return;
    const canvas = (cropperRef.value as any).getCroppedCanvas();
    if (!canvas) return;
    canvas.toBlob((blob: any) => {
      if (!blob) return;
      selectedFile.value = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
      imgSrc.value = '';
      isModalOpen.value = false;
      toast.success("Image cropped successfully");
    }, 'image/jpeg');
  };

  const resetImageInput = () => {
    if (imageInput.value) {
      (imageInput.value as any).value = '';
    }
  };

  return {
    selectedFile,
    cropperRef,
    imageInput,
    imgSrc,
    isModalOpen,
    setImage,
    getCroppedImage,
    resetImageInput
  };
}
