import {
  LoggerService,
  ConsoleLogger,
  Injectable,
  LogLevel,
} from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { appendFile, stat } from 'fs/promises';
import { join } from 'path';
import { EnvService } from 'src/utils';

const logLevels: LogLevel[] = [
  'verbose',
  'debug',
  'log',
  'warn',
  'error',
  'fatal',
];
@Injectable()
export class CustomLogger implements LoggerService {
  private logLevel: LogLevel[];

  constructor(private consoleLogger: ConsoleLogger, private env: EnvService) {
    if (env.LOG_LEVEL.length === 1) {
      const levelIdx = logLevels.findIndex(
        (level) => level === env.LOG_LEVEL[0],
      );

      this.logLevel = logLevels.slice(levelIdx);
    } else {
      this.logLevel = env.LOG_LEVEL;
    }
  }

  private logsPath = join(__dirname, '..', '..', '..', 'logs');
  private logFilePath = join(this.logsPath, `${Date.now()}.log`);
  private errorFilePath = join(this.logsPath, `${Date.now()}.error.log`);

  private async logIntoFile(
    type: string,
    message: any,
    ...optionalParams: [...any, string?]
  ) {
    if (!this.env.LOG_FILE) {
      return;
    }

    try {
      const lastParam = optionalParams.pop();
      const context = typeof lastParam === 'string' ? ` [${lastParam}]` : '';

      if (!existsSync(this.logsPath)) {
        mkdirSync(this.logsPath);
      }

      await appendFile(
        this.logFilePath,
        `${new Date().toISOString()}: ${type.toUpperCase()}${context} ${message}\n`,
      );

      const { size } = await stat(this.logFilePath);

      if (size > this.env.LOG_MAX_FILE_SIZE - 1024) {
        this.logFilePath = join(this.logsPath, `${Date.now()}.log`);
      }

      if (['error', 'fatal'].includes(type)) {
        await appendFile(
          this.errorFilePath,
          `${new Date().toISOString()}: ${type.toUpperCase()}${context} ${message}\n`,
        );

        const { size } = await stat(this.errorFilePath);

        if (size > this.env.LOG_MAX_FILE_SIZE - 1024) {
          this.errorFilePath = join(this.logsPath, `${Date.now()}.error.log`);
        }
      }
    } catch (error) {
      this.consoleLogger.error(error);
    }
  }

  private logToConsole(
    type: string,
    message: any,
    ...optionalParams: [...any, string?]
  ) {
    if (this.env.LOG_STDOUT) {
      this.consoleLogger[type](message, ...optionalParams);
    }
  }

  log(
    ...[message, ...optionalParams]: Parameters<typeof this.consoleLogger.log>
  ) {
    if (!this.logLevel.includes('log')) {
      return;
    }

    this.logToConsole('log', message, ...optionalParams);
    this.logIntoFile('log', message, ...optionalParams);
  }

  fatal(
    ...[message, ...optionalParams]: Parameters<typeof this.consoleLogger.fatal>
  ) {
    if (!this.logLevel.includes('fatal')) {
      return;
    }

    this.logToConsole('fatal', message, ...optionalParams);
    this.logIntoFile('fatal', message, ...optionalParams);
  }

  error(
    ...[message, ...optionalParams]: Parameters<typeof this.consoleLogger.error>
  ) {
    if (!this.logLevel.includes('error')) {
      return;
    }

    this.logToConsole('error', message, ...optionalParams);
    this.logIntoFile('error', message, ...optionalParams);
  }

  warn(
    ...[message, ...optionalParams]: Parameters<typeof this.consoleLogger.warn>
  ) {
    if (!this.logLevel.includes('warn')) {
      return;
    }

    this.logToConsole('warn', message, ...optionalParams);
    this.logIntoFile('warn', message, ...optionalParams);
  }

  debug(
    ...[message, ...optionalParams]: Parameters<typeof this.consoleLogger.debug>
  ) {
    if (!this.logLevel.includes('debug')) {
      return;
    }

    this.logToConsole('debug', message, ...optionalParams);
    this.logIntoFile('debug', message, ...optionalParams);
  }

  verbose(
    ...[message, ...optionalParams]: Parameters<
      typeof this.consoleLogger.verbose
    >
  ) {
    if (!this.logLevel.includes('verbose')) {
      return;
    }

    this.logToConsole('verbose', message, ...optionalParams);
    this.logIntoFile('verbose', message, ...optionalParams);
  }
}
