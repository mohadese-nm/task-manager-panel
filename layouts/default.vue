<template>
  <VApp class="app-bg" dir="rtl">
    <VLayout>
      <VAppBar color="primary" density="comfortable">
        <VAppBarNavIcon @click="drawer = !drawer" />
        <VToolbarTitle>پنل کارها</VToolbarTitle>
        <VSpacer />
        <client-only>
        <VBtn
          v-if="!auth.currentUser"
          color="secondary"
          variant="tonal"
          rounded="lg"
          elevation="0"
          density="comfortable"
          prepend-icon="mdi-login"
          :to="'/login'"
          class="mx-1 text-none"
        >
          ورود
        </VBtn>
        <VBtn
          v-else
          color="error"
          variant="tonal"
          rounded="lg"
          elevation="0"
          size="large"
          density="comfortable"
          prepend-icon="mdi-logout"
          @click="logout"
          class="mx-1 text-none"
          >
            خروج
          </VBtn>
        </client-only>
      </VAppBar>

      <VNavigationDrawer v-model="drawer" temporary class="app-drawer" location="right" mobile>
        <VList nav>
          <VListItem to="/" title="خانه" prepend-icon="mdi-home" />
          <client-only>
          <VListItem v-if="can('menu_in_todos_show')" to="/admin" title="برای انجام" prepend-icon="mdi-checkbox-multiple-marked-outline" />
          </client-only>
        </VList>

        <template #append>
          <VDivider />
          <div class="pa-3">
            <client-only>
            <VBtn
              v-if="auth.currentUser"
              block
              color="error"
              variant="tonal"
              rounded="lg"
              prepend-icon="mdi-logout"
              class="text-none"
              @click="logout"
            >
              خروج
            </VBtn>
            </client-only>
          </div>
        </template>
      </VNavigationDrawer>

      <VMain class="app-main">
        <slot />
      </VMain>
    </VLayout>
  </VApp>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { usePermission } from '../composables/usePermission'

const drawer = ref(false)
const { can } = usePermission()
const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  auth.loadFromStorage()
})

function logout() { auth.logout(); router.push('/login') }
</script>
