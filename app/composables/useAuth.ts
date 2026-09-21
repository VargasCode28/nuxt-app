
import { ref } from 'vue'
import { authService } from '~/services/authService'




export const useAuth = () => {
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)
  const user = useState<any>('authUser', () => null)

  const fetchUser = async () => {
    if (user.value) return 
    user.value = await $fetch('/api/auth/me').catch(() => null)
  }

  const login = async (credentials: { email: string; password: string }, onSuccess: (response: any) => void) => {
    isLoading.value = true
    errorMessage.value = null
    try {
      const response = await authService.login(credentials)
      user.value = response
      onSuccess(response)
    } catch (error: any) {
      errorMessage.value = error?.data?.statusMessage || 'Ocurrió un error al intentar iniciar sesión.'
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: { fullName: string; email: string; password: string }, onSuccess: (response: any) => void) => {
    isLoading.value = true
    errorMessage.value = null
    try {
      const response = await authService.register(data)
      onSuccess(response)
    } catch (error: any) {
      errorMessage.value = error?.data?.statusMessage || 'Ocurrió un error al registrarte.'
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    await authService.logout()
    user.value = null
    await navigateTo('/cliente')
  }


  
  return { login, register, logout, user, fetchUser, isLoading, errorMessage }
}


