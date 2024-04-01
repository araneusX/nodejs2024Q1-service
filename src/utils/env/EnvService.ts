import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parseVariable } from './parseVariable';
import { parsePeriod } from './parsePeriod';
import { DEFAULTS } from './defaults';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get PORT() {
    return parseVariable(this.configService.get('PORT'), DEFAULTS.PORT);
  }

  get CRYPT_SALT() {
    return parseVariable(
      this.configService.get('CRYPT_SALT'),
      DEFAULTS.CRYPT_SALT,
    );
  }

  get JWT_SECRET_KEY() {
    return parseVariable(
      this.configService.get('JWT_SECRET_KEY'),
      DEFAULTS.JWT_SECRET_KEY,
    );
  }

  get JWT_SECRET_REFRESH_KEY() {
    return parseVariable(
      this.configService.get('JWT_SECRET_REFRESH_KEY'),
      DEFAULTS.JWT_SECRET_REFRESH_KEY,
    );
  }

  get TOKEN_EXPIRE_TIME_MS() {
    return (
      parsePeriod(this.configService.get('TOKEN_EXPIRE_TIME')) ??
      DEFAULTS.TOKEN_EXPIRE_TIME_MS
    );
  }

  get TOKEN_REFRESH_EXPIRE_TIME_MS() {
    return (
      parsePeriod(this.configService.get('TOKEN_REFRESH_EXPIRE_TIME_MS')) ??
      DEFAULTS.TOKEN_REFRESH_EXPIRE_TIME_MS
    );
  }

  get DB_HOST() {
    return parseVariable(this.configService.get('DB_HOST'), DEFAULTS.DB_HOST);
  }

  get DB_PORT() {
    return parseVariable(this.configService.get('DB_PORT'), DEFAULTS.DB_PORT);
  }

  get DB_USERNAME() {
    return parseVariable(
      this.configService.get('DB_USERNAME'),
      DEFAULTS.DB_USERNAME,
    );
  }

  get DB_PASSWORD() {
    return parseVariable(
      this.configService.get('DB_PASSWORD'),
      DEFAULTS.DB_PASSWORD,
    );
  }

  get DB_NAME() {
    return parseVariable(this.configService.get('DB_NAME'), DEFAULTS.DB_NAME);
  }

  get LOG_LEVEL() {
    const logLevels: LogLevel[] = [
      'debug',
      'error',
      'fatal',
      'log',
      'verbose',
      'warn',
    ];

    const level = parseVariable(
      this.configService.get('LOG_LEVEL'),
      DEFAULTS.LOG_LEVEL,
    );

    const logLevel = level
      .split(' ')
      .filter((level): level is LogLevel =>
        (logLevels as string[]).includes(level),
      );

    return logLevel;
  }

  get LOG_MAX_FILE_SIZE() {
    return (
      parseVariable(
        this.configService.get('LOG_MAX_FILE_SIZE_KB'),
        DEFAULTS.LOG_MAX_FILE_SIZE_KB,
      ) * 1024
    );
  }

  get LOG_STDOUT() {
    return parseVariable(
      this.configService.get('LOG_STDOUT'),
      DEFAULTS.LOG_STDOUT,
    );
  }
  get LOG_FILE() {
    return parseVariable(this.configService.get('LOG_FILE'), DEFAULTS.LOG_FILE);
  }
}
