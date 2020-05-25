import type { Presenter } from '../../common/presenter';
import type { Security } from '../../common/security';
import type { Validator } from '../../common/validator';
import type { CreateUserRequest } from '../dto/create-user.request';
import type { CreateUserResponse } from '../dto/create-user.response';
import { UserBirthdateInvalidError } from '../error/user-birthdate-invalid.error';
import { UserCellphoneInvalidError } from '../error/user-cellphone-invalid.error';
import { UserCPFInvalidError } from '../error/user-cpf-invalid-error';
import { UserEmailInvalidError } from '../error/user-email-invalid.error';
import { UserNameInvalidError } from '../error/user-name-invalid.error';
import type { UserRepository } from '../user.repository';
import { CreateUserInteractor } from './create-user.interactor';

const presenterMock = {
  reply: jest.fn(),
  throw: jest.fn(),
};

const userRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const validationMock = {
  isEmail: jest.fn(),
  isCPF: jest.fn(),
  isPassword: jest.fn(),
  isDate: jest.fn(),
  isCellphone: jest.fn(),
};

const securityMock = {
  encryptPassword: jest.fn(),
  validateToken: jest.fn(),
  encodeToken: jest.fn(),
  decodeToken: jest.fn(),
};

describe('CreateUser Interactor', () => {
  let interactor: CreateUserInteractor;

  beforeAll(() => {
    interactor = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
      validationMock as Validator,
      securityMock as Security,
    );
  });

  beforeEach(() => {
    validationMock.isCPF.mockReturnValue(true);
    validationMock.isCellphone.mockReturnValue(true);
    validationMock.isDate.mockReturnValue(true);
    validationMock.isEmail.mockReturnValue(true);
  });

  test('Espero um throw caso o name seja inválido', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: '',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toBeCalledWithInstanceOf(UserNameInvalidError);
  });

  test('Espero um throw caso o cpf seja invalido', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: '',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    validationMock.isCPF.mockReturnValue(false);

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toBeCalledWithInstanceOf(UserCPFInvalidError);
  });

  test('Espero um throw caso o birthdate seja invalido', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'invalid_date',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    validationMock.isDate.mockReturnValue(false);

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toBeCalledWithInstanceOf(
      UserBirthdateInvalidError,
    );
  });

  test('Espero um throw caso o cellphone seja invalido', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'invalid_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    validationMock.isCellphone.mockReturnValue(false);
    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toBeCalledWithInstanceOf(
      UserCellphoneInvalidError,
    );
  });

  test('Espero um throw caso o email seja invalido', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'invalid_email',
      password: 'any_password',
    };

    validationMock.isEmail.mockReturnValue(false);
    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toBeCalledWithInstanceOf(UserEmailInvalidError);
  });
});
