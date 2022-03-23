import { CreateAccountInput as ICreateAccountInput } from 'src/graphql'

export class CreateAccountInput implements ICreateAccountInput {
  email: string
  password: string
  ownerId: string
}
