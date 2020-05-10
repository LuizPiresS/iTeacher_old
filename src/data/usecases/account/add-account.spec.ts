import { AddAccount } from './add-account'
import { SendEmail, AddAccountRequest, AccountRepository, Account } from './add-account.protocols'

const mockSendEmail = (): SendEmail => {
  class SendEmailStub implements SendEmail {
    async send (email: string, name: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new SendEmailStub()
}

const mockAccount = (): Account => ({
  id: 'any_uuid',
  name: 'any_name',
  cpf: 'any_cpf',
  birthDate: 'any_birthDate',
  cellphone: 'any_cellphone',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})
const mockAddAccountRequest = (): AddAccountRequest => (
  {
    name: 'any_name',
    cpf: 'any_cpf',
    cellphone: 'any_cellphone',
    email: 'any_mail@mail.com',
    password: 'any_password'
  })

const mockAccountRepository = (): AccountRepository => {
  class AccountRepositoryStub implements AccountRepository {
    async save (accountData: AddAccountRequest): Promise<Account> {
      return Promise.resolve(mockAccount())
    }
  }

  return new AccountRepositoryStub()
}

type SutTypes = {
  sut: AddAccount
  accountRepositoryStub: AccountRepository
  sendEmailStub: SendEmail
}
const makeSut = (): SutTypes => {
  const accountRepositoryStub = mockAccountRepository()
  const sendEmailStub = mockSendEmail()
  const sut = new AddAccount(accountRepositoryStub, sendEmailStub)
  return {
    sut,
    accountRepositoryStub,
    sendEmailStub
  }
}
describe('AddAccount', () => {
  test('Espero que o AccountRepository seja chamado apenas com os valores corretos', async () => {
    const { sut, accountRepositoryStub } = makeSut()

    const addAccountTeacherRepositorySpy = jest.spyOn(accountRepositoryStub, 'save')
    const account = mockAddAccountRequest()
    await sut.add(account)
    account.password = 'hashed_password'

    expect(addAccountTeacherRepositorySpy).toHaveBeenCalledWith(account)
  })

  test('Espero que lance uma exception caso AccountRepository retorne uma excpetion', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'save').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAccount())

    await expect(promise).rejects.toThrow()
  })

  test('Espero que lance uma exception caso SendEmail retorne uma excpetion', async () => {
    const { sut, sendEmailStub } = makeSut()
    jest.spyOn(sendEmailStub, 'send').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAccount())

    await expect(promise).rejects.toThrow()
  })

  test('Espero que AccountRepository retorne false caso não seja possivel salvar a nova conta ', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'save').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.add(mockAccount())

    expect(response).toBeFalsy()
  })

  test('Espero que SendEmail retorne false caso não seja possivel enviar o email ', async () => {
    const { sut, sendEmailStub } = makeSut()
    jest.spyOn(sendEmailStub, 'send').mockReturnValueOnce(Promise.resolve(false))
    const response = await sut.add(mockAccount())

    expect(response).toBeFalsy()
  })

  test('Espero que AccountRepository retorne uma Account ca salva e o e-mail de verificação seja enviado', async () => {
    const { accountRepositoryStub } = makeSut()
    const response = await accountRepositoryStub.save(mockAddAccountRequest())
    expect(response).toEqual(mockAccount())
  })

  test('Espero que AddAccount retorne true se tudo der certo', async () => {
    const { sut } = makeSut()
    const response = await sut.add(mockAccount())

    expect(response).toBeTruthy()
  })
})
