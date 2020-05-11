import { AccountRepository } from '@/infra/database/repositories/account.repository'

import { AddAccountRequest } from './add-account.request'

export class AddAccount {
  constructor (
    private readonly accountRepository: AccountRepository
  ) {}

  async add (account: AddAccountRequest): Promise<boolean> {
    const result = await this.accountRepository.save(account)
    if (result) {
      return true
    }
  }
}
