import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @Expose()
  name: string;

  @IsNumber()
  @Expose()
  year: number;

  @IsUUID()
  @IsOptional()
  @Expose()
  artistId?: string;
}

export class ViewAlbumDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  year: number;

  @Expose()
  artistId: string | null;
}

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  @Expose()
  name?: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  year?: number;

  @IsUUID()
  @IsOptional()
  @Expose()
  artistId?: string;
}
