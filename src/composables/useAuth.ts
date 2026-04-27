import { reactive } from 'vue';
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();
  const toast = useToast();

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
      if (error.response?.status === 403 || error.message?.includes('verify')) {
        toast.error(error.message || 'Please verify your email address.');
      } else {
        toast.error(error.message || 'Login failed');
      }
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const success = await authStore.register({ ...registerForm });
      if (success) {
        await router.push('/email-sent');
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      console.error('Register failed:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await authStore.forgotPassword(forgotPasswordForm.email);
      toast.success('Reset link sent to your email');
      return true;
    } catch (error) {
      toast.error(error.message || 'Forgot password failed');
      console.error('Forgot password failed:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await authStore.resetPassword({ ...resetPasswordForm });
      toast.success('Password reset successfully');
      await router.push('/login');
      return true;
    } catch (error) {
      toast.error(error.message || 'Reset password failed');
      console.error('Reset password failed:', error);
    }
  };
  const getGoogleAuthCredentials = ()=> {
    return authStore.getGoogleAuthCredentials();
  }
  return {
    loginForm,
    registerForm,
    forgotPasswordForm,
    resetPasswordForm,
    handleLogin,
    handleRegister,
    handleForgotPassword,
    handleResetPassword,
    getGoogleAuthCredentials,
    router
  };
}
