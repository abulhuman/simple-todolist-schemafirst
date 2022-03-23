import { Todo as ITodo, TodoStatus } from 'src/graphql'
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
export class Todo implements ITodo {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date

  @Column({ nullable: true })
  title: string

  @Column({ default: TodoStatus.PENDING })
  status: TodoStatus

  @RelationId('owner')
  @Column({ nullable: true })
  ownerId: string

  @ManyToOne(() => User, (user: User) => user.todos)
  owner: User
}
