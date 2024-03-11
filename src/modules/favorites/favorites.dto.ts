import { Expose } from 'class-transformer';
import { ViewArtistDto } from '../artist';
import { ViewAlbumDto } from '../album';
import { ViewTrackDto } from '../track';

export class ViewFavoritesDto {
  @Expose()
  artists: ViewArtistDto[];

  @Expose()
  albums: ViewAlbumDto[];

  @Expose()
  tracks: ViewTrackDto[];
}
