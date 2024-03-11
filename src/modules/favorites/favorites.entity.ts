import { AlbumEntity } from 'src/modules/album/album.entity';
import { ArtistEntity } from 'src/modules/artist/artist.entity';
import { TrackEntity } from 'src/modules/track/track.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoritesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, (artist) => artist.id)
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, (album) => album.id)
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, (track) => track.id)
  @JoinTable()
  tracks: TrackEntity[];
}
