import { DataSource } from 'typeorm';

const baseConfig: any = {};

exports.dataSource = new DataSource({
  ...baseConfig,
  port: 5432,
});
