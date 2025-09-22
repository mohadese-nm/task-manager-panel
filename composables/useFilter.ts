import type { Task } from '@/types/models'
import { TaskStatus } from '@/types/models'

export const useFilter = () => {
  const applyFilter = (tasks: Task[], searchText: string, status: TaskStatus | 'all') => {
    let list = tasks
    if (searchText) {
      const q = searchText.toLowerCase()
      list = list.filter(t => t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q))
    }
    if (status !== 'all') {
      list = list.filter(t => t.status === status)
    }
    return list
  }
  return { applyFilter }
}


