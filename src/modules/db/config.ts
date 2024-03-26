import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { EnvService } from '../../utils/env/EnvService';

dotenv.config();

const configService = new ConfigService();
const env = new EnvService(configService);

export const config: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
};
