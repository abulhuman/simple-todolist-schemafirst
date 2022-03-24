import { Module } from '@nestjs/common'
import { TodoService } from './todo/todo.service'
import { TodoModule } from './todo/todo.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'node:path'
import { UserService } from './user/user.service'
import { UserModule } from './user/user.module'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { Todo } from './todo/entities/todo.entity'
import { User } from './user/entities/user.entity'
import { AccountModule } from './account/account.module'
import { Account } from './account/entities/account.entity'
import { AccountService } from './account/account.service'
import { Session } from './session/entities/session.entity'
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        emitTypenameField: true,
        outputAs: 'interface'
      }
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Account, Todo, Session]),
    DatabaseModule,
    UserModule,
    AccountModule,
    TodoModule
  ],
  providers: [ConfigService, UserService, AccountService, TodoService]
})
export class AppModule {}
