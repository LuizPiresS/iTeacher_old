import { defineNow, getNowISO } from '../../../utils/test.util'
import type { Presenter } from '../../common/presenter.interface'
import type { Security } from '../../common/security.interface'
import type { Validator } from '../../common/validator.interface'
import type { CreateUserRequest } from '../dto/create-user.request'
import type { CreateUserResponse } from '../dto/create-user.response'
import { User } from '../user'
import { UserRepository } from '../user.repository'
import { CreateUserInteractor } from './create-user.interactor'
import { DeepPartial } from 'typeorm/common/DeepPartial'
import {
  userRepositoryMock,
  presenterMock,
  validationMock,
  securityMock
} from '../mocks/mocks'
import {
  UserNameInvalidError,
  UserDuplicatedCPFError,
  UserCPFInvalidError,
  UserBirthdateInvalidError,
  UserCellphoneInvalidError,
  UserDuplicatedEmailError,
  UserEmailInvalidError
} from '../error'

describe('CreateUser Interactor', () => {
  let interactor: CreateUserInteractor

  beforeAll(() => {
    interactor = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
      validationMock as Validator,
      securityMock as Security
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
    const mockDataRequest: CreateUserRequest = {
      name: '',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password'
    }

    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(expect.any(UserNameInvalidError))
  })

  test('Tests duplicated CPF', async () => {
    defineNow('2020-05-20T00:00:00.000Z')

    userRepositoryMock.save.mockImplementation(
      (data: DeepPartial<User>): User => {
        return {
          ...data,
          id: 'uuid',
          name: 'any_name',
          cpf: 'any_cpf',
          birthdate: 'any_birthdate',
          cellphone: 'any_cellphone',
          email: 'any_mail@mail.com',
          createdAt: getNowISO()
        } as User
      }
    )

    userRepositoryMock.findCPF.mockReturnValue(true)
    await interactor.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserDuplicatedCPFError)
    )
  })

  test('Test invalid cpf', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'invalid_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password'
    }

    validationMock.isCPF.mockReturnValue(false)

    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(expect.any(UserCPFInvalidError))
  })

  test('Tests invalid birth date', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'invalid_date',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password'
    }

    validationMock.isDate.mockReturnValue(false)

    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserBirthdateInvalidError)
    )
  })

  test('Tests invalid cellphone', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'invalid_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password'
    }

    validationMock.isCellphone.mockReturnValue(false)
    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserCellphoneInvalidError)
    )
  })

  test('Tests duplicated e-mail', async () => {
    defineNow('2020-05-20T00:00:00.000Z')

    userRepositoryMock.save.mockImplementation(
      (data: DeepPartial<User>): User => {
        return {
          ...data,
          id: 'uuid',
          name: 'any_name',
          cpf: 'any_cpf',
          birthdate: 'any_birthdate',
          cellphone: 'any_cellphone',
          email: 'any_mail@mail.com',
          createdAt: getNowISO()
        } as User
      }
    )

    userRepositoryMock.findEmail.mockReturnValue(true)
    await interactor.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserDuplicatedEmailError)
    )
  })

  test('Tests invalid e-mail', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'invalid_email',
      password: 'any_password'
    }

    validationMock.isEmail.mockReturnValue(false)
    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserEmailInvalidError)
    )
  })

  test('Add user', async () => {
    defineNow('2020-05-20T00:00:00.000Z')

    userRepositoryMock.save.mockImplementation(
      (data: DeepPartial<User>): User => {
        return {
          ...data,
          id: 'uuid',
          name: 'any_name',
          cpf: 'any_cpf',
          birthdate: 'any_birthdate',
          cellphone: 'any_cellphone',
          email: 'any_mail@mail.com',
          createdAt: getNowISO()
        } as User
      }
    )

    await interactor.execute({
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })

    expect(presenterMock.throw).not.toBeCalled()
    expect(presenterMock.reply).toHaveBeenCalledWith({
      id: 'uuid',
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      createdAt: getNowISO()
    })
  })
})
