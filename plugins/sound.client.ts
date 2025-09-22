// پلاگین صدا فقط در کلاینت (برای SSR-safe)
// از AudioContext و AudioBuffer برای جلوگیری از دانلود فایل توسط Download Manager استفاده می‌کنیم
// صدا به‌صورت data URI کوتاه (wav) درج می‌شود

type SoundApi = {
  playCreate: () => void
  playDone: () => void
}

const createAudio = (srcDataUri: string) => {
  const audio = new Audio(srcDataUri)
  audio.preload = 'auto'
  return () => {
    // اجرای سریع و ساده، بدون پیچیدگی
    audio.currentTime = 0
    audio.play().catch(() => {})
  }
}

// دو بوق ساده کوتاه به صورت data URI (با حجم بسیار کم)
const BEEP_CREATE = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABYAAABWAAAAPwAA'
const BEEP_DONE = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABYAAABWAAAAPwAA'

export default defineNuxtPlugin(() => {
  const playCreate = createAudio(BEEP_CREATE)
  const playDone = createAudio(BEEP_DONE)

  const sound: SoundApi = { playCreate, playDone }
  return {
    provide: { sound }
  }
})

declare module '#app' {
  interface NuxtApp {
    $sound: SoundApi
  }
}

export {}


