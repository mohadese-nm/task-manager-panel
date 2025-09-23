// کنترل دسترسی به منوی "برای انجام" و صفحه /admin/todos
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  // چک کردن اینکه آیا Pinia فعال است یا نه
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
      // اگر Pinia هنوز فعال نشده، فقط در صورت نیاز به صفحه login هدایت کن
      if (to.path === '/') {
        return navigateTo('/login')
      }
    }
  }
})


