import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa, en } from 'vuetify/locale'

const appTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#bfa1cf',
    secondary: '#7f6a8f',
    surface: '#ffffff',
    background: '#faf7fc'
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const i18nLocale = (nuxtApp.$i18n as { locale?: { value?: string } })?.locale?.value ?? 'en'
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'appTheme',
      themes: { appTheme }
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi }
    },
    locale: {
      locale: i18nLocale,
      fallback: 'en',
      messages: { fa, en },
      rtl: { fa: true, en: false }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})


