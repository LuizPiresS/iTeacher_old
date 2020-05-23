import { Connection, createConnection, getConnectionOptions } from 'typeorm';

const createTypeOrmConn = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: 'default' });
};
export default createTypeOrmConn;
