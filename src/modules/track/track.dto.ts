import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @Expose()
  name: string;

  @IsUUID()
  @IsOptional()
  @Expose()
  artistId?: string;

  @IsUUID()
  @IsOptional()
  @Expose()
  albumId?: string;

  @IsNumber()
  @Expose()
  duration: number;
}

export class ViewTrackDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  artistId: string | null;

  @Expose()
  albumId: string | null;

  @Expose()
  duration: number;
}

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  @Expose()
  name?: string;

  @IsUUID()
  @IsOptional()
  @Expose()
  artistId?: string;

  @IsUUID()
  @IsOptional()
  @Expose()
  albumId?: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  duration?: number;
}
