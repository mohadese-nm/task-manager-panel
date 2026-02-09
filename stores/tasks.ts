import { defineStore } from 'pinia'
import type { Task } from '@/types/models'
import { TaskStatus } from '@/types/models'

/**
 * Tasks store – flat list of tasks.
 * - Each task has dueDate and status; we do not group by "days".
 * - addTask(dueDate, partial): add one task with that due date.
 * - updateTask / removeTask / moveTask: work on the flat list.
 * - Getters filter by status (tasksByStatus) or by date (dashboard counts).
 */
const STORAGE_KEY = 'tasks_v2'
const LEGACY_KEY = 'tasks_days_v1'

/** Compare by calendar day (ignore time). */
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function createMockTasks(): Task[] {
  const createdStart = new Date(2025, 8, 20)
  const createdEnd = new Date(2026, 1, 8)
  const dueEnd = new Date(2026, 5, 20)
  const dayMs = 24 * 60 * 60 * 1000
  const count = 40
  const tasks: Task[] = []
  for (let i = 0; i < count; i++) {
    const createdMs = createdStart.getTime() + (i / (count - 1 || 1)) * (createdEnd.getTime() - createdStart.getTime())
    const createdAt = new Date(createdMs)
    const createdTime = createdAt.getTime()
    const maxDueMs = dueEnd.getTime()
    const minDueMs = createdTime + 2 * dayMs
    const dueSpan = Math.max(0, maxDueMs - minDueMs)
    const dueOffset = ((i * 7) % 17) * dayMs
    const dueMs = Math.min(minDueMs + (dueOffset % dueSpan), maxDueMs)
    const dueDate = new Date(dueMs)
    tasks.push({
      id: `mock-${createdAt.toISOString().slice(0, 10)}-${i + 1}`,
      title: `Task ${i + 1}`,
      description: `Description for task ${i + 1}`,
      status: i % 3 === 0 ? TaskStatus.Todo : i % 3 === 1 ? TaskStatus.InProgress : TaskStatus.Done,
      dueDate: new Date(dueDate),
      createdAt: new Date(createdAt)
    })
  }
  return tasks
}

function parseTask(t: any): Task {
  return {
    ...t,
    dueDate: new Date(t.dueDate),
    createdAt: t.createdAt ? new Date(t.createdAt) : new Date(t.dueDate)
  }
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    searchText: '',
    statusFilter: 'all' as TaskStatus | 'all'
  }),

  getters: {
    tasksByStatus(state) {
      const all = state.tasks ?? []
      const sort = (a: Task, b: Task) => (b.createdAt || b.dueDate).getTime() - (a.createdAt || a.dueDate).getTime()
      return {
        [TaskStatus.Todo]: all.filter((t: Task) => t.status === TaskStatus.Todo).sort(sort),
        [TaskStatus.InProgress]: all.filter((t: Task) => t.status === TaskStatus.InProgress).sort(sort),
        [TaskStatus.Done]: all.filter((t: Task) => t.status === TaskStatus.Done).sort(sort)
      }
    },

    tasksDueToday(state): Task[] {
      const all = state.tasks ?? []
      const today = startOfDay(new Date())
      return all.filter(t => isSameDay(startOfDay(t.dueDate), today))
    },

    upcomingThisWeek(state): Task[] {
      const all = state.tasks ?? []
      const today = startOfDay(new Date())
      const end = new Date(today)
      end.setDate(end.getDate() + 6)
      end.setHours(23, 59, 59, 999)
      return all.filter(t => {
        const d = t.dueDate.getTime()
        return d >= today.getTime() && d <= end.getTime()
      })
    },

    tasksCompletedToday(state): Task[] {
      const all = state.tasks ?? []
      const today = startOfDay(new Date())
      return all.filter(t => t.status === TaskStatus.Done && isSameDay(startOfDay(t.dueDate), today))
    },

    overdueTasks(state): Task[] {
      const all = state.tasks ?? []
      const today = startOfDay(new Date())
      return all.filter(t => startOfDay(t.dueDate).getTime() < today.getTime() && t.status !== TaskStatus.Done)
    },

    dashboardCounts(state) {
      const all = state.tasks ?? []
      const today = startOfDay(new Date())
      const endWeek = new Date(today)
      endWeek.setDate(endWeek.getDate() + 6)
      endWeek.setHours(23, 59, 59, 999)
      let dueToday = 0
      let upcomingWeek = 0
      let completedToday = 0
      let overdue = 0
      for (const t of all) {
        const dueDay = startOfDay(t.dueDate).getTime()
        const dueTime = t.dueDate.getTime()
        if (dueDay === today.getTime()) {
          dueToday += 1
          if (t.status === TaskStatus.Done) completedToday += 1
        }
        if (dueTime >= today.getTime() && dueTime <= endWeek.getTime()) upcomingWeek += 1
        if (dueDay < today.getTime() && t.status !== TaskStatus.Done) overdue += 1
      }
      return { dueToday, upcomingWeek, completedToday, overdue }
    }
  },

  actions: {
    init() {
      if (!import.meta.client) {
        this.tasks = createMockTasks()
        return
      }
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          this.tasks = Array.isArray(parsed) ? parsed.map(parseTask) : createMockTasks()
          return
        } catch {
          this.tasks = createMockTasks()
          this.persist()
          return
        }
      }
      const legacy = localStorage.getItem(LEGACY_KEY)
      if (legacy) {
        try {
          const days = JSON.parse(legacy) as any[]
          const flat = days.flatMap((day: any) => (day.tasks || []).map((t: any) => parseTask({ ...t, dueDate: day.date || t.dueDate })))
          this.tasks = flat
          this.persist()
          localStorage.removeItem(LEGACY_KEY)
          return
        } catch {}
      }
      this.tasks = createMockTasks()
      this.persist()
    },

    persist() {
      if (!import.meta.client) return
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks))
      window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }))
    },

    setSearch(text: string) {
      this.searchText = text
    },
    setStatusFilter(filter: TaskStatus | 'all') {
      this.statusFilter = filter
    },

    addTask(dueDate: Date, partial: Omit<Task, 'id' | 'dueDate' | 'createdAt'>) {
      const task: Task = {
        id: crypto.randomUUID(),
        dueDate: new Date(dueDate),
        createdAt: new Date(),
        ...partial
      }
      this.tasks.unshift(task)
      this.persist()
    },

    updateTask(taskId: string, updater: (t: Task) => Task) {
      const i = this.tasks.findIndex(t => t.id === taskId)
      if (i !== -1) {
        this.tasks[i] = updater(this.tasks[i])
        this.persist()
      }
    },

    removeTask(taskId: string) {
      const i = this.tasks.findIndex(t => t.id === taskId)
      if (i !== -1) {
        this.tasks.splice(i, 1)
        this.persist()
      }
    },

    moveTask(taskId: string, toDate: Date) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.dueDate = new Date(toDate)
        this.persist()
      }
    }
  }
})
