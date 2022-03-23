import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'
import { User } from 'src/user/entities/user.entity'
import { Todo } from './entities/todo.entity'
import { TodoResolver } from './todo.resolver'
import { TodoService } from './todo.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo, User]),
    forwardRef(() => UserModule)
  ],
  providers: [TodoResolver, TodoService],
  exports: [TodoService]
})
export class TodoModule {}
