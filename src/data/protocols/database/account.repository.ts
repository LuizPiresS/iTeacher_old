import { Account } from '@/domain/models/account.model'

import { DeepPartial } from './deep-partial.type'

export interface AccountRepository {
  save (data: DeepPartial<Account>): Promise<Account>
}
