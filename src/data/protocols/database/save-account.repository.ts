import { DeepPartial } from '@/data/utils/deep-partial.type'
import { Account } from '@/domain/models/account.model'

export interface SaveAccountRepository {
  save (data: DeepPartial<Account>): Promise<Account>
}
