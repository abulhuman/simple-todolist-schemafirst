import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { plainToClass } from 'class-transformer'
import { AuthPayloadDto } from 'src/account/dto/auth-payload.dto'

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(AuthPayloadDto, data, {
          excludeExtraneousValues: true
        })
      })
    )
  }
}
