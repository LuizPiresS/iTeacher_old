import type { UserRepository } from '../user.repository';
import type { Presenter } from '../../presenter';
import { CustomError } from '../../utils/custom.error';

export class UserEmailInvalidError extends CustomError {}
export class UserPasswordInvalidError extends CustomError {}

export interface CreateUserRequest {
  name: string;
  cpf: string;
  birthDate: string;
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
  ) {}

  async execute(data: CreateUserRequest): Promise<void> {
    try {
      // Input data validations
      if (!data.email) {
        throw new UserEmailInvalidError('invalid e-mail');
      }
      if (!data.password) {
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
