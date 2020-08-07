import { UpdateUserResponse } from '../dto/update-user.response'
import { defineNow } from '../../../utils/test.util'
import type { Presenter } from '../../common/presenter.interface'
import type { Validator } from '../../common/validator.interface'
import { UserBirthdateInvalidError } from '../error/user-birthdate-invalid.error'
import { UserCellphoneInvalidError } from '../error/user-cellphone-invalid.error'
import { UserCPFInvalidError } from '../error/user-cpf-invalid-error'
import { UserEmailInvalidError } from '../error/user-email-invalid.error'
import { UserNameInvalidError } from '../error/user-name-invalid.error'
import { User } from '../user'
import { UserRepository } from '../user.repository'
import { UpdateUserInteractor } from './update-user.interactor'
import { DeepPartial } from 'typeorm/common/DeepPartial'
import { UpdateUserRequest } from '../dto/update-user.request'
const presenterMock = {
  reply: jest.fn(),
  throw: jest.fn()
}

const userRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  updateUser: jest.fn(),
  delete: jest.fn(),
  findEmail: jest.fn(),
  findCPF: jest.fn()
}

const validationMock = {
  isEmail: jest.fn(),
  isCPF: jest.fn(),
  isPassword: jest.fn(),
  isDate: jest.fn(),
  isCellphone: jest.fn()
}

const mockDataRequest: UpdateUserRequest = {
  id: 'uuid',
  name: 'any_name',
  cpf: 'any_cpf',
  birthdate: 'any_birthdate',
  cellphone: 'any_cellphone',
  email: 'any_mail@mail.com'
}

describe('UpdateUser Interactor', () => {
  let interactor: UpdateUserInteractor

  beforeAll(() => {
    interactor = new UpdateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<UpdateUserResponse>,
      validationMock as Validator
    )
  })

  beforeEach(() => {
    validationMock.isCPF.mockReturnValue(true)
    validationMock.isCellphone.mockReturnValue(true)
    validationMock.isDate.mockReturnValue(true)
    validationMock.isEmail.mockReturnValue(true)
    userRepositoryMock.findEmail.mockReturnValue(false)
    userRepositoryMock.findCPF.mockReturnValue(false)
  })

  test('Tests invalid name', async () => {
    const mockDataRequest: UpdateUserRequest = {
      id: 'uuid',
      name: '',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com'
    }

    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(expect.any(UserNameInvalidError))
  })

  test('Test invalid cpf', async () => {
    validationMock.isCPF.mockReturnValue(false)

    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(expect.any(UserCPFInvalidError))
  })

  test('Tests invalid birth date', async () => {
    validationMock.isDate.mockReturnValue(false)

    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserBirthdateInvalidError)
    )
  })

  test('Tests invalid cellphone', async () => {
    validationMock.isCellphone.mockReturnValue(false)
    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserCellphoneInvalidError)
    )
  })

  test('Tests invalid e-mail', async () => {
    validationMock.isEmail.mockReturnValue(false)
    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserEmailInvalidError)
    )
  })

  test('Edit user', async () => {
    defineNow('2020-05-20T00:00:00.000Z')

    userRepositoryMock.updateUser.mockImplementation(
      (data: DeepPartial<User>): User => {
        return {
          ...data,
          id: 'uuid',
          name: 'any_name',
          cpf: 'any_cpf',
          birthdate: 'any_birthdate',
          cellphone: 'any_cellphone',
          email: 'any_mail@mail.com'
        } as User
      }
    )

    await interactor.execute({
      id: 'uuid',
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com'
    })

    expect(presenterMock.throw).not.toBeCalled()
    expect(presenterMock.reply).toHaveBeenCalledWith({
      id: 'uuid',
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com'
    })
  })
})
