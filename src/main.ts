import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { stringify } from 'yaml';
import { writeFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { EnvService } from './utils';
import { CustomLogger } from './modules/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(CustomLogger);

  app.useLogger(logger);

  process.on('uncaughtException', (err) => {
    logger.fatal(`Uncaught Exception${err ? ` ${err}` : ''}`);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection${err ? ` ${err}` : ''}`);
  });

  const configService = app.get(ConfigService);
  const env = new EnvService(configService);

  const config = new DocumentBuilder()
    .setTitle('Home Library API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const yamlString: string = stringify(document, {});
  writeFileSync('./doc/api.yaml', yamlString);

  SwaggerModule.setup('api', app, document);

  await app.listen(env.PORT);
}
bootstrap();
