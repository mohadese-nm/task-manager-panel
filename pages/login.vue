<template>
  <VContainer class="d-flex align-center justify-center" style="min-height: 70vh;">
    <VCard max-width="480">
      <VCardTitle>{{ $t('Login') }}</VCardTitle>
      <VCardText>
        <VAlert type="info" variant="tonal" class="mb-4">
          {{ $t('Usernames and password:') }}
          <div class="mt-2">- admin / admin123 ({{ $t('has permision') }})</div>
          <div>- guest / guest123 ({{ $t('no permision') }})</div>
        </VAlert>
        <VTextField v-model="username" :label="$t('Username')" prepend-inner-icon="mdi-account" />
        <VTextField v-model="password" :type="show ? 'text' : 'password'" :label="$t('Password')" prepend-inner-icon="mdi-lock"
          :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="show = !show" />
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn variant="tonal" @click="fill('admin')">{{ $t('Admin') }}</VBtn>
        <VBtn variant="tonal" @click="fill('guest')">{{ $t('Guest') }}</VBtn>
        <VBtn variant="elevated" color="blue" @click="login">{{ $t('Login') }}</VBtn>
      </VCardActions>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const show = ref(false)
const auth = useAuthStore()

definePageMeta({ layout: 'login' })

function fill(type: 'admin' | 'guest') {
  if (type === 'admin') { username.value = 'admin'; password.value = 'admin123' }
  else { username.value = 'guest'; password.value = 'guest123' }
}

function login() {
  const ok = auth.loginWithCredentials(username.value, password.value)
  if (ok) navigateTo('/')
  else alert($t('Invalid credentials'))
}

useSeoMeta({ title: $t('Login') })
</script>


