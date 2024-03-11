import { Expose, Type } from 'class-transformer';
import { ViewArtistDto } from '../artist';
import { ViewAlbumDto } from '../album';
import { ViewTrackDto } from '../track';

export class ViewFavoritesDto {
  @Expose()
  @Type(() => ViewArtistDto)
  artists: ViewArtistDto[];

  @Expose()
  @Type(() => ViewAlbumDto)
  albums: ViewAlbumDto[];

  @Expose()
  @Type(() => ViewTrackDto)
  tracks: ViewTrackDto[];
}
