import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'
import { User } from 'src/user/entities/user.entity'
import { Account } from './entities/account.entity'
import { AccountResolver } from './account.resolver'
import { AccountService } from './account.service'
import { AuthService } from './auth.service'
import { GetAccountInterceptor } from './interceptors/get-account.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, User]),
    forwardRef(() => UserModule)
  ],
  providers: [
    AccountResolver,
    AccountService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GetAccountInterceptor
    }
  ],
  exports: [AccountService, AuthService]
})
export class AccountModule {}
