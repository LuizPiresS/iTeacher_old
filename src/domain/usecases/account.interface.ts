import { DeepPartial } from '@/infra/utils/deep-partial.type'

import { AccountEntity } from '../entities/account.entity'

export interface AccountUsecaseInterface {

  save(account: DeepPartial<AccountEntity>): Promise<string>

  find(id: string): Promise<AccountEntity>

  delete(id: string): Promise<void>

}
