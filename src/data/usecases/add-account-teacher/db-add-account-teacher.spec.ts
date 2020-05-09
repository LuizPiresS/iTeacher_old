import { Hasher } from '../../protocols/criptograpy/hasher'
import { AddAccountTeacherRepository } from '../../protocols/database/add-account-teacher/add-account-teacher-repository'
import { SendEmail } from '../../protocols/email/send-email'
import { Uuid } from '../../protocols/uuid/uuid'
import { DbAddAccountTeacher, AddAccountTeacherParams } from './db-add-account-protocols'

const mockSendEmail = (): SendEmail => {
  class SendEmailStub implements SendEmail {
    async send (email: string, name: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new SendEmailStub()
}

const mockAccount = (): AddAccountTeacherParams => (
  {
    uuid: 'any_uuid',
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    token: 'any_token'
  })

const mockAddAccountTeacherRepository = (): AddAccountTeacherRepository => {
  class AddAccountTeacherRepositoryStub implements AddAccountTeacherRepository {
    async add (accountData: AddAccountTeacherParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }

  return new AddAccountTeacherRepositoryStub()
}

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

const mockUuid = (): Uuid => {
  class UuidStub implements Uuid {
    generator (): string {
      return 'any_uuid'
    }
  }
  return new UuidStub()
}

type SutTypes = {
  sut: DbAddAccountTeacher
  hasherStub: Hasher
  addAccountTeacherRepositoryStub: AddAccountTeacherRepository
  sendEmailStub: SendEmail
  uuidStub: Uuid
}
const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addAccountTeacherRepositoryStub = mockAddAccountTeacherRepository()
  const sendEmailStub = mockSendEmail()
  const uuidStub = mockUuid()
  const sut = new DbAddAccountTeacher(hasherStub, addAccountTeacherRepositoryStub, sendEmailStub)
  return {
    sut,
    hasherStub,
    addAccountTeacherRepositoryStub,
    sendEmailStub,
    uuidStub
  }
}
describe('DbAddAccountTeacher', () => {
  test('Espero que o Encryper seja chamado apenas com o valor correto', async () => {
    const { sut, hasherStub } = makeSut()

    const encrypterSpy = jest.spyOn(hasherStub, 'hash')
    const account = mockAccount()

    await sut.add(account)
    expect(encrypterSpy).toHaveBeenCalledWith('any_password')
    // expect(encrypterSpy).toReturnWith('hashed_password')
  })

  test('Espero que o AddAccountTeacherRepository seja chamado apenas com oo valores corretos', async () => {
    const { sut, addAccountTeacherRepositoryStub } = makeSut()

    const addAccountTeacherRepositorySpy = jest.spyOn(addAccountTeacherRepositoryStub, 'add')
    const account = mockAccount()
    await sut.add(account)
    account.password = 'hashed_password'

    expect(addAccountTeacherRepositorySpy).toHaveBeenCalledWith(account)
  })

  test('Espero que lance uma exception caso Hasher retorne uma excpetion', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAccount())

    await expect(promise).rejects.toThrow()
  })

  test('Espero que lance uma exception caso AddAccountTeacherRepository retorne uma excpetion', async () => {
    const { sut, addAccountTeacherRepositoryStub } = makeSut()
    jest.spyOn(addAccountTeacherRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAccount())

    await expect(promise).rejects.toThrow()
  })

  test('Espero que lance uma exception caso SendEmail retorne uma excpetion', async () => {
    const { sut, sendEmailStub } = makeSut()
    jest.spyOn(sendEmailStub, 'send').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAccount())

    await expect(promise).rejects.toThrow()
  })

  test('Espero que AddAccountTeacherRepository retorne false caso não seja possivel salvar a nova conta ', async () => {
    const { sut, addAccountTeacherRepositoryStub } = makeSut()
    jest.spyOn(addAccountTeacherRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(false))
    const response = await sut.add(mockAccount())

    expect(response).toBeFalsy()
  })

  test('Espero que AddAccountTeacherRepository retorne false caso não seja possivel enviar o email ', async () => {
    const { sut, sendEmailStub } = makeSut()
    jest.spyOn(sendEmailStub, 'send').mockReturnValueOnce(Promise.resolve(false))
    const response = await sut.add(mockAccount())

    expect(response).toBeFalsy()
  })

  test('Espero que AddAccountTeacherRepository retorne true caso a nova conta seja salva e o e-mail de verificação seja enviado', async () => {
    const { sut } = makeSut()
    const response = await sut.add(mockAccount())

    expect(response).toBeTruthy()
  })
})
