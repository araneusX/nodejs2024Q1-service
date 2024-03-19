import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @Expose()
  name: string;

  @IsBoolean()
  @Expose()
  grammy: boolean;
}

export class ViewArtistDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @IsBoolean()
  @Expose()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  @Expose()
  name?: string;

  @IsBoolean()
  @IsOptional()
  @Expose()
  grammy?: boolean;
}
