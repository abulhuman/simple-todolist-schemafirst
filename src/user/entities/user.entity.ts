import { User as IUser } from 'src/graphql'
import { Account } from 'src/account/entities/account.entity'
import { Todo } from 'src/todo/entities/todo.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ nullable: true })
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date

  @Column({ nullable: true })
  fisrtName: string

  @Column({ nullable: true })
  middleName: string

  @Column({ nullable: true })
  lastName: string

  @OneToMany(() => Todo, (todo: Todo) => todo.owner)
  todos: Todo[]

  @OneToMany(() => Account, (account: Account) => account.owner)
  accounts: Account[]
}
