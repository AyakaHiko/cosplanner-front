import {ref, onMounted} from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'
import {useUiStore} from "@/stores/ui.js";
import {authService} from "@/services/api/authService.js";

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleAuthCredentialResponse {
  credential: string;
}

export function useGoogleAuth() {
    const isLoaded = ref(false)
    const authStore = useAuthStore()
    const uiStore = useUiStore()
    const router = useRouter()

    const initializeGoogleAuth = (): Promise<void> => {
        return new Promise((resolve) => {
            if (window.google) {
                resolve()
                return
            }

            const script = document.createElement('script')
            script.src = 'https://accounts.google.com/gsi/client'
            script.async = true
            script.defer = true
            script.onload = () => {
                resolve()
            }
            document.head.appendChild(script)
        })
    }

    const handleCredentialResponse = async (response: GoogleAuthCredentialResponse) => {
        try {
            await authStore.googleLogin(response.credential)
            await router.push({ name: 'profile' })
        } catch (error) {
            console.error('Google auth error:', error)
        }
    }

    const initializeButton = (elementId: string) => {
        const { client_id } = authService.getGoogleAuthCredentials()

      window.google.accounts.id.initialize({
            client_id: client_id,
            callback: handleCredentialResponse
        })
      const element = document.getElementById(elementId)
      if (element) {
        const theme = uiStore.theme === 'dark' ? 'filled_black' : 'outline';
          window.google.accounts.id.renderButton(
            element,
            {
              theme,
              type: "standard"
            }
        );
      }
    }

    const signOut = () => {
        if (window.google) {
            window.google.accounts.id.disableAutoSelect()
        }
        authStore.logout()
    }

    onMounted(async () => {
        await initializeGoogleAuth()
        isLoaded.value = true
    })

    return { isLoaded, initializeGoogleAuth, initializeButton, signOut }
}
