import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/models'

interface AuthState {
  currentUser: UserInfo | null
}

type Credential = { username: string; password: string; user: UserInfo }

const AUTH_STORAGE_KEY = 'auth_user'
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
      if (import.meta.client) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser))
        window.dispatchEvent(new StorageEvent('storage', { key: AUTH_STORAGE_KEY }))
      }
    },
    loginWithCredentials(username: string, password: string): boolean {
      const cred = Object.values(MOCK_USERS).find(c => c.username === username && c.password === password)
      if (!cred) return false
      this.currentUser = cred.user
      if (import.meta.client) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser))
        window.dispatchEvent(new StorageEvent('storage', { key: AUTH_STORAGE_KEY }))
      }
      return true
    },
    logout() {
      this.currentUser = null
      if (import.meta.client) {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        window.dispatchEvent(new StorageEvent('storage', { key: AUTH_STORAGE_KEY }))
      }
    },
    loadFromStorage() {
      if (!import.meta.client) return
      const raw = localStorage.getItem(AUTH_STORAGE_KEY)
      if (raw) {
        try {
          this.currentUser = JSON.parse(raw) as UserInfo
        } catch {
          this.currentUser = null
        }
      }
    },
  }
})


