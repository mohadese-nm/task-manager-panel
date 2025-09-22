export function isoToJalali(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z')
  if (isNaN(d.getTime())) return todayJalali()
  const parts = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(d)
  const year = parts.find(p => p.type === 'year')?.value || ''
  const month = parts.find(p => p.type === 'month')?.value || ''
  const day = parts.find(p => p.type === 'day')?.value || ''
  return `${year}/${month}/${day}`
}

export function todayJalali(): string {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)
  const year = parts.find(p => p.type === 'year')?.value || ''
  const month = parts.find(p => p.type === 'month')?.value || ''
  const day = parts.find(p => p.type === 'day')?.value || ''
  return `${year}/${month}/${day}`
}

export function normalizeJalaliDigits(input: string): string {
  // تبدیل اعداد فارسی و عربی-هندی به انگلیسی و یکنواخت‌سازی جداکننده‌ها
  const persian = '۰۱۲۳۴۵۶۷۸۹'
  const arabic = '٠١٢٣٤٥٦٧٨٩'
  let out = ''
  for (const ch of input) {
    const pIdx = persian.indexOf(ch)
    if (pIdx !== -1) { out += String(pIdx); continue }
    const aIdx = arabic.indexOf(ch)
    if (aIdx !== -1) { out += String(aIdx); continue }
    // یکنواخت‌سازی جداکننده‌ها
    if (ch === '\\' || ch === '٬' || ch === '٫') { out += '/'; continue }
    out += ch
  }
  return out.replace(/[-_.\s]+/g, '/').trim()
}

export function jalaliStrToIso(jalaliStr: string): string | null {
  const norm = normalizeJalaliDigits(jalaliStr)
  const m = norm.match(/^(\d{4})[\/-](\d{2})[\/-](\d{2})$/)
  if (!m) return null
  const jy = parseInt(m[1], 10)
  const jm = parseInt(m[2], 10)
  const jd = parseInt(m[3], 10)
  if (!isValidJalaliDate(jy, jm, jd)) return null
  try {
    const { gy, gm, gd } = toGregorian(jy, jm, jd)
    const mm = String(gm).padStart(2, '0')
    const dd = String(gd).padStart(2, '0')
    const iso = `${gy}-${mm}-${dd}`
    return isValidIsoDate(iso) ? iso : null
  } catch {
    return null
  }
}

export function isValidIsoDate(iso: string): boolean {
  if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(iso)) return false
  const d = new Date(iso + 'T00:00:00Z')
  return !isNaN(d.getTime()) && iso === d.toISOString().slice(0, 10)
}

export function isValidJalaliDate(jy: number, jm: number, jd: number): boolean {
  if (jm < 1 || jm > 12) return false
  if (jd < 1) return false
  const ml = jalaliMonthLength(jy, jm)
  return jd <= ml
}

function jalaliMonthLength(jy: number, jm: number): number {
  if (jm <= 6) return 31
  if (jm <= 11) return 30
  return isJalaliLeap(jy) ? 30 : 29
}

function isJalaliLeap(jy: number): boolean {
  const { gy, march } = jalCal(jy)
  const jdnThis = g2d(gy, 3, march)
  const jdnNext = g2d(gy + 1, 3, jalCal(jy + 1).march)
  return (jdnNext - jdnThis) === 366
}

// jalaali-js minimal implementation
function div(a: number, b: number) { return Math.trunc(a / b) }
function jalCal(jy: number) {
  const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178]
  const bl = breaks.length
  let gy = jy + 621
  let leapJ = -14
  let jp = breaks[0]
  let jm = 0
  let jump = 0
  for (let i = 1; i < bl; i++) {
    jm = breaks[i]
    jump = jm - jp
    if (jy < jm) break
    leapJ = leapJ + div(jump, 33) * 8 + div((jump % 33), 4)
    jp = jm
  }
  let n = jy - jp
  leapJ = leapJ + div(n, 33) * 8 + div((n % 33) + 3, 4)
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150
  let march = 20 + leapJ - leapG
  if (jump - n === 4 && (jump % 33) === 4) march += 1
  return { gy, march }
}
function g2d(gy: number, gm: number, gd: number) {
  let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
  d += div(153 * ((gm + 9) % 12) + 2, 5)
  d += gd - 34840408
  d -= div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4)
  d += 752
  return d
}
function d2g(jdn: number) {
  let j = 4 * jdn + 139361631
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) - 3908
  const i = div((j % 1461), 4) * 5 + 308
  const gd = div((i % 153), 5) + 1
  const gm = (div(i, 153) % 12) + 1
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6)
  return { gy, gm, gd }
}
function j2d(jy: number, jm: number, jd: number) {
  const r = jalCal(jy)
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm - 1, 7) * (jm - 7) + jd - 1
}
function d2j(jdn: number) {
  const g = d2g(jdn)
  const gy = g.gy
  let jy = gy - 621
  const r = jalCal(jy)
  const jdn1f = g2d(g.gy, 3, r.march)
  let k = jdn - jdn1f
  let jm: number
  let jd: number
  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + div(k, 31)
      jd = 1 + (k % 31)
    } else {
      k -= 186
      jm = 7 + div(k, 30)
      jd = 1 + (k % 30)
    }
  } else {
    jy -= 1
    const r2 = jalCal(jy)
    const jdn2f = g2d(gy - 1, 3, r2.march)
    k = jdn - jdn2f
    if (k <= 185) {
      jm = 1 + div(k, 31)
      jd = 1 + (k % 31)
    } else {
      k -= 186
      jm = 7 + div(k, 30)
      jd = 1 + (k % 30)
    }
  }
  return { jy, jm, jd }
}
function toGregorian(jy: number, jm: number, jd: number) {
  const jdn = j2d(jy, jm, jd)
  return d2g(jdn)
}
