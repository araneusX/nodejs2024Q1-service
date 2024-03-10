import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'track' })
export class TrackEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @Column('uuid', {
    nullable: false,
  })
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id)
  @JoinColumn()
  artist: ArtistEntity;

  @Column('uuid', {
    nullable: false,
  })
  albumId: string;

  @ManyToOne(() => AlbumEntity, (album) => album.id)
  @JoinColumn()
  album: ArtistEntity;

  @Column('float', {
    nullable: false,
  })
  duration: number;
}
