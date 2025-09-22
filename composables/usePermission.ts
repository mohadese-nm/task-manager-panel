import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export const usePermission = () => {
  const auth = useAuthStore()
  const { currentUser } = storeToRefs(auth)
  const can = (perm: string) => {
    return auth.hasPermission(perm)
  }
  return { currentUser, can }
}


