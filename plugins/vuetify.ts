import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa, en } from 'vuetify/locale'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#80cff5",
    secondary: "#393c42",
    surface: "#ffffff",
    background: "#F9FAFBFF",
    border: "#dee1e6",
    primaryLight: "#edf7ff",
    primaryDark: "#045a94",
    purple: "#c9baf3",
    purpleLight: "#f2e8fc",
    purpleDark: "#3c1b97",
    yellow: "#ebcb7b",
    yellowLight: "#fbf7e6",
    yellowDark: "#aa8b1b",
    success: "#22C55E", // fresh green, not neon
    successLight: "#DCFCE7",
    successDark: "#15803D",
    info: "#3B82F6", // calm blue (different from primary)
    infoLight: "#EFF6FF",
    infoDark: "#1D4ED8",
    warning: "#F59E0B", // warm amber
    warningLight: "#FEF3C7",
    warningDark: "#B45309",
    error: "#DC2626", // red
    errorLight: "#FEE2E2",
    errorDark: "#B91C1C",
  },
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#6BBBEA", // softer version of your blue
    secondary: "#E5E7EB", // light text / icons
    surface: "#1E1F23", // cards, modals
    background: "#141518", // main app background
    border: "#2A2C32",
    primaryLight: "#1E3A4D", // subtle blue glow backgrounds
    primaryDark: "#9AD8F7",
    purple: "#B8A5F5", // more vibrant purple
    purpleLight: "#3D2E5C", // richer purple background (cards, badges)
    purpleDark: "#E2D8FF",
    yellow: "#FACC15", // more vibrant amber
    yellowLight: "#4A3C18", // richer amber background (cards, badges)
    yellowDark: "#FEF08A",
    success: "#4ADE80",
    successLight: "#1F3D2B",
    successDark: "#86EFAC",
    info: "#60A5FA",
    infoLight: "#1E2F4A",
    infoDark: "#93C5FD",
    warning: "#FACC15",
    warningLight: "#4A3C18",
    warningDark: "#FEF08A",
    error: "#e75050",
    errorLight: "#3F1A1A", // dark red background (cards, badges)
    errorDark: "#FCA5A5",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const i18nLocale = (nuxtApp.$i18n as { locale?: { value?: string } })?.locale?.value ?? 'en'
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'lightTheme',
      themes: { lightTheme, darkTheme }
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


