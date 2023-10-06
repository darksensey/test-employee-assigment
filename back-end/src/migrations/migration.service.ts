import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs = require('fs');

@Injectable()
export class MigrationService {
  constructor(private readonly configService: ConfigService) {}

  public createORMConfigFile(): void {
    fs.readFile('src/ormconfig.template.ts', 'utf8', (err, data) => {
      if (err) {
        throw new Error(err.message);
      }

      const ormConfig = this.configService.get('orm');

      delete ormConfig.logger; // let the standard logger do the job

      const baseConfig = `const baseConfig: any = ${JSON.stringify(ormConfig)}`;

      let result = data.replace(/\.\/core\/orm/g, './src/core/orm');

      result = result.replace(/const baseConfig: any = \{\}/g, baseConfig);

      fs.writeFile('ormconfig.ts', result, 'utf8', (err2) => {
        if (err2) throw new Error(err2.message);
      });
    });
  }
}
