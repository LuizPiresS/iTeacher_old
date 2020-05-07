import { Hasher } from '../../protocols/criptograpy/hasher'
import {
  AddAccountTeacherModel,
  AddAccountTeacher,
  AddAccountTeacherParams
} from './db-add-account-protocols'

export class DbAddAccountTeacher implements AddAccountTeacher {
  constructor (
    private readonly encrypter: Hasher
  ) {}

  async add (account: AddAccountTeacherParams): Promise<AddAccountTeacherModel> {
    await this.encrypter.hash(account.password)
    // sucesso
    return Promise.resolve(null)
  }
}
