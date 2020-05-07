import { Encrypter } from '../../protocols/criptograpy/encrypter'
import {
  AddAccountTeacherModel,
  AddAccountTeacher,
  AddAccountTeacherParams
} from './db-add-account-protocols'

export class DbAddAccountTeacher implements AddAccountTeacher {
  constructor (
    private readonly encrypter: Encrypter
  ) {}

  async add (account: AddAccountTeacherParams): Promise<AddAccountTeacherModel> {
    await this.encrypter.encrypt(account.password)
    // sucesso
    return Promise.resolve(null)
  }
}
