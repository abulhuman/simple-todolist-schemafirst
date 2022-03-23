import { CreateUserInput } from './create-user.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateUserInput extends PartialType(CreateUserInput) {
  id: string
  fisrtName?: string
  middleName?: string
  lastName?: string
}
