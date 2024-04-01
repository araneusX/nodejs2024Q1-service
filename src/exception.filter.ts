import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomLogger } from './modules/logger';
import { EnvService } from './utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private logger: CustomLogger,
    private env: EnvService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    const isLog =
      (this.env.LOG_LEVEL.length === 1 &&
        ['log', 'debug', 'verbose', 'error'].includes(this.env.LOG_LEVEL[0])) ||
      this.env.LOG_LEVEL.includes('error');

    if (isLog) {
      if (exception instanceof HttpException) {
        const data = exception.getResponse();

        if (typeof data === 'string') {
          this.logger.error(data, 'Exception Filter');
          return;
        }

        if ('message' in data) {
          this.logger.error(data.message, 'Exception Filter');
          return;
        }
      }

      if (exception instanceof Error) {
        this.logger.error(exception.message, 'Exception Filter');
        return;
      }

      this.logger.error('An unknown error has occurred', 'Exception Filter');
    }
  }
}
