import { InputType } from '@nestjs/graphql'

@InputType()
export class DeleteTodoInput {
  id: string
}
