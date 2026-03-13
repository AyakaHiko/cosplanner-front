import '@/styles/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { iconsSet as icons } from '@/assets/icons'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'

import router from './router'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: "bottom-right"
});
app.provide('icons', icons)
app.use(CoreuiVue)
app.component('CIcon', CIcon)

app.mount('#app')
