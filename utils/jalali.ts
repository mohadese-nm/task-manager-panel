import { toGregorian, toJalaali } from 'jalaali-js'

export function dateToJalali(date: Date): { jy: number, jm: number, jd: number } {
  if (isNaN(date.getTime())) {
    const today = new Date()
    return dateToJalali(today)
  }
  
  const gy = date.getFullYear()
  const gm = date.getMonth() + 1
  const gd = date.getDate()
  
  const { jy, jm, jd } = toJalaali(gy, gm, gd)
  return { jy, jm, jd }
}

export function dateToJalaliString(date: Date): string {
  const jalali = dateToJalali(date)
  return `${jalali.jy}/${jalali.jm.toString().padStart(2, '0')}/${jalali.jd.toString().padStart(2, '0')}`
}

export function isoToJalali(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z')
  return dateToJalaliString(d)
}

export function todayJalali(): string {
  const now = new Date()
  return dateToJalaliString(now)
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
    const { gy, gm, gd } = toGregorian(jy, jm, jd)
    const date = new Date(gy, gm - 1, gd)
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

export function jalaliToDate(jy: number, jm: number, jd: number): Date {
  const { gy, gm, gd } = toGregorian(jy, jm, jd)
  return new Date(gy, gm - 1, gd)
}