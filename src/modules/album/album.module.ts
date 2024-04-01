import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from 'src/utils';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, JwtService, EnvService],
})
export class AlbumModule {}
