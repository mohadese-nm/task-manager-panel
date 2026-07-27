<template>
  <VCard :class="['task-card', statusClass, { 'task-card-done': task.status === TaskStatus.Done }]" elevation="2"
    class="mb-2 px-2 py-2" :dir="locale === 'fa' ? 'rtl' : 'ltr'">

    <div class="task-card__header">
      <div class="task-card__main">
        <VCheckboxBtn :model-value="task.status === TaskStatus.Done" @click.stop="toggle()" class="flex-shrink-0" />
        <div class="task-card__title text-subtitle-2">{{ task.title }}</div>
        <VChip :color="chipColor" size="small" label variant="tonal" class="task-card__chip flex-shrink-0">
          {{ statusLabel }}
        </VChip>
      </div>
      <VMenu>
        <template #activator="{ props: mProps }">
          <VBtn v-bind="mProps" icon variant="text" density="comfortable" class="task-card__menu flex-shrink-0" rounded="lg">
            <VIcon icon="mdi-dots-vertical" />
          </VBtn>
        </template>
        <VList density="compact">
          <VListItem value="edit" @click.stop="emit('edit', task)">
            <template #append>
              <VIcon icon="mdi-pencil-outline" />
            </template>
            <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
          </VListItem>
          <VListItem value="remove" @click.stop="emit('remove', task)">
            <template #append>
              <VIcon icon="mdi-delete-outline" color="error" />
            </template>
            <VListItemTitle class="text-error">{{ $t('Delete') }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </div>

    <div class="mt-2 px-2">
      <div class="task-card__desc text-caption text-medium-emphasis">
        {{ displayDesc }}
        <VBtn v-if="!showFull && (task.description || '').length > 60" variant="text" size="x-small" class="px-1"
          color="primary" @click.stop="showFull = true">
          {{ $t('More') }}
        </VBtn>
        <VBtn v-else-if="showFull && (task.description || '').length > 60" variant="text" size="x-small" class="px-1"
          color="primary" @click.stop="showFull = false">
          {{ $t('Less') }}
        </VBtn>
      </div>
      <div class="task-card__meta text-caption text-disabled mt-1" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
        <span>{{ $t('Due Date') }}: {{ formatDate(task.dueDate) }}</span>
        <span>{{ $t('Created At') }}: {{ createdLabel }}</span>
      </div>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import { TaskStatus, type Task } from '@/types/models'
import { useFormatDate } from '@/composables/useFormatDate'

const props = defineProps<{ task: Task }>()
const emit = defineEmits<{
  (e: 'edit', t: Task): void
  (e: 'remove', t: Task): void
  (e: 'toggle', t: Task): void
}>()

const { formatDate, locale } = useFormatDate()
const { t } = useI18n()

function toggle() { emit('toggle', props.task) }

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
  if (props.task.status === TaskStatus.Todo) return t('To Do')
  if (props.task.status === TaskStatus.InProgress) return t('In Progress')
  return t('Done')
})

const createdLabel = computed(() => {
  const d = props.task.createdAt || props.task.dueDate
  if (!d) return '--'
  return formatDate(d instanceof Date ? d : new Date(d))
})

</script>
