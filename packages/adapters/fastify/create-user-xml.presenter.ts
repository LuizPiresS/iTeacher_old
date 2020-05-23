import xml from 'fast-xml-parser';
import type { FastifyReply } from 'fastify';

import type { Presenter } from '../../core/presenter';
import {
  UserEmailInvalidError,
  UserPasswordInvalidError,
} from '../../core/user/errors';
import type { CreateUserResponse } from '../../core/user/interactor/create-user.interactor';

export class CreateUserXMLPresenter implements Presenter<CreateUserResponse> {
  private parser = new xml.j2xParser({});

  constructor(private readonly res: FastifyReply<any>) {}

  async reply(data: CreateUserResponse): Promise<void> {
    // Transform DTO to Custom Format
    const response = { user: { username: data.email } };
    // Transform JSON to XML
    const responseXML = this.parser.parse(response);

    // Send data
    this.res
      .status(201)
      .header('content-type', 'application/xml')
      .send(responseXML);
  }

  async throw(error: Error): Promise<void> {
    if (
      error instanceof UserEmailInvalidError ||
      error instanceof UserPasswordInvalidError
    ) {
      // Format exception
      const response = {
        exception: {
          statusCode: 400,
          error: { message: error.message },
        },
      };
      // Transform tesponse to XML
      const responseXML = this.parser.parse(response);

      // Response XML
      this.res
        .status(400)
        .header('content-type', 'application/xml')
        .send(responseXML);
    }

    // Format exception
    const response = {
      exception: {
        statusCode: 500,
        error: { message: 'Internal Server Error', details: error.stack },
      },
    };
    // Transform response to XML
    const responseXML = this.parser.parse(response);

    // Send data
    this.res
      .status(500)
      .header('content-type', 'application/xml')
      .send(responseXML);
  }
}
