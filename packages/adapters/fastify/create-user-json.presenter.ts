import type { FastifyReply } from 'fastify';

import type { Presenter } from '../../core/presenter';
import {
  UserEmailInvalidError,
  UserPasswordInvalidError,
} from '../../core/user/errors';
import type { CreateUserResponse } from '../../core/user/interactor/create-user.interactor';

export class CreateUserJSONPresenter implements Presenter<CreateUserResponse> {
  constructor(private readonly res: FastifyReply<any>) {}

  async reply(data: CreateUserResponse): Promise<void> {
    // Trasform DTO to Custom Format
    const responseJSON = { username: data.email };

    // Send data
    this.res.status(201).send(responseJSON);
  }

  async throw(error: Error): Promise<void> {
    if (
      error instanceof UserEmailInvalidError ||
      error instanceof UserPasswordInvalidError
    ) {
      // Format exception
      const responseJSON = {
        statusCode: 400,
        error: { message: error.message },
      };

      // Send data
      this.res.status(400).send(responseJSON);
    }

    // Format exception
    const responseJSON = {
      statusCode: 500,
      error: { message: 'Internal Server Error', details: error.stack },
    };

    // Send data
    this.res.status(500).send(responseJSON);
  }
}
