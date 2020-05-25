import 'reflect-metadata';

import fastify from 'fastify';
import { createConnection } from 'typeorm';

import { HasherAdapter } from '../../adapters/encrypter/hasher';
import { CreateUserJSONPresenter } from '../../adapters/fastify/create-user-json.presenter';
import { ValidatorAdapter } from '../../adapters/validator/validator.adapter';
import type { CreateUserRequest } from '../../core/user/interactor/create-user.interactor';
import { CreateUserInteractor } from '../../core/user/interactor/create-user.interactor';
import { UserDataSource } from '../../data-sources/database/data-source/user.data-source';

async function bootstrap() {
  await createConnection();
  const server = fastify({
    logger: {
      level: 'info',
      prettyPrint: {
        levelFirst: true,
        translateTime: true,
      },
    },
  });

  // This route receive and response JSON
  server.post('/add-user', async function (request, reply) {
    const presenter = new CreateUserJSONPresenter(reply);
    const repository = new UserDataSource();
    const validator = new ValidatorAdapter();
    const hasher = new HasherAdapter();
    const interactor = new CreateUserInteractor(
      repository,
      presenter,
      validator,
      hasher,
    );

    // Create a Request DTO
    const data: CreateUserRequest = {
      name: request.body.name,
      cpf: request.body.cpf,
      birthdate: request.body.birthdate,
      cellphone: request.body.cellphone,
      email: request.body.email,
      password: request.body.password,
    };

    // Execute Interactor and Presenter
    await interactor.execute(data);
  });

  server.listen(Number(process.env.PORT), function (err, address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    server.log.info(`server listening on ${address}`);
  });
}
bootstrap();
