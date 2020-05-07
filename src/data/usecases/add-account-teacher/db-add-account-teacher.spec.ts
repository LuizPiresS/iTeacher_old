import { Hasher } from '../../protocols/criptograpy/hasher'
import { DbAddAccountTeacher, AddAccountTeacherParams } from './db-add-account-protocols'

const mockAccount = (): AddAccountTeacherParams => (
  {
    name: 'any_name',
    cpf: 'any_cpf',
    birthDate: 'any_birthDate',
    email: 'any_mail@mail.com',
    cellphone: 'any_cellphone',
    whatsApp: 'any_whatsApp',
    photo: 'any_photo',
    lattes: 'any_lattes',
    cv: 'any_cv',
    about: 'any_about',
    password: 'any_password',
    token: 'any_token'

  })

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

type SutTypes = {
  sut: DbAddAccountTeacher
  hasherStub: Hasher
}
const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()

  const sut = new DbAddAccountTeacher(hasherStub)
  return {
    sut,
    hasherStub
  }
}
describe('AddAccountTeacher', () => {
  test('Espero que o Encryper seja chamado apenas com o valor correto', async () => {
    const { sut, hasherStub } = makeSut()

    const encrypterSpy = jest.spyOn(hasherStub, 'hash')
    const account = mockAccount()

    await sut.add(account)
    expect(encrypterSpy).toHaveBeenCalledWith(account.password)
  })
})
