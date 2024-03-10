import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, VersionColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  login: string;

  @VersionColumn()
  version: number;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
