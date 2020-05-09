import { serverError } from '../../adapters/http-error'
import {
  DuplicatedField,
  HttpRequest,
  Validation,
  AddAccountTeacher,
  MissingParamError,
  InvalidParamError,
  DuplicatedFieldError,
  ok,
  AddAccountTeacherParams,
  AddAccountTeacherController
} from './add-account-protocols'

const mockDuplicatedField = (): DuplicatedField => {
  class DuplicatedFieldStub implements DuplicatedField {
    isDuplicated (field: string): boolean {
      return false
    }
  }
  return new DuplicatedFieldStub()
}

const mockHttpRequest = (): HttpRequest => ({
  body: {
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
    password: 'any_password'
  }
})

const mockValidationEmail = (): Validation => {
  class ValidationEmailStub implements Validation {
    public validate (input: string): boolean {
      return true
    }
  }

  return new ValidationEmailStub()
}

const mockAddAccount = (): AddAccountTeacher => {
  class AddAccountTeacher implements AddAccountTeacher {
    async add (account: AddAccountTeacherParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new AddAccountTeacher()
}
type SutTypes = {
  sut: AddAccountTeacherController
  validationEmailStub: Validation
  duplicatedFieldStub: DuplicatedField
  addAccountTeacherStub: AddAccountTeacher
}
const makeSut = (): SutTypes => {
  const validationEmailStub = mockValidationEmail()
  const duplicatedFieldStub = mockDuplicatedField()
  const addAccountTeacherStub = mockAddAccount()
  const sut = new AddAccountTeacherController(
    validationEmailStub,
    duplicatedFieldStub,
    addAccountTeacherStub
  )
  return {
    sut,
    validationEmailStub,
    duplicatedFieldStub,
    addAccountTeacherStub
  }
}

describe('AddAccountTeacher Controller', () => {
  test('Espero que retorne 400 o campo email estiver em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Espero que retorne 400 se campo password estiver em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Espero que retorne 400 se  o email for invalido', async () => {
    const { sut, validationEmailStub } = makeSut()

    jest.spyOn(validationEmailStub, 'validate').mockReturnValueOnce(false)
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Espero que retorne 500 caso EmailValidator retorne uma excpetion', async () => {
    const mockValidationEmail = (): Validation => {
      class ValidationEmailStub implements Validation {
        public validate (input: string): boolean {
          throw new Error()
        }
      }

      return new ValidationEmailStub()
    }

    const sut = new AddAccountTeacherController(mockValidationEmail(), mockDuplicatedField(), mockAddAccount())

    jest.spyOn(mockValidationEmail(), 'validate')
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Espero que EmailValidator seja chamado com o email correto', async () => {
    const { sut, validationEmailStub } = makeSut()

    const emailValidatorSpy = jest.spyOn(validationEmailStub, 'validate')
    const httpRequest = mockHttpRequest()
    await sut.handle(httpRequest)

    expect(emailValidatorSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Espero que retorne 400 se o email já estiver em uso', async () => {
    const { sut, duplicatedFieldStub } = makeSut()

    jest.spyOn(duplicatedFieldStub, 'isDuplicated').mockReturnValueOnce(true)
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new DuplicatedFieldError('email'))
  })

  test('Espero que retorne 500 caso DuplicatedFieldStub retorne uma excpetion', async () => {
    const mockDuplicatedField = (): DuplicatedField => {
      class DuplicatedFieldStub implements DuplicatedField {
        isDuplicated (fied: string): boolean {
          throw new Error()
        }
      }

      return new DuplicatedFieldStub()
    }

    const sut = new AddAccountTeacherController(mockValidationEmail(), mockDuplicatedField(), mockAddAccount())

    jest.spyOn(mockValidationEmail(), 'validate')
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Espero que retorne 500 caso AddAccountTeacher retorne uma excpetion', async () => {
    const mockAddAccount = (): AddAccountTeacher => {
      class AddAccountTeacher implements AddAccountTeacher {
        async add (account: AddAccountTeacherParams): Promise<boolean> {
          return Promise.reject(Error())
        }
      }
      return new AddAccountTeacher()
    }

    const sut = new AddAccountTeacherController(mockValidationEmail(), mockDuplicatedField(), mockAddAccount())

    jest.spyOn(mockValidationEmail(), 'validate')
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Espero que retorne 200 se todos os dados forem validos', async () => {
    const { sut } = makeSut()

    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(httpResponse.body))
  })
}) // Final teste
