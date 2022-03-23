import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAccountInput } from './dto/create-account.input'
import { UpdateAccountInput } from './dto/update-account.input'
import { Account } from './entities/account.entity'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>
  ) {}
  create(createAccountInput: CreateAccountInput) {
    const newAccount = this.accountRepository.create(createAccountInput)
    return this.accountRepository.save(newAccount)
  }

  findAll() {
    return this.accountRepository.find({ relations: ['owner'] })
  }

  findOne(id: string) {
    return this.accountRepository.findOneOrFail(id, { relations: ['owner'] })
  }

  findOneByEmail(email: string) {
    return this.accountRepository.findOne({ email }, { relations: ['owner'] })
  }

  async update(id: string, updateAccountInput: UpdateAccountInput) {
    const accountToUpdate = await this.findOne(id)
    Object.assign(accountToUpdate, updateAccountInput)
    return this.accountRepository.save(accountToUpdate)
  }

  async remove(id: string) {
    const accountToDelete = await this.findOne(id)

    if (!accountToDelete) return
    return this.accountRepository.remove(accountToDelete)
  }
}
