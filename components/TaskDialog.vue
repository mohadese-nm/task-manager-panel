<template>
  <VDialog v-model="model" max-width="520">
    <VCard>
      <VCardTitle>{{ editing ? 'ویرایش تسک' : 'ایجاد تسک' }}</VCardTitle>
      <VCardText>
        <VTextField v-model="title" label="عنوان" />
        <VTextarea v-model="description" label="توضیحات" auto-grow />
        <VSelect :items="statusItems" v-model="status" label="وضعیت" />
        <div class="mb-4">
          <PersianDatePicker
            v-model="selectedDate"
            label="تاریخ سررسید"
            placeholder="انتخاب تاریخ"
          />
        </div>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn variant="text" @click="emit('update:modelValue', false)">انصراف</VBtn>
        <VBtn color="primary" @click="save">ذخیره</VBtn>
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
    selectedDate.value = getTodayConsistent()
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
      selectedDate.value = getTodayConsistent()
    }
  }
})

onMounted(() => {
  fillFromProps()
})

const statusItems = [
  { title: 'انجام نشده', value: TaskStatus.Todo },
  { title: 'در حال انجام', value: TaskStatus.InProgress },
  { title: 'انجام شده', value: TaskStatus.Done }
]

function save() {
  if (!selectedDate.value || isNaN(selectedDate.value.getTime())) {
    alert('لطفا تاریخ معتبر انتخاب کنید.')
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