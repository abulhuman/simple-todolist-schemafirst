import { Account as IAccount } from 'src/graphql'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Account implements IAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at?: Date

  @Column({ unique: true, nullable: true })
  email: string

  @Column({ nullable: true })
  password: string

  @RelationId('owner')
  @Column({ nullable: true })
  ownerId: string

  @ManyToOne(() => User, (user: User) => user.accounts)
  owner: User
}
