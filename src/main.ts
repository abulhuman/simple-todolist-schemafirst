import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'
import { TypeormStore } from 'connect-typeorm'
import { Session } from './session/entities/session.entity'
import { getRepository } from 'typeorm'

const configService = new ConfigService()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const sessionRepository = getRepository(Session)
  app.use(helmet())
  app.use(
    session({
      name: 'sessionId',
      secret:
        configService.get('NODE_ENV') === 'production'
          ? configService.get('SESSION_SECRET')
          : 'r4Hxza9y3CrfYkH',
      resave: true,
      saveUninitialized: false,
      cookie: {
        secure: configService.get('NODE_ENV') === 'production',
        maxAge: 4.32e7
      },
      store: new TypeormStore({
        cleanupLimit: 2,
        ttl: 86400
      }).connect(sessionRepository)
    })
  )
  await app.listen(configService.get('PORT') || 5501)
}
bootstrap()
