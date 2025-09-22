
import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa } from 'vuetify/locale'
import 'vuetify/styles'

const appTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#bfa1cf',
    secondary: '#7f6a8f',
    surface: '#ffffff',
    background: '#faf7fc'
  }
}

export default defineNuxtPlugin((_nuxtApp) => {
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
      locale: 'fa',
      messages: { fa },
      rtl: { fa: true }
    }
  })

  // @ts-expect-error - نوع app.use در زمان اجرا معتبر است
  _nuxtApp.vueApp.use(vuetify)
})


