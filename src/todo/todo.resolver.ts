import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent
} from '@nestjs/graphql'
import { CreateTodoInput, IMutation, UpdateTodoInput, User } from 'src/graphql'
import { UserService } from 'src/user/user.service'
import { Todo } from '../todo/entities/todo.entity'
import { GetTodoArgs } from './dto/args/get-todo.args'
import { TodoService } from './todo.service'

@Resolver('Todo')
export class TodoResolver implements Partial<IMutation> {
  constructor(
    private todoService: TodoService,
    private userService: UserService
  ) {}

  @Query()
  getAllTodos(): Promise<Todo[]> | Todo[] {
    return this.todoService.getAllTodos()
  }

  @Query()
  getTodoById(@Args() getTodoArgs: GetTodoArgs): Promise<Todo> {
    // ! todo make todoService.getTodoById accept an instance of GetTodoArgs
    return this.todoService.findOne(getTodoArgs)
  }

  @Mutation()
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput
  ): Todo | Promise<Todo> {
    return this.todoService.createTodo(createTodoInput)
  }

  @Mutation()
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
  ): Todo | Promise<Todo> {
    return this.todoService.updateTodo(updateTodoInput)
  }

  @Mutation()
  removeTodo(@Args() id: string): Todo | Promise<Todo> {
    return this.todoService.deleteTodo({ id })
  }

  @ResolveField()
  owner(@Parent() todo: Todo): Promise<User> {
    return this.userService.findOne(todo.ownerId)
  }
}
