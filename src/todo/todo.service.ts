import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GetTodoArgs } from './dto/args/get-todo.args'
import { CreateTodoInput } from './dto/input/create-todo.input'
import { DeleteTodoInput } from './dto/input/delete-todo.input'
import { UpdateTodoInput } from './dto/input/update-todo.input'
import { Todo } from './entities/todo.entity'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>
  ) {}
  getAllTodos() {
    return this.todoRepository.find({
      relations: ['owner']
    })
  }

  async findOne({ id }: GetTodoArgs) {
    return await this.todoRepository.findOneOrFail(id, {
      relations: ['owner']
    })
  }

  createTodo(createTodoInput: CreateTodoInput) {
    const newTodo = this.todoRepository.create(createTodoInput)
    return this.todoRepository.save(newTodo)
  }

  async updateTodo({ id, title, status }: UpdateTodoInput) {
    let todoToUpdate = await this.findOne({ id })
    if (!todoToUpdate) return

    todoToUpdate = {
      ...todoToUpdate,
      title,
      status,
      updated_at: new Date()
    }

    return this.todoRepository.save(todoToUpdate)
  }

  async deleteTodo({ id }: DeleteTodoInput) {
    const todoToDelete = await this.findOne({ id })

    if (!todoToDelete) return
    return this.todoRepository.remove(todoToDelete)
  }
}
