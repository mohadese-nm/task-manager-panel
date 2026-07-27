<template>
  <VContainer fluid class="admin-page py-3 py-sm-4 px-2 px-sm-4">
    <div class="filter-bar">
      <VRow align="center" dense>
        <VCol cols="12" sm="6" lg="4">
          <VTextField class="outlined-primary" variant="outlined" v-model="search" :label="$t('Search')" prepend-inner-icon="mdi-magnify" clearable hide-details density="compact" />
        </VCol>
        <VCol cols="12" sm="6" lg="2">
          <VSelect class="outlined-primary" variant="outlined" v-model="dateRangeFilter" :items="dateRangeItems" :label="$t('Date Range')" hide-details density="compact" />
        </VCol>
        <VCol cols="12" sm="6" lg="2">
          <VSelect class="outlined-primary" variant="outlined" v-model="sortBy" :items="sortByItems" :label="$t('Sort By')" hide-details density="compact" />
        </VCol>
        <VCol cols="12" sm="6" lg="2">
          <VSelect class="outlined-primary" variant="outlined" v-model="sortOrder" :items="sortOrderItems" :label="$t('Sort Order')" hide-details density="compact" />
        </VCol>
        <VCol cols="12" lg="2">
          <div class="filter-bar__actions">
            <VBtn color="primary" variant="elevated" rounded="lg" size="small" class="text-white filter-bar__create-btn" append-icon="mdi-plus" @click="openCreate">
              {{ $t('Create Task') }}
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </div>

    <!-- Mobile: one column per tab -->
    <div class="kanban-tabs d-md-none" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
      <VTabs v-model="mobileTab" grow color="primary" class="kanban-tabs__nav mb-3" density="comfortable">
        <VTab
          v-for="col in kanbanColumns"
          :key="col.status"
          :value="col.status"
          :class="['kanban-tabs__tab', col.class]"
        >
          {{ col.title }}
          <VChip size="x-small" class="ms-1" label variant="tonal">
            {{ visibleTasksForStatus(col.status).length }}
          </VChip>
        </VTab>
      </VTabs>

      <VCard
        v-for="col in kanbanColumns"
        v-show="mobileTab === col.status"
        :key="`mobile-${col.status}`"
        :class="['kanban-column', col.class]"
        :dir="locale === 'fa' ? 'rtl' : 'ltr'"
      >
        <VCardText
          class="kanban-column-content pt-2"
          @dragover.prevent="onColumnDragover($event, col.status)"
          @drop="onColumnDrop(col.status)"
        >
          <div class="d-flex flex-column gap-2">
            <TaskItem
              v-for="t in visibleTasksForStatus(col.status)"
              :key="t.id"
              :task="t"
              class="mb-2"
              draggable="true"
              @dragstart="dragStart(t.id)"
              @edit="onEdit"
              @remove="onRemove"
              @toggle="onToggle"
            />
          </div>
        </VCardText>
      </VCard>
    </div>

    <!-- Desktop / tablet: 3-column board -->
    <VRow class="kanban-row d-none d-md-flex" dense>
      <VCol v-for="col in kanbanColumns" :key="col.status" cols="12" md="4">
        <VCard :class="['kanban-column', col.class]" :title="col.title" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
          <VCardText
            class="kanban-column-content pt-2"
            @dragover.prevent="onColumnDragover($event, col.status)"
            @drop="onColumnDrop(col.status)"
          >
            <div class="d-flex flex-column gap-2">
              <TaskItem
                v-for="t in visibleTasksForStatus(col.status)"
                :key="t.id"
                :task="t"
                class="mb-2"
                draggable="true"
                @dragstart="dragStart(t.id)"
                @edit="onEdit"
                @remove="onRemove"
                @toggle="onToggle"
              />
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <component :is="TaskDialog" v-model="dialog" :editing="editingTask" :date="dialogDate" @save="onSave" />
  </VContainer>
  <VDialog v-model="confirmDelete" max-width="420" width="100%" content-class="app-dialog">
    <VCard class="app-dialog-card">
      <VCardTitle class="text-wrap">{{ $t('Delete Confirmation') }}</VCardTitle>
      <VCardText>
        {{ $t('Are you sure you want to delete this task?') }}
        <div class="text-medium-emphasis mt-2 text-wrap">{{ taskToDelete?.title }}</div>
      </VCardText>
      <VCardActions class="flex-wrap ga-2">
        <VSpacer class="d-none d-sm-block" />
        <VBtn variant="text" @click="confirmDelete = false">{{ $t('Cancel') }}</VBtn>
        <VBtn color="error" @click="confirmDeleteYes">{{ $t('Delete') }}</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <VSnackbar v-model="snackbar.show" :color="snackbar.color" location="top" timeout="2500">
    {{ snackbar.text }}
    <template #actions>
      <VBtn variant="text" size="small" @click="snackbar.show = false">{{ $t('Close') }}</VBtn>
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
const { setSearch, init, moveTask, addTask, updateTask, removeTask } = tasksStore
const { tasksByStatus, searchText } = storeToRefs(tasksStore)
const week = useWeek()
const { applyFilter } = useFilter()
const nuxtApp = useNuxtApp()
const { $sound } = nuxtApp
const { t, locale } = useI18n()

