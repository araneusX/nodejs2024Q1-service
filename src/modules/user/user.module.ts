import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EnvService } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [UserService, EnvService, JwtService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
