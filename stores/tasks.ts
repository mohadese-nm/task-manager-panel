import { defineStore } from 'pinia'
import type { Task, DayColumn } from '@/types/models'
import { TaskStatus } from '@/types/models'

interface TasksState {
  days: DayColumn[]
  searchText: string
  statusFilter: TaskStatus | 'all'
}

const todayIso = () => new Date().toISOString().slice(0, 10)

const weekStartSaturday = (base: Date): Date => {
  const day = base.getDay() // 0=Sun ... 6=Sat
  const diffToSaturday = (day + 1) % 7
  const start = new Date(base)
  start.setDate(base.getDate() - diffToSaturday)
  return start
}

const createMockWeek = (): DayColumn[] => {
  const start = weekStartSaturday(new Date())
  const days: DayColumn[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const iso = d.toISOString().slice(0, 10)
    const tasks: Task[] = Array.from({ length: 25 }).map((_, idx) => ({
      id: `${iso}-${idx + 1}`,
      title: `Task ${idx + 1}`,
      description: `${idx + 1} لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.`,
      status: idx % 3 === 0 ? TaskStatus.Todo : idx % 3 === 1 ? TaskStatus.InProgress : TaskStatus.Done,
      dueDate: iso
    }))
    days.push({ date: iso, tasks })
  }
  return days
}

const STORAGE_KEY = 'tasks_days_v1'

function sanitizeDays(days: DayColumn[]): DayColumn[] {
  // حذف الگوهای تاریخ در انتهای توضیحات مانند: " on 2025-09-22"
  const pattern = /\s+on\s+\d{4}-\d{2}-\d{2}$/
  for (const day of days) {
    for (const task of day.tasks) {
      if (task.description) {
        task.description = task.description.replace(pattern, '')
      }
    }
  }
  return days
}

export const useTasksStore = defineStore('tasks', {
  state: (): TasksState => ({
    days: [],
    searchText: '',
    statusFilter: 'all'
  }),
  getters: {
    dayByDate: (state) => {
      return (dateIso: string) => state.days.find(d => d.date === dateIso)
    }
  },
  actions: {
    init() {
      if (process.client) {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as DayColumn[]
            this.days = sanitizeDays(parsed)
            // در صورت تغییر، ذخیره مجدد برای پاک‌سازی دائمی
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.days))
          } catch {
            this.days = createMockWeek()
          }
        } else {
          this.days = createMockWeek()
          this.persist()
        }
      } else {
        this.days = createMockWeek()
      }
    },
    persist() {
      if (!process.client) return
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.days))
      window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }))
    },
    setSearch(text: string) {
      this.searchText = text
    },
    setStatusFilter(filter: TasksState['statusFilter']) {
      this.statusFilter = filter
    },
    addTask(dateIso: string, partial: Omit<Task, 'id' | 'dueDate'>) {
      const day = this.dayByDate(dateIso)
      const newTask: Task = { id: crypto.randomUUID(), dueDate: dateIso, ...partial }
      if (day) day.tasks.unshift(newTask)
      else this.days.push({ date: dateIso, tasks: [newTask] })
      this.persist()
    },
    updateTask(taskId: string, updater: (t: Task) => Task) {
      for (const day of this.days) {
        const idx = day.tasks.findIndex(t => t.id === taskId)
        if (idx !== -1) {
          day.tasks[idx] = updater(day.tasks[idx])
          this.persist()
          return
        }
      }
    },
    removeTask(taskId: string) {
      for (const day of this.days) {
        const idx = day.tasks.findIndex(t => t.id === taskId)
        if (idx !== -1) {
          day.tasks.splice(idx, 1)
          this.persist()
          return
        }
      }
    },
    moveTask(taskId: string, toDateIso: string) {
      let moved: Task | null = null
      for (const day of this.days) {
        const idx = day.tasks.findIndex(t => t.id === taskId)
        if (idx !== -1) {
          moved = day.tasks.splice(idx, 1)[0]
          break
        }
      }
      if (moved) {
        moved.dueDate = toDateIso
        const dest = this.dayByDate(toDateIso)
        if (dest) dest.tasks.unshift(moved)
        else this.days.push({ date: toDateIso, tasks: [moved] })
        this.persist()
      }
    }
  }
})


