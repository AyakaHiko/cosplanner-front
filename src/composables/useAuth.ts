import { reactive } from 'vue';
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();

  const loginForm = reactive({
    email: '',
    password: '',
    remember: true,
  });

  const registerForm = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleLogin = async () => {
    try {
      const success = await authStore.login({ ...loginForm });
      if (success) {
        await router.push('/profile');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleRegister = async () => {
    try {
      const success = await authStore.register({ ...registerForm });
      if (success) {
        await router.push('/profile');
      }
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };

  return {
    loginForm,
    registerForm,
    handleLogin,
    handleRegister,
    router
  };
}
