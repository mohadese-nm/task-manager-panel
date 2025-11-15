import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    try {
      const auth = useAuthStore()
      if (!auth.currentUser) {
        auth.loadFromStorage()
      }
      if (to.path === '/' && !auth.currentUser) {
        return navigateTo('/login')
      }
    } catch (error) {
      if (to.path === '/') {
        return navigateTo('/login')
      }
    }
  }
})


