import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @Expose()
  login: string;

  @IsString()
  @Expose()
  password: string;
}

export class ViewUserDto {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @ApiProperty()
  @Expose()
  version: number;

  @Expose()
  createdAt: number;

  @Expose()
  updatedAt: number;
}

export class UpdatePasswordDto {
  @IsString()
  @Expose()
  oldPassword: string;

  @IsString()
  @Expose()
  newPassword: string;
}
