import { registerAs } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

export default registerAs('orm', () => {
  const baseConfig = {
    type: 'postgres',
    entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
    synchronize: false,
    migrations: [path.join(__dirname, '/../migrations/scripts/*{.ts,.js}')],
    migrationsTableName: process.env.DB_MIGRATION_TABLE_NAME || 'migrations',
    migrationsRun: false,
    cli: {
      migrationsDir: 'src/migrations/scripts',
    },
    keepConnectionAlive: process.env.DB_KEEP_CONNECTION_ALIVE || true,
    extra: {
      max: process.env.DB_POOL_SIZE || 10,
      connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT || 0,
      idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT || 10000,
      statement_timeout: process.env.ALLOW_API_REQUESTS ? process.env.SERVER_REQUEST_TIMEOUT : undefined,
    },
    logging: true
  };

  // todo get it from env
  return {
    ...baseConfig,
    host: 'localhost',
    port: 5432,
    username: 'db_user',
    password: 'db_pass',
    database: 'test-pg-db',
  };
});
