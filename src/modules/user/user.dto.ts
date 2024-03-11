import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Expose, Transform } from 'class-transformer';

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
  @Transform(({ value }) => +new Date(value))
  createdAt: number;

  @Expose()
  @Transform(({ value }) => +new Date(value))
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
