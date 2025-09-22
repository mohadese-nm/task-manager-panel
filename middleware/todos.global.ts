// کنترل دسترسی به منوی "برای انجام" و صفحه /admin/todos
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  if (import.meta.client) {
    if (!auth.currentUser) {
      auth.loadFromStorage()
    }
    if (to.path === '/' && !auth.currentUser) {
      return navigateTo('/login')
    }
  }
})


