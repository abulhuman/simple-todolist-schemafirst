import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql'
import { UserService } from './user.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { Todo } from 'src/todo/entities/todo.entity'
import { User } from './entities/user.entity'
import { Account } from 'src/account/entities/account.entity'
import { GetAccount } from 'src/account/decorators/get-account.decorator'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query('getAllUsers')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@GetAccount() _account: Account) {

    return this.userService.findAll()
  }

  @Query('getUserById')
  getUserById(@Args('id') id: string) {
    return this.userService.findOne(id)
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.userService.remove(id)
  }

  @ResolveField('todos', () => Todo)
  todos(@Parent() owner: User) {
    return owner.todos
  }

  @ResolveField('accounts', () => Account)
  accounts(@Parent() owner: User) {
    return owner.accounts
  }
}
