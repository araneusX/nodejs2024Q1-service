import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './modules/db/db.module';
import { EnvService } from './utils';
import { AppController } from './app.controller';

@Module({
  providers: [EnvService],
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
