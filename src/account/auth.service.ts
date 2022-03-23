import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { AccountService } from './account.service'
import { randomBytes, scrypt as _script } from 'node:crypto'
import { promisify } from 'node:util'
import { CreateAccountInput } from './dto/create-account.input'
import { UserService } from 'src/user/user.service'
import { SigninInput } from './dto/signin.input'
import { Account } from './entities/account.entity'

const scrypt = promisify(_script)

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private userService: UserService
  ) {}

  async signup(createAccountInput: CreateAccountInput) {
    // check if email is in use
    const account = await this.accountService.findOneByEmail(
      createAccountInput.email
    )

    if (account) throw new BadRequestException('email in use')

    // check if the user exists
    const user = await this.userService.findOne(createAccountInput.ownerId)

    if (!user)
      throw new NotFoundException(
        `Related user entity with id: ${createAccountInput.ownerId} doesn't exist`
      )
    // hash the account's password
    // genereate a salt
    const salt = randomBytes(8).toString('hex') // 16-char long salt
    // hash the salt and the password together
    const hash = (await scrypt(createAccountInput.password, salt, 32)) as Buffer // 32-char long hash
    // join the hased result and the salt together
    const result = `${salt}.${hash.toString('hex')}`

    createAccountInput = {
      ...createAccountInput,
      password: result
    }

    // create a new account and save it
    const newAccount = this.accountService.create(createAccountInput)

    // return an account

    return newAccount
  }

  async signin(signinInput: SigninInput) {
    const account = await this.accountService.findOneByEmail(signinInput.email)
    if (!account)
      throw new NotFoundException(
        `User not found with email: ${signinInput.email}`
      )
    const [salt, storedHash] = account.password.split('.')
    const hash = (await scrypt(signinInput.password, salt, 32)) as Buffer
    const authPayload = account
    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('Password mismatch')
    return authPayload
  }
}
