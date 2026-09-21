
export default defineNuxtRouteMiddleware(async (to) => {
  const user = useState<any>('authUser', () => null)


  if (user.value === null) {
    user.value = await $fetch('/api/auth/me').catch(() => null)
  }


  const isProtectedRoute = to.path.startsWith('/admin')

  if (isProtectedRoute && (!user.value || user.value.role !== 'ADMIN')) {
    return navigateTo('/auth/login')
  }


  
  // Raíz del sitio: redirige según el rol

  
  if (to.path === '/') {
    if (user.value?.role === 'ADMIN') {
      return navigateTo('/admin')
    }
    return navigateTo('/cliente')
  }
})



