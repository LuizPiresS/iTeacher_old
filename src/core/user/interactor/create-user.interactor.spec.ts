import { IEmail } from '../../common/email.interface';
import type { IPresenter } from '../../common/presenter.interface';
import type { ISecurity } from '../../common/security.interface';
import type { IValidator } from '../../common/validator.interface';
import type { CreateUserRequest } from '../dto/create-user.request';
import type { CreateUserResponse } from '../dto/create-user.response';
import { UserBirthdateInvalidError } from '../error/user-birthdate-invalid.error';
import { UserCellphoneInvalidError } from '../error/user-cellphone-invalid.error';
import { UserCPFInvalidError } from '../error/user-cpf-invalid-error';
import { UserEmailInvalidError } from '../error/user-email-invalid.error';
import { UserNameInvalidError } from '../error/user-name-invalid.error';
import { IUserRepository } from '../user.repository.interface';
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

const emailMock = {
  sendEmail: jest.fn(),
  generateEmailMessage: jest.fn(),
};

describe('CreateUser Interactor', () => {
  let interactor: CreateUserInteractor;

  beforeAll(() => {
    interactor = new CreateUserInteractor(
      userRepositoryMock as IUserRepository,
      presenterMock as IPresenter<CreateUserResponse>,
      validationMock as IValidator,
      securityMock as ISecurity,
      // emailMock as Email,
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

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserNameInvalidError),
    );
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

    expect(presenterMock.throw).toBeCalledWith(expect.any(UserCPFInvalidError));
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

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserBirthdateInvalidError),
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

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserCellphoneInvalidError),
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

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserEmailInvalidError),
    );
  });

  test('Espero que ', async () => {
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

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserEmailInvalidError),
    );
  });

  test('Espero que CreateUser retorne um usuario caso o novo usuario seja salvo', async () => {
    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    const result = interactor.execute(mockDataRequest);
  });
});
