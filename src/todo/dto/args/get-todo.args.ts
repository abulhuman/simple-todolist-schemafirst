import { ArgsType } from '@nestjs/graphql'

@ArgsType()
export class GetTodoArgs {
  id: string
}
