import { v4 as uuid } from 'uuid'

export enum TodoStatus {
  PENDING = 'pending',
  DONE = 'done'
}
export interface Todo {
  id: string
  created_at: Date
  updated_at: Date
  title: string
  status: TodoStatus
}

export const todos: Todo[] = [
  {
    id: uuid(),
    created_at: new Date(),
    status: TodoStatus.PENDING,
    title: 'Go get ur teeth checked and filled',
    updated_at: undefined
  },
  {
    id: uuid(),
    created_at: new Date(),
    status: TodoStatus.PENDING,
    title: 'Go get new shoes',
    updated_at: undefined
  },
  {
    id: uuid(),
    created_at: new Date(),
    status: TodoStatus.PENDING,
    title: 'Go get new Pants',
    updated_at: undefined
  }
]
