import {
  CreateUserInteractor,
  CreateUserResponse,
  CreateUserRequest,
  UserEmailInvalidError,
  UserPasswordInvalidError,
  UserNamelInvalidError,
  UserCpfdInvalidError,
  UserBirthdateInvalidError,
  UserCellphoneInvalidError,
} from './create-user.interactor';
import { Presenter } from '../../presenter';
import { UserRepository } from '../user.repository';

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

describe('CreateUser Interactor', () => {
  test('Espero um throw caso o name seja invalido', async () => {
    const interactor = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
    );

    const mockDataRequest: CreateUserRequest = {
      name: '',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserNamelInvalidError('invalid name'),
    );
  });

  test('Espero um throw caso o cpf seja invalido', async () => {
    const interactor = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
    );

    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: '',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserCpfdInvalidError('invalid cpf'),
    );
  });

  test('Espero um throw caso o birthdate seja invalido', async () => {
    const interactor = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
    );

    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: '',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserBirthdateInvalidError('invalid birthdate'),
    );
  });

  test('Espero um throw caso o cellphone seja invalido', async () => {
    const interactor = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
    );

    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: '',
      email: 'any_mail@mail.com',
      password: 'any_password',
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserCellphoneInvalidError('invalid cellphone'),
    );
  });

  test('Espero um throw caso o email seja invalido', async () => {
    const interactor = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
    );

    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: '',
      password: 'any_password',
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserEmailInvalidError('invalid e-mail'),
    );
  });

  test('Espero um throw caso o password seja invalido', async () => {
    const interactor = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
    );

    const mockDataRequest: CreateUserRequest = {
      name: 'any_name',
      cpf: 'any_cpf',
      birthdate: 'any_birthdate',
      cellphone: 'any_cellphone',
      email: 'any_mail@mail.com',
      password: '',
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toHaveBeenCalledWith(
      new UserPasswordInvalidError('invalid password'),
    );
  });
}); // Fim describe
