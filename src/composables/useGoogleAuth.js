import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

export function useGoogleAuth() {
    const isLoaded = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()

    const initializeGoogleAuth = () => {
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

    const handleCredentialResponse = async (response) => {
        try {
            await authStore.googleLogin(response.credential)
            await router.push({ name: 'profile' })
        } catch (error) {
            console.error('Google auth error:', error)
        }
    }

    const initializeButton = (elementId) => {
        const { client_id } = authStore.getGoogleAuthCredentials()

        window.google.accounts.id.initialize({
            client_id: client_id,
            callback: handleCredentialResponse
        })

        const element = document.getElementById(elementId)
        if (element) {
            window.google.accounts.id.renderButton(
                element,
                { theme: 'outline', size: 'large', width: '100%' }
            )
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
