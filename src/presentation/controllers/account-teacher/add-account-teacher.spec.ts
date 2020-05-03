import { MissingParamError } from '../../errors/missing-param-error'
// import { HttpRequest } from '../../protocols/http'
import { AddAccountTeacherController } from './add-account-teacher'

// const makeHttpRequest = (): HttpRequest => ({
//   body: {
//     name: 'any_name',
//     cpf: 'any_cpf',
//     birthDate: 'any_birthDate',
//     email: 'any_mail@mail.com',
//     cellphone: 'any_cellphone',
//     whatsApp: 'any_whatsApp',
//     photo: 'any_photo',
//     lattes: 'any_lattes',
// cv: 'any_cv',
//     about: 'any_about',
//     password: 'any_password'
//   }
// })

type SutTypes = {
  sut: AddAccountTeacherController
}
const makeSut = (): SutTypes => {
  const sut = new AddAccountTeacherController()
  return {
    sut
  }
}

describe('AddAccountTeacher Controller', () => {
  test('Espero que retorne 400 o campo name esteja em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
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
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Espero que retorne 400 o campo cpf esteja em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
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
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cpf'))
  })

  test('Espero que retorne 400 o campo email esteja em branco', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        birthDate: 'any_birthDate',
        cpf: 'any_cpf',
        cellphone: 'any_cellphone',
        whatsApp: 'any_whatsApp',
        photo: 'any_photo',
        lattes: 'any_lattes',
        cv: 'any_cv',
        about: 'any_about',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
}) // Final teste
