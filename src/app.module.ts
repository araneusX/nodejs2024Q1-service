import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { AlbumEntity } from './modules/album';
import { ArtistEntity } from './modules/artist';
import { FavoritesEntity } from './modules/favorites';
import { TrackEntity } from './modules/track';
import { UserEntity } from './modules/user';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './utils';
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
    TypeOrmModule.forRootAsync({
      extraProviders: [EnvService],
      inject: [EnvService],
      useFactory(env: EnvService) {
        return {
          type: 'postgres',
          host: env.DB_HOST,
          port: env.DB_PORT,
          username: env.DB_USERNAME,
          password: env.DB_PASSWORD,
          database: env.DB_NAME,
          entities: [
            AlbumEntity,
            ArtistEntity,
            FavoritesEntity,
            TrackEntity,
            UserEntity,
          ],
          synchronize: true,
        };
      },
    }),
  ],
})
export class AppModule {}
