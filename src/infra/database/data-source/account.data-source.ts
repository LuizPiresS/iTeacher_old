import { AccountEntity } from '@/domain/entities/account.entity'
import { AccountDataSourceInterface } from '@/infra/database/data-source/account-data-source.interface'
import { DeepPartial } from '@/infra/utils/deep-partial.type'

export class AccountDataSource implements AccountDataSourceInterface {
  async find (id: string): Promise<AccountEntity> {
    throw new Error('Method not implemented.')
  }

  async findAll (): Promise<AccountEntity[]> {
    throw new Error('Method not implemented.')
  }

  async delete (id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async save (data: DeepPartial<AccountEntity>): Promise<string> {
    return Promise.resolve(data.id)
  }
}
