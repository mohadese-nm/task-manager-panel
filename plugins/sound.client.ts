type SoundApi = {
  playCreate: () => void
  playDone: () => void
}

function createBeep(frequency: number, duration: number = 200) {
  return () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    } catch (error) {
      console.warn('خطا در پخش صدا:', error)
    }
  }
}

export default defineNuxtPlugin(() => {
  const playCreate = createBeep(800, 150)
  const playDone = createBeep(600, 200)

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