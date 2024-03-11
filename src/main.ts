import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { stringify } from 'yaml';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const yamlString: string = stringify(document, {});
  writeFileSync('./doc/api.yaml', yamlString);

  SwaggerModule.setup('api', app, document);

  await app.listen(ENV.PORT);
}
bootstrap();
