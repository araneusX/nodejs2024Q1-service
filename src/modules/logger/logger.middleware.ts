import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EnvService } from 'src/utils';
import { CustomLogger } from './logger.service';

const context = 'Incoming request';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private env: EnvService, private logger: CustomLogger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    response.on('finish', () => {
      try {
        const { path, query, body, method } = request;
        const { statusCode, statusMessage } = response;

        const isBody = !['GET', 'DELETE'].includes(method.toUpperCase());
        const isParams = !!Object.keys(query).length;

        const isLog = this.env.LOG_LEVEL.some((level) =>
          ['log', 'debug', 'verbose'].includes(level),
        );

        if (!isLog) {
          return;
        }

        const message = `${method.toUpperCase()}: ${path}${
          isBody ? `; BODY: ${JSON.stringify(body)};` : ''
        }${
          isParams ? `; PARAMS: ${JSON.stringify(query)};` : ''
        } => STATUS: ${statusCode} ${statusMessage}`;

        this.logger.log(message, context);
      } catch (error) {
        this.logger.error(error, context);
      }
    });

    next();
  }
}
