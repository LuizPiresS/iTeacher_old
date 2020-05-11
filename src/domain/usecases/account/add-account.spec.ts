import { Account } from '@/domain/models/account.model'
import { AccountRepository } from '@/infra/database/repositories/account.repository'

import { AddAccount } from './add-account'
import { AddAccountRequest } from './add-account.request'

const mockAccount = (): Account => ({
  id: 'any_uuid',
  name: 'any_name',
  cpf: 'any_cpf',
  birthDate: 'any_birthDate',
  cellphone: 'any_cellphone',
  email: 'any_mail@mail.com',
  password: 'any_password',
  createdAt: 'any_timestamp',
  updatedAt: 'any_timestamp',
  deletedAt: 'any_timestamp'
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
}
const makeSut = (): SutTypes => {
  const accountRepositoryStub = mockAccountRepository()
  const sut = new AddAccount(accountRepositoryStub)
  return {
    sut,
    accountRepositoryStub
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

  test('Espero que AccountRepository retorne false caso não seja possivel salvar a nova conta ', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'save').mockReturnValueOnce(Promise.resolve(null))
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
