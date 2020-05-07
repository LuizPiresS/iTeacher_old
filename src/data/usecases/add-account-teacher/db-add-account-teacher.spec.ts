import { Encrypter } from '../../protocols/criptograpy/encrypter'
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

const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return Promise.resolve('encrypted_password')
    }
  }
  return new EncrypterStub()
}

type SutTypes = {
  sut: DbAddAccountTeacher
  encrypterStub: Encrypter
}
const makeSut = (): SutTypes => {
  const encrypterStub = mockEncrypter()

  const sut = new DbAddAccountTeacher(encrypterStub)
  return {
    sut,
    encrypterStub
  }
}
describe('AddAccountTeacher', () => {
  test('Espero que o Encryper seja chamado apenas com o valor correto', async () => {
    const { sut, encrypterStub } = makeSut()

    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const account = mockAccount()

    await sut.add(account)
    expect(encrypterSpy).toHaveBeenCalledWith(account.password)
  })
})
