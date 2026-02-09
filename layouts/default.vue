<template>
  <VApp class="app-bg" :dir="dir">
    <VLayout>
      <VAppBar density="comfortable" class="header-elevation">
        <VAppBarNavIcon color="primary" @click="drawer = !drawer" />
        <VToolbarTitle>{{ $t('Tasks Panel') }}</VToolbarTitle>
        <VSpacer />
        <client-only>
          <VMenu v-model="localeMenuOpen">
            <template #activator="{ props }">
              <VBtn v-bind="props" variant="outlined" color="secondary" class="mx-1" rounded="lg" prepend-icon="mdi-web" size="small">
                <span class="text-caption">{{ currentLocaleLabel }}</span>
              </VBtn>
            </template>
            <div :class="{ 'locale-menu-hide': localeMenuHideContent }">
              <VList>
                <VListItem v-for="loc in availableLocales" :key="loc.code" @click="onLocaleClick(loc.code)"
                  :active="currentLocale === loc.code" color="primaryDark" active-class="active-nav-item"> 
                  <VListItemTitle>
                    {{ loc.label }}
                  </VListItemTitle>
                </VListItem>
              </VList>
            </div>
          </VMenu>

          <VBtn color="#171a1f" class="mx-1" rounded="xl" icon size="small" @click="toggleTheme">
            <VIcon v-if="global.name.value === 'darkTheme'" icon="mdi-weather-sunny" color="white" />
            <VIcon v-else icon="mdi-weather-night" />
          </VBtn>

          <VMenu v-model="userMenuOpen">
            <template #activator="{ props }">
              <VBtn v-bind="props" color="secondary" class="mx-1" rounded="xl" icon
                size="small">
                <VIcon icon="mdi-account-circle" />
              </VBtn>
            </template>
            <div>
              <VList>
                <VListItem density="compact" prepend-icon="mdi-account-circle" rounded="lg">
                  <VListItemTitle>
                    {{ $t('Profile') }}
                  </VListItemTitle>
                </VListItem>
                <VListItem density="compact" prepend-icon="mdi-logout" rounded="lg" base-color="error"
                  @click="logout">
                  <VListItemTitle>
                    {{ $t('Logout') }}
                  </VListItemTitle>
                </VListItem>
              </VList>
            </div>
          </VMenu>
        </client-only>
      </VAppBar>

      <VNavigationDrawer v-model="drawer" temporary class="app-drawer" :location="drawerLocation" mobile :dir="dir">
        <VList nav>
          <VListItem to="/" :title="$t('Dashboard')" prepend-icon="mdi-view-dashboard-outline" active-class="active-nav-item" />
          <client-only>
            <VListItem to="/admin" :title="$t('To Do')"
              prepend-icon="mdi-checkbox-multiple-marked-outline" active-class="active-nav-item"/>
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
import { useTheme } from 'vuetify'
const drawer = ref(false)
const localeMenuOpen = ref(false)
const userMenuOpen = ref(false)
const localeMenuHideContent = ref(false)
watch(localeMenuOpen, (open) => { if (open) localeMenuHideContent.value = false })
const auth = useAuthStore()
const router = useRouter()
const { locale, setLocale: setI18nLocale } = useI18n()
const vuetifyLocale = useLocale()
const { global } = useTheme()
const currentLocale = locale

const availableLocales: { code: 'en' | 'fa'; label: string }[] = [
  { code: 'fa', label: 'فارسی' },
  { code: 'en', label: 'English' }
]
const currentLocaleLabel = computed(() => {
  return availableLocales.find(loc => loc.code === currentLocale.value)?.label ?? 'en'
})
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

onMounted(() => {
  const theme = localStorage.getItem('theme')
  if (theme) {
    global.name.value = theme
  }
})

function toggleTheme() {
  global.name.value = global.name.value === 'darkTheme' ? 'lightTheme' : 'darkTheme'
  localStorage.setItem('theme', global.name.value)
  console.log(global.name.value)
}

function logout() { auth.logout(); router.push('/login') }
</script>

<style scoped>
.locale-menu-hide {
  visibility: hidden;
  pointer-events: none;
}
</style>
