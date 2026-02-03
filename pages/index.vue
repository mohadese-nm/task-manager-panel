<template>
  <VContainer class="py-8">
    <VCard elevation="1" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
      <VCardTitle>{{ $t('Welcome') }}</VCardTitle>
      <VCardText>
        
      </VCardText>
    </VCard>
  </VContainer>
  
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
useSeoMeta({
  title: $t('Home'),
  description: $t('Home Page')
})
</script>


