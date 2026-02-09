<template>
  <VContainer class="d-flex align-center justify-center" style="min-height: 70vh;">
    <VCard max-width="480" rounded="lg" class="login-card">
      <VCardTitle class="text-center">{{ $t('Welcome Back') }}</VCardTitle>
      <VCardText>
        <span class="d-block mb-2 font-weight-medium">{{ $t('Email') }}</span>
        <VTextField v-model="email" variant="outlined" density="compact" />
        <span class="d-block mb-2 font-weight-medium">{{ $t('Password') }}</span>
        <VTextField v-model="password" variant="outlined" density="compact" class="rounded-12"
          :type="show ? 'text' : 'password'" :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="show = !show" />
      </VCardText>
      <VCardActions class="px-4">
        <VBtn variant="elevated" color="blue" block class="rounded-lg" @click="login">{{ $t('Login') }}</VBtn>
      </VCardActions>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const show = ref(false)
const auth = useAuthStore()

definePageMeta({ layout: 'login' })

function fill(type: 'admin' | 'guest') {
  if (type === 'admin') { email.value = 'admin'; password.value = 'admin123' }
  else { email.value = 'guest'; password.value = 'guest123' }
}

function login() {
  const ok = auth.loginWithCredentials(email.value, password.value)
  if (ok) navigateTo('/')
  else alert($t('Invalid credentials'))
}

useSeoMeta({ title: $t('Login') })
</script>
