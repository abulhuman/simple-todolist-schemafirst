import { InputType } from '@nestjs/graphql'
import { CreateTodoInput as ICreateTodoInput } from 'src/graphql'

@InputType()
export class CreateTodoInput implements ICreateTodoInput {
  title: string
  ownerId: string
}
