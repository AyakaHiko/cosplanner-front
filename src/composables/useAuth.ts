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

  const forgotPasswordForm = reactive({
    email: '',
  });

  const resetPasswordForm = reactive({
    token: '',
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
        await router.push('/email-sent');
      }
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };

  const handleForgotPassword = async () => {
    try {
      await authStore.forgotPassword(forgotPasswordForm.email);
      return true;
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  };

  const handleResetPassword = async () => {
    try {
      await authStore.resetPassword({ ...resetPasswordForm });
      await router.push('/login');
      return true;
    } catch (error) {
      console.error('Reset password failed:', error);
      throw error;
    }
  };

  return {
    loginForm,
    registerForm,
    forgotPasswordForm,
    resetPasswordForm,
    handleLogin,
    handleRegister,
    handleForgotPassword,
    handleResetPassword,
    router
  };
}
