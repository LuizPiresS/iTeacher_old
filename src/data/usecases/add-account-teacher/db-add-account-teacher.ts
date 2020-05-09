import { Hasher } from '../../protocols/criptograpy/hasher'
import { AddAccountTeacherRepository } from '../../protocols/database/add-account-teacher/add-account-teacher-repository'
import { SendEmail } from '../../protocols/email/send-email'
import {
  AddAccountTeacher,
  AddAccountTeacherParams
} from './db-add-account-protocols'

export class DbAddAccountTeacher implements AddAccountTeacher {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountTeacherRepository: AddAccountTeacherRepository,
    private readonly sendEmail: SendEmail
  ) {}

  async add (account: AddAccountTeacherParams): Promise<boolean> {
    const hashedPassword = await this.hasher.hash(account.password)
    account.password = hashedPassword

    // sucesso
    await this.addAccountTeacherRepository.add(account)
    return this.sendEmail.send(account.email, account.name)
  }
}
