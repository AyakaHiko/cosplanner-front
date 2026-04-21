import {ref, computed} from "vue";
import {defineStore} from "pinia";
import {useUserStore} from "@/stores/user.js";

export const useUiStore = defineStore('ui', () => {
  const theme = ref(localStorage.getItem('theme') || 'light');
  const emailBannerDismissedAt = ref(null);

  function setTheme(value) {
    theme.value = value;
    localStorage.setItem('theme', value);
    document.body.setAttribute('data-bs-theme', value);
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  }

  function dismissEmailBanner() {
    emailBannerDismissedAt.value = Date.now();
  }

  const shouldShowEmailBanner = computed(() => {
    const userStore = useUserStore();
    if (!userStore.user.id || userStore.user.email_verified_at) {
      return false;
    }

    if (!emailBannerDismissedAt.value) {
      return true;
    }

    return Date.now() - emailBannerDismissedAt.value > 0;
  });

  setTheme(theme.value);

  return {
    theme,
    setTheme,
    toggleTheme,
    emailBannerDismissedAt,
    dismissEmailBanner,
    shouldShowEmailBanner
  };
});
