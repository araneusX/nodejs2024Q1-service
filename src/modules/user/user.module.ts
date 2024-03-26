import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EnvService } from 'src/utils';
@Module({
  providers: [UserService, EnvService],
  controllers: [UserController],
})
export class UserModule {}
