import { CreateUserInput as ICreateUserInput } from 'src/graphql'

export class CreateUserInput implements ICreateUserInput {
  middleName: string
  lastName: string
  fisrtName: string
}
