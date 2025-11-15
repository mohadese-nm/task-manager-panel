<template>
  <VContainer fluid class="py-4">
    <div class="filter-bar">
      <VRow align="center">
        <VCol cols="12" md="5">
          <VTextField class="outlined-primary" variant="outlined" v-model="search" label="جستجو" prepend-inner-icon="mdi-magnify" clearable hide-details />
        </VCol>
        <VCol cols="12" md="4">
          <VSelect class="outlined-primary" variant="outlined" :items="statusItems" v-model="status" label="فیلتر وضعیت" clearable hide-details />
        </VCol>
        <VCol cols="12" md="3" class="text-center text-md-right">
          <div class="d-flex gap-2 justify-end">
            <VBtn color="primary" variant="elevated" rounded="lg" size="large" class="text-white" append-icon="mdi-plus" @click="openCreate">
              افزودن تسک
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </div>

    <VRow class="week-scroll flex-nowrap">
      <VCol v-for="date in week.currentWeek" :key="date.toDateString()" cols="12" sm="6" md="4" lg="2" xl="2">
        <VCard :class="['day-card', { 'is-today': week.isToday(date), 'is-weekend': isWeekend(date) }]" :title="formatDate(date)" dir="rtl">
          <VCardText v-if="!isWeekend(date)" style="max-height: 70vh; overflow: auto;" @scroll.passive="onScroll(date, $event)">
            <div
              class="d-flex flex-column gap-2"
              @dragover.prevent
              @drop="onDrop(date)"
            >
              <TaskItem
                v-for="t in visibleTasks(date)"
                :key="t.id"
                :task="t"
                class="mb-4"
                draggable="true"
                @dragstart="dragStart(t.id)"
                @edit="onEdit"
                @remove="onRemove"
                @toggle="onToggle"
              />
            </div>
            <div v-if="loadingMore[date.toDateString()] && canLoadMore(date)" class="text-center py-2">در حال بارگذاری...</div>
          </VCardText>
          <VCardText v-else class="text-center py-12">
            روز تعطیل
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <component :is="TaskDialog" v-model="dialog" :editing="editingTask" :date="dialogDate" @save="onSave" />
  </VContainer>
  <VDialog v-model="confirmDelete" max-width="420">
    <VCard>
      <VCardTitle>تایید حذف</VCardTitle>
      <VCardText>
        آیا از حذف این تسک مطمئن هستید؟
        <div class="text-medium-emphasis mt-2">{{ taskToDelete?.title }}</div>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn variant="text" @click="confirmDelete = false">انصراف</VBtn>
        <VBtn color="error" @click="confirmDeleteYes">حذف</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <VSnackbar v-model="snackbar.show" :color="snackbar.color" location="top" timeout="2500">
    {{ snackbar.text }}
    <template #actions>
      <VBtn variant="text" size="small" @click="snackbar.show = false">بستن</VBtn>
    </template>
  </VSnackbar>
</template>

<script setup lang="ts">
const TaskDialog = defineAsyncComponent(() => import('@/components/TaskDialog.vue'))
import { storeToRefs } from 'pinia'
import { useTasksStore } from '@/stores/tasks'
import { useWeek } from '@/composables/useWeek'
import { useFilter } from '@/composables/useFilter'
import { TaskStatus, type Task } from '@/types/models'

const tasksStore = useTasksStore()
const { setSearch, setStatusFilter, init, moveTask, addTask, updateTask, removeTask } = tasksStore
const { days, searchText, statusFilter } = storeToRefs(tasksStore)
const week = useWeek()
const { applyFilter } = useFilter()

const search = computed({
  get: () => searchText.value,
  set: (v: string) => setSearch(v)
})
const status = computed({
  get: () => statusFilter.value,
  set: (v: any) => setStatusFilter(v || 'all')
})
const statusItems = [
  { title: 'همه', value: 'all' },
  { title: 'انجام نشده', value: TaskStatus.Todo },
  { title: 'در حال انجام', value: TaskStatus.InProgress },
  { title: 'انجام شده', value: TaskStatus.Done }
]

const perPage = 10
const visibleCount = reactive<Record<string, number>>({})
const loadingMore = reactive<Record<string, boolean>>({})
const draggingId = ref<string | null>(null)

