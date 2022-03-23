import { SigninInput as ISigninInput } from 'src/graphql'

export class SigninInput implements ISigninInput {
  email: string
  password: string
}
