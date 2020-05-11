import { SaveAccountRepository } from '@/data/protocols/database/save-account.repository'
import { DeepPartial } from '@/data/utils/deep-partial.type'
import { Account } from '@/domain/models/account.model'

export class AccountRepository implements SaveAccountRepository {
  async save (data: DeepPartial<Account>): Promise<Account> {
    return Promise.resolve(null)
  }
}
