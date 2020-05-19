import type { UserRepository } from '../user.repository';
import type { Presenter } from '../../presenter';
import { CustomError } from '../../utils/custom.error';

export class UserUsernameInvalidError extends CustomError {}
export class UserPasswordInvalidError extends CustomError {}

export interface CreateUserRequest {
  username: string;
  password: string;
}

export interface CreateUserResponse {
  username: string;
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
      if (!data.username) {
        throw new UserUsernameInvalidError('invalid username');
      }
      if (!data.password) {
        throw new UserPasswordInvalidError('invalid password');
      }

      // Data persistence
      await this.userRepository.save(data);

      // Presenter success response
      await this.presenter.reply({
        username: data.username,
        createdAt: new Date(Date.now()).toISOString(),
      });
    } catch (error) {
      // Presenter error response
      await this.presenter.throw(error);
    }
  }
}
