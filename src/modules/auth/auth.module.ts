import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { EnvService } from 'src/utils';

@Module({
  imports: [JwtModule],
  providers: [AuthService, UserService, EnvService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
