<template>
  <VDialog v-model="model" max-width="520">
    <VCard>
      <VCardTitle>{{ editing ? 'ویرایش تسک' : 'ایجاد تسک' }}</VCardTitle>
      <VCardText>
        <VTextField v-model="title" label="عنوان" />
        <VTextarea v-model="description" label="توضیحات" auto-grow />
        <VSelect :items="statusItems" v-model="status" label="وضعیت" />
        <VTextField v-model="dateJalali" label="تاریخ سررسید (شمسی 1404/07/01)" />
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
import { isoToJalali, jalaliStrToIso } from '@/utils/jalali'

const props = defineProps<{
  modelValue: boolean
  editing: Task | null
  date: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'save', payload: { dateIso: string, task: Omit<Task, 'id' | 'dueDate'>, editingId?: string }): void
}>()

const model = computed({ get: () => props.modelValue, set: (v: boolean) => emit('update:modelValue', v) })
const editing = computed(() => props.editing)

const title = ref('')
const description = ref('')
const status = ref<TaskStatus>(TaskStatus.Todo)

// تاریخ شمسی که کاربر وارد می‌کند (YYYY/MM/DD)
const dateJalali = ref<string>('')

function fillFromProps() {
  if (editing.value) {
    title.value = editing.value.title
    description.value = editing.value.description || ''
    status.value = editing.value.status
    dateJalali.value = isoToJalali(editing.value.dueDate)
  } else {
    title.value = ''
    description.value = ''
    status.value = TaskStatus.Todo
    const baseIso = props.date || new Date().toISOString().slice(0, 10)
    dateJalali.value = isoToJalali(baseIso)
  }
}

watch(() => props.editing, () => { fillFromProps() }, { immediate: true })

watch(model, (open) => {
  if (!open) {
    // ریست فرم هنگام بستن دیالوگ تا داده‌های قبلی باقی نماند
    title.value = ''
    description.value = ''
    status.value = TaskStatus.Todo
    const baseIso = props.date || new Date().toISOString().slice(0, 10)
    dateJalali.value = isoToJalali(baseIso)
  }
})

const statusItems = [
  { title: 'انجام نشده', value: TaskStatus.Todo },
  { title: 'در حال انجام', value: TaskStatus.InProgress },
  { title: 'انجام شده', value: TaskStatus.Done }
]

function save() {
  // اعتبارسنجی فرمت YYYY/MM/DD برای تاریخ شمسی
  if (!/^\d{4}\/\d{2}\/\d{2}$/.test(dateJalali.value)) {
    alert('تاریخ شمسی نامعتبر است. فرمت صحیح: 1404/07/01')
    return
  }
  const iso = jalaliStrToIso(dateJalali.value)
  if (!iso) {
    alert('تاریخ شمسی نامعتبر است.')
    return
  }
  const payload = {
    dateIso: iso,
    task: { title: title.value, description: description.value, status: status.value }
  }
  if (editing.value) {
    emit('save', { ...payload, editingId: editing.value.id })
  } else {
    emit('save', payload)
  }
}
</script>


