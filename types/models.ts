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
  dueDate: Date // تاریخ سررسید
}

export interface DayColumn {
  date: Date // تاریخ روز
  tasks: Task[]
}

export interface UserInfo {
  id: string
  name: string
  permissions: string[]
}


