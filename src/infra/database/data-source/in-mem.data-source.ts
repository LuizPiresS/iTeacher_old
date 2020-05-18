import { AccountEntity } from '@/domain/entities/account.entity'
import { DeepPartial } from '@/infra/utils/deep-partial.type'

import { AccountDataSourceInterface } from './account-data-source.interface'

export class InMemDataSource implements AccountDataSourceInterface {
  private accounts: AccountEntity[] = []

  async save (data: DeepPartial<AccountEntity>): Promise<string> {
    data.id = new Date().getTime().toString()

    this.accounts.push(data as AccountEntity)

    return data.id
  }

  async delete (id: string): Promise<void> {
    this.accounts = this.accounts.filter((account) => account.id !== id)
  }

  async find (id: string): Promise<AccountEntity> {
    return this.accounts.find((account) => account.id === id)
  }

  async findAll (): Promise<AccountEntity[]> {
    return this.accounts
  }
}
