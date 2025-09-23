import { defineStore } from 'pinia'
import type { Task, DayColumn } from '@/types/models'
import { TaskStatus } from '@/types/models'

interface TasksState {
  days: DayColumn[]
  searchText: string
  statusFilter: TaskStatus | 'all'
}

const createMockWeek = (): DayColumn[] => {
  const today = new Date()
  const day = today.getDay() // 0=Sun ... 6=Sat
  const diffToSaturday = (day + 1) % 7
  const start = new Date(today)
  start.setDate(today.getDate() - diffToSaturday)
  const days: DayColumn[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const tasks: Task[] = Array.from({ length: 25 }).map((_, idx) => ({
      id: `${d.toISOString().slice(0, 10)}-${idx + 1}`,
      title: `Task ${idx + 1}`,
      description: `${idx + 1} لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.`,
      status: idx % 3 === 0 ? TaskStatus.Todo : idx % 3 === 1 ? TaskStatus.InProgress : TaskStatus.Done,
      dueDate: new Date(d)
    }))
    days.push({ date: new Date(d), tasks })
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
      return (date: Date) => state.days.find(d => d.date.toDateString() === date.toDateString())
    }
  },
  actions: {
    init() {
      if (import.meta.client) {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as any[]
            // تبدیل رشته‌های تاریخ به Date objects
            this.days = sanitizeDays(parsed.map(day => ({
              ...day,
              date: new Date(day.date),
              tasks: day.tasks.map((task: any) => ({
                ...task,
                dueDate: new Date(task.dueDate)
              }))
            })))
            // در صورت تغییر، ذخیره مجدد   
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
      if (!import.meta.client) return
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.days))
      window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }))
    },
    setSearch(text: string) {
      this.searchText = text
    },
    setStatusFilter(filter: TasksState['statusFilter']) {
      this.statusFilter = filter
    },
    addTask(date: Date, partial: Omit<Task, 'id' | 'dueDate'>) {
      const day = this.dayByDate(date)
      const newTask: Task = { id: crypto.randomUUID(), dueDate: new Date(date), ...partial }
      if (day) day.tasks.unshift(newTask)
      else this.days.push({ date: new Date(date), tasks: [newTask] })
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
    moveTask(taskId: string, toDate: Date) {
      let moved: Task | null = null
      for (const day of this.days) {
        const idx = day.tasks.findIndex(t => t.id === taskId)
        if (idx !== -1) {
          moved = day.tasks.splice(idx, 1)[0]
          break
        }
      }
      if (moved) {
        moved.dueDate = new Date(toDate)
        const dest = this.dayByDate(toDate)
        if (dest) dest.tasks.unshift(moved)
        else this.days.push({ date: new Date(toDate), tasks: [moved] })
        this.persist()
      }
    }
  }
})


