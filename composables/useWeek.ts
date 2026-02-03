/**
 * هفته بر اساس locale: فارسی = شنبه‌شروع، انگلیسی = یکشنبه‌شروع.
 */
export const useWeek = () => {
  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.$i18n as { locale: { value: string } }
  const locale = i18n.locale

  const today = new Date()
  const isToday = (date: Date) => date.toDateString() === today.toDateString()

  const day = today.getDay() // 0=Sun ... 6=Sat
  const diffToWeekStart = computed(() => {
    if (locale.value === 'fa') {
      return (day + 1) % 7
    }
    return day
  })

  const start = computed(() => {
    const s = new Date(today)
    s.setDate(today.getDate() - diffToWeekStart.value)
    return s
  })

  const currentWeek = computed(() =>
    Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start.value)
      d.setDate(start.value.getDate() + i)
      return new Date(d)
    })
  )

  const weekStart = computed(() => {
    const ws = new Date(start.value)
    ws.setHours(0, 0, 0, 0)
    return ws
  })

  const weekEnd = computed(() => {
    const we = new Date(start.value)
    we.setDate(start.value.getDate() + 6)
    we.setHours(23, 59, 59, 999)
    return we
  })

  const isInThisWeek = (date: Date) => {
    const t = new Date(date).getTime()
    return t >= weekStart.value.getTime() && t <= weekEnd.value.getTime()
  }

  return {
    todayDate: new Date(today),
    isToday,
    currentWeek,
    weekStart,
    weekEnd,
    isInThisWeek
  }
}


