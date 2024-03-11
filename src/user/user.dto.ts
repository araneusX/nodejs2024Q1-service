import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @Expose()
  login: string;

  @IsString()
  @ApiProperty()
  @Expose()
  password: string;
}

export class ViewUserDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  login: string;

  @ApiProperty()
  @Expose()
  version: number;

  @ApiProperty()
  @Expose()
  createdAt: number;

  @ApiProperty()
  @Expose()
  updatedAt: number;
}

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty()
  @Expose()
  oldPassword: string;

  @IsString()
  @ApiProperty()
  @Expose()
  newPassword: string;
}
