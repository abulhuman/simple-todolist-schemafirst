import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { todos, Todo, TodoStatus } from '../data'

@Injectable()
export class TodoService {
  getAllTodos(): Todo[] {
    return todos
  }

  getTodoById(id: string): Todo {
    return todos.find((todo) => todo.id === id)
  }

  createTodo({ title }: { title: string }): Todo {
    const newTodo = {
      id: uuid(),
      title,
      created_at: new Date(),
      updated_at: undefined,
      status: TodoStatus.PENDING
    }
    todos.push(newTodo)
    return newTodo
  }

  updateTodo({
    id,
    title,
    status
  }: {
    id: string
    title: string
    status: TodoStatus
  }): Todo {
    const todoToUpdate = this.getTodoById(id)
    if (!todoToUpdate) return

    const todoIndex = todos.findIndex((todo) => todo.id === id)

    todos[todoIndex] = {
      ...todos[todoIndex],
      title,
      status,
      updated_at: new Date()
    }

    return todos[todoIndex]
  }

  deleteTodo(id: string): void {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex === -1) return
    todos.splice(todoIndex, 1)
    return
  }
}
