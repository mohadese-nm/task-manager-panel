// محاسبه هفته جاری، تشخیص امروز، و ساخت آرایه تاریخ‌ها

export const useWeek = () => {
  const today = new Date()
  const isToday = (date: Date) => date.toDateString() === today.toDateString()
  // شروع هفته: شنبه (Saturday)
  const day = today.getDay() // 0=Sun ... 6=Sat
  const diffToSaturday = (day + 1) % 7 // چند روز تا شنبه قبل
  const start = new Date(today)
  start.setDate(today.getDate() - diffToSaturday)
  const currentWeek = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return new Date(d)
  })
  return { todayDate: new Date(today), isToday, currentWeek }
}


