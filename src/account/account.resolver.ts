import { Request } from 'express'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context
} from '@nestjs/graphql'
import { UserService } from 'src/user/user.service'
import { AccountService } from './account.service'
import { AuthService } from './auth.service'
import { CreateAccountInput } from './dto/create-account.input'
import { SigninInput } from './dto/signin.input'
import { UpdateAccountInput } from './dto/update-account.input'
import { Account } from './entities/account.entity'
import { GetAccount } from './decorators/get-account.decorator'
import { UseGuards, UseInterceptors } from '@nestjs/common'
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor'
import { AuthGuard } from 'src/guards/auth.guard'

@UseInterceptors(SerializeInterceptor)
@Resolver('Account')
export class AccountResolver {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @Mutation('createAccount')
  create(@Args('createAccountInput') createAccountInput: CreateAccountInput) {
    return this.accountService.create(createAccountInput) // plain password
  }

  @Query('getAllAccounts')
  @UseGuards(AuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@GetAccount() _account: Account) {
    return this.accountService.findAll()
  }

  @Query('getAccountById')
  findOne(@Args('id') id: string) {
    return this.accountService.findOne(id)
  }

  @Mutation('updateAccount')
  update(@Args('updateAccountInput') updateAccountInput: UpdateAccountInput) {
    return this.accountService.update(updateAccountInput.id, updateAccountInput)
  }

  @Mutation('removeAccount')
  remove(@Args('id') id: string) {
    return this.accountService.remove(id)
  }

  @Mutation('signup')
  signup(@Args('createAccountInput') createAccountInput: CreateAccountInput) {
    return this.authService.signup(createAccountInput) // hashed and salted password
  }

  @Mutation('signin')
  signin(
    @Args('signinInput') signinInput: SigninInput,
    @Context('req') request: Request
  ) {
    const { session } = request
    session['accountEmail'] = signinInput.email
    return this.authService.signin(signinInput) // hashed and salted password
  }

  @Mutation('signout')
  signout(@Context('req') request: Request) {
    const { session } = request
    return new Promise((response) => {
      session.destroy((error) => {
        if (error) console.error(`Logout error ${error}`)
        response(true)
      })
    })
  }

  @ResolveField('owner')
  owner(@Parent() account: Account) {
    return this.userService.findOne(account.ownerId)
  }
}
