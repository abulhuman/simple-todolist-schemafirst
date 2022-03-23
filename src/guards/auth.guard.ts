import { CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlContextType } from '@nestjs/graphql'
import { Observable } from 'rxjs'

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType<GqlContextType>() === 'graphql') {
      const request = context['args'][2].req

      return request.session.accountEmail
    }

    return undefined
  }
}
