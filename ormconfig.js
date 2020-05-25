module.exports = [
  {
    name: 'default',
    type: 'mariadb',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
    database: 'iteacher',
    synchronize: true,
    logging: true,
    entities: [
      '/packages/data-sources/database/entity/**/*.ts',
      '/packages/data-sources/database/entity/**/*.ts',
    ],
    migrations: ['packages/data-sources/database/migration/**/*.ts'],
    subscribers: ['.packages/data-sources/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'packages/data-sources/database/entity',
      migrationsDir: 'packages/data-sources/database/migration',
      subscribersDir: 'packages/data-sources/database/subscriber',
    },
  },
];

