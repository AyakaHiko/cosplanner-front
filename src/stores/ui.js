import {ref} from "vue";
import {defineStore} from "pinia";

export const useUiStore = defineStore('ui', () => {
  const theme = ref(localStorage.getItem('theme') || 'light');

  function setTheme(value) {
    theme.value = value;
    localStorage.setItem('theme', value);
    document.body.setAttribute('data-bs-theme', value);
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  }
  setTheme(theme.value);

  return {
    theme,
    setTheme,
    toggleTheme,
  };
});
