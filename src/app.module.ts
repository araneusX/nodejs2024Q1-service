import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TrackService } from './track/track.service';
import { AlbumService } from './album/album.service';
import { TrackController } from './track/track.controller';
import { AlbumController } from './album/album.controller';
import { AlbumEntity } from './album';
import { ArtistEntity } from './artist';
import { FavoritesEntity } from './favorites';
import { TrackEntity } from './track';
import { UserEntity } from './user';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
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
  providers: [AppService, TrackService, AlbumService],
})
export class AppModule {}
