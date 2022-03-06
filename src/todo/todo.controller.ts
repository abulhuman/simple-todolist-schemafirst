import { Body, Controller, Get, Param, Post } from '@nestjs/common'
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
}
