import { FastifyInstance } from 'fastify';

import { CreateUserJSONPresenter } from '../../adapters/api/create-user-json.presenter';
import { SecurityAdapter } from '../../adapters/security.adapter';
import { ValidatorAdapter } from '../../adapters/validator.adapter';
import type { CreateUserRequest } from '../../core/user/dto/create-user.request';
import { CreateUserInteractor } from '../../core/user/interactor/create-user.interactor';
import { UserDataSource } from '../../database/data-sources/user.data-source';

export function UserRoute(server: FastifyInstance, options: any, done: any) {
  const repository = new UserDataSource();
  const validator = new ValidatorAdapter();
  const security = new SecurityAdapter();

  server.post('/', async function (request, reply) {
    const presenter = new CreateUserJSONPresenter(reply);
    const interactor = new CreateUserInteractor(
      repository,
      presenter,
      validator,
      security,
    );

    // Create a Request DTO
    const { name, cpf, birthdate, cellphone, email, password } = request.body;
    const data: CreateUserRequest = {
      name,
      cpf,
      birthdate,
      cellphone,
      email,
      password,
    };

    // Execute Interactor and Presenter
    await interactor.execute(data);
  });

  done();
}
