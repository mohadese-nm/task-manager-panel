<template>
  <VCard :class="['task-card', statusClass, { 'task-card-done': task.status === TaskStatus.Done }]" elevation="2" class="mb-2 px-2 py-2" dir="rtl">

    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center" style="gap: 8px">
        <VCheckboxBtn :model-value="task.status === TaskStatus.Done" @click.stop="toggle()" />
        <div class="text-subtitle-2">{{ task.title }}</div>
        <VChip
          :color="chipColor"
          size="small"
          label
          variant="tonal"
          class="mx-1"
        >
          {{ statusLabel }}
        </VChip>
      </div>
      <VMenu>
        <template #activator="{ props: mProps }">
          <VBtn v-bind="mProps" icon variant="text" density="comfortable" class="mx-0" rounded="lg">
            <VIcon icon="mdi-dots-vertical" />
          </VBtn>
        </template>
        <VList density="compact">
          <VListItem value="edit" @click.stop="emit('edit', task)">
            <template #append>
              <VIcon icon="mdi-pencil-outline" />
            </template>
            <VListItemTitle>ویرایش</VListItemTitle>
          </VListItem>
          <VListItem value="remove" @click.stop="emit('remove', task)">
            <template #append>
              <VIcon icon="mdi-delete-outline" color="error" />
            </template>
            <VListItemTitle class="text-error">حذف</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </div>

    <div class="mt-2 px-2">
      <div class="text-caption text-medium-emphasis" style="white-space: normal; word-break: break-word; overflow-wrap: anywhere;">
        {{ displayDesc }}
        <VBtn
          v-if="!showFull && (task.description || '').length > 60"
          variant="text"
          size="x-small"
          class="px-1"
          color="primary"
          @click.stop="showFull = true"
        >
          بیشتر
        </VBtn>
        <VBtn
          v-else-if="showFull && (task.description || '').length > 60"
          variant="text"
          size="x-small"
          class="px-1"
          color="primary"
          @click.stop="showFull = false"
        >
          کمتر
        </VBtn>
      </div>
      <div class="text-caption text-disabled mt-1" dir="rtl">{{ formatJalaliDate(task.dueDate) }}</div>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import { TaskStatus, type Task } from '@/types/models'

const props = defineProps<{ task: Task }>()
const emit = defineEmits<{
  (e: 'edit', t: Task): void
  (e: 'remove', t: Task): void
  (e: 'toggle', t: Task): void
}>()

function toggle() { emit('toggle', props.task) }

function formatJalaliDate(date: Date) {
  try {
    const parts = new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).formatToParts(date)
    const day = parts.find(p => p.type === 'day')?.value || ''
    const monthName = parts.find(p => p.type === 'month')?.value || ''
    const year = parts.find(p => p.type === 'year')?.value || ''
    return `${day} ${monthName} ${year}`
  } catch {
    return date.toLocaleDateString('fa-IR')
  }
}

const showFull = ref(false)
const displayDesc = computed(() => {
  const text = props.task.description || ''
  if (showFull.value) return text
  if (text.length <= 60) return text
  return text.slice(0, 60) + '...'
})

const statusClass = computed(() => {
  if (props.task.status === TaskStatus.Todo) return 'status-todo'
  if (props.task.status === TaskStatus.InProgress) return 'status-inprogress'
  return 'status-done'
})

const chipColor = computed(() => {
  if (props.task.status === TaskStatus.Todo) return 'warning'
  if (props.task.status === TaskStatus.InProgress) return 'info'
  return 'success'
})

const statusLabel = computed(() => {
  if (props.task.status === TaskStatus.Todo) return 'انجام نشده'
  if (props.task.status === TaskStatus.InProgress) return 'در حال انجام'
  return 'انجام شده'
})

</script>


