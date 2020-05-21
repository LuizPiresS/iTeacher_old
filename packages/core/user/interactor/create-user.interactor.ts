import type { UserRepository } from '../user.repository';
import type { Presenter } from '../../presenter';
import { Validator } from '../../validator';
import {
  UserNamelInvalidError,
  UserCpfdInvalidError,
  UserBirthdateInvalidError,
  UserCellphoneInvalidError,
  UserEmailInvalidError,
  UserPasswordInvalidError,
} from '../errors';
export interface CreateUserRequest {
  name: string;
  cpf: string;
  birthdate: string;
  cellphone: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  cpf: string;
  birthdate: string;
  cellphone: string;
  email: string;
  createdAt: string;
}

export class CreateUserInteractor {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly presenter: Presenter<CreateUserResponse>,
    private readonly validation: Validator,
  ) {}

  async execute(data: CreateUserRequest): Promise<void> {
    try {
      // Input data validations
      if (!data.name) {
        throw new UserNamelInvalidError('invalid name');
      }
      // validar
      if (!this.validation.isCPF(data.cpf)) {
        throw new UserCpfdInvalidError('invalid cpf');
      }
      if (!this.validation.isDate(data.birthdate)) {
        throw new UserBirthdateInvalidError('invalid birthdate');
      }
      if (!this.validation.isCellphone(data.cellphone)) {
        throw new UserCellphoneInvalidError('invalid cellphone');
      }
      // email
      if (!this.validation.isEmail(data.email)) {
        throw new UserEmailInvalidError('invalid e-mail');
      }
      if (!this.validation.isPassword(data.password)) {
        throw new UserPasswordInvalidError('invalid password');
      }

      // Data persistence
      const {
        id,
        name,
        cpf,
        birthdate,
        cellphone,
        email,
        createdAt,
      } = await this.userRepository.save(data);

      // Presenter success response
      await this.presenter.reply({
        id,
        name,
        cpf,
        birthdate,
        cellphone,
        email,
        createdAt,
      });
    } catch (error) {
      // Presenter error response
      await this.presenter.throw(error);
    }
  }
}
