import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: 'default',
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [
          __dirname + './../**/entities/*.entity{.ts,.js}',
          __dirname + './../session/entities/session.entity.ts'
        ],
        synchronize: true,
        autoLoadEntities: false,
        // , remote heroku database
        extra:
          configService.get('NODE_ENV') === 'production'
            ? {
                ssl: {
                  rejectUnauthorized: false
                }
              }
            : undefined
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
