import { AlbumEntity } from 'src/modules/album/album.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'artist' })
export class ArtistEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  grammy: boolean;
}
