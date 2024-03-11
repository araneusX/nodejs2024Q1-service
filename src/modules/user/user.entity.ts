import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    type: 'datetime',
    default: () => "STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')",
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => "STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')",
  })
  updatedAt: string;
}
