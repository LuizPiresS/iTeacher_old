import path from 'path';
import { ConnectionOptions } from 'typeorm';

const DatabaseDataSourceDirectory = path.resolve(__dirname, '..', 'database');

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [path.join(DatabaseDataSourceDirectory, 'entities', '*.entity.js')],
  migrations: [path.join(DatabaseDataSourceDirectory, 'migrations', '*.js')],
  subscribers: [path.join(DatabaseDataSourceDirectory, 'subscribers', '*.js')],
} as ConnectionOptions;
