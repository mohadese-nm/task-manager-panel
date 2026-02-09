<template>
  <VContainer class="py-6" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
    <h1 class="text-h4 font-weight-bold mb-6">{{ $t('Task Dashboard') }}</h1>

    <h2 class="text-h6 font-weight-medium mb-4">{{ $t('Today at a Glance') }}</h2>
    <VRow>
      <VCol cols="12" sm="6" md="3">
        <VCard class="dashboard-stat-card--due-today" elevation="0" rounded="lg">
          <VCardText class="d-flex align-start pa-4">
            <VIcon icon="mdi-calendar-today" size="32" class="dashboard-stat-card__icon mr-3" color="yellowDark" />
            <div>
              <div class="text-caption text-medium-emphasis">{{ $t('Tasks Due Today') }}</div>
              <div class="text-h4 font-weight-bold dashboard-stat-card__number">{{ counts?.dueToday ?? 0 }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6" md="3">
        <VCard class="dashboard-stat-card--upcoming" elevation="0" rounded="lg">
          <VCardText class="d-flex align-start pa-4">
            <VIcon icon="mdi-clock-outline" size="32" class="dashboard-stat-card__icon mr-3" color="purpleDark" />
            <div>
              <div class="text-caption text-medium-emphasis">{{ $t('Upcoming This Week') }}</div>
              <div class="text-h4 font-weight-bold dashboard-stat-card__number">{{ counts?.upcomingWeek ?? 0 }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6" md="3">
        <VCard class="dashboard-stat-card--completed" elevation="0" rounded="lg">
          <VCardText class="d-flex align-start pa-4">
            <VIcon icon="mdi-check-circle-outline" size="32" class="dashboard-stat-card__icon mr-3" color="primaryDark" />
            <div>
              <div class="text-caption text-medium-emphasis">{{ $t('Tasks Completed Today') }}</div>
              <div class="text-h4 font-weight-bold dashboard-stat-card__number">{{ counts?.completedToday ?? 0 }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6" md="3">
        <VCard class="dashboard-stat-card--overdue" elevation="0" rounded="lg">
          <VCardText class="d-flex align-start pa-4">
            <VIcon icon="mdi-alert" size="32" class="dashboard-stat-card__icon mr-3" color="errorDark" />
            <div>
              <div class="text-caption text-medium-emphasis">{{ $t('Overdue Tasks') }}</div>
              <div class="text-h4 font-weight-bold dashboard-stat-card__number">{{ counts?.overdue ?? 0 }}</div>
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
