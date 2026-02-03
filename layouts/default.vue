<template>
  <VApp class="app-bg" :dir="dir">
    <VLayout>
      <VAppBar color="primary" density="comfortable">
        <VAppBarNavIcon @click="drawer = !drawer" />
        <VToolbarTitle>{{ $t('Tasks Panel') }}</VToolbarTitle>
        <VSpacer />
        <client-only>
          <VMenu v-model="localeMenuOpen" open-on-hover>
            <template #activator="{ props }">
              <VBtn v-bind="props" variant="tonal" color="secondary" class="mx-1" rounded="lg" icon>
                <VIcon>mdi-translate</VIcon>
              </VBtn>
            </template>
            <div :class="{ 'locale-menu-hide': localeMenuHideContent }">
              <VList>
                <VListItem v-for="loc in availableLocales" :key="loc.code" @click="onLocaleClick(loc.code)"
                  :active="currentLocale === loc.code">
                  <VListItemTitle>
                    {{ loc.label }}
                  </VListItemTitle>
                </VListItem>
              </VList>
            </div>
          </VMenu>
          <VBtn v-if="!auth.currentUser" color="secondary" variant="tonal" rounded="lg" elevation="0"
            density="comfortable" prepend-icon="mdi-login" :to="'/login'" class="mx-1 text-none">
            {{ $t('Login') }}
          </VBtn>
          <VBtn v-else color="error" variant="tonal" rounded="lg" elevation="0" size="large" density="comfortable"
            prepend-icon="mdi-logout" @click="logout" class="mx-1 text-none">
            {{ $t('Logout') }}
          </VBtn>
        </client-only>
      </VAppBar>

      <VNavigationDrawer v-model="drawer" temporary class="app-drawer" :location="drawerLocation" mobile :dir="dir">
        <VList nav>
          <VListItem to="/" :title="$t('Home')" prepend-icon="mdi-home" />
          <client-only>
            <VListItem v-if="can('menu_in_todos_show')" to="/admin" :title="$t('To Do')"
              prepend-icon="mdi-checkbox-multiple-marked-outline" />
          </client-only>
        </VList>

        <template #append>
          <VDivider />
          <div class="pa-3">
            <client-only>
              <VBtn v-if="auth.currentUser" block color="error" variant="tonal" rounded="lg" prepend-icon="mdi-logout"
                class="text-none" @click="logout">
                {{ $t('Logout') }}
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
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocale } from 'vuetify'
import { useAuthStore } from '../stores/auth'
import { usePermission } from '../composables/usePermission'

const drawer = ref(false)
const localeMenuOpen = ref(false)
const localeMenuHideContent = ref(false)
watch(localeMenuOpen, (open) => { if (open) localeMenuHideContent.value = false })
const { can } = usePermission()
const auth = useAuthStore()
const router = useRouter()
const { locale, setLocale: setI18nLocale } = useI18n()
const vuetifyLocale = useLocale()
const currentLocale = locale
const availableLocales: { code: 'en' | 'fa'; label: string }[] = [
  { code: 'fa', label: 'فارسی' },
  { code: 'en', label: 'English' }
]
const isRtl = computed(() => currentLocale.value === 'fa')
const dir = computed(() => (currentLocale.value === 'fa' ? 'rtl' : 'ltr'))
const drawerLocation = computed(() => (isRtl.value ? 'right' : 'left'))

useHead(computed(() => ({
  htmlAttrs: {
    lang: currentLocale.value,
    dir: dir.value
  }
})))

async function onLocaleClick(code: 'en' | 'fa') {
  localeMenuHideContent.value = true
  if (typeof document !== 'undefined') void document.body.offsetHeight
  localeMenuOpen.value = false
  await nextTick()
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const nuxtApp = useNuxtApp()
      const ctx = (nuxtApp as { _nuxtI18n?: { setCookieLocale: (l: string) => void } })._nuxtI18n
      const i18n = (nuxtApp as { $i18n?: { locale: { value: string } } }).$i18n
      vuetifyLocale.current.value = code
      if (ctx && i18n) {
        i18n.locale.value = code
        ctx.setCookieLocale(code)
      } else if ((nuxtApp as { _nuxtI18n?: { setLocale: (l: string) => Promise<void>; setCookieLocale: (l: string) => void } })._nuxtI18n) {
        const ctxFull = (nuxtApp as { _nuxtI18n: { setLocale: (l: string) => Promise<void>; setCookieLocale: (l: string) => void } })._nuxtI18n
        ctxFull.setLocale(code)
        ctxFull.setCookieLocale(code)
      } else {
        setI18nLocale(code)
      }
    })
  })
}

onMounted(() => {
  auth.loadFromStorage()
  const nuxtApp = useNuxtApp()
  const ctx = (nuxtApp as { _nuxtI18n?: { loadMessages: (l: string) => Promise<void> } })._nuxtI18n
  if (ctx) {
    ctx.loadMessages('en').catch(() => { })
    ctx.loadMessages('fa').catch(() => { })
  }
})

function logout() { auth.logout(); router.push('/login') }
</script>

<style scoped>
.locale-menu-hide {
  visibility: hidden;
  pointer-events: none;
}
</style>
