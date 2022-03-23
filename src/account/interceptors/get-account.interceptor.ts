import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Session } from 'src/session/entities/session.entity'
import { getRepository } from 'typeorm'
import { AccountService } from '../account.service'

@Injectable()
export class GetAccountInterceptor implements NestInterceptor {
  constructor(private accountService: AccountService) {}
  sessionRepository = getRepository(Session)

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context['args'][2].req

    const { accountEmail } = request.session

    if (accountEmail) {
      const account = await this.accountService.findOneByEmail(accountEmail)
      request['currentAccount'] = account
    }

    return next.handle()
  }
}
