import fastify from 'fastify';
import xml from 'fast-xml-parser';
import type { CreateUserRequest } from '../../core/user/interactor/create-user.interactor';
import { CreateUserInteractor } from '../../core/user/interactor/create-user.interactor';
import { MemoryUserDataSource } from '../../data-sources/memory/user.datasource';
import { CreateUserJSONPresenter } from '../../adapters/fastify/create-user-json.presenter';
import { CreateUserXMLPresenter } from '../../adapters/fastify/create-user-xml.presenter';

const server = fastify({
  logger: {
    level: 'info',
    prettyPrint: {
      levelFirst: true,
      translateTime: true,
    },
  },
});

// Enable server to receive XML content
server.addContentTypeParser(['application/xml'], function (req, done) {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    done(null, data);
  });
});

// This route receive and response XML
server.post('/xml', async function (request, reply) {
  const presenter = new CreateUserXMLPresenter(reply);
  const repository = new MemoryUserDataSource();
  const interactor = new CreateUserInteractor(repository, presenter);

  // Transform XML to JSON
  const { user } = xml.parse(request.body);

  // Create a Request DTO
  const data: CreateUserRequest = {
    username: user.username,
    password: user.password,
  };

  // Execute Interactor and Presenter
  await interactor.execute(data);
});

// This route receive and response JSON
server.post('/json', async function (request, reply) {
  const presenter = new CreateUserJSONPresenter(reply);
  const repository = new MemoryUserDataSource();
  const interactor = new CreateUserInteractor(repository, presenter);

  // Create a Request DTO
  const data: CreateUserRequest = {
    username: request.body.username,
    password: request.body.password,
  };

  // Execute Interactor and Presenter
  await interactor.execute(data);
});

server.listen(8090, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
