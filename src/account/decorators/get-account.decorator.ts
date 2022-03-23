import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlContextType } from '@nestjs/graphql'

export const GetAccount = createParamDecorator(
  (_data: never, context: ExecutionContext) => {
    if (context.getType<GqlContextType>() === 'graphql') {
      const request = context['args'][2].req

      return request['currentAccount']
    }

    return undefined
  }
)
