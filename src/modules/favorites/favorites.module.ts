import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from 'src/utils';

@Module({
  providers: [FavoritesService, JwtService, EnvService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
