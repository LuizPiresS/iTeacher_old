import fastify from 'fastify';
import { createConnection } from 'typeorm';

import ormconfig from './ormconfig';
import { UserRoute } from './route/user.route';

const PORT = parseInt(process.env.PORT || '3000', 10);

async function bootstrap() {
  await createConnection(ormconfig);

  const server = fastify({
    logger: {
      level: 'info',
      prettyPrint: {
        levelFirst: true,
        translateTime: true,
      },
    },
  });

  server.register(UserRoute, { prefix: '/user' });

  server.listen(PORT, function (err, address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    server.log.info(`server listening on ${address}`);
  });
}

bootstrap();
