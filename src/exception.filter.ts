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

    let message: unknown = null;

    if (exception instanceof HttpException) {
      const data = exception.getResponse();

      if (typeof data === 'string') {
        message = data;
      } else if ('message' in data) {
        message = data.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const responseBody = {
      message: message ?? 'Internal server error',
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
      this.logger.error(
        message ?? 'An unknown error has occurred',
        'Exception Filter',
      );
    }
  }
}
