import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from 'src/utils';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, JwtService, EnvService],
})
export class ArtistModule {}
