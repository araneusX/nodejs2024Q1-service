import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LogInDto {
  @IsString()
  @Expose()
  login: string;

  @IsString()
  @Expose()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  @Expose()
  refreshToken: string;
}

export class ViewTokensDto {
  @IsString()
  @Expose()
  accessToken: string;

  @IsString()
  @Expose()
  refreshToken: string;
}
