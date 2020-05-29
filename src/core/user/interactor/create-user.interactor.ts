import { EJSAdapter } from '../../../adapters/ejs.adapter';
import { emailConfig } from '../../../config/email.config';
import { Email } from '../../../email/email.interface';
import { RenderFile } from '../../../render-files/render.interface';
import type { Presenter } from '../../common/presenter.interface';
import type { Security } from '../../common/security.interface';
import type { Validator } from '../../common/validator.interface';
import type { CreateUserRequest } from '../dto/create-user.request';
import type { CreateUserResponse } from '../dto/create-user.response';
import { UserBirthdateInvalidError } from '../error/user-birthdate-invalid.error';
import { UserCellphoneInvalidError } from '../error/user-cellphone-invalid.error';
import { UserCPFInvalidError } from '../error/user-cpf-invalid-error';
import { UserEmailInvalidError } from '../error/user-email-invalid.error';
import { UserNameInvalidError } from '../error/user-name-invalid.error';
import type { UserRepository } from '../user.repository';
//TODO! Criar validação para os campos repetidos email e o CPF já estão cadastrados no sistema
export class CreateUserInteractor {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly presenter: Presenter<CreateUserResponse>,
    private readonly validation: Validator,
    private readonly security: Security, // private readonly email: Email,
  ) {}

  async execute(data: CreateUserRequest): Promise<void> {
    try {
      // Input data validations
      if (!data.name) {
        throw new UserNameInvalidError('invalid name');
      }

      if (!this.validation.isCPF(data.cpf)) {
        throw new UserCPFInvalidError('invalid cpf');
      }

      if (!this.validation.isDate(data.birthdate)) {
        throw new UserBirthdateInvalidError('invalid birthdate');
      }

      if (!this.validation.isCellphone(data.cellphone)) {
        throw new UserCellphoneInvalidError('invalid cellphone');
      }

      if (!this.validation.isEmail(data.email)) {
        throw new UserEmailInvalidError('invalid e-mail');
      }

      data.cpf = data.cpf.replace(/\.|\-/g, '');

      data.password = this.security.encryptPassword(data.password);

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
