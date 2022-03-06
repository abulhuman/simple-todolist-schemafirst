import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { Todo, todos, TodoStatus } from 'src/data'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos()
  }
  @Get(':id')
  getTodoById(@Param('id') id: string) {
    return this.todoService.getTodoById(id)
  }
  @Post()
  createTodo(@Body() body: { title: string }) {
    return this.todoService.createTodo(body)
  }
  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() body: { title: string; status: TodoStatus }
  ): Todo {
    return this.todoService.updateTodo({ id, ...body })
  }
}
