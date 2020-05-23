module.exports = [{
  name: 'default',
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [
    'packages/data-sources/entity/**/*.ts',
    'packages/data-sources/entity/**/*.js'
  ],
  migrations: ['packages/data-sources/migration/**/*.ts'],
  subscribers: ['.packages/data-sources/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'packages/data-sources/entities',
    migrationsDir: 'packages/data-sources/migration',
    subscribersDir: 'packages/data-sources/subscriber'
  }
}]
