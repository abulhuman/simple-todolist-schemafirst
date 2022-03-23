import { User } from 'src/user/entities/user.entity'
import { Exclude, Expose } from 'class-transformer'

export class AuthPayloadDto {
  @Expose()
  id: string

  @Expose()
  created_at: Date

  @Expose()
  updated_at?: Date

  @Expose()
  email: string

  @Exclude()
  password: string

  @Expose()
  ownerId: string

  @Expose({ toClassOnly: true })
  owner: User
}
