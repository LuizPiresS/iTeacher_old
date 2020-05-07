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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hashedPassword = await this.encrypter.hash(account.password)
    // sucesso
    return null
  }
}
