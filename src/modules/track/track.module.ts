import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from 'src/utils';

@Module({
  controllers: [TrackController],
  providers: [TrackService, JwtService, EnvService],
})
export class TrackModule {}
