import path from 'path'
import { ConnectionOptions } from 'typeorm'
import config, { IConfig } from 'config'

const DatabaseDataSourceDirectory = path.resolve(__dirname, '..', 'database')

const databaseConfig: IConfig = config.get('App.database')

const connectionOptions: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: databaseConfig.get('dbHost'),
  username: databaseConfig.get('dbUser'),
  password: databaseConfig.get('dbPass'),
  database: databaseConfig.get('dbName'),
  synchronize: true,
  logging: false,
  entities: [
    path.join(DatabaseDataSourceDirectory, 'entities', '*.entity.{js,ts}')
  ],
  migrations: [path.join(DatabaseDataSourceDirectory, 'migrations', '*.js')],
  subscribers: [path.join(DatabaseDataSourceDirectory, 'subscribers', '*.js')]
}

export default connectionOptions
