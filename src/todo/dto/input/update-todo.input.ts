import { InputType } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { TodoStatus } from 'src/graphql'
import { CreateTodoInput } from './create-todo.input'

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  id: string
  title?: string
  status?: TodoStatus
}