onMounted(() => {
  init()
  for (const d of week.currentWeek) {
    visibleCount[d.toDateString()] = perPage
  }
  if (import.meta.client) {
    window.addEventListener('storage', (e) => {
      if (e.key === 'tasks_days_v1' && e.newValue) {
        try { 
          const parsed = JSON.parse(e.newValue) as any[]
          tasksStore.days = parsed.map(day => ({
            ...day,
            date: new Date(day.date),
            tasks: day.tasks.map((task: any) => ({
              ...task,
              dueDate: new Date(task.dueDate)
            }))
          }))
        } catch {}
      }
    })
  }
})

function visibleTasks(date: Date) {
  const day = days.value.find(d => {
    const dayDate = d.date instanceof Date ? d.date : new Date(d.date)
    return dayDate.toDateString() === date.toDateString()
  })
  const list = applyFilter(day ? day.tasks : [], search.value, status.value)
  return list.slice(0, visibleCount[date.toDateString()] || perPage)
}

function canLoadMore(date: Date) {
  const day = days.value.find(d => {
    const dayDate = d.date instanceof Date ? d.date : new Date(d.date)
    return dayDate.toDateString() === date.toDateString()
  })
  const total = applyFilter(day ? day.tasks : [], search.value, status.value).length
  const current = visibleCount[date.toDateString()] || perPage
  return current < total
}

function onScroll(date: Date, evt: Event) {
  const el = evt.target as HTMLElement
  const dateStr = date.toDateString()
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    if (loadingMore[dateStr]) return
    if (!canLoadMore(date)) return
    loadingMore[dateStr] = true
    setTimeout(() => {
      visibleCount[dateStr] = (visibleCount[dateStr] || perPage) + perPage
      loadingMore[dateStr] = false
    }, 400)
  }
}

function dragStart(id: string) { draggingId.value = id }
function onDrop(date: Date) {
  if (!draggingId.value) return
  moveTask(draggingId.value, date)
  draggingId.value = null
}

const dialog = ref(false)
const editingTask = ref<Task | null>(null)
const dialogDate = ref<Date>(new Date())

function openCreate() {
  editingTask.value = null
  dialogDate.value = week.todayDate
  dialog.value = true
}
function onEdit(task: Task) {
  editingTask.value = task
  dialogDate.value = task.dueDate
  dialog.value = true
}
const confirmDelete = ref(false)
const taskToDelete = ref<Task | null>(null)
function onRemove(task: Task) {
  taskToDelete.value = task
  confirmDelete.value = true
}
function confirmDeleteYes() {
  if (taskToDelete.value) {
    removeTask(taskToDelete.value.id)
    notify('تسک حذف شد', 'error')
  }
  confirmDelete.value = false
  taskToDelete.value = null
}
const { $sound } = useNuxtApp()

function onToggle(task: Task) {
  const next = task.status === TaskStatus.Done ? TaskStatus.Todo : TaskStatus.Done
  updateTask(task.id, (t) => ({ ...t, status: next }))
  if (next === TaskStatus.Done) $sound.playDone()
}
function onSave(payload: { date: Date, task: Omit<Task, 'id' | 'dueDate'>, editingId?: string }) {
  if (payload.editingId) {
    const id = payload.editingId
    const original = editingTask.value
    if (original && payload.date.toDateString() !== original.dueDate.toDateString()) {
      moveTask(id, payload.date)
    }
    updateTask(id, (t) => ({ ...t, ...payload.task }))
    notify('تسک ویرایش شد', 'info')
  } else {
    addTask(payload.date, payload.task)
    $sound.playCreate()
    notify('تسک ایجاد شد', 'success')
  }
  dialog.value = false
}

function formatDate(date: Date) {
  return date.toLocaleDateString('fa-IR', { weekday: 'long', month: 'short', day: 'numeric' })
}

useSeoMeta({ title: 'برای انجام' })

function isWeekend(date: Date) {
  const day = date.getDay()
  return day === 4 || day === 5
}

const snackbar = reactive<{ show: boolean; text: string; color: string }>({ show: false, text: '', color: 'success' })
function notify(text: string, color: string = 'success') {
  snackbar.text = text
  snackbar.color = color
  snackbar.show = true
}
</script>


