import {
  AddAccountRequest, AccountRepository, SendEmail
} from './add-account.protocols'

export class AddAccount {
  constructor (
    private readonly accountRepository: AccountRepository,
    private readonly sendEmail: SendEmail
  ) {}

  async add (account: AddAccountRequest): Promise<boolean> {
    const result = await this.accountRepository.save(account)
    // sucesso
    if (result) {
      return this.sendEmail.send(account.email, account.name)
    }
  }
}