const search = computed({
  get: () => searchText.value,
  set: (v: string) => setSearch(v)
})

const kanbanColumns = computed(() => [
  { status: TaskStatus.Todo, title: t('To Do'), class: 'column-todo' },
  { status: TaskStatus.InProgress, title: t('In Progress'), class: 'column-inprogress' },
  { status: TaskStatus.Done, title: t('Done'), class: 'column-done' }
])

type DateRangeFilter = 'all' | 'this_week'
type SortByOption = 'dueDate' | 'createdAt'
type SortOrderOption = 'asc' | 'desc'

const dateRangeFilter = ref<DateRangeFilter>('all')
const sortBy = ref<SortByOption>('dueDate')
const sortOrder = ref<SortOrderOption>('asc')

const dateRangeItems = computed(() => [
  { title: t('All'), value: 'all' as DateRangeFilter },
  { title: t('This Week'), value: 'this_week' as DateRangeFilter }
])
const sortByItems = computed(() => [
  { title: t('Due Date'), value: 'dueDate' as SortByOption },
  { title: t('Created At'), value: 'createdAt' as SortByOption }
])
const sortOrderItems = computed(() => [
  { title: t('Oldest First'), value: 'asc' as SortOrderOption },
  { title: t('Newest First'), value: 'desc' as SortOrderOption }
])

const mobileTab = ref<TaskStatus>(TaskStatus.Todo)
const draggingId = ref<string | null>(null)
const dialog = ref(false)
const editingTask = ref<Task | null>(null)
const dialogDate = ref<Date>(new Date())
const confirmDelete = ref(false)
const taskToDelete = ref<Task | null>(null)
const snackbar = reactive<{ show: boolean; text: string; color: string }>({ show: false, text: '', color: 'success' })

function notify(text: string, color: string = 'success') {
  snackbar.text = text
  snackbar.color = color
  snackbar.show = true
}

const $soundTyped = $sound as { playCreate: () => void; playDone: () => void }

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
function onRemove(task: Task) {
  taskToDelete.value = task
  confirmDelete.value = true
}
function confirmDeleteYes() {
  if (taskToDelete.value) {
    removeTask(taskToDelete.value.id)
    notify($t('Task deleted'), 'error')
  }
  confirmDelete.value = false
  taskToDelete.value = null
}
function onToggle(task: Task) {
  const next = task.status === TaskStatus.Done ? TaskStatus.Todo : TaskStatus.Done
  updateTask(task.id, (t) => ({ ...t, status: next }))
  if (next === TaskStatus.Done) $soundTyped.playDone()
}
function onSave(payload: { date: Date; task: Omit<Task, 'id' | 'dueDate'>; editingId?: string }) {
  if (payload.editingId) {
    const id = payload.editingId
    const original = editingTask.value
    if (original && payload.date.toDateString() !== original.dueDate.toDateString()) {
      moveTask(id, payload.date)
    }
    updateTask(id, (t) => ({ ...t, ...payload.task }))
    notify($t('Task updated'), 'info')
  } else {
    addTask(payload.date, payload.task)
    $soundTyped.playCreate()
    notify($t('Task created'), 'success')
  }
  dialog.value = false
}

function visibleTasksForStatus(status: TaskStatus) {
  const byStatus = tasksByStatus.value ?? {}
  let list = byStatus[status] ?? []
  list = applyFilter(list, search.value, 'all')
  if (dateRangeFilter.value === 'this_week') {
    list = list.filter(t => week.isInThisWeek(t.dueDate))
  }
  const key = sortBy.value === 'createdAt' ? (t: Task) => (t.createdAt || t.dueDate).getTime() : (t: Task) => t.dueDate.getTime()
  const dir = sortOrder.value === 'asc' ? 1 : -1
  list = [...list].sort((a, b) => (key(a) - key(b)) * dir)
  return list
}
function onColumnDragover(evt: DragEvent, _status: TaskStatus) {
  evt.preventDefault()
  if (evt.dataTransfer) evt.dataTransfer.dropEffect = 'move'
}
function dragStart(id: string) { draggingId.value = id }
function onColumnDrop(targetStatus: TaskStatus) {
  if (!draggingId.value) return
  updateTask(draggingId.value, (t) => ({ ...t, status: targetStatus }))
  draggingId.value = null
}

onMounted(() => {
  init()
  if (import.meta.client) {
    window.addEventListener('storage', (e) => {
      if (e.key === 'tasks_v2' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          if (Array.isArray(parsed)) {
            tasksStore.tasks = parsed.map((t: any) => ({
              ...t,
              dueDate: new Date(t.dueDate),
              createdAt: t.createdAt ? new Date(t.createdAt) : new Date(t.dueDate)
            }))
          }
        } catch {}
      }
    })
  }
})

useSeoMeta({ title: $t('To Do') })
</script>


