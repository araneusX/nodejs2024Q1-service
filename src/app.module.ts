import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TrackService } from './modules/track/track.service';
import { AlbumService } from './modules/album/album.service';
import { TrackController } from './modules/track/track.controller';
import { AlbumController } from './modules/album/album.controller';
import { AlbumEntity } from './modules/album';
import { ArtistEntity } from './modules/artist';
import { FavoritesEntity } from './modules/favorites';
import { TrackEntity } from './modules/track';
import { UserEntity } from './modules/user';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [
        AlbumEntity,
        ArtistEntity,
        FavoritesEntity,
        TrackEntity,
        UserEntity,
      ],
    }),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController, TrackController, AlbumController],
  providers: [TrackService, AlbumService],
})
export class AppModule {}
