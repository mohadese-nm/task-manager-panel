<template>
  <VContainer fluid class="dashboard-page py-4 py-sm-6 px-3 px-sm-6" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
    <h1 class="dashboard-page__title font-weight-bold mb-4 mb-sm-6">{{ $t('Task Dashboard') }}</h1>

    <h2 class="dashboard-page__subtitle font-weight-medium mb-3 mb-sm-4">{{ $t('Today at a Glance') }}</h2>
    <VRow dense>
      <VCol cols="12" sm="6" lg="3">
        <VCard class="dashboard-stat-card dashboard-stat-card--due-today" elevation="0" rounded="lg">
          <VCardText class="dashboard-stat-card__body">
            <VIcon icon="mdi-calendar-today" size="28" class="dashboard-stat-card__icon" color="yellowDark" />
            <div class="dashboard-stat-card__content">
              <div class="text-caption text-medium-emphasis">{{ $t('Tasks Due Today') }}</div>
              <div class="font-weight-bold dashboard-stat-card__number">{{ counts?.dueToday ?? 0 }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6" lg="3">
        <VCard class="dashboard-stat-card dashboard-stat-card--upcoming" elevation="0" rounded="lg">
          <VCardText class="dashboard-stat-card__body">
            <VIcon icon="mdi-clock-outline" size="28" class="dashboard-stat-card__icon" color="purpleDark" />
            <div class="dashboard-stat-card__content">
              <div class="text-caption text-medium-emphasis">{{ $t('Upcoming This Week') }}</div>
              <div class="font-weight-bold dashboard-stat-card__number">{{ counts?.upcomingWeek ?? 0 }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6" lg="3">
        <VCard class="dashboard-stat-card dashboard-stat-card--completed" elevation="0" rounded="lg">
          <VCardText class="dashboard-stat-card__body">
            <VIcon icon="mdi-check-circle-outline" size="28" class="dashboard-stat-card__icon" color="primaryDark" />
            <div class="dashboard-stat-card__content">
              <div class="text-caption text-medium-emphasis">{{ $t('Tasks Completed Today') }}</div>
              <div class="font-weight-bold dashboard-stat-card__number">{{ counts?.completedToday ?? 0 }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6" lg="3">
        <VCard class="dashboard-stat-card dashboard-stat-card--overdue" elevation="0" rounded="lg">
          <VCardText class="dashboard-stat-card__body">
            <VIcon icon="mdi-alert" size="28" class="dashboard-stat-card__icon" color="errorDark" />
            <div class="dashboard-stat-card__content">
              <div class="text-caption text-medium-emphasis">{{ $t('Overdue Tasks') }}</div>
              <div class="font-weight-bold dashboard-stat-card__number">{{ counts?.overdue ?? 0 }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useTasksStore } from '@/stores/tasks'

const { locale } = useI18n()
const tasksStore = useTasksStore()
const { dashboardCounts: counts } = storeToRefs(tasksStore)

onMounted(() => {
  tasksStore.init()
})

useSeoMeta({
  title: () => 'Task Dashboard',
  description: () => 'Home Page'
})
</script>
