import { ArtistEntity } from 'src/artist/artist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'album' })
export class AlbumEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('int')
  year: string;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id)
  @JoinColumn()
  artist: ArtistEntity;
}
