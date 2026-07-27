<template>
  <VDialog v-model="model" max-width="520" width="100%" content-class="app-dialog">
    <VCard class="app-dialog-card">
      <VCardTitle class="text-wrap">{{ editing ? $t('Edit Task') : $t('Create Task') }}</VCardTitle>
      <VCardText class="app-dialog-card__body">
        <VTextField v-model="title" :label="$t('Title')" />
        <VTextarea v-model="description" :label="$t('Description')" auto-grow />
        <VSelect :items="statusItems" v-model="status" :label="$t('Status')" />
        <div class="mb-4">
          <PersianDatePicker
            v-model="selectedDate"
            :label="$t('Due Date')"
            :placeholder="$t('Select Date')"
          />
        </div>
      </VCardText>
      <VCardActions class="flex-wrap ga-2">
        <VSpacer class="d-none d-sm-block" />
        <VBtn variant="text" @click="emit('update:modelValue', false)">{{ $t('Cancel') }}</VBtn>
        <VBtn color="primary" @click="save">{{ $t('Save') }}</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { TaskStatus, type Task } from '@/types/models'

const props = defineProps<{
  modelValue: boolean
  editing: Task | null
  date: Date
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'save', payload: { date: Date, task: Omit<Task, 'id' | 'dueDate'>, editingId?: string }): void
}>()

const model = computed({ get: () => props.modelValue, set: (v: boolean) => emit('update:modelValue', v) })
const editing = computed(() => props.editing)

const title = ref('')
const description = ref('')
const status = ref<TaskStatus>(TaskStatus.Todo)
const selectedDate = ref<Date>(new Date())

function fillFromProps() {
  if (editing.value) {
    title.value = editing.value.title
    description.value = editing.value.description || ''
    status.value = editing.value.status
    selectedDate.value = editing.value.dueDate
  } else {
    title.value = ''
    description.value = ''
    status.value = TaskStatus.Todo
    selectedDate.value = props.date || new Date()
  }
  
  if (isNaN(selectedDate.value.getTime())) {
    selectedDate.value = new Date()
  }
}

watch(() => props.editing, () => { fillFromProps() }, { immediate: true })

watch(model, (open) => {
  if (!open) {
    title.value = ''
    description.value = ''
    status.value = TaskStatus.Todo
    selectedDate.value = props.date || new Date()
    
    if (isNaN(selectedDate.value.getTime())) {
      selectedDate.value = new Date()
    }
  }
})

onMounted(() => {
  fillFromProps()
})

const { t } = useI18n()

const statusItems = computed(() => [
  { title: t('To Do'), value: TaskStatus.Todo },
  { title: t('In Progress'), value: TaskStatus.InProgress },
  { title: t('Done'), value: TaskStatus.Done }
])

function save() {
  if (!selectedDate.value || isNaN(selectedDate.value.getTime())) {
    alert($t('Please select a valid date'))
    return
  }
  
  const payload = {
    date: selectedDate.value,
    task: { title: title.value, description: description.value, status: status.value }
  }
  
  if (editing.value) {
    emit('save', { ...payload, editingId: editing.value.id })
  } else {
    emit('save', payload)
  }
}
</script>