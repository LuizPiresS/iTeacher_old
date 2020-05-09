import { Hasher } from '../../protocols/criptograpy/hasher'
import { AddAccountTeacherRepository } from '../../protocols/database/add-account-teacher/add-account-teacher-repository'
import {
  AddAccountTeacherModel,
  AddAccountTeacher,
  AddAccountTeacherParams
} from './db-add-account-protocols'

export class DbAddAccountTeacher implements AddAccountTeacher {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountTeacherRepository: AddAccountTeacherRepository
  ) {}

  async add (account: AddAccountTeacherParams): Promise<AddAccountTeacherModel> {
    const hashedPassword = await this.hasher.hash(account.password)
    account.password = hashedPassword

    // sucesso
    return await this.addAccountTeacherRepository.add(account)
  }
}
