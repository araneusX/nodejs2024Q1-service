import { ConsoleLogger, Module } from '@nestjs/common';
import { CustomLogger } from './logger.service';
import { EnvService } from 'src/utils';

@Module({
  providers: [CustomLogger, ConsoleLogger, EnvService],
  exports: [CustomLogger],
})
export class LoggerModule {}
