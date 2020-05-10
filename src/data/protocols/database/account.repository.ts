import { Account } from '../../../domain/models/account/account'
import { DeepPartial } from './deep-partial.type'

export interface AccountRepository {
  save (data: DeepPartial<Account>): Promise<Account>
}
