import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { Todo, TodoStatus } from 'src/data'
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
  @Delete(':id')
  @HttpCode(204)
  deleteTodo(@Param('id') id: string): void {
    return this.todoService.deleteTodo(id)
  }
}
