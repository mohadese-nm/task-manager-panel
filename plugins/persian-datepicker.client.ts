export default defineNuxtPlugin(async (nuxtApp) => {
  // Import فقط در client-side
  if (process.client) {
    try {
      const Vue3PersianDatetimePicker = await import('vue3-persian-datetime-picker')
      nuxtApp.vueApp.component('vue3-persian-datetime-picker', Vue3PersianDatetimePicker.default)
    } catch (error) {
      console.warn('خطا در بارگذاری vue3-persian-datetime-picker:', error)
    }
  }
})
