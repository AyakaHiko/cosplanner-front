import { ref, reactive, watch, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useToast } from "vue-toastification";
import { useImageCropper } from "@/composables/useImageCropper";

export function useUserSettings() {
  const userStore = useUserStore();
  const toast = useToast();
  const user = computed(() => userStore.user);

  const {
    selectedFile,
    cropperRef,
    imageInput,
    imgSrc,
    isModalOpen,
    setImage,
    getCroppedImage,
    resetImageInput
  } = useImageCropper();

  const form = reactive({
    name: "",
    email: "",
  });

  watch(user, (val) => {
    if (val) {
      form.name = (val as any).name ?? "";
      form.email = (val as any).email ?? "";
    }
  }, { immediate: true });

  const profileLoading = ref(false);
  const avatarLoading = ref(false);

  const handleSubmit = async () => {
    profileLoading.value = true;
    try {
      const response = await userStore.updateProfile({
        name: form.name,
        email: form.email,
      });
      toast.success(response.message || "Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      profileLoading.value = false;
    }
  };

  const updateAvatar = async () => {
    if (!selectedFile.value) {
      toast.warning("Please select an image first");
      return;
    }

    avatarLoading.value = true;
    try {
      const response = await userStore.updateAvatar(selectedFile.value);
      selectedFile.value = null;
      resetImageInput();
      toast.success(response.message || "Avatar updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update avatar");
    } finally {
      avatarLoading.value = false;
    }
  };

  return {
    form,
    profileLoading,
    avatarLoading,
    handleSubmit,
    updateAvatar,
    selectedFile,
    cropperRef,
    imageInput,
    imgSrc,
    isModalOpen,
    setImage,
    getCroppedImage
  };
}
