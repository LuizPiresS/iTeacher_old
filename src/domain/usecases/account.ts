import { AccountEntity } from '@/domain/entities/account.entity'
import { AccountDataSourceInterface } from '@/infra/database/data-source/account-data-source.interface'
import { DeepPartial } from '@/infra/utils/deep-partial.type'

import { AccountUsecaseInterface } from './account.interface'

export class Account implements AccountUsecaseInterface {
  constructor (
    private readonly accountDataSource: AccountDataSourceInterface
  ) {}

  async find (id: string): Promise<AccountEntity> {
    throw new Error('Method not implemented.')
  }

  async save (account: DeepPartial<AccountEntity>): Promise<string> {
    return await this.accountDataSource.save(account)
  }

  async delete (id: string): Promise<void> {
    return await this.accountDataSource.delete(id)
  }
}
