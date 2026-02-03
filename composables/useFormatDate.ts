import { dateToJalali } from '@/utils/jalali'

export function useFormatDate() {
  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.$i18n as { locale: { value: string } }
  const locale = i18n.locale

  function formatDate(date: Date): string {
    if (!date || isNaN(date.getTime())) return '--'
    const loc = locale.value
    if (loc === 'fa') {
      try {
        const parts = new Intl.DateTimeFormat('fa-IR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).formatToParts(date)
        const day = parts.find(p => p.type === 'day')?.value ?? ''
        const monthName = parts.find(p => p.type === 'month')?.value ?? ''
        const year = parts.find(p => p.type === 'year')?.value ?? ''
        return `${day} ${monthName} ${year}`
      } catch {
        const j = dateToJalali(date)
        return `${j.jd} ${j.jm}/${j.jy}`
      }
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return { formatDate, locale }
}
