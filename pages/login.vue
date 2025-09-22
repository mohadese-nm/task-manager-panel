<template>
  <VContainer class="d-flex align-center justify-center" style="min-height: 70vh;">
    <VCard max-width="480">
      <VCardTitle>ورود</VCardTitle>
      <VCardText>
        <VAlert type="info" variant="tonal" class="mb-4">
          نام‌های کاربری و رمز عبور:
          <div class="mt-2">- admin / admin123 (دارای پرمیشن منوی "برای انجام")</div>
          <div>- guest / guest123 (بدون پرمیشن)</div>
        </VAlert>
        <VTextField v-model="username" label="نام کاربری" prepend-inner-icon="mdi-account" />
        <VTextField v-model="password" :type="show ? 'text' : 'password'" label="رمز عبور" prepend-inner-icon="mdi-lock"
          :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="show = !show" />
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn variant="tonal" @click="fill('admin')">ادمین</VBtn>
        <VBtn variant="tonal" @click="fill('guest')">مهمان</VBtn>
        <VBtn variant="elevated" color="blue" @click="login">ورود</VBtn>
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
  else alert('اطلاعات ورود نادرست است')
}

useSeoMeta({ title: 'ورود' })
</script>


