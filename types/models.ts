// تعریف انواع داده با TypeScript ساده و قابل فهم

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'in_progress',
  Done = 'done'
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  dueDate: string // ISO date (YYYY-MM-DD)
}

export interface DayColumn {
  date: string // ISO date (YYYY-MM-DD)
  tasks: Task[]
}

export interface UserInfo {
  id: string
  name: string
  permissions: string[]
}


