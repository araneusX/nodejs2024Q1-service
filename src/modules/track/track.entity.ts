import { AlbumEntity } from 'src/modules/album/album.entity';
import { ArtistEntity } from 'src/modules/artist/artist.entity';
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
    nullable: true,
  })
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: ArtistEntity;

  @Column('uuid', {
    nullable: true,
  })
  albumId: string;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  album: AlbumEntity;

  @Column('float', {
    nullable: false,
  })
  duration: number;
}
