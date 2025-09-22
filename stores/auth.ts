import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/models'

interface AuthState {
  currentUser: UserInfo | null
}

type Credential = { username: string; password: string; user: UserInfo }
const MOCK_USERS: Record<'admin' | 'guest', Credential> = {
  admin: {
    username: 'admin',
    password: 'admin123',
    user: { id: '1', name: 'Admin', permissions: ['menu_in_todos_show'] }
  },
  guest: {
    username: 'guest',
    password: 'guest123',
    user: { id: '2', name: 'Guest', permissions: [] }
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    currentUser: null
  }),
  getters: {
    hasPermission: (state) => {
      return (perm: string) => {
        if (!state.currentUser) return false
        return state.currentUser.permissions.includes(perm)
      }
    }
  },
  actions: {
    loginAs(userKey: 'admin' | 'guest') {
      this.currentUser = MOCK_USERS[userKey].user
      // ذخیره در localStorage برای sync تب‌ها
      if (import.meta.client) {
        localStorage.setItem('auth_user', JSON.stringify(this.currentUser))
        window.dispatchEvent(new StorageEvent('storage', { key: 'auth_user' }))
      }
    },
    loginWithCredentials(username: string, password: string): boolean {
      const cred = Object.values(MOCK_USERS).find(c => c.username === username && c.password === password)
      if (!cred) return false
      this.currentUser = cred.user
      if (import.meta.client) {
        localStorage.setItem('auth_user', JSON.stringify(this.currentUser))
        window.dispatchEvent(new StorageEvent('storage', { key: 'auth_user' }))
      }
      return true
    },
    logout() {
      this.currentUser = null
      if (process.client) {
        localStorage.removeItem('auth_user')
        window.dispatchEvent(new StorageEvent('storage', { key: 'auth_user' }))
      }
    },
    loadFromStorage() {
      if (!process.client) return
      const raw = localStorage.getItem('auth_user')
      if (raw) {
        try {
          this.currentUser = JSON.parse(raw) as UserInfo
        } catch {
          this.currentUser = null
        }
      }
    }
  }
})


