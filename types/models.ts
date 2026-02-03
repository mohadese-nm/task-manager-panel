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
  dueDate: Date
  createdAt?: Date
}

export interface DayColumn {
  date: Date
  tasks: Task[]
}

export interface UserInfo {
  id: string
  name: string
  permissions: string[]
}


