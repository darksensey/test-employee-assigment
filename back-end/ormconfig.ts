import { DataSource } from 'typeorm';

const baseConfig: any = {"type":"postgres","entities":["/Users/mac/Documents/Project/Polegon/nest/back-end/src/**/*.entity{.ts,.js}"],"synchronize":false,"migrations":["/Users/mac/Documents/Project/Polegon/nest/back-end/src/migrations/scripts/*{.ts,.js}"],"migrationsTableName":"migrations","migrationsRun":false,"cli":{"migrationsDir":"src/migrations/scripts"},"keepConnectionAlive":true,"extra":{"max":10,"connectionTimeoutMillis":0,"idleTimeoutMillis":10000},"logging":true,"host":"localhost","port":5432,"username":"db_user","password":"db_pass","database":"test-pg-db"};

exports.dataSource = new DataSource({
  ...baseConfig,
  port: 5432,
});
