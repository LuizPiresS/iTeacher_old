import { AccountEntity } from '@/domain/entities/account.entity'
import { DeepPartial } from '@/infra/utils/deep-partial.type'

export interface AccountDataSourceInterface {
  save (data: DeepPartial<AccountEntity>): Promise<string>

  find(id: string): Promise<AccountEntity>

  findAll(): Promise<AccountEntity[]>

  delete(id: string): Promise<void>
}
