import * as jalaali from 'jalaali-js'

export function dateToJalali(date: Date): string {
  if (isNaN(date.getTime())) return todayJalali()
  const parts = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date)
  const year = parts.find(p => p.type === 'year')?.value || ''
  const month = parts.find(p => p.type === 'month')?.value || ''
  const day = parts.find(p => p.type === 'day')?.value || ''
  return `${year}/${month}/${day}`
}

export function isoToJalali(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z')
  return dateToJalali(d)
}

export function todayJalali(): string {
  const now = new Date()
  return dateToJalali(now)
}

export function normalizeJalaliDigits(input: string): string {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩'
  let out = ''
  for (const ch of input) {
    const persianIndex = persianDigits.indexOf(ch)
    if (persianIndex !== -1) {
      out += persianIndex.toString()
      continue
    }
    const arabicIndex = arabicDigits.indexOf(ch)
    if (arabicIndex !== -1) {
      out += arabicIndex.toString()
      continue
    }
    out += ch
  }
  return out.replace(/[-_.\s]+/g, '/').trim()
}

export function jalaliStrToDate(jalaliStr: string): Date | null {
  const norm = normalizeJalaliDigits(jalaliStr)
  const m = norm.match(/^(\d{4})[\/-](\d{2})[\/-](\d{2})$/)
  if (!m) return null
  const jy = parseInt(m[1], 10)
  const jm = parseInt(m[2], 10)
  const jd = parseInt(m[3], 10)
  try {
    const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd)
    const date = new Date(gy, gm - 1, gd) // ماه در Date از 0 شروع می‌شود
    return isNaN(date.getTime()) ? null : date
  } catch {
    return null
  }
}

export function jalaliStrToIso(jalaliStr: string): string | null {
  const date = jalaliStrToDate(jalaliStr)
  if (!date) return null
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${mm}-${dd}`
}