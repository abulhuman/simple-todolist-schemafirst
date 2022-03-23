import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput)
    return this.userRepository.save(newUser)
  }

  findAll() {
    return this.userRepository.find({ relations: ['todos', 'accounts'] })
  }

  findOne(id: string) {
    return this.userRepository.findOneOrFail(id, {
      relations: ['todos', 'accounts']
    })
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const userToUpdate = await this.findOne(id)

    Object.assign(userToUpdate, updateUserInput)

    return this.userRepository.save(userToUpdate)
  }

  async remove(id: string) {
    const userToDelete = await this.findOne(id)
    return this.userRepository.remove(userToDelete)
  }
}
